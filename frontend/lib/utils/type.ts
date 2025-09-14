import type { GetPageQueryResult, Post } from '@/sanity.types';

export type ImageType = Extract<
  NonNullable<NonNullable<Post>['coverImage']>,
  { _type: 'image' }
>;

export type ModuleType = Extract<
  NonNullable<NonNullable<GetPageQueryResult>['modules']>[number],
  { _type: '' }
>;
