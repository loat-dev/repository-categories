import { getBooleanElseUndefined } from '../get_boolean_else_undefined.ts';

/**
 * Get the value of the `only-public-repositories` input from the action.
 * 
 * @returns The value of the `only-public-repositories` input.
 */
export function onlyPublicRepositories() : boolean | undefined {
  return getBooleanElseUndefined('only-public-repositories');
}
