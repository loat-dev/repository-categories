import { getStringElseUndefined } from '../get_string_else_undefined.ts';
import * as yaml from '@std/yaml';

interface TemplateFiles {
  readme : string,
  category : string,
  repository : string
}

const defaultTemplates : TemplateFiles = {
  readme: './.github/categories/templates/readme.md',
  category: './.github/categories/templates/category.md',
  repository: './.github/categories/templates/repository.md'
}

/**
 * Get the value of the `template-files` input from the action.
 * 
 * @returns The value of the `template-files` input.
 */
export function templateFiles() : TemplateFiles {
  const value = getStringElseUndefined('template-files');

  if (value === undefined) {
    return defaultTemplates;
  }
  
  const valueParsed = yaml.parse(value) as TemplateFiles

  return {
    ...defaultTemplates,
    readme: valueParsed.readme,
    category: valueParsed.category,
    repository: valueParsed.repository
  };
}
