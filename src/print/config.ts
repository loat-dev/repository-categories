import * as actionsCore from '@actions/core'
import * as colors from "@std/fmt/colors";

import * as action from '../action/index.ts';

export function config(config: action.config.Config) : void {
  actionsCore.startGroup(colors.green('Config:'))
  actionsCore.info(`organization-name: ${config.organizationName}`)
  actionsCore.info(`only-public-repositories: ${config.onlyPublicRepositories}`)
  actionsCore.info(`template-files: ${JSON.stringify(config.templateFiles)}`)
  actionsCore.info(`label-search-pattern: ${config.labelSearchPattern.source}`)
  actionsCore.info(`repository-blacklist: ${JSON.stringify(config.repositoryBlacklist)}`)
  actionsCore.info(`categories: ${JSON.stringify(config.categories)}`)
  actionsCore.endGroup()
}
