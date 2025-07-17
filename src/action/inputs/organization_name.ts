import { getString } from '../get_string.ts';

/**
 * Get the value of the `organization-name` input from the action.
 * 
 * @returns The value of the `organization-name` input.
 */
export function organizationName() : string | undefined {
  return getString('organization-name');
}
