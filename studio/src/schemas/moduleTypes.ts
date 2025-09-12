type ModuleTypes = {
  type: string;
  to?: {
    type: string;
  }[];
};

// Relational module types; typically includes a list of pages
export const relationTypes: ModuleTypes[] = [{ type: 'page' }];

// List of all the modules that can be found in the module builder
export const moduleTypes: ModuleTypes[] = [
  { type: 'callToAction' },
  { type: 'infoSection' },
];

// Create a separate list of modules if you require a specific subset of modules below
