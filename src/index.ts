import actionsCore from '@actions/core';
import actionsGithub from '@actions/github';

import * as action from './action/index.ts';


const config = {
  ...action.config.getConfigFileContents(action.inputs.configFile()),
  organizationName: action.inputs.organizationName(),
  token: action.inputs.token()
}

if (actionsCore.isDebug()) {
  actionsCore.debug('Inputs:');
  actionsCore.debug(`organization-name: ${config.organizationName}`)
  actionsCore.debug(`only-public-repositories: ${config.onlyPublicRepositories}`)
  actionsCore.debug(`template-files: ${JSON.stringify(config.templateFiles)}`)
  actionsCore.debug(`label-search-pattern: ${config.labelSearchPattern}`)
  actionsCore.debug(`repository-blacklist: ${JSON.stringify(config.repositoryBlacklist)}`)
  actionsCore.debug(`categories: ${JSON.stringify(config.categories)}`)
}

const octokit = actionsGithub.getOctokit(config.token)
octokit.rest.repos.listForOrg({org: config.organizationName}).then((response) => {
  response.data.forEach((repository) => {
    actionsCore.startGroup(`Repository ${repository.name}`);

    if (config.onlyPublicRepositories && repository.private) {
      actionsCore.warning(
        `Ignoring repository "${repository.name}", because it is private and "only-public-repositories" is set to true.`,
        {title: 'Private repository'}
      );
      actionsCore.endGroup();
      return;
    }
    

    octokit.rest.issues.listLabelsForRepo({owner: config.organizationName, repo: repository.name}).then((labels) => {
      const categoryLabel = labels.data.filter((label) => label.name.match(new RegExp(config.labelSearchPattern)))[0];
      
      if (!categoryLabel) {
        actionsCore.info(
          `Ignoring repository "${repository.name}", because it has no category label that matches "${config.labelSearchPattern}".`,
          
        );
        actionsCore.endGroup();
        return;
      }
      const name = repository.name;
      const categories = categoryLabel.description?.split(',').map((category) => category.trim()) ?? [];
      console.log(name, categories);
    })

    actionsCore.endGroup();
  })
})
