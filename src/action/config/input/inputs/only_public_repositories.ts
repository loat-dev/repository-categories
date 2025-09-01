import { getBoolean } from '../get_boolean.ts';

/**
 * Get the value of the `only-public-repositories` input from the action.
 * 
 * @returns The value of the `only-public-repositories` input or undefined if the value was not set.
 */
export function onlyPublicRepositories() : boolean | undefined {
  return getBoolean('only-public-repositories');
}
