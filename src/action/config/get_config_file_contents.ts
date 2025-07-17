import actionsCore from '@actions/core';
import type { Config } from './index.ts';

export function getConfigFileContents(configFilePath: string | undefined) : Partial<Config> {
  let config = {}
  
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
