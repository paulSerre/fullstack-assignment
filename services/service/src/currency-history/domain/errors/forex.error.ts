
export class ForexError extends Error {
    constructor(errMessage) {
        super(errMessage);
      }
    
    static withCode(code: string) {
      throw new ForexError(
        `Couldn't call forex API for currency: ${code}`
      );
    }
}