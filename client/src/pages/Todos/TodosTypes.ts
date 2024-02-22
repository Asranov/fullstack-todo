export interface ITodo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface ITodoResponse {
  completed: boolean;
  createdAt: string;
  description: string;
  title: string;
  updatedAt: string;
  __v: number;
  _id: string;
}
