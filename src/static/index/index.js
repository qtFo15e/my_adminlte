define([
    'jquery',
    'slimscroll',
    'bootstrap',
    'underscore',
    'adminlte',
    'backbone',
    'addtabs',
    'waves',

], function ($, slimscroll, bootstrap, _, adminlte, backbone, addtabs, Waves) {
    var indexView = Backbone.View.extend({
        el: '#js-index',
        initialize: function () {
            // 渲染iframe
            this.renderIframe();

            // 渲染树
            this.renderTree();

        },
        // 渲染树  @param dataUrl => iframe URL 地址
        renderTree: function (dataUrl) {
            var _this = this;
            // 渲染一级导航
            this.renderNav();
            // 循环递归  根据当前 子菜单 url 属性  找到 当前节点其他信息。 以及父节点信息   demo: 'button.html' 根据当前路径 在config.menu菜单中 匹配到 相关信息
            _.each(Config.menuData, function (item, index) {
                _this.recursionMenu(item, dataUrl);
            });
        },
        // 一级导航模板
        templateNav: _.template($('#js-nav').html()),
        // 左侧菜单模板
        templateMenu: _.template($('#js-menu').html()),
        // 路径导航
        // 事件处理
        events: {
            // 点击一级导航
            'click .js-nav-item': 'navItem',
            // iframe tab 设置切换样式
            'click #js-tablist > li > a': 'tabIframe'
        },
        // 渲染一级导航
        renderNav: function (dataUrl) {
            var _this = this;
            $('#js-nav-con').html(this.templateNav({
                data: {
                    nav: window.Config.menuData,
                    _: _,
                }
            }));
            _this.activeId = window.Config.menuData[0].id;
            _.each(window.Config.menuData, function (item, index) {
                if (item.active == 'active') {
                    _this.activeId = item.sortId;
                }
            });
        },
        // 递归修改menu 菜单 @param menuData  config menudata菜单json   @param  dataUrl 当前节点 iframeurl地址
        recursionMenu: function (menuData, dataUrl) {
            var _this = this;
            if (menuData.children) {
                _.each(menuData.children, function (item, index) {
                    // 如果子节点 url地址 和 指定dataurl 或者  默认加载的页面 Config.siteRouter 路由 匹配； 进行 树形菜单 重新渲染
                    if (item.src == (dataUrl || Config.siteRouter)) {
                        _this.sortItemId = item.sortId;
                        // 渲染树形菜单
                        _this.renderSideBar(_this.activeId, _this.sortItemId);
                        // 初始化 iframe菜单
                        $.addtabs({
                            iframe: true,
                            target: "#js-tablist",
                            tabCnt: "#tabCtn",
                            tabpath: "#tabpath",
                            url: dataUrl || Config.siteRouter,
                            title: item.name,
                            id: item.sortId
                        });
                    }
                    else {

                    }
                    _this.recursionMenu(item, dataUrl);
                });
            }
            else {
            }
        },
        // 点击一级导航
        navItem: function (e) {
            var $el = $(e.currentTarget);
            var navId = "" + $el.data("id");
            this.activeId = navId;
            // 渲染子菜单
            this.renderSideBar(navId);

            Waves.init();
        },
        // 渲染左侧sidebar @param activeId 当前激活的一级导航ID  @param sortItemId 当前子节点的id 如 0-1-2
        renderSideBar: function (activeId, sortItemId) {
            var _this = this;
            // newSortArray 存入当前激活菜单值 demo: ["1", "1-0", "1-0-0"]
            var newSortArray = [];
            if (sortItemId) {
                var sortArray = sortItemId.split('-');

                if (sortArray.length == 1) {
                    newSortArray.push(sortArray[0]);
                }
                else if (sortArray.length == 2) {
                    newSortArray.push(sortArray[0]);
                    newSortArray.push(sortArray[0] + '-' + sortArray[1]);
                }
                else if (sortArray.length == 3) {
                    newSortArray.push(sortArray[0]);
                    newSortArray.push(sortArray[0] + '-' + sortArray[1]);
                    newSortArray.push(sortArray[0] + '-' + sortArray[1] + '-' + sortArray[2]);
                }
            }
            $('#js-sidebar-menu').html('');
            $('#js-sidebar-menu').html(this.templateMenu({
                data: {
                    nav: window.Config.menuData,
                    _: _,
                    id: newSortArray[0] || _this.activeId,
                    sortId: newSortArray || ''
                }
            }));
            // 初始化 sidebar menu
            $('.sidebar-menu').each(function () {
                $(this).tree();
            });
        },
        // 渲染iframe
        renderIframe: function () {
            $('ul').tree({
                trigger: '.js-nochild[data-url="' + Config.siteRouter + '"]'
            });

        },
        // iframe tab切换
        tabIframe: function (e) {
            var $el = $(e.currentTarget);
            // 获取当前iframe id
            var url = $el.attr("href");
            // 当前iframe url 地址
            var dataUrl = $el.parent('li').attr('aria-url');
            var iframe = $(url).find("iframe")[0];
            iframe.style.height = "99%";
            // iframe.scrollWidth
            iframe.style.height = "100%";
            // 设置路由跳转
            window.Config.router.navigate(dataUrl);
            // 调用 回溯渲染 树形菜单
            this.renderTree(dataUrl);
        }
    });
    return indexView;
});

