import actionsCore from '@actions/core';
import actionsGithub from '@actions/github';

import * as action from './action/index.ts';

const token = action.config.input.properties.token()

if (token === undefined) {
  throw new Error('No token')
}

const config = action.config.getConfig();

actionsCore.debug('Inputs:');
actionsCore.debug(`organization-name: ${config.organizationName}`)
actionsCore.debug(`only-public-repositories: ${config.onlyPublicRepositories}`)
actionsCore.debug(`template-files: ${JSON.stringify(config.templateFiles)}`)
actionsCore.debug(`label-search-pattern: ${config.labelSearchPattern}`)
actionsCore.debug(`repository-blacklist: ${JSON.stringify(config.repositoryBlacklist)}`)
actionsCore.debug(`categories: ${JSON.stringify(config.categories)}`)

const octokit = actionsGithub.getOctokit(token);

octokit.rest.repos.listForOrg({org: config.organizationName}).then((response) => {
  response.data.forEach((repository) => {
    actionsCore.startGroup(`Processing repository "${repository.name}"...`);

    if (config.onlyPublicRepositories && repository.private) {
      actionsCore.warning(
        `Ignoring repository "${repository.name}", because it's private and "only-public-repositories" is set to true.`,
        {title: 'Private repository'}
      );
      actionsCore.endGroup();
      return;
    }

    if (config.repositoryBlacklist.includes(repository.name)) {
      actionsCore.warning(
        `Ignoring repository "${repository.name}", because it's on the repository blacklist.`,
        {title: 'Repository blacklist'}
      );
      actionsCore.endGroup();
      return;
    }
    
    octokit.rest.issues.listLabelsForRepo({owner: config.organizationName, repo: repository.name}).then((labels) => {
      const categoryLabel = labels.data.filter((label) => {console.log(typeof config.labelSearchPattern); return config.labelSearchPattern.test(label.name)})[0];
      
      if (!categoryLabel) {
        actionsCore.warning(
          `Ignoring repository "${repository.name}", because it has no category label that matches "${config.labelSearchPattern.source}".`,
          {title: 'No pattern match'}
        );
        actionsCore.endGroup();
        return;
      }
      const name = repository.name;
      const categories = categoryLabel.description?.split(',').map((category) => category.trim()) ?? [];

      if (categories.length === 0) {
        actionsCore.warning(
          `Ignoring repository "${repository.name}", because it has no categories.`,
          {title: 'No categories provided'}
        );
        actionsCore.endGroup();
        return;
      }

      actionsCore.info(name)
      actionsCore.info(categories.join(', '))
    })

    actionsCore.endGroup();
  })
})
