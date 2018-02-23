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
  learningLanguage: string;
  familiarLanguage: string;
  registrationTime: Date;
  lastLogin: Date;
  activeBoard: number;
  userPoints: UserPoints;
  boards: Board[];
  activeOptions: ActiveOptions;
}

export interface Board {
  words: Word[];
}

export interface Word {
  _id: string;
  learningWord: string;
  familiarWord: string;
  time: Date;
  knowledge: number;
  decreaseTime: DecreaseTime;
}

export interface DecreaseTime {
  datesToNextDecrease: number;
  time: Date;
}

export interface MainApplicationInfo {
  languages: string[];
  recommendedWordsAvailableLangs: string[];
  options: Options;
}

export interface Options {
  sorts: Sort[];
  themes: string[];
  filters: string[];
}

export interface Sort {
  name: string;
  value: string;
}

export interface ActiveOptions {
  sort: string;
  theme: string;
  isBackgroundActive: boolean;
  isWordsOpacityActive: boolean;
  isRecommendedWordsActive: boolean;
  filter: string;
}


export interface RecommendedWord {
  en: string;
  ru: string;
  de: string;
  es: string;
  fr: string;
}


export interface Message {
  text: string;
  isActive?: boolean;
}

export interface UserPoints {
  todayPoints: number;
  todayGoalPoints: number;
  allPoints: number;
}
