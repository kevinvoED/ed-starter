 module.exports = function (plop) {
  plop.setGenerator('create-schema', {
    description: 'Create a Sanity Schema',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Insert schema',
        validate(answer) {
          const bannedWords = ['schema'].includes(answer.toLowerCase());

          const noS = answer.toLowerCase().at(-1) === 's';

          if (bannedWords) {
            return 'You cannot use the word "schema" in your name.';
          }

          if (noS) {
            return 'You cannot end your schema with an "s" or use plurals.';
          }

          return true;
        },
      },
      {
        type: 'list',
        name: 'type',
        message: 'Is this a document or object?',
        choices: [
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
    actions: function (data) {
      return [
        "Don't Forget! Modify '/sanity/schema/index.ts'",
        "Don't Forget! Modify '/sanity.config.ts'",
        {
          type: 'add',
          path: 'sanity/schema/{{camelCase name}}.ts',
          templateFile: '.plop/sanity-schema-{{type}}.ts.hbs',
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
          const bannedWords = ['component'].includes(answer.toLowerCase());

          const noS = answer.toLowerCase().at(-1) === 's';

          if (bannedWords) {
            return 'You cannot use the word "component" in your name.';
          }

          if (noS) {
            return 'You cannot end your component with an "s" or use plurals.';
          }

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
