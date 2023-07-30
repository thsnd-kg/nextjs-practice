'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface UserLogin {
  username: string;
  password: string;
}

export const LoginForm: React.FC = (props) => {
  const router = useRouter();
  const { login } = useAuth();
  // const { login } = props;

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event: any) => {
    event.preventDefault();

    console.log('chec');
    await login(username, password);
    console.log('2');
  };

  return (
    <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
      <form className='space-y-6' action='#' method='POST'>
        <div>
          <label
            htmlFor='username'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Username
          </label>
          <div className='mt-2'>
            <input
              value={username}
              onChange={handleUsernameChange}
              id='username'
              name='username'
              type='username'
              required
              className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
          </div>
        </div>

        <div>
          <div className='flex items-center justify-between'>
            <label
              htmlFor='password'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Password
            </label>
            <div className='text-sm'>
              <a
                href='#'
                className='font-semibold text-indigo-600 hover:text-indigo-500'
              >
                Forgot password?
              </a>
            </div>
          </div>
          <div className='mt-2'>
            <input
              value={password}
              onChange={handlePasswordChange}
              id='password'
              name='password'
              type='password'
              autoComplete='current-password'
              required
              className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
          </div>
        </div>

        <div>
          <button
            onClick={handleLogin}
            className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};
