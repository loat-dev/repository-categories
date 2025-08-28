import { Categories } from './categories.ts';
import { TemplateFiles } from './template_files.ts';

export interface Config {
  onlyPublicRepositories : boolean,
  templateFiles : TemplateFiles,
  labelSearchPattern : RegExp,
  repositoryBlacklist : string[],
  categories: Categories
}
