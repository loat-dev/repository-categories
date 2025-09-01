import CustomError from '../../../../error/custom_error.ts';

/**
 * This error is thrown if the configuration file could not be parsed.
 */
export class InputParsingError extends CustomError {
  public readonly key : string;

  /**
   * @param key Key to parse
   * @param options Options for the error
   */
  constructor(
    key : string,
    options : SyntaxError
  ) {
    super('Unable to parse the provided config file.', options)

    this.key = key;
  }
}
