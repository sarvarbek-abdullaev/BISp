import { createMultiStyleConfigHelpers, extendTheme } from '@chakra-ui/react';

import { popoverAnatomy as parts } from '@chakra-ui/anatomy';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);
const baseStyle = definePartsStyle({
  content: {
    padding: 1,
    maxW: '300px',
    w: 'unset',
    bg: 'mainBackground',
  },
});
const popoverTheme = defineMultiStyleConfig({ baseStyle });

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#000',
        color: 'white',
      },
    },
  },
  components: { Popover: popoverTheme },
  colors: {
    white: '#FFFFFF',
    mainBackground: '#202020',
    twilightMeadow: {
      primary: '#50A6A2',
      alt: '#50A6A240',
    },
    bondi: {
      primary: '#166887',
      alt: '#16688759',
    },
    calvary: {
      primary: '#404C5C',
      alt: '#404C5C14',
    },
    exception: {
      primary: '#F2542D',
      alt: '#FE938C',
    },
    notification: {
      primary: '#FEB95F',
      alt: '#FEB95F59',
    },
  },
});

export { theme };
