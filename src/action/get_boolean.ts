import actionsCore from '@actions/core'

/**
 * Get the boolean value of an input from the action.
 * 
 * @returns The boolean value of the input.
 */
export function getBoolean(
  key : string,
  getInput : (name : string) => string = actionsCore.getInput
) : boolean {
  const trueValue = ['true', 'True', 'TRUE', 'yes', 'Yes', 'YES'];

  return trueValue.includes(getInput(key));
}
