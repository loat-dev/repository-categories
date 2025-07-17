import { Categories } from '../config/index.ts';
import { getString } from '../get_string.ts';
import * as yaml from '@std/yaml';
/**
 * Get the value of the `categories` input from the action.
 * 
 * @returns The value of the `categories` input.
 */
export function categories() : Categories {
  const value = getString('categories');
  
  return yaml.parse(value) as Categories
}
