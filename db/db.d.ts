import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export interface AuthUser {
  id: string;
  username: string;
}

export interface Categories {
  id: Generated<number>;
  name: string;
}

export interface Products {
  category_id: number | null;
  id: Generated<number>;
  image_url: string | null;
  name: string;
}

export interface UserKey {
  hashed_password: string | null;
  id: string;
  user_id: string;
}

export interface UserSession {
  active_expires: number;
  id: string;
  idle_expires: number;
  user_id: string;
}

export interface DB {
  auth_user: AuthUser;
  categories: Categories;
  products: Products;
  user_key: UserKey;
  user_session: UserSession;
}
