export type SpotifyUser = {
  display_name: string;
  email: string;
  country: string;
  href: string;
  id: string;
  images: SpotifyImageObject[];
  product: string;
  type: string;
  uri: string;
};

export type Reason = "market" | "product" | "explicit";

type ExternalUrl = {
  spotify?: string;
};

export type SpotifyImageObject = {
  url: string;
  width: number | null;
  height: number | null;
};

export type SimplifiedSpotifyArtist = {
  external_urls?: ExternalUrl;
  href?: string;
  id?: string;
  name?: string;
  type?: string;
  uri?: string;
};

export type SpotifyArtist = SimplifiedSpotifyArtist & {
  followers?: {
    href?: string | null;
    total?: number;
  };
  genres?: string[];
  images?: SpotifyImageObject[];
  popularity?: number;
};

export type AlbumObject = {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrl;
  href: string;
  id: string;
  images: SpotifyImageObject[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions?: {
    reason?: Reason;
  };
  type: string;
  uri: string;
  artists: SimplifiedSpotifyArtist[];
};

export type SpotifyTrack = {
  album?: AlbumObject;
  artists?: SpotifyArtist[];
  available_markets?: string[];
  disc_number?: number;
  duration_ms?: number;
  explicit?: boolean;
  external_ids?: {
    isrc?: string;
    ean?: string;
    upc?: string;
  };
  external_urls?: ExternalUrl;
  href?: string;
  id?: string;
  is_playable?: boolean;
  linked_from?: {};
  restrictions?: {
    reason?: Reason;
  };
  name?: string;
  popularity?: number;
  preview_url?: string | null;
  track_number?: number;
  type?: string;
  uri?: string;
  is_local?: boolean;
};
