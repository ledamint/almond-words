export interface VariantOfAnswer {
  _id?: string;
  learningWord: string;
}

export const defaultAnswers: VariantOfAnswer[] = [
  {
    learningWord: 'example'
  },
  {
    learningWord: 'of'
  },
  {
    learningWord: 'answers'
  }
];
