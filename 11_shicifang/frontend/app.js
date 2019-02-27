const express = require('express')
const nunjucks = require('nunjucks')
const session = require('express-session')
const path = require('path')
const cookieParser = require('cookie-parser')
const rememberMe = require('./middleware/remember-me')
const router = require('./router/')
const questionRouter = require('./router/question')
const commentRouter = require('./router/comment')
const voteRouter = require('./router/vote')

const dayjs = require('dayjs')
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
require('dayjs/locale/zh-cn') // 按需加载
dayjs.locale('zh-cn') // 全局使用西班牙语

const md = require('markdown-it')()

const app = express()

// 配置解析 Cookie 的中间件
app.use(cookieParser())

// 配置 Session 中间件
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

// 开放 public 目录资源
app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))

app.use(express.json()) // application/json 格式的数据 {key: value, key: value...}
app.use(express.urlencoded({
  extended: true
})) // application/x-www-form-urlencoded key=value&key=value... jquery默认数据格式

const env = nunjucks.configure(path.join(__dirname, './view/'), {
  autoescape: true,
  express: app,
  watch: true // 启动模板文件监视，文件改变，重新预编译，建议开发阶段开启此功能
})

env.addFilter('relativeTime', function(time) {
  return dayjs().from(dayjs(time))
})

env.addFilter('mdToHtml', function (mdContent) {
  return md.render(mdContent)
})

app.use(rememberMe)

app.use((req, res, next) => {
  // 挂载到 app.locals 中的数据可以直接在模板页中访问
  app.locals.sessionUser = req.session.user
  next()
})

app.use(router)
app.use(questionRouter)
app.use(commentRouter)
app.use(voteRouter)

app.use((err, req, res, next) => {
  const response = err.response
  if (response) {
    res.status(response.status).send(response.data)
  } else {
    res.status(500).send(err)
  }
})

app.listen(3002, () => {
  console.log('服务启动成功.')
  console.log(`http://localhost:3002/`)
})
