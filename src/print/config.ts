import * as actionsCore from '@actions/core'
import * as action from '../action/index.ts';

export function config(config: action.config.Config) : void {
  actionsCore.startGroup('Config:')
  actionsCore.info(Deno.inspect(config, {colors: true, depth: Infinity}))
  actionsCore.endGroup()
}
