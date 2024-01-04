import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

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

export interface DB {
  categories: Categories;
  products: Products;
}
