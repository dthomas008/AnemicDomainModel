// module Api.Utils {
//   class Envelope<T>
//   {
//     public Result: T;
//     public ErrorMessage: string;
//     public TimeGenerated: Date;
//     constructor(result: T, errorMessage: string) {
//       this.Result = result;
//       this.ErrorMessage = errorMessage;
//       this.TimeGenerated = Date.UTC;
//     }
//   }
//   export class Envelope extends Envelope<string> {
//     constructor(errorMessage: string) {
//       super(null, errorMessage);

//     }
//     public static Ok<T>(result: T): BaseEnvelope<T> {
//       return new Envelope<T>(result, null);
//     }
//     public static Ok(): Envelope {
//       return new Envelope(null);
//     }
//     public static Error(errorMessage: string): Envelope {
//       return new Envelope(errorMessage);
//     }
//   }
// }
