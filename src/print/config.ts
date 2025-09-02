import * as actionsCore from '@actions/core'
import * as colors from "@std/fmt/colors";

import * as action from '../action/index.ts';


function keyValue(key : string, value : string | boolean) : string {
  if (typeof value === 'boolean') {
    return colors.red(key) + colors.gray(': ') + colors.cyan(String(value));
  }
  return colors.red(key) + colors.gray(': ') + colors.green(value);
}

export function config(config: action.config.Config) : void {
  actionsCore.startGroup(colors.green('Config:'))
  actionsCore.info(keyValue('organization-name', config.organizationName))
  actionsCore.info(keyValue('only-public-repositories', config.onlyPublicRepositories))
  actionsCore.info(`template-files: ${JSON.stringify(config.templateFiles)}`)
  actionsCore.info(keyValue('label-search-pattern', config.labelSearchPattern.source))
  actionsCore.info(`repository-blacklist: ${JSON.stringify(config.repositoryBlacklist)}`)
  actionsCore.info(`categories: ${JSON.stringify(config.categories)}`)
  actionsCore.endGroup()
}
