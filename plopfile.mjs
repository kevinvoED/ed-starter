/**
 * Plop is a small tool that gives you a simple way to generate code or any
 * other type of flat text files in a consistent way.
 *
 * @see https://plopjs.com/documentation/#getting-started
 **/
export default function (
  /** @type {import('plop').NodePlopAPI} */
  plop,
) {
  // Generating a new module
  plop.setGenerator('New module', {
    description:
      'Generate a new Sanity schema + Frontend component file for this new module.',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message:
          'What is the name of the module? Spaces included (e.g. "Hero Primary"):',
        validate(answer) {
          // Ban words if they include 'component' or 'module'
          const bannedWords = ['component', 'module'].some((word) =>
            answer.toLowerCase().includes(word),
          );
          if (bannedWords) {
            return 'You cannot use the word `component` or `module` in your name.';
          }

          // Ban reserved or common words
          const reservedWords = [
            'component',
            'module',
            'react',
            'fragment',
            'usestate',
            'useeffect',
            'props',
            'jsx',
            'html',
            'css',
            'dom',
            'window',
            'document',
            'element',
            'function',
            'class',
            'const',
            'let',
            'var',
            'import',
            'export',
          ];

          const containsReservedWord = reservedWords.some((word) =>
            answer.toLowerCase().includes(word),
          );
          if (containsReservedWord) {
            return `Component name cannot contain the following reserved word: ${reservedWords.find((word) => answer.toLowerCase().includes(word))}.`;
          }

          // Ban numbers only
          const isOnlyNumbers = /^\d+$/.test(answer);
          if (isOnlyNumbers) {
            return 'Component name cannot be only numbers.';
          }

          // Ban pluralized names
          const noS = answer.toLowerCase().at(-1) === 's';
          if (noS) {
            return 'You cannot end your component with an `s` or use plurals.';
          }

          // Ban names that are too long
          if (answer.length > 30) {
            return 'Component name is too long. Keep it under 30 characters.';
          }

          return true;
        },
      },
    ],
    actions: function () {
      return [
        "DON'T FORGET: Add your new schema to `studio/src/schemas/schema.ts`",
        "DON'T FORGET: Add your new component to `frontend/components/ModuleBuilder.tsx`",
        "DON'T FORGET: Create a new query in `frontend/sanity/queries/queries.ts`",
        {
          type: 'add',
          path: 'frontend/components/{{pascalCase name}}/{{pascalCase name}}.tsx',
          templateFile: 'plop/component.tsx.hbs',
        },
        {
          type: 'add',
          path: 'studio/src/schemas/modules/{{camelCase name}}.ts',
          templateFile: 'plop/sanity-object-schema.ts.hbs',
        },
      ];
    },
  });

  // Generating a Sanity schema
  plop.setGenerator('New schema ', {
    description: 'Generate only a new Sanity schema file.',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Name of the schema: ',
        validate(answer) {
          // Ban words if they include 'component' or 'module'
          const bannedWords = ['component', 'module'].some((word) =>
            answer.toLowerCase().includes(word),
          );
          if (bannedWords) {
            return 'You cannot use the word `component` or `module` in your name.';
          }

          // Ban reserved or common words
          const reservedWords = [
            'component',
            'module',
            'react',
            'fragment',
            'usestate',
            'useeffect',
            'props',
            'jsx',
            'html',
            'css',
            'dom',
            'document',
            'element',
            'function',
            'class',
            'const',
            'let',
            'var',
            'import',
            'export',
          ];

          const containsReservedWord = reservedWords.some((word) =>
            answer.toLowerCase().includes(word),
          );
          if (containsReservedWord) {
            return `Component name cannot contain the following reserved word: ${reservedWords.find((word) => answer.toLowerCase().includes(word))}.`;
          }

          // Ban numbers only
          const isOnlyNumbers = /^\d+$/.test(answer);
          if (isOnlyNumbers) {
            return 'Component name cannot be only numbers.';
          }

          // Ban pluralized names
          const noS = answer.toLowerCase().at(-1) === 's';
          if (noS) {
            return 'You cannot end your component with an `s` or use plurals.';
          }

          // Ban names that are too long
          if (answer.length > 30) {
            return 'Component name is too long. Keep it under 30 characters.';
          }

          return true;
        },
      },
      {
        type: 'list',
        name: 'type',
        message: 'Is this a module, object, document, or page?',
        choices: [
          {
            name: 'Module',
            value: 'module',
          },
          {
            name: 'Object',
            value: 'object',
          },
          {
            name: 'Document',
            value: 'document',
          },
          {
            name: 'Page',
            value: 'page',
          },
        ],
      },
    ],

    actions: (data) => {
      if (data.type === 'module') {
        return [
          "DON'T FORGET: Add your new schema to `studio/src/schemas/schema.ts`",
          {
            type: 'add',
            path: 'studio/src/schemas/{{type}}s/{{camelCase name}}.ts',
            templateFile: 'plop/sanity-object-schema.ts.hbs',
          },
        ];
      }

      if (data.type === 'page') {
        return [
          "DON'T FORGET: Add your new schema to `studio/src/schemas/schema.ts`",
          {
            type: 'add',
            path: 'studio/src/schemas/{{type}}s/{{camelCase name}}.ts',
            templateFile: 'plop/sanity-{{type}}-schema.ts.hbs',
          },
        ];
      }

      if (data.type === 'document') {
        return [
          "DON'T FORGET: Add your new schema to `studio/src/schemas/schema.ts`",
          {
            type: 'add',
            path: 'studio/src/schemas/{{type}}s/{{camelCase name}}.ts',
            templateFile: 'plop/sanity-{{type}}-schema.ts.hbs',
          },
        ];
      }

      if (data.type === 'object') {
        return [
          "DON'T FORGET: Add your new schema to `studio/src/schemas/schema.ts`",
          {
            type: 'add',
            path: 'studio/src/schemas/{{type}}s/{{camelCase name}}.ts',
            templateFile: 'plop/sanity-{{type}}-schema.ts.hbs',
          },
        ];
      }

      return [
        "DON'T FORGET: Add your new schema to `studio/src/schemas/schema.ts`",
        {
          type: 'add',
          path: 'studio/src/schemas/{{camelCase name}}.ts',
          templateFile: 'plop/sanity-object-schema.ts.hbs',
        },
      ];
    },
  });
}
