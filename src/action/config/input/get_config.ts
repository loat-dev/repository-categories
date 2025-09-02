import { type Config } from '../config.ts';

import * as properties from './properties/index.ts'

export function getConfig() : Partial<Config> {

  return {
    organizationName: properties.organizationName(),
    onlyPublicRepositories: properties.onlyPublicRepositories(),
    templateFiles: properties.templateFiles(),
    labelSearchPattern: properties.labelSearchPattern(),
    repositoryBlacklist: properties.repositoryBlacklist(),
    categories: properties.categories()
  }
}
