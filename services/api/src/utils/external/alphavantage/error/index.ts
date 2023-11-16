import { DomainError } from "@app/utils";


export default class ForexError extends DomainError {
    constructor(errMessage) {
        super(errMessage);
      }
    
    static withCode(code: string) {
      throw new ForexError(
        `Couldn't call forex API for currency: ${code}`
      );
    }
}