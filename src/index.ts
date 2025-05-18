import actionsCore from '@actions/core';
import actionsGithub from '@actions/github';
// import * as yaml from '@std/yaml'

const token = actionsCore.getInput('token');
const organizationName = actionsCore.getInput('organization-name');
// const onlyPublicRepositories = actionsCore.getBooleanInput('only-public-repositories');
// const labelSearchPattern = actionsCore.getInput('label-search-pattern');
// const categories = actionsCore.getInput('categories');

const octokit = actionsGithub.getOctokit(token)
octokit.rest.repos.listForOrg({org: organizationName}).then((response) => {
  console.log(response.data);
  
})
