import actionsCore from '@actions/core';
import { defaults } from '../config/index.ts';
import { TemplateFiles } from '../config/index.ts';
import { getString } from '../get_string.ts';
import * as yaml from '@std/yaml';


/**
 * Get the value of the `template-files` input from the action.
 * 
 * @returns The value of the `template-files` input.
 */
export function templateFiles() : TemplateFiles {
  const value = getString('template-files');
  
  try {
    return {
      ...defaults.templateFiles,
      ...yaml.parse(value) as TemplateFiles
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      actionsCore.error(
        `Parsing error:\n${error.stack}`,
        {title: 'Invalid YAML'}
      )
    }

    actionsCore.error(error as Error)

    return defaults.templateFiles;
  }
}
