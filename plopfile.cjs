 module.exports = function (plop) {
  // Constants
  const BANNED_WORDS = ['schema', 'component'];

  // Helper functions
  plop.setHelper('eq', (a, b) => a === b);

  const checkForBannedWords = (answer) => {
    return BANNED_WORDS.some(word => answer.toLowerCase().includes(word.toLowerCase()));
  };

  const checkForPluralEnding = (word) => {
    const lastWord = word.trim().split(/\s+/).pop();
    return lastWord?.toLowerCase().at(-1) === 's';
  };

  // Plop generators
  plop.setGenerator('Add New Module', {
    description: '(Sanity Schema + GROQ query + Component files)',
    prompts: [
      {
        name: 'name',
        type: 'input',
        message: 'Name of schema? Spaces are allowed and respected. (e.g. Hero Primary, Card Grid, etc.)',
        validate(answer) {
          const hasBannedWord = checkForBannedWords(answer);
          const hasPluralEnding = checkForPluralEnding(answer);

          if (hasBannedWord) return 'You cannot use the word "schema" in your name.';
          if (hasPluralEnding) return 'You cannot end your schema with an "s" or use plurals.';

          return true;
        },
      },
      {
        name: 'category',
        type: 'list',
        message: 'What category does this schema fit into?',
        choices: [
          {
            name: 'Hero',
            value: 'hero',
          },
          {
            name: 'Card',
            value: 'card',
          },
          {
            name: 'Driver',
            value: 'driver',
          },
          {
            name: 'List',
            value: 'list',
          },
          {
            name: 'Image',
            value: 'image',
          },
          {
            name: 'Table',
            value: 'table',
          },
          {
            name: 'Text',
            value: 'text',
          },
          {
            name: 'Miscellaneous',
            value: 'miscellaneous',
          },
        ].sort((a, b) => a.name.localeCompare(b.name))
      },
    ],
    actions: function () {
      return [
        ">>> REMEMBER TO UPDATE: 'studio/schemas/schema.ts'",
        ">>> REMEMBER TO UPDATE: 'studio/schemas/moduleTypes.ts'",
        ">>> REMEMBER TO UPDATE: 'frontend/sanity/queries/queries.ts'",
        ">>> REMEMBER TO UPDATE: 'frontend/components/ModuleBuilder.tsx'",
        {
          type: 'add',
          path: 'studio/schemas/modules/{{lowerCase category}}/{{kebabCase name}}.ts',
          templateFile: '.plop/sanity-schema-module.ts.hbs',
        },
        {
          type: 'add',
          path: 'frontend/sanity/queries/modules/{{lowerCase category}}/{{kebabCase name}}.ts',
          templateFile: '.plop/sanity-schema-query.ts.hbs',
        },
        {
          type: 'add',
          path: 'frontend/components/modules/{{pascalCase category}}/{{pascalCase name}}.tsx',
          templateFile: '.plop/sanity-schema-component.tsx.hbs',
        },
      ];
    },
  });

  plop.setGenerator('Add Sanity Schema', {
    description: '(Documents & Object).',
    prompts: [
      {
        name: 'name',
        type: 'input',
        message: 'Name of schema? Spaces are allowed and respected. (e.g. Author, Configuration, etc.)',
        validate(answer) {
          const hasBannedWord = checkForBannedWords(answer);
          const hasPluralEnding = checkForPluralEnding(answer);

          if (hasBannedWord) return 'You cannot use the word "schema" in your name.';
          if (hasPluralEnding) return 'You cannot end your schema with an "s" or use plurals.';

          return true;
        },
      },
      {
        name: 'type',
        type: 'list',
        message: 'What type of schema do you want to add?',
        choices: [
          {
            name: 'document',
            value: 'document',
          },
          {
            name: 'object',
            value: 'object',
          },
        ].sort((a, b) => a.name.localeCompare(b.name))
      },
    ],
    actions: function () {
      return [
        ">>> REMEMBER TO UPDATE: 'studio/schemas/schema.ts'",
        ">>> REMEMBER TO UPDATE: 'studio/lib/structure.ts'",
        ">>> REMEMBER TO UPDATE: 'frontend/sanity/queries/queries.ts'",
        ">>> REMEMBER TO UPDATE: 'frontend/sanity/lib/fetch.ts'",
        ">>> REMEMBER TO MOVE THE COMPONENT FILE TO THE CORRECT FOLDER: 'frontend/components'",
        {
          type: 'add',
          path: 'studio/schemas/{{lowerCase type}}s/{{kebabCase name}}.ts',
          templateFile: '.plop/sanity-schema-{{lowerCase type}}.ts.hbs',
        },
        {
          type: 'add',
          path: 'frontend/sanity/queries/documents/{{kebabCase name}}.ts',
          templateFile: '.plop/sanity-schema-query{{#if (eq type "document")}}-document{{/if}}.ts.hbs',
        },
        {
          type: 'add',
          path: 'frontend/components/{{pascalCase name}}.tsx',
          templateFile: '.plop/sanity-schema-component.tsx.hbs',
        },
      ];
    },
  });
};
