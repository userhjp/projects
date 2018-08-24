//路由配置
module.exports = function (app) {
  app.use('/sys', require('../protect/controllers/SysUserController'));
  app.use('/role', require('../protect/controllers/roleController'));
  app.use('/users', require('../protect/controllers/userController.js'));
  app.use('/news', require('../protect/controllers/newsController'));
  app.use('/article', require('../protect/controllers/articleController'));
  app.use('/files', require('../protect/uploads'));
  app.use('/option', require('../protect/controllers/optionContriller'));
  // 404 page.
  app.use(function (req, res,next) { 
    if (!res.headersSent) {
      res.status(404);
    }
  })
}