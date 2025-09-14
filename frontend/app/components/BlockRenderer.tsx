import React from 'react';

import Cta from '@/app/components/Cta';
import Info from '@/app/components/InfoSection';

type BlockProps = {
  index: number;
  block: {
    _type: string;
    _key: string;
  };
  pageId: string;
  pageType: string;
};

const Blocks = {
  callToAction: Cta,
  infoSection: Info,
} as const;

export default function BlockRenderer({ block, index }: BlockProps) {
  const blockType = block._type as keyof typeof Blocks;

  if (typeof Blocks[blockType] !== 'undefined') {
    const Component = Blocks[blockType];
    const props = { key: block._key, block, index };

    return (
      <div key={block._key} data-module={block._type}>
        {/* @ts-expect-error - figure out how to type this properly */}
        {React.createElement(Component, props)}
      </div>
    );
  }

  return React.createElement(
    () => (
      <div className="w-full rounded bg-gray-100 p-20 text-center text-gray-500">
        This block either does not exist or is not supported yet.
      </div>
    ),
    { key: block._key },
  );
}
