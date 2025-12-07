import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

// 中间件
app.use(cors());
app.use(express.json());

// 路由
import moviesRouter from './routes/movies';
app.use('/api/movies', moviesRouter);

// 基本路由
app.get('/', (req: Request, res: Response) => {
  res.json({ message: '欢迎来到 ReelFlix 在线影视平台 API' });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});

export default app;