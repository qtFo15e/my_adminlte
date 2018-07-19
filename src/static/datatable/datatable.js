/**
 * @file 数据表格demo
 * @author zhanghesong
 *
 * */
define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    // 'slimscroll',
    'select2',
    'icheck',
    'flatpickr',
    'flatpickrRange',
    'layui'
], function ($, _, backbone, bootstrap, select2, icheck, flatpickr, rangePlugin, layui) {
    var configView = Backbone.View.extend({
        el: '#js-form',
        initialize: function () {
            console.log(lay)
            // $('body').slimscroll({
            //     height: '100%',
            //     color: '#3c8dbc'
            // });
            $('.select2').select2();
            $('#js-date-picker').flatpickr({
                // 是否显示时间
                enableTime: true,
                // 是否是24小时制
                time_24hr: true
            });
            $('.js-range').flatpickr({
                mode: 'range'
            });
            $('.js-sort-date').flatpickr({
                // 是否显示时间
                enableTime: false
            });
            $('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
                checkboxClass: 'icheckbox_minimal-blue',
                radioClass: 'iradio_minimal-blue'
            });
            var table = layui.table;

            //展示已知数据
            table.render({
                elem: '#js-data-table',
                cols: [[ //标题栏
                    {checkbox: true, fixed: true},
                    {field: 'id', title: 'ID', width: 80, sort: true},
                    {field: 'username', title: '用户名', width: 120},
                    {field: 'email', title: '邮箱', minWidth: 150},
                    {field: 'sign', title: '签名', minWidth: 160},
                    {field: 'sex', title: '性别', width: 80},
                    {field: 'city', title: '城市', width: 100},
                    {field: 'experience', title: '积分', width: 80, sort: true},
                    {fixed: 'right', width: 178, align: 'center', toolbar: '#barDemo'}
                ]],
                 data: [{
                    "id": "10001"
                    , "username": "杜甫"
                    , "email": "xianxin@layui.com"
                    , "sex": "男"
                    , "city": "浙江杭州"
                    , "sign": "人生恰似一场修行"
                    , "experience": "116"
                    , "ip": "192.168.0.8"
                    , "logins": "108"
                    , "joinTime": "2016-10-14"
                }, {
                    "id": "10002"
                    , "username": "李白"
                    , "email": "xianxin@layui.com"
                    , "sex": "男"
                    , "city": "浙江杭州"
                    , "sign": "人生恰似一场修行"
                    , "experience": "12"
                    , "ip": "192.168.0.8"
                    , "logins": "106"
                    , "joinTime": "2016-10-14"
                    , "LAY_CHECKED": true
                }, {
                    "id": "10003"
                    , "username": "王勃"
                    , "email": "xianxin@layui.com"
                    , "sex": "男"
                    , "city": "浙江杭州"
                    , "sign": "人生恰似一场修行"
                    , "experience": "65"
                    , "ip": "192.168.0.8"
                    , "logins": "106"
                    , "joinTime": "2016-10-14"
                }, {
                    "id": "10004"
                    , "username": "贤心"
                    , "email": "xianxin@layui.com"
                    , "sex": "男"
                    , "city": "浙江杭州"
                    , "sign": "人生恰似一场修行"
                    , "experience": "666"
                    , "ip": "192.168.0.8"
                    , "logins": "106"
                    , "joinTime": "2016-10-14"
                }, {
                    "id": "10005"
                    , "username": "贤心"
                    , "email": "xianxin@layui.com"
                    , "sex": "男"
                    , "city": "浙江杭州"
                    , "sign": "人生恰似一场修行"
                    , "experience": "86"
                    , "ip": "192.168.0.8"
                    , "logins": "106"
                    , "joinTime": "2016-10-14"
                }, {
                    "id": "10006"
                    , "username": "贤心"
                    , "email": "xianxin@layui.com"
                    , "sex": "男"
                    , "city": "浙江杭州"
                    , "sign": "人生恰似一场修行"
                    , "experience": "12"
                    , "ip": "192.168.0.8"
                    , "logins": "106"
                    , "joinTime": "2016-10-14"
                }, {
                    "id": "10007"
                    , "username": "贤心"
                    , "email": "xianxin@layui.com"
                    , "sex": "男"
                    , "city": "浙江杭州"
                    , "sign": "人生恰似一场修行"
                    , "experience": "16"
                    , "ip": "192.168.0.8"
                    , "logins": "106"
                    , "joinTime": "2016-10-14"
                }, {
                    "id": "10008"
                    , "username": "贤心"
                    , "email": "xianxin@layui.com"
                    , "sex": "男"
                    , "city": "浙江杭州"
                    , "sign": "人生恰似一场修行"
                    , "experience": "106"
                    , "ip": "192.168.0.8"
                    , "logins": "106"
                    , "joinTime": "2016-10-14"
                }],
                skin: 'line', //表格风格
                even: true,
                page: true, //是否显示分页
                limits: [5, 7, 10],
                limit: 5 //每页默认显示的数量
            });
        }
    });
    return configView;
});