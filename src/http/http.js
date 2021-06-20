// 引入 axios
import axios from 'axios'

// 配置 axios 默认信息
axios.defaults.baseURL = 'http://localhost:3000'

// 配置超时时间
axios.defaults.timeout = 30000

// 导出
export default axios;