// module Api.Utils {
  export interface Envelope<T> {
     result: T;
     errorMessage: string;
     timeGenerated: Date;
    }
//}
