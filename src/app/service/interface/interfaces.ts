export interface User {
  _id: string;
  email: string;
  password: string;
  activeBoard: number;
  registrationTime: Date;
  boards: Board[];
  options: Options;
}

export interface Board {
  learningLanguage: string;
  familiarLanguage: string;
  words: Word[];
}

export interface Sort {
  name: string;
  value: string;
  isActive: boolean;
}

export interface Options {
  sorts: Sort[];
  filter: Filter;
}

export interface Filter {
  knowledge: Knowledge[];
}

export interface Knowledge {
  name: string;
  value: number[];
  isActive: boolean;
}

export interface Word {
  _id?: string;
  learningWord: string;
  familiarWord: string;
  time?: Date;
  knowledge?: number;
}
