$(function () {
    initHtml();
    updateData();
})

function initHtml() {
    layui.use(['layer', 'table'], function () {
        var table = layui.table;
        table.render({
            elem: '#id_filephoto', //指定原始表格元素选择器（推荐id选择器）
            url: 'findallphotos',
            method: 'get',
            parseData: function (res) {
                return {
                    "code": 0,
                    "msg": "",
                    "count": 1000,
                    "data": res
                }
            },
            response: {
                statusName: 'code' //规定数据状态的字段名称，默认：code
                , statusCode: 0 //规定成功的状态码，默认：0
                , msgName: 'msg' //规定状态信息的字段名称，默认：msg
                , countName: 'count' //规定数据总数的字段名称，默认：count
                , dataName: 'data' //规定数据列表的字段名称，默认：data
            },
            defaultToolbar: ['filter', 'print', 'exports'],
            /* page:{
                 limit:30,
                 curr:1,
                 prev:'上一页',
                 next:'下一页',
                 last:'尾页'
             },*/
            cols: [[
                {field: "", width: '10%', type: "checkbox", title: "", LAY_CHECKED: true},
                {field: "id", width: '10%', title: "编号", unresize: true, align: 'center'},
                {field: "FileName", width: '20%', title: "文件名称", unresize: true, align: 'center'},
                {
                    field: "FilePath",
                    width: '30%',
                    title: "文件路径",
                    unresize: true,
                    align: 'center',
                    templet: function (res) {
                        res.FilePath = res.FilePath.replace("/", "//");
                        return `<a onclick="openphoto(${JSON.stringify(res.FilePath)})" >${res.FilePath}</a>`;
                    }
                },
                {field: "FileAuthor", width: '15%', title: "人物", unresize: true, align: 'center'},
                {
                    field: "ImportTime",
                    width: '15%',
                    title: "记录时间",
                    unresize: true,
                    align: 'center',
                    templet: function (res) {
                        return new Date(Number(res.ImportTime)).format("yyyy-MM-dd hh:mm:ss");
                    }
                }
            ]],
            height: $('#id_card').height() - 30
        });
    })
}

Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

function updateData() {

}

//放大图片
function openphoto(path) {
    layui.use('layer', function () {

        var height = 800; //获取图片高度
        var width = 600; //获取图片宽度
        var imgHtml = "<img src='" + path + "' />";
        layui.layer.open({
            type: 1,
            shade: 0.8,
            offset: 'auto',
            area: [width + 'px', height + 'px'],
            shadeClose: true,//点击外围关闭弹窗
            scrollbar: false,//不现实滚动条
            title: "图片预览", //不显示标题
            content: imgHtml, //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响

        });
    })
}