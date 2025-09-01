import { type RawContents } from './raw_contents.ts';
import * as errors from './errors/index.ts'

/**
 * This function reads the config from the provided path.
 * 
 * @param path The path to read from
 * @param reader The reader to use
 * @throws If the file was not found or if the syntax is invalid.
 * @returns The raw contents of the config file.
 */
export function read(
  path : string,
  reader = Deno.readTextFileSync
) : RawContents {
  try {
    return JSON.parse(reader(path));
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      throw new errors.ConfigFileNotFoundError(path, error);
    }

    if (error instanceof SyntaxError) {
      throw new errors.ConfigFileParsingError(path, error);
    }

    throw error;
  }
}
