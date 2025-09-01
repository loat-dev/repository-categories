import * as yaml from '@std/yaml';
import * as errors from '../errors/index.ts'
import { TemplateFiles } from '../../template_files.ts';
import { getString } from '../get_string.ts';

/**
 * Get the value of the `template-files` input from the action.
 * 
 * @returns The value of the `template-files` input.
 */
export function templateFiles() : TemplateFiles {
  const key = 'template-files';
  const value = getString(key);
  
  try {
    return yaml.parse(value) as TemplateFiles;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new errors.InputParsingError(key, error);
    }

    throw error;
  }
}
