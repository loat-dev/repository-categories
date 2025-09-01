import { type Config } from '../config.ts';
import { defaults } from '../defaults.ts';
import { merge } from '../merge.ts';

import * as inputs from './inputs/index.ts'

export function getConfig() : Config {

  const partialConfig : Partial<Config> = {
    onlyPublicRepositories: inputs.onlyPublicRepositories(),
    templateFiles: inputs.templateFiles(),
    labelSearchPattern: inputs.labelSearchPattern(),
    repositoryBlacklist: inputs.repositoryBlacklist(),
    categories: inputs.categories(),
  }
  
  return merge(partialConfig, defaults);
}
