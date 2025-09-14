import { createElement } from 'react';

import Cta from '@/components/Cta';
import Info from '@/components/InfoSection';

// Add new modules to the `Blocks` object where the KEY is the name of the schema and the VALUE is the imported component
const Blocks = {
  callToAction: Cta,
  infoSection: Info,
} as const;

export const ModuleBuilder = ({
  block,
}: {
  block: {
    _type: string;
    _key: string;
  };
}) => {
  const blockType = block._type as keyof typeof Blocks;

  if (typeof Blocks[blockType] !== 'undefined') {
    const Component = Blocks[blockType];
    const { _type, _key, ...blockProps } = block;
    const props = { key: _key, ...blockProps };

    return (
      <section key={_key} data-module={_type}>
        {/* @ts-expect-error - figure out how to type this properly */}
        {createElement(Component, props)}
      </section>
    );
  }

  return createElement(
    () => (
      <div className="w-full rounded bg-gray-100 p-20 text-center text-gray-500">
        This block either does not exist or is not supported yet.
      </div>
    ),
    { key: block._key },
  );
};
