import { type RawContents } from './raw_contents.ts';
import { ConfigFileNotFoundError } from './error/config_file_not_found_error.ts';
import { ConfigFileParsingError } from './error/config_file_parsing_error.ts';

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
      throw new ConfigFileNotFoundError(path, error);
    }

    if (error instanceof SyntaxError) {
      throw new ConfigFileParsingError(path, error);
    }

    throw error;
  }
}
