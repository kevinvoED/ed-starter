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
  // Generating a new component
  plop.setGenerator('create-component', {
    description: 'Generate a component template file to `frontend/components`.',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Generate component',
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
    actions: [
      {
        type: 'add',
        path: 'frontend/components/{{pascalCase name}}/index.tsx',
        templateFile: 'plop/component.tsx.hbs',
      },
    ],
  });

  // Generating a new page
  plop.setGenerator('create-page', {
    description: 'Generate a page template file to `frontend/app/(site)`.',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Generate page name',
      },
      {
        type: 'list',
        name: 'routing',
        message: 'Is your route dynamic?',
        choices: [
          { name: 'Dynamic - use [slug] route', value: 'dynamic' },
          { name: 'Normal - use named route', value: 'normal' },
        ],
      },
    ],
    actions: (data) => {
      if (data.routing === 'normal') {
        return [
          {
            type: 'add',
            path: 'frontend/app/(site)/{{dashCase name}}/page.tsx',
            templateFile: 'plop/page.tsx.hbs',
          },
        ];
      }

      return [
        {
          type: 'add',
          path: 'frontend/app/(site)/{{dashCase name}}/[slug]/page.tsx',
          templateFile: 'plop/page-dynamic.tsx.hbs',
        },
      ];
    },
  });

  // Generatin a Sanity schema
  plop.setGenerator('create-schema', {
    description: 'Generate a Sanity schema file to `/studio/src`',
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
        message: 'Is this a page, document, or an object?',
        choices: [
          {
            name: 'Page',
            value: 'page',
          },
          {
            name: 'Document',
            value: 'document',
          },
          {
            name: 'Object',
            value: 'object',
          },
        ],
      },
    ],

    actions: (data) => {
      if (data.type === 'page') {
        return [
          {
            type: 'add',
            path: 'studio/src/schemas/{{type}}s/{{kebabCase name}}.ts',
            templateFile: 'plop/sanity-{{type}}-schema.ts.hbs',
          },
        ];
      }

      if (data.type === 'document') {
        return [
          {
            type: 'add',
            path: 'studio/src/schemas/{{type}}s/{{kebabCase name}}.ts',
            templateFile: 'plop/sanity-{{type}}-schema.ts.hbs',
          },
        ];
      }

      if (data.type === 'object') {
        return [
          {
            type: 'add',
            path: 'studio/src/schemas/{{type}}s/{{kebabCase name}}.ts',
            templateFile: 'plop/sanity-{{type}}-schema.ts.hbs',
          },
        ];
      }

      return [
        {
          type: 'add',
          path: 'studio/src/schemas/{{kebabCase name}}.ts',
          templateFile: 'plop/sanity-object-schema.ts.hbs',
        },
      ];
    },
  });
}
