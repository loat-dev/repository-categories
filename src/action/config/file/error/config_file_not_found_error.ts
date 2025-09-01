import CustomError from '../../../../error/custom_error.ts';

/**
 * This error is thrown when the configuration file cannot be found.
 */
export class ConfigFileNotFoundError extends CustomError {
  public path : string;

  /**
   * @param path Path to the config file
   * @param options Options for the error
   */
  constructor(
    path : string,
    options : Deno.errors.NotFound
  ) {
    super('The provided config file was not found.', options)

    this.path = path;
  }
}
