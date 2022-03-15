import LayoutWithHeader from 'components/LayoutWithHeader';
import { SessionProvider } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';
import 'styles/globals.scss';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    // `session` comes from `getServerSideProps` or `getInitialProps`.
    // Avoids flickering/session loading on first load.
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <LayoutWithHeader>
        <Component {...pageProps} />
      </LayoutWithHeader>
    </SessionProvider>
  );
}
