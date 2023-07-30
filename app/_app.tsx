import AuthProvider from '@/contexts/AuthContext';
import type { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <AuthProvider>
    <Component {...pageProps} />
  </AuthProvider>
);

export default MyApp;
