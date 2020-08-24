// 모듈
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// 라우터 로드
const accountRouter = require('./routes/account');

// 시퀄라이즈 모델 동기화
const models = require('./src/db/models');
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

const app = express();

dotenv.config();

if (process.env.NODE_ENV === 'production') {
  // 실 서비스 모드
  // app.use(cors({ origin: 서비스도메인, credentials: true }));
} else if (process.env.NODE_ENV === 'development') {
  // 개발 모드
  app.use(cors({ origin: true, credentials: true }));
}

app.use('/', express.static(path.resolve(__dirname, 'uploads')));
app.use(cors());
app.use(express.json());

app.get('/favicon.ico', (req, res) => res.status(204));
app.get('/', (req, res) => {
  res.send('hello egg-sns-app');
});

// 라우터 연결
app.use('/account', accountRouter);

app.listen(3030, () => {
  console.log(`📌 서버실행중 🟢 http://localhost:3030`);
});
