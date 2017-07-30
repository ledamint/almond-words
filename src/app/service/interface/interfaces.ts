// TODO divide interfaces

// TODO make necessary properties after change login service
export interface LoginData {
  email?: string;
  password?: string;
}

export interface RegistrationData {
  email: string;
  password: string;
  learningLanguage: string;
  familiarLanguage: string;
}

export interface User {
  _id: string;
  email: string;
  password: string;
  activeBoard: number;
  registrationTime: Date;
  boards: Board[];
  activeOptions: ActiveOptions;
}

export interface Board {
  learningLanguage: string;
  familiarLanguage: string;
  words: Word[];
}

export interface Word {
  _id: string;
  learningWord: string;
  familiarWord: string;
  time: Date;
  knowledge: number;
}

export interface ActiveOptions {
  sort: string;
  filter: ActiveFilter;
}

export interface ActiveFilter {
  knowledge: KnowledgeFilter[];
}

export interface Options {
  sorts: Sort[];
  filter: Filter;
}

export interface Sort {
  name: string;
  value: string;
}

export interface Filter {
  knowledge: KnowledgeFilter[];
}

export interface KnowledgeFilter {
  name: string;
  value: number[];
}
