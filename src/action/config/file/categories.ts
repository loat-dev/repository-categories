import { Categories } from '../categories.ts';
import { Config } from '../config.ts';
import { defaults } from '../defaults.ts';

/**
 * Get the value of the `categories` input from the file.
 * 
 * @returns The value of the `categories` input.
 */
export function categories(config : Config) : Categories {
  return {
    ...defaults.categories,
    ...config.categories
  }
}
