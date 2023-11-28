import { Role } from '@app/api/types';

export type Route = {
  name: string;
  path: string;
  inNav: boolean;
  component: JSX.Element;
  roles: Role[] | null;
  isPrivate: boolean;
  index?: boolean;
};
