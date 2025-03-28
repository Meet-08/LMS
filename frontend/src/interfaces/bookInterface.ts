export interface book {
  _id?: string;
  title: string;
  author: string;
  description: number;
  price: number;
  quantity: number;
  availability?: boolean;
}

export interface borrowBook {
  userId: string;
  bookId: string;
  price: number;
  fine?: number;
}
