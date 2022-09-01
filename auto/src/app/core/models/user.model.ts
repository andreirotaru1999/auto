import { Test } from './test.model';
export interface User {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    role?: string;
    tests?: Test[];
  }
  