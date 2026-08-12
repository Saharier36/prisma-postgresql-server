export interface ICreateProductPayload {
  name: string;
  description?: string;
  price: number;
  stock?: number;
  categoryId: string;
}

export interface IUpdateProductPayload {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  categoryId?: string;
}
