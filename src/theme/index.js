import defaultTheme from '@chakra-ui/theme';
import components from './components';

const theme = {
  ...defaultTheme,
  components: {
    ...defaultTheme.components,
    ...components,
  },
  fonts: {
    body: 'Source Sans Pro, sans-serif'
  },
};

export default theme;
