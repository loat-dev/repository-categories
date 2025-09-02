import { Config } from './config.ts';
import { defaults } from './defaults.ts';
import { merge } from './merge.ts';
import * as file from './file/index.ts'
import * as input from './input/index.ts'

export function getConfig() : Config {
  let config : Config = defaults;
  
  config = merge(input.getConfig(), config);
  
  const configFilePath = input.properties.configFile();

  if (configFilePath !== undefined) {
    config = merge(file.getConfig(configFilePath), config);
  }
  
  return config;
}
