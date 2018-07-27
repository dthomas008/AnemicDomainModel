

export interface Movie {
  id: string;
  name: string;
  email: string;
  status: string;
  statusExpirationDate?: Date;
  moneySpent: number;
}

export interface MovieResult {
  result: Movie[];
  errorMessage?: any;
  timeGenerated: Date;
}

export class CreateMovieDto {
  public name: string;
  public email: string;
}

