export interface ICreateReviewPayload {
  rating: number;
  comment?: string;
  productId: string;
}

export interface IUpdateReviewPayload {
  rating?: number;
  comment?: string;
}
