// 登录登出接口
import instance from '@/http/index.js'

/**
 * 注册接口
 * @param {Object} data - 注册参数
 * @param {number} data.account - 账号
 * @param {string} data.password - 密码
 * @returns {Promise} 请求Promise对象
 */
export const register = (data) => {
  // 参数校验，避免空值提交
  if (!data?.account || !data?.password) {
    return Promise.reject(new Error('账号和密码不能为空'));
  }
  
  const { account, password } = data;
  return instance({
    url: '/register',
    method: 'POST',
    data: {
      account,
      password
    }
  });
};

/**
 * 登录接口
 * @param {Object} data - 登录参数
 * @param {number} data.account - 账号
 * @param {string} data.password - 密码
 * @returns {Promise} 请求Promise对象
 */
export const login = (data) => {
  // 参数校验
  if (!data?.account || !data?.password) {
    return Promise.reject(new Error('账号和密码不能为空'));
  }
  
  const { account, password } = data;
  return instance({
    url: '/login',
    method: 'POST',
    data: {
      account,
      password
    }
  });
};

/**
 * 检查账号是否存在接口
 * @param {Object} data - 检查参数
 * @param {number} data.account - 要检查的账号
 * @returns {Promise} 请求Promise对象
 */
export const checkAccountExists = (data) => {
  // 参数校验
  if (!data?.account) {
    return Promise.reject(new Error('请输入要检查的账号'));
  }
  
  const { account } = data;
  return instance({
    url: '/checkAccountExists', // 替换为后端实际的检查账号接口地址
    method: 'POST', // 也可根据后端要求改为GET（如 /checkAccountExists?account=xxx）
    data: {
      account
    }
  });
};

/**
 * 退出登录接口
 * @returns {Promise} 请求Promise对象
 */
export const logout = () => {
  return instance({
    url: '/logout',
    method: 'POST'
  });
};

/**
 * 验证账号接口（忘记密码第一步）
 * @param {Object} data - 验证账号参数
 * @param {number} data.account - 注册账号
 * @returns {Promise} 请求Promise对象
 */
export const verifyAccount = (data) => {
  // 参数校验，避免空值提交
  if (!data?.account) {
    return Promise.reject(new Error('请输入注册账号'));
  }
  
  const { account } = data;
  return instance({
    url: '/verifyAccount', // 对应后端接口地址
    method: 'POST',
    data: {
      account
    }
  });
};

/**
 * 重置密码接口（忘记密码第二步）
 * @param {Object} data - 重置密码参数
 * @param {number} data.id - 用户ID
 * @param {string} data.password - 新密码
 * @returns {Promise} 请求Promise对象
 */
export const resetPassword = (data) => {
  // 参数校验，避免空值提交
  if (!data?.id || !data?.password) {
    return Promise.reject(new Error('参数不完整'));
  }
  
  const { id, password } = data;
  return instance({
    url: '/resetPassword', // 对应后端接口地址
    method: 'POST',
    data: {
      id,
      password
    }
  });
};