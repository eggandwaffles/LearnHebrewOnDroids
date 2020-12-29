import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          TabOne: {
            screens: {
              TabOneScreen: 'one',
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: 'two',
            },
          },
		  TabThree: {
            screens: {
              TabThreeScreen: 'three',
            },
          },
		  TabFour: {
            screens: {
              TabFourScreen: 'four',
            },
          },
		  LetterGame: {
            screens: {
              LetterGame: 'LetterGame',
            },
          },
      VowelGame: {
        screens: {
          VowelGame: 'VowelGame',
        },
      },
      WordGameLit: {
        screens: {
          VowelGame: 'WordGameLit',
        },
      },
        },
      },
      NotFound: '*',
    },
  },
};
