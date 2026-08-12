export interface IOrderItemPayload {
  productId: string;
  quantity: number;
}

export interface ICreateOrderPayload {
  items: IOrderItemPayload[];
}

export interface IUpdateOrderStatusPayload {
  status: "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED";
}
