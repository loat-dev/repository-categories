import actionsCore from '@actions/core';

export function load(path : string | null) {
  return {
    token: actionsCore.getInput('token', { required: true })
  }
}
