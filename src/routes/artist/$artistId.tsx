import type {
  ADBResponse,
  lastFMTopTracksResponse,
  lastFMTrackInfoResponse,
} from '#/types';
import { CircularProgress } from '@mui/material';
import { useQueries, useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/artist/$artistId')({
  component: RouteComponent,
});

const { VITE_LASTFM_API_KEY } = import.meta.env;

function RouteComponent() {
  const { artistId } = Route.useParams();

  const { data: AudioDBData, isLoading: isAudioDBLoading, error: AudioDBError } = useQuery({
    queryKey: ['audioDB', artistId],
    queryFn: async () => {
      const response = await fetch(
        `https://www.theaudiodb.com/api/v1/json/123/artist.php?i=${artistId}`,
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
      }

      return response.json() as Promise<ADBResponse>;
    },
  });

  const artist = AudioDBData?.artists?.[0];

  const { data: lastFMTopTracks, isLoading: isLastFMLoading, error: lastFMError } = useQuery({
    queryKey: ['lastFMArtist', artist?.strArtist],
    queryFn: async () => {
      const response = await fetch(
        `https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${artist?.strArtist}&api_key=${VITE_LASTFM_API_KEY}&format=json&limit=3`,
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
      }

      return response.json() as Promise<lastFMTopTracksResponse>;
    },
    enabled: Boolean(artist),
  });

  const trackInfo = useQueries({
    queries:
      lastFMTopTracks?.toptracks.track.map((track) => ({
        queryKey: ['lastFMTopTrack', track.name],
        queryFn: async () => {
          const response = await fetch(
            `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&artist=${artist?.strArtist}&track=${track.name}&api_key=${VITE_LASTFM_API_KEY}&format=json`,
          );

          if (!response.ok) {
            const text = await response.text();
            throw new Error(text);
          }

          return response.json() as Promise<lastFMTrackInfoResponse>;
        },
      })) ?? [],
  });

  const isLoading = [
    isAudioDBLoading,
    isLastFMLoading,
    ...trackInfo.map((track) => track.isLoading)
  ].some((loading) => loading)
  if (isLoading)
    return <CircularProgress />;

  const error = [
    AudioDBError,
    lastFMError,
    ...trackInfo.map((track) => track.error),
  ].find((possibleError) => Boolean(possibleError));
  if (error) return <>{error.message}</>;

  if (!AudioDBData?.artists) return <div>No artist data</div>;

  return (
    <div className="artist-details">
      <span className="artist-name">{artist?.strArtist}</span>
      <>
        {artist?.strArtistThumb ? (
          <img
            className="artist-thumbnail"
            src={artist.strArtistThumb}
            alt={`Thumbnail art for ${artist.strArtist}`}
          />
        ) : (
          <>
            No image
            <br />
          </>
        )}
      </>
      <span className="artist-bio">{artist?.strBiography}</span>
      <div className="top-tracks">
        <span className="top-tracks-title">Top tracks</span>
        {trackInfo.map((track, index) => {
          const { name } = track.data!.track;
          return (
            <>
              <br />
              <span className="top-track">{`${index + 1}) ${name}`}</span>{' '}
            </>
          );
        })}
      </div>
    </div>
  );
}
