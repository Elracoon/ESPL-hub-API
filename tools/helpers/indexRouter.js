import { Router } from 'express';
var router = Router();

router.get('/', function(req, res, next) {
  res.send("Hello World!")
});

export default router;
