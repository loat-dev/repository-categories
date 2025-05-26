export interface Config {
  token: string;
  organizationName: string;
  onlyPublicRepositories: boolean;
  labelSearchPattern: string;
  templateFiles: string[];
}
