import type { ADBResponse } from '#/types';
import { CircularProgress } from '@mui/material';
import { Link } from '@tanstack/react-router';

interface ISearchResultProps {
  data?: ADBResponse;
  isLoading: boolean;
  error: Error | null;
}

const SearchResults = (props: ISearchResultProps) => {
  const { data, isLoading, error } = props;

  if (isLoading)
    return (
      <div>
        <CircularProgress />
      </div>
    );

  if (error) return <div>{error.message}</div>;

  if (!data) return <div>No data</div>;

  return (
    <div>
      {data.artists?.map((artist) => (
        <div className="artist-result">
          <Link to="/artist/$artistId" params={{ artistId: artist.idArtist }}>
            {artist.strArtistThumb ? (
              <>
                <span>{artist.strArtist}</span>
                <img
                  src={artist.strArtistThumb}
                  alt={`Thumbnail art for ${artist.strArtist}`}
                />
              </>
            ) : (
              `No Thumbnail art for ${artist.strArtist}`
            )}
          </Link>
        </div>
      )) ?? 'No artist found'}
    </div>
  );
};

export default SearchResults;
