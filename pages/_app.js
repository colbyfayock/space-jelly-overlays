import { ChakraProvider } from '@chakra-ui/core';
import theme from '@theme';
import { DefaultSeo } from 'next-seo';

import '@styles/global.scss';

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <DefaultSeo
        title="Space Jelly Overlays"
        description="My super cool streaming overlays!"
        url="https://www.colbyfayock.com"
        ogImage={{
          url: 'www.whatever.com',
          title: 'OG Image title',
          description: 'Describe the OG image',
          image: ``,
          siteName: 'Your site name',
        }}
        twitter={{
          handle: '@colbyfayock',
          site: 'https://twitter.com/colbyfayock',
        }}
      />
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
