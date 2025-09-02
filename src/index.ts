import actionsCore from '@actions/core';
import actionsGithub from '@actions/github';

import * as action from './action/index.ts';

const token = action.config.input.properties.token()

if (token === undefined) {
  throw new Error('No token')
}

const config = action.config.getConfig();

actionsCore.info('Inputs:');
actionsCore.info(`organization-name: ${config.organizationName}`)
actionsCore.info(`only-public-repositories: ${config.onlyPublicRepositories}`)
actionsCore.info(`template-files: ${JSON.stringify(config.templateFiles)}`)
actionsCore.info(`label-search-pattern: ${config.labelSearchPattern.source}`)
actionsCore.info(`repository-blacklist: ${JSON.stringify(config.repositoryBlacklist)}`)
actionsCore.info(`categories: ${JSON.stringify(config.categories)}`)

const octokit = actionsGithub.getOctokit(token);

octokit.rest.repos.listForOrg({org: config.organizationName}).then(async (response) => {
  
  actionsCore.info(`Checking repositories: ${response.data.map((repository) => repository.name).join(', ')}`)

  for (const repository of response.data) {
    actionsCore.startGroup(`Processing repository "${repository.name}"...`);

    if (config.onlyPublicRepositories && repository.private) {
      actionsCore.warning(
        `Ignoring repository "${repository.name}", because it's private and "only-public-repositories" is set to true.`,
        {title: 'Private repository'}
      );
      actionsCore.endGroup();
      continue;
    }

    if (config.repositoryBlacklist.includes(repository.name)) {
      actionsCore.warning(
        `Ignoring repository "${repository.name}", because it's on the repository blacklist.`,
        {title: 'Repository blacklist'}
      );
      actionsCore.endGroup();
      continue;
    }
    
    await octokit.rest.issues.listLabelsForRepo({owner: config.organizationName, repo: repository.name}).then((response) => {
      const categoryLabel = response.data.filter((label) => config.labelSearchPattern.test(label.name))[0];
      
      if (!categoryLabel) {
        actionsCore.warning(
          `Ignoring repository "${repository.name}", because it has no category label that matches "${config.labelSearchPattern.source}".`,
          {title: 'No pattern match'}
        );
        return;
      }

      actionsCore.info(`Found label: ${JSON.stringify(categoryLabel)}`)

      const name = repository.name;
      const categories = categoryLabel.description?.split(',').map((category) => category.trim()) ?? [];

      if (categories.length === 0) {
        actionsCore.warning(
          `Ignoring repository "${repository.name}", because it has no categories.`,
          {title: 'No categories provided'}
        );
        return;
      }

      actionsCore.info(name)
      actionsCore.info(categories.join(', '))
    })

    actionsCore.endGroup();
  }
})
