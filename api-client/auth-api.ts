import $http from '@/api-client/http-wrapper';

const BASE_URL = '/auth';

export const authApi = {
  login: async (loginRequest: any) => {
    return $http.post(`${BASE_URL}/login`, loginRequest);
  },
};
