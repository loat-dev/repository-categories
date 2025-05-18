import actionsCore from '@actions/core';
import actionsGithub from '@actions/github';
// import * as yaml from '@std/yaml'

const token = actionsCore.getInput('token');
const organizationName = actionsCore.getInput('organization-name');
const onlyPublicRepositories = actionsCore.getBooleanInput('only-public-repositories');
const labelSearchPattern = actionsCore.getInput('label-search-pattern');
const categoriesMap = actionsCore.getInput('categories-map');
const categoriesDefault = actionsCore.getInput('categories-default');

const octokit = actionsGithub.getOctokit(token)
octokit.rest.repos.listForOrg({org: organizationName}).then((response) => {
  response.data.forEach((repository) => {
    if (onlyPublicRepositories && repository.private) {
      console.warn(`Ignoring repository "${repository.name}", because it is private and "only-public-repositories" is set to true.`);
      return;
    }

    octokit.rest.issues.listLabelsForRepo({owner: organizationName, repo: repository.name}).then((labels) => {
      const categoryLabel = labels.data.filter((label) => label.name.match(new RegExp(labelSearchPattern)))[0];
      
      if (!categoryLabel) {
        console.warn(`Ignoring repository "${repository.name}", because it has no category label that matches "${labelSearchPattern}".`);
        return;
      }
      const name = repository.name;
      const categories = categoryLabel.description?.split(',').map((category) => category.trim()) ?? [];
      console.log(name, categories);
    })
  })
})
