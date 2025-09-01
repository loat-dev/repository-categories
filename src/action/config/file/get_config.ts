import { type Config } from '../config.ts';
import { parse } from './parse.ts';
import { read } from './read.ts';

export function getConfig(path : string) : Config {
  return parse(read(path))
}
