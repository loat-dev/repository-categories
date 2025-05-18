import actionsCore from '@actions/core';
import actionsGithub from '@actions/github';
import * as yaml from '@std/yaml'

const token = actionsCore.getInput('token');
const organizationName = actionsCore.getInput('organization-name');
const onlyPublicRepositories = actionsCore.getBooleanInput('only-public-repositories');
const labelSearchPattern = actionsCore.getInput('label-search-pattern');
const repositoryBlacklist = yaml.parse(actionsCore.getInput('repository-blacklist')) as string[];
const categoriesMap = actionsCore.getInput('categories-map');
const categoriesDefault = actionsCore.getInput('categories-default');

if (actionsCore.isDebug()) {
  actionsCore.debug('Inputs:');
  actionsCore.debug(`organization-name: ${organizationName}`)
  actionsCore.debug(`only-public-repositories: ${onlyPublicRepositories}`)
  actionsCore.debug(`label-search-pattern: ${labelSearchPattern}`)
  actionsCore.debug(`repository-blacklist: ${repositoryBlacklist}`)
  actionsCore.debug(`categories-map: ${categoriesMap}`)
  actionsCore.debug(`categories-default: ${categoriesDefault}`)
}

const octokit = actionsGithub.getOctokit(token)
octokit.rest.repos.listForOrg({org: organizationName}).then((response) => {
  response.data.forEach((repository) => {
    actionsCore.group(
      `Repository ${repository.name}`,
      async () => {
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
      }
    );
  })
})
