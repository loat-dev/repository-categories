import actionsCore from '@actions/core';
import actionsGithub from '@actions/github';
// import * as yaml from '@std/yaml'

const token = actionsCore.getInput('token');
const organizationName = actionsCore.getInput('organization-name');
const onlyPublicRepositories = actionsCore.getBooleanInput('only-public-repositories');
const labelSearchPattern = actionsCore.getInput('label-search-pattern');
const categories = actionsCore.getInput('categories');

const octokit = actionsGithub.getOctokit(token)
octokit.rest.repos.listForOrg({org: organizationName}).then((response) => {
  response.data.forEach((repo) => {
    if (onlyPublicRepositories && repo.private) {
      return;
    }

    octokit.rest.issues.listLabelsForRepo({owner: organizationName, repo: repo.name}).then((label) => {
      console.log(label);
      
    })
  })
})
