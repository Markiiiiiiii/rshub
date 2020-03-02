const Router = require('@koa/router');
const router = new Router();

// 遍历整个 routes 文件夹，导入模块路由 router.js 和 router-custom.js 文件
// 格式参考用例：routes/epicgames/router.js
const RouterPath = require('require-all')({
    dirname: __dirname + '/routes',
    filter: /^.*router([-_]custom[s]?)?\.js$/,
});

// 将收集到的自定义模块路由进行合并
for (const project in RouterPath) {
    for (const routerName in RouterPath[project]) {
        const proRouter = RouterPath[project][routerName]();
        proRouter.stack.forEach((nestedLayer) => {
            router.stack.push(nestedLayer);
        });
    }
}

// index
router.get('/', require('./routes/index'));

// test
router.get('/test/:id', require('./routes/test'));

// RSSHub
router.get('/rsshub/rss', require('./routes/rsshub/rss'));

// chunqiu
router.get('/chunqiu/ticket', require('./routes/chunqiu/ticket'));

// alltfd
router.get('/alltfd/index', require('./routes/alltfd/index'));
router.get('/alltfd/airasia', require('./routes/alltfd/airasia.js'));

module.exports = router;
