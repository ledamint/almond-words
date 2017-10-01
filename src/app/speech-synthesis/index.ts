declare const ya: any;

const tts = new ya.speechkit.Tts(
  {
    apikey: '368dcc58-c82e-4173-8c82-587f27c883b9',
    lang: 'en-US',
    emotion: 'neutral',
    speed: 1,
    speaker: 'jane'
  }
);

export default tts;
