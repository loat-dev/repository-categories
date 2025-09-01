import { Config } from '../config.ts';
import { defaults } from '../defaults.ts';
import { merge } from '../merge.ts';
import { RawConfig } from './raw_config.ts';

export function parse(config : RawConfig) : Config {


  return merge({}, defaults)
}
