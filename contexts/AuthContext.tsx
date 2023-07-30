import { authApi } from '@/api-client';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useState } from 'react';

interface AuthContextModel {
  // isAuthenticated: boolean;
  // user: UserInfo | null;
  login: (username: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextModel>({
  // isAuthenticated: false,
  // user: null,
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

const AuthProvider = ({ children }: AuthProviderProps) => {
  console.log('AuthProvider is mounted');
  // const [user, setUser] = useState<UserInfo | undefined>(null);

  const login = async (username: string, password: string): Promise<void> => {
    console.log('Logging in user', username, password);
    console.log('ok');

    // const { data } = await authApi.login({ username, password });

    // console.log(data);

    // $http.defaults.headers.Authorization = `Bearer ${data.accessToken}`;

    // console.log('Got user', user);
  };

  return (
    <AuthContext.Provider value={{ login }}>{children}</AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
// export const ProtectRoute = ({ children }: ProtectRouteProps) => {
//   console.log('protect');
//   const { isAuthenticated } = useAuth();
//   console.log(isAuthenticated);

//   const router = useRouter();

//   if (!isAuthenticated) {
//     router.push('/login');
//   }

//   return children;
// };

export { AuthProvider, useAuth };
