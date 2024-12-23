import { AuthApi, Configuration } from './generated'

const config = new Configuration({
  basePath: import.meta.env.VITE_API_BASE_URL,
  baseOptions: {
    withCredentials: true,
  },
})

export const authApi = new AuthApi(config)
