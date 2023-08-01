'use client';
import { authApi, setAuthorizationByAccessToken } from '@/api-client';
import Loading from '@/app/loading';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextModel {
  isAuthenticated: boolean;
  user: UserInfo | undefined;
  login: (username: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextModel>({
  isAuthenticated: false,
  user: undefined,
  login: async () => {},
});

type UserInfo = {
  username: string;
  role: string;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

type ProtectRouteProps = {
  children: React.ReactNode;
};

const ACCESS_TOKEN_STORAGE_KEY = 'accessToken';
const getAccessToken = (): string | null =>
  localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
const storeAccessToken = (accessToken: string) =>
  localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);

const AuthProvider = ({ children }: AuthProviderProps) => {
  console.log('AuthProvider is mounted');
  const [user, setUser] = useState<UserInfo | undefined>();
  const [accessToken, setAccessToken] = useState<string | null>();

  const router = useRouter();

  useEffect(() => {
    const token = getAccessToken();
    if (!token) return;

    setAccessToken(token);
    setAuthorizationByAccessToken(token);
  }, []);

  const login = async (username: string, password: string): Promise<void> => {
    const { data } = await authApi.login({ username, password });
    console.log(data);
    // $http.defaults.headers.Authorization = `Bearer ${data.accessToken}`;
    setUser({
      username: data.username,
      role: data.role,
    });

    setAuthorizationByAccessToken(data.accessToken);
    storeAccessToken(data.accessToken);

    router.push('/');
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!accessToken, user, login }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

const ProtectRoute = ({ children }: ProtectRouteProps) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const pathName = usePathname();

  if (!isAuthenticated && pathName !== '/login') {
    router.push('/login');
    return <Loading />;
  }

  return children;
};

export { AuthProvider, ProtectRoute, useAuth };
