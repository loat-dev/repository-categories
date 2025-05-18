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
  const repositories = response.data.filter((repository) => {
    return onlyPublicRepositories ? repository.visibility === 'public' : true
  })
  const labels = repositories.map((repository) => {
    return octokit.rest.issues.listLabelsForRepo({owner: organizationName, repo: repository.name}).then((response) => {
      const labels = response.data.filter((label) => {
        return label.name.match(new RegExp(labelSearchPattern))
      })
      return labels
    })
  })
  console.log(labels);
  
  Promise.all(labels).then((labels) => {
    actionsCore.setOutput('labels', JSON.stringify(labels))
  })
})
