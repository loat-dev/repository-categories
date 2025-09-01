import { Config } from './config.ts';

/**
 * This function merges configSource into configTarget. Any undefined value will be overwritten.
 * 
 * @param configSource The source config
 * @param configTarget The target config
 */
export function merge<ConfigType extends Config>(
  configSource : Partial<ConfigType>,
  configTarget : ConfigType
) : ConfigType {
  const newConfig = configTarget;

  if (configSource.onlyPublicRepositories !== undefined) {
    newConfig.onlyPublicRepositories = configSource.onlyPublicRepositories;
  }

  
  if (configSource.templateFiles !== undefined) {
    if (newConfig.templateFiles) {
      if (configSource.templateFiles.readme !== undefined) {
        newConfig.templateFiles.readme = configSource.templateFiles.readme;
      }

      if (configSource.templateFiles.category !== undefined) {
        newConfig.templateFiles.category = configSource.templateFiles.category;
      }

      if (configSource.templateFiles.repository !== undefined) {
        newConfig.templateFiles.repository = configSource.templateFiles.repository;
      }
    }
  }
  
  if (configSource.labelSearchPattern) {
    newConfig.labelSearchPattern = configSource.labelSearchPattern;
  }
  
  if (configSource.repositoryBlacklist) {
    newConfig.repositoryBlacklist = configSource.repositoryBlacklist;
  }

  if (configSource.categories) {
    newConfig.categories = configSource.categories;
  }

  return newConfig
}
