const User = require('../service/user')

exports.check = async (req, res, next) => {
  const { username, nickname } = req.query
  let user
  if (username) { // 校验用户名是否存在
    user = await User.findByUsername(username)
  } else if (nickname) { // 校验昵称是否存在
    user = await User.findByNickname(nickname)
  }
  res.status(200).send(user ? false : true)
}
