 module.exports = function (plop) {
  // Constants
  const BANNED_WORDS = ['schema', 'component'];

  const MODULE_SCHEMA_CATEGORIES = [
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
  ].sort((a, b) => a.name.localeCompare(b.name));



  // Helper functions
  const checkForBannedWords = (answer) => {
    return BANNED_WORDS.some(word => answer.toLowerCase().includes(word.toLowerCase()));
  };

  const checkForPluralEnding = (word) => {
    const lastWord = word.trim().split(/\s+/).pop();
    return lastWord?.toLowerCase().at(-1) === 's';
  };



  plop.setGenerator('Add new module', {
    description: 'Add a new Sanity Schema + GROQ query + Component file.',
    prompts: [
      {
        type: 'input',
        name: 'name',
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
        type: 'list',
        name: 'category',
        message: 'What category does this schema fit into?',
        choices: MODULE_SCHEMA_CATEGORIES,
      },
    ],
    actions: function (data) {
      return [
        ">>> REMEMBER TO UPDATE: 'studio/schema.ts'",
        ">>> REMEMBER TO UPDATE: 'studio/moduleTypes.ts'",
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

  plop.setGenerator('create-component', {
    description: 'Next Component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Insert component',
        validate(answer) {
          const hasBannedWord = checkForBannedWords(answer);
          const hasPluralEnding = checkForPluralEnding(answer);

          if (hasBannedWord) return 'You cannot use the word "schema" in your name.';
          if (hasPluralEnding) return 'You cannot end your schema with an "s" or use plurals.';

          return true;
        },
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'components/{{pascalCase name}}/index.tsx',
        templateFile: 'plop-templates/component.tsx.hbs',
      },
      {
        type: 'add',
        path: '__tests__/components/{{pascalCase name}}/{{pascalCase name}}.snapshot.test.tsx',
        templateFile: 'plop-templates/component-snapshot-test.tsx.hbs',
      },
    ],
  });
};
