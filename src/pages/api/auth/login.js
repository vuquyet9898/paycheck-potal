import axios from 'axios'
import { LOGIN } from 'constants/request'

const login = (params) => axios.post(`http://159.223.75.67${LOGIN}`, params)

// const guest = () => axios.post(AUTH_USER_GUEST);

const LoginApi = {
  login,
  // guest
}

export default LoginApi
