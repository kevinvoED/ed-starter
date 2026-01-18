import { sortBy } from "es-toolkit";

type ModuleTypes = {
  type: string;
  to?: {
    type: string;
  }[];
};

// Relational module types; typically includes a list of pages
export const relationTypes: ModuleTypes[] = sortBy(
  [{ type: "page" }],
  ["type"],
);

// List of all the modules that can be found in the module builder
export const moduleTypes: ModuleTypes[] = sortBy(
  [{ type: "heroPrimary" }],
  ["type"],
);

export const moduleGroups = sortBy(
  [
    {
      name: "red",
      of: ["heroPrimary"],
    },
  ],
  ["name"],
);

// Create a separate list of modules if you require a specific subset of modules below
