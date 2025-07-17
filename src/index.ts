import actionsCore from '@actions/core';
import actionsGithub from '@actions/github';
import * as yaml from '@std/yaml'

import * as action from './action/index.ts';

const {
  token,
  configFile,
  organizationName,
  onlyPublicRepositories,
  templateFiles,
  labelSearchPattern,
  repositoryBlacklist,
  categories
} = action.getValuesFromInputs(action.inputs);

const config = action.config.getConfigFileContents(configFile);

if (actionsCore.isDebug()) {
  actionsCore.debug('Inputs:');
  actionsCore.debug(`config-file: ${configFile !== undefined ? Deno.readTextFileSync(configFile) : 'no config file'}`)
  actionsCore.debug(`organization-name: ${organizationName}`)
  actionsCore.debug(`only-public-repositories: ${onlyPublicRepositories}`)
  actionsCore.debug(`template-files: ${JSON.stringify(templateFiles)}`)
  actionsCore.debug(`label-search-pattern: ${labelSearchPattern}`)
  actionsCore.debug(`repository-blacklist: ${JSON.stringify(repositoryBlacklist)}`)
  actionsCore.debug(`categories: ${JSON.stringify(categories)}`)
}

const octokit = actionsGithub.getOctokit(token)
octokit.rest.repos.listForOrg({org: organizationName}).then((response) => {
  response.data.forEach((repository) => {
    actionsCore.startGroup(`Repository ${repository.name}`);

    if (onlyPublicRepositories && repository.private) {
      actionsCore.warning(
        `Ignoring repository "${repository.name}", because it is private and "only-public-repositories" is set to true.`,
        {title: 'Private repository'}
      );
      actionsCore.endGroup();
      return;
    }
    

    octokit.rest.issues.listLabelsForRepo({owner: organizationName, repo: repository.name}).then((labels) => {
      const categoryLabel = labels.data.filter((label) => label.name.match(new RegExp(labelSearchPattern)))[0];
      
      if (!categoryLabel) {
        actionsCore.info(
          `Ignoring repository "${repository.name}", because it has no category label that matches "${labelSearchPattern}".`,
          
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
