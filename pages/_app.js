import Head from 'next/head';
import 'styles/globals.css';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>{pageProps.metaTitle ?? 'Yachting Offers - Sale and rent'}</title>
        <meta
          name="description"
          content={pageProps.metaDescription ?? 'Search for yachts, rent and sale them'}
        />
      </Head>
      <Component {...pageProps} />;
    </SessionProvider>
  );
}

export default MyApp;
