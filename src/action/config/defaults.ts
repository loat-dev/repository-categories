import { Config } from './config.ts';

export const defaults : Config = {
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
