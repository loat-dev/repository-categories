export const defaults = {
  onlyPublicRepositories: true,
  templateFiles: {
    readme: './.github/categories/templates/readme.md',
    category: './.github/categories/templates/category.md',
    repository: './.github/categories/templates/repository.md'
  },
  labelSearchPattern: 'category',
  repositoryBlacklist: ['.github'],
  categories: {
    '': 'No Category'
  }
}
