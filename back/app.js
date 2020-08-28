// 모듈
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// 시퀄라이즈 모델 로드
const models = require('./src/db/models');
// 라우터 로드
const accountRouter = require('./routes/account');
// const feedRouter = require('./routes/feed');

dotenv.config();
const app = express();
// 시퀄라이즈 모델 동기화
models.sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    console.log('⭕️ DB연결 성공');
  })
  .catch((err) => {
    console.log(err);
    console.log('❌ DB연결 실패');
  });

if (process.env.NODE_ENV === 'production') {
  // app.use(cors({
  //   origin: '실 도메인',
  //   credentials: true,
} else {
  app.use(
    cors({
      origin: true,
      credentials: true,
    }),
  );
}

app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
app.use('/', express.static(path.resolve(__dirname, 'uploads')));
app.use(express.json());

app.get('/favicon.ico', (req, res) => res.status(204));
app.get('/', (req, res) => {
  console.log(req.headers);
  res.send('hello egg-sns-app');
});

// 라우터 연결
app.use('/account', accountRouter);
// app.use('/feed', feedRouter);

app.listen(3030, () => {
  console.log(`📌 서버실행중 🟢 http://localhost:3030`);
});
