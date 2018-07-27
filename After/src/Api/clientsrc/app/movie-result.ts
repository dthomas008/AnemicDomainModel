

export interface Movie {
  id: string;
  name: string;
  genre: string;
}

export interface MovieResult {
  result: Movie[];
  errorMessage?: any;
  timeGenerated: Date;
}

export class CreateMovieDto {
  public name: string;
  public genre: string;
}

