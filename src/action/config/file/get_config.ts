import { type Config } from '../config.ts';
import * as transform from '../transform/index.ts';
import { read } from './read.ts';

export function getConfig(path : string) : Partial<Config> {
  const configRead = read(path)

  return {
    onlyPublicRepositories: configRead.onlyPublicRepositories,
    templateFiles: configRead.templateFiles,
    labelSearchPattern: transform.toRegExp(configRead.labelSearchPattern),
    repositoryBlacklist: configRead.repositoryBlacklist,
    categories: configRead.categories,
  }
}
