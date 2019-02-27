const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path')

const axios = require('axios');


const app = express();
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))
app.use('/utils/', express.static(path.join(__dirname, './utils/')))


nunjucks.configure(path.join(__dirname, './view/'), {
    autoescape: true,
    express: app,
    watch: true,//启动模板文件监视：文件改变重新预编译（建议开发阶段开启此功能）
});

// app.get('/', function (req, res) {
//     res.render('index.html', {
//         data: lib
//     });
// });


const router = express.Router()

router.get('/',(req,res)=>{
    res.render('index.html')
})


const lib  = require('./utils/lib')

console.log(lib)
// router.get('/login',(req,res)=>{
//     res.status(200).send({
//         lib:new lib()
//     })
// })


app.use(router)


// app.get('/',(req,res,next)=>{
//     res.status(200).send('hello worldfdfd')
// })








// async function getStockPriceByName() {
//     const symbol = await axios.get('http://localhost:8000/api/v1/users?username=1222')
//     console.log(symbol)
//     return symbol;
// }
// getStockPriceByName()



app.listen(3001, () => {
    console.log('服务启动成功')
})