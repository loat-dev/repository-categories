import * as yaml from '@std/yaml';
import * as actionsCore from '@actions/core'
import * as errors from '../../../../errors/index.ts'
import * as transform from '../../transform/index.ts';
import { TemplateFiles } from '../../template_files.ts';

/**
 * Get the value of the `template-files` input from the action.
 * 
 * @returns The value of the `template-files` input  or undefined if the value was not set.
 */
export function templateFiles() : TemplateFiles | undefined {
  const key = 'template-files';
  const value = transform.toString(actionsCore.getInput(key));

  if (value === undefined) {
    return undefined;
  }
  
  try {
    return yaml.parse(value) as TemplateFiles;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new errors.PropertyParsingError(key, error);
    }

    throw error;
  }
}
