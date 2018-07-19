/**
 * Created by 迟猛 on 2017/11/7.
 */
console.log(requirejs.s.contexts._.config.config.baseurl)
require.config({
    paths: {
        text: "require/text",
        // 库
        jquery: 'jquery/jquery',
        underscore: 'underscore/underscore',
        backbone: 'backbone/backbone',
        bootstrap: 'bootstrap/bootstrap',
        adminlte: 'adminlte/adminlte',
        // 滚动条
        slimscroll: 'slimscroll/jquery.slimscroll',
        // 点击效果
        waves: 'waves/waves.min',
        // addTab
        addtabs: '../package/add-tabs/add-tabs',
        // select2
        select2: 'select2/js/select2.full',
        // icheck
        icheck: 'icheck/icheck.min',
        // flatpickr
        flatpickr: 'flatpickr/flatpickr',
        // flatpickr range
        flatpickrRange: 'flatpickr/plugins/rangePlugin',
        // layui
        layui: 'layui/layui.all'
    },
    shim: {
        bootstrap: [
            'jquery',
            'css!bootstrap/css/bootstrap.css'
        ],
        adminlte: {
            deps: [
                'jquery',
                'css!adminlte/AdminLte.css',
                'css!font-awesome/css/font-awesome.css',
                'css!buttons/buttons.css',
                'css!adminlte/style-default.css',
            ]
        },
        flatpickr: {
            deps: ['css!flatpickr/flatpickr.min.css']
        },
        flatpickrRange: {
            deps: ['flatpickr']
        },
        slimscroll: [{
            deps: [
                'jquery'
            ]
        }],
        waves: [
            'css!waves/waves.min.css'
        ],
        select2: {
            deps: [
                'jquery',
                'css!select2/css/select2.css',
                'css!select2/css/select2reset.css',
            ]
        },
        icheck: [
            'css!icheck/skins/all.css'
        ],
        addtabs: ['css!../package/add-tabs/add-tabs.css',
            {
                exports: '$.addtabs'
            }],
        layui: {
            deps: [
                'jquery',
                'css!layui/css/layui.css'
            ],
            exports: 'layui'
        },
    },
    waitSeconds: 0,
    charset: 'utf-8', // 文件编码
    // 资源基础路径

    urlArgs: "v=1.0.0",
    baseUrl: requirejs.s.contexts._.config.config.baseurl, //资源基础路径
    map: {
        '*': {
            'css': 'require/css'
        }
    },
});
require(['jquery', 'underscore', 'backbone'], function ($,_,Backbone) {
    var Config = requirejs.s.contexts._.config.config;
    //将Config渲染到全局
    window.Config = Config;
    var Router = Backbone.Router.extend({
        routes: {
            '*path': function (route) {
                Config.siteRouter = arguments[0];
            }
        }
    });
    var router = new Router();
    Backbone.history.start();
    window.Config.router = router;
    // 初始化
    $(function () {
        require(['bootstrap', 'adminlte', 'require/main'], function (Fast) {
            if (Config.jsurl) {
                require([Config.jsurl, 'css!' + Config.jsurl + '.css'], function (view) {
                    new view();
                    // Controller[Config.actionname] != undefined && Controller[Config.actionname]();
                }, function (e) {
                    console.error(e);
                    // 这里可捕获模块加载的错误
                });
            }
        });
    });
});