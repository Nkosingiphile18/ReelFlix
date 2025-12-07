import { Router, Request, Response } from 'express';

const router: Router = Router();

// 获取所有电影
router.get('/', (req: Request, res: Response) => {
  res.json({
    message: '获取电影列表',
    data: []
  });
});

// 根据ID获取电影
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `获取电影 ID: ${id}`,
    data: null
  });
});

// 添加新电影
router.post('/', (req: Request, res: Response) => {
  res.json({
    message: '添加新电影',
    data: req.body
  });
});

// 更新电影
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `更新电影 ID: ${id}`,
    data: req.body
  });
});

// 删除电影
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `删除电影 ID: ${id}`
  });
});

export default router;