import * as errors from '../../../errors/index.ts'

/**
 * This function transforms the value to a RegExp object.
 * 
 * @returns The RegExp object or undefined if the value was not set.
 */
export function toRegExp(value : string | undefined) : RegExp | undefined {

  if (value === undefined || value === '') {
    return undefined;
  }

  try {
    return new RegExp(value, 'g');
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new errors.PropertyParsingError('label-search-pattern', error)
    }

    throw error
  }
}
