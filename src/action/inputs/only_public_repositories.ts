import { getBoolean } from '../get_boolean.ts';

/**
 * Get the value of the `only-public-repositories` input from the action.
 * 
 * @returns The value of the `only-public-repositories` input.
 */
export function onlyPublicRepositories() : boolean {
  return getBoolean('only-public-repositories');
}
