import Axios from 'axios'

// TODO: 서버 실행 안 했을 때 통신 네트워크 에러 났을 때 화면 처리
export const api = Axios.create({
  baseURL: 'http://localhost:3001/api',
  withCredentials: true,
})
