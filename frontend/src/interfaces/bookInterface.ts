export interface book {
  id?: string;
  title: string;
  author: string;
  description: string;
  price: number;
  quantity: number;
  availability?: boolean;
}

export interface borrowBook {
  id?: string;
  userId: string;
  bookId: string;
  bookTitle: string;
  borrowedDate?: string;
  dueDate?: string;
  returnedDate?: string;
  price: number;
  fine?: number;
  returned?: boolean;
  createdAt?: string;
}
