import { Categories } from '../categories.ts';
import { type TemplateFiles } from './template_files.ts';

/**
 * This interface represents the raw file content of the YAML file config.
 */
export interface RawContents {
  /** If only public repositories should be queried. Private repositories will be ignored. */
  onlyPublicRepositories? : boolean,

  /** Template files to use for the categories. */
  templateFiles? : TemplateFiles

  /**
   * The category regex search pattern to use when searching for category labels in the repositories. Specify the
   * categories as comma separated values in the label description.
   */
  labelSearchPattern? : string,

  /** List of repository names to blacklist. */
  repositoryBlacklist? : string[],

  /** Mappings between the category IDs and the category names. */
  categories? : Categories
}
