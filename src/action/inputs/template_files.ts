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
  
  const valueParsed = yaml.parse(value) as TemplateFiles

  return {
    readme: valueParsed.readme,
    category: valueParsed.category,
    repository: valueParsed.repository
  };
}
