type ModuleTypes = {
	type: string;
	to?: {
		type: string;
	}[];
};

// Relational module types; typically includes a list of pages
export const relationTypes: ModuleTypes[] = [{ type: "page" }];

// List of all the modules that can be found in the module builder
export const moduleTypes: ModuleTypes[] = [{ type: "heroPrimary" }];

export const moduleGroups = [
	{
		name: "red",
		of: ["heroPrimary"],
	},
];

// Create a separate list of modules if you require a specific subset of modules below
