import CustomError from '../../../../error/custom_error.ts';

/**
 * This error is thrown if the configuration file could not be parsed.
 */
export class ConfigFileParsingError extends CustomError {
  public readonly path : string;

  /**
   * @param path Path to the config file
   * @param options Options for the error
   */
  constructor(
    path : string,
    options : SyntaxError
  ) {
    super('Unable to parse the provided config file.', options)

    this.path = path;
  }
}
