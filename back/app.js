// 모듈
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
// 시퀄라이즈 모델 로드
const models = require('./src/db/models');
// 커스텀 미들웨어
const errorHandler = require('./middleware/errorHandler');
// 라우터 로드
const accountRouter = require('./routes/account');
const feedRouter = require('./routes/feed');
const uploadRouter = require('./routes/upload');
const feedsRouter = require('./routes/feeds');
const relationRouter = require('./routes/relation');

dotenv.config();
const app = express();

// 시퀄라이즈 모델 동기화
// models.sequelize.drop();
models.sequelize
  // .sync({ alter: true })
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
  app.use(
    cors({
      origin: '실 도메인',
      credentials: true,
    }),
  );
} else {
  app.use(morgan('dev'));
  app.use(
    cors({
      origin: true,
      credentials: true,
    }),
  );
}

app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
app.use('/static', express.static(path.resolve(__dirname)));
app.use(express.json());

app.get('/favicon.ico', (req, res) => res.status(204));
app.get('/', (req, res) => {
  console.log(req.headers);
  res.send('hello egg-sns-app');
});

// 라우터 연결
app.use('/account', accountRouter);
app.use('/feed', feedRouter);
app.use('/upload', uploadRouter);
app.use('/feeds', feedsRouter);
app.use('/relation', relationRouter);

// 에러 핸들러
app.use(errorHandler);

app.listen(3030, () => {
  console.log(`📌 서버실행중 🟢 http://localhost:3030`);
});
