import { getStringElseUndefined } from '../get_string_else_undefined.ts';
import * as yaml from '@std/yaml';

interface TemplateFiles {
  readme : string | undefined,
  category : string | undefined,
  repository : string | undefined
}

/**
 * Get the value of the `template-files` input from the action.
 * 
 * @returns The value of the `template-files` input.
 */
export function templateFiles() : TemplateFiles {
  const value = getStringElseUndefined('template-files');

  if (value === undefined) {
    return {
      readme: undefined,
      category: undefined,
      repository: undefined
    };
  }
  
  const valueParsed = yaml.parse(value) as TemplateFiles

  return {
    readme: valueParsed.readme ?? undefined,
    category: valueParsed.category ?? undefined,
    repository: valueParsed.repository ?? undefined
  };
}
