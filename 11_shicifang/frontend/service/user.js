const request = require('../utils/request')

exports.findByNickname = async (nickname) => {
  const { data } = await request({
    url: '/users',
    method: 'GET',
    params: {
      nickname
    }
  })
  return data[0]
}

exports.findById = async (userId) => {
  const { data } = await request({
    url: `/users/${userId}`,
    method: 'GET'
  })
  return data
} 

exports.findByUsername = async (username) => {
  const { data } = await request({
    url: '/users',
    method: 'GET',
    params: {
      username
    }
  })
  return data[0]
}

exports.signin = async (user) => {
  const { data } = await request({
    url: '/users/signin',
    method: 'POST',
    data: {
      email: user.email,
      password: user.password
    }
  })
  return data
}

exports.signup = async (user) => {
  const { data } = await request({
    url: '/users/signup',
    method: 'POST',
    data: {
      email: user.email,
      password: user.password,
      nickname: user.nickname
    }
  })
  return data
}

exports.create = async (user) => {
  const { data } = await request({
    url: '/users',
    method: 'POST',
    data: {
      username: user.username,
      password: user.password,
      nickname: user.nickname
    }
  })
  return data
}
