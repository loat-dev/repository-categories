import * as actionsGithub from '@actions/github'

import { Config } from './config.ts';

export const defaults : Config = {
  organizationName: actionsGithub.context.repo.owner,
  onlyPublicRepositories: true,
  templateFiles: {
    readme: './.github/categories/templates/readme.md',
    category: './.github/categories/templates/category.md',
    repository: './.github/categories/templates/repository.md'
  },
  labelSearchPattern: new RegExp('category'),
  repositoryBlacklist: ['.github'],
  categories: {
    '': 'No Category'
  }
}
