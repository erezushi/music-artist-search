export type ADBResponse = {
  artists:
    | {
        idArtist: string;
        strArtist: string;
        strArtistStripped: string | null;
        strArtistAlternate: string;
        strLabel: string;
        idLabel: string;
        intFormedYear: string;
        intBornYear: string;
        intDiedYear: string | null;
        strDisbanded: string | null;
        strStyle: string;
        strGenre: string;
        strMood: string;
        strWebsite: string;
        strFacebook: string;
        strTwitter: string;
        strBiography: string;
        strBiographyDE: string | null;
        strBiographyFR: string | null;
        strBiographyCN: string | null;
        strBiographyIT: string | null;
        strBiographyJP: string | null;
        strBiographyRU: string | null;
        strBiographyES: string | null;
        strBiographyPT: string | null;
        strBiographySE: string | null;
        strBiographyNL: string | null;
        strBiographyHU: string | null;
        strBiographyNO: string | null;
        strBiographyIL: string | null;
        strBiographyPL: string | null;
        strGender: string | null;
        intMembers: string | null;
        strCountry: string | null;
        strCountryCode: string;
        strArtistThumb: string | null;
        strArtistLogo: string | null;
        strArtistCutout: string | null;
        strArtistClearart: string | null;
        strArtistWideThumb: string | null;
        strArtistFanart: string | null;
        strArtistFanart2: string | null;
        strArtistFanart3: string | null;
        strArtistFanart4: string | null;
        strArtistBanner: string | null;
        strMusicBrainzID: string;
        strISNIcode: string | null;
        strLastFMChart: string | null;
        intCharted: string;
        strLocked: string;
      }[]
    | null;
};

export type lastFMTopTracksResponse = {
  toptracks: {
    track: {
      name: string;
      playcount: string;
      listeners: string;
      mbid: string;
      url: string;
      streamable: string;
      artist: {
        name: string;
        mbid: string;
        url: string;
      };
      image: {
        '#text': string;
        size: 'small' | 'medium' | 'large' | 'extralarge';
      }[];
      '@attr': { rank: string };
    }[];
    '@attr': {
      artist: string;
      page: string;
      perPage: string;
      totalPages: string;
      total: string;
    };
  };
};

export type lastFMTrackInfoResponse = {
  track: {
    name: string;
    mbid: string;
    url: string;
    duration: string;
    listeners: string;
    playcount: string;
    streamable: {
      '#text': string;
      fulltrack: string;
    };
    artist: {
      name: string;
      mbid: string;
      url: string;
    };
    album: {
      artist: string;
      title: string;
      url: string;
      image: {
        '#text': string;
        size: 'small' | 'medium' | 'large' | 'extralarge';
      }[];
    };
    toptags: {
      tag: {
        name: string;
        url: string;
      }[];
    };
    wiki: {
      published: string;
      summary: string;
      content: string;
    };
  };
};
