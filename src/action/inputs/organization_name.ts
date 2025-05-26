import { getStringElseUndefined } from '../get_string_else_undefined.ts';

/**
 * Get the value of the `organization-name` input from the action.
 * 
 * @returns The value of the `organization-name` input.
 */
export function organizationName() : string | undefined {
  return getStringElseUndefined('organization-name');
}
