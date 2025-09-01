
/** This interface represents the mappings between the category IDs and the category names. */
export interface Categories {
  /** Default category to use if no category is found. */
  ''? : string,
  
  /** Mapping from the category ID to the category name. */
  [id : string] : string | undefined
}
