import { Categories } from './categories.ts';
import { TemplateFiles } from './template_files.ts';

export interface Config {
  organizationName? : string,
  onlyPublicRepositories? : boolean,
  templateFiles? : TemplateFiles,
  labelSearchPattern? : RegExp,
  repositoryBlacklist? : string[],
  categories? : Categories
}
