const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 10373;

const birds = require('../router/birds');

// 中间件
app.use('/birds', birds);
// 解析post的两个中间件
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// 解析静态资源的中间件
app.use(express.static('public'))

app.use('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/', (req, res) => {
  // 使用读文件的方法给客户端页面
  const html = fs.readFileSync('../../index.html', 'utf-8')
  res.end(html)
})

app.get('/count', (req, res) => {
  fs.readFile('../data/home.json', function (err, data) {
    const _ = JSON.parse(data.toString());
    res.send(_);
  })
})

app.post('/list', (req, res) => {
  const {count} = req.body;
  fs.readFile('../data/home.json', function (err, data) {
    const reqData = data.toString();
    const _ = JSON.parse(reqData);
    fs.writeFileSync('../data/home.json', JSON.stringify({
      ..._,
      count
    }));
    res.send({
      count
    });
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
