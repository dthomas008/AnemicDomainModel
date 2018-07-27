

export interface Movie {
  id: string;
  name: string;
  LicensingModel: number;
}

export interface MovieResult {
  result: Movie[];
  errorMessage?: any;
  timeGenerated: Date;
}

export class CreateMovieDto {
  public name: string;
  public LicensingModel: number;
}

