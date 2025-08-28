import actionsCore from '@actions/core';
import type { Config } from './index.ts';
import * as inputs from '../inputs/index.ts';

export function getConfigFileContents(configFilePath: string) : Config {
  let config : Config = {
    onlyPublicRepositories: inputs.onlyPublicRepositories(),
    templateFiles: inputs.templateFiles(),
    labelSearchPattern: inputs.labelSearchPattern(),
    repositoryBlacklist: inputs.repositoryBlacklist(),
    categories: inputs.categories(),
  }

  console.log(typeof config.labelSearchPattern);
  
  
  if (!configFilePath) {
    return config;
  }

  try {
    config = JSON.parse(Deno.readTextFileSync(configFilePath));
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      actionsCore.error(
        `File not found at ${configFilePath}`,
        {
          title: 'Config File Not Found',
          file: configFilePath,
        }
      )
    }

    if (error instanceof SyntaxError) {
      actionsCore.error(
        `Parsing error:\n${error.stack}`,
        {
          title: 'Invalid JSON',
          file: configFilePath
        }
      )
    }
    actionsCore.error(error as Error)
  }

  return config;
}
