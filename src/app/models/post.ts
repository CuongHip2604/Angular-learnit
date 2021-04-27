import { User } from './user';

export interface Post {
  _id: string;
  user: User;
  url: string;
  title: string;
  status: string;
  description: string;
  __v: number;
}
