/**
 * This function transforms the value to a string.
 * 
 * @returns The string value of the input or undefined if the value was not set.
 */
export function toString(value : string | undefined) : string | undefined {

  if (value === '') {
    return undefined;
  }
  
  return value;
}
