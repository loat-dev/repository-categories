
/**
 * This function takes an object with functions as values and returns a new object
 * with the same keys but the values are the results of calling the corresponding functions.
 *
 * @param functionObject An object with functions as values
 * @returns A new object with the same keys but the values are the results of calling the corresponding functions.
 */
export function getValuesFromInputs<
  ObjectType extends { [key : string] : () => unknown }
>(functionObject: ObjectType) : { [Key in keyof ObjectType] : ReturnType<ObjectType[Key]> } {
  return Object.fromEntries(
    Object.entries(functionObject).map(([key, fn]) => [key, fn()])
  ) as { [Key in keyof ObjectType] : ReturnType<ObjectType[Key]> };
}
