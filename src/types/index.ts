export interface LatLng {
  lat: number;
  lng: number;
}

export interface IPath {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  points: Array<LatLng>;
  distance: string;
  inFavorites: boolean;
}

export type CreatePathParams = Omit<IPath, "id" | "inFavorites">;
