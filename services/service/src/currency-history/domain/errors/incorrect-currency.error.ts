export class IncorrectCurrencyError extends Error {
  constructor(errMessage) {
    super(errMessage);
  }

  static withCode(code: string) {
    throw new IncorrectCurrencyError(`Invalid currency code : ${code}`);
  }
}
