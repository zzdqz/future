/////////////////////////////////////// 对应项目顶级页面处理信息 ///////////////////////////////////////////
var gTop;
(function (doc, win) {
    let curView = win;
    while (true) {
        if (curView.hasOwnProperty('MYNAME_IS_PARENT')) {
            gTop = curView;
            break;
        } else {
            if (curView != curView.parent) {
                curView = curView.parent;
            } else {
                gTop = top;
                break;
            }
        }
        if (!curView) {
            gTop = top;
            break;
        }
    }
    let docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            // 判断clientWidth
            var dpr = window === gTop;
            if (!dpr && gTop) {
                docEl.style.fontSize = gTop.window.document.documentElement.style.fontSize;
            } else {
                if (clientWidth >= 1920) {
                    docEl.style.fontSize = '100px';
                } else if (clientWidth >= 1600) {
                    docEl.style.fontSize = 100 * (clientWidth / 1920) + 'px';
                } else {
                    docEl.style.fontSize = 100 * (1600 / 1920) + 'px';
                }
            }
            // console.log(docEl.style.fontSize);
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

////////////////////////////////////// 通用调用处理方法 ////////////////////////////////////////////
const STANDARD_TIME = "HH:mm:ss";
const STANDARD_DATE = "yyyy-MM-dd";
const STANDARD_DATETIME = "yyyy-MM-dd HH:mm:ss";
const SIMPLE_DATETIME = "yyyyMMddHHmmss";
const SIMPLE_DATE = "yyyyMMdd";
const SIMPLE_TIME = "HHmmss";
/**
 * 时间格式化，直接通过Date对象调用format方法，例： new Date().format
 * @param format 格式化字符，默认标准格式
 * @param interval 圆整时间，默认不开启
 * @returns {string} 格式化后的字符时间
 */
Date.prototype.format = function (format = STANDARD_DATETIME, interval = 0) {
    if (interval > 0) {

    }
    let o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "H+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "W+": "日一二三四五六".charAt(this.getDay()), //week
        "w+": this.getDay() + 1, //week
        "S": this.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};

// function roundDateTime(strDateTime,interval) {
//     return new Date(new Date(strTime).getTime() + interval * 1000).format("yyyy-MM-dd HH:mm:ss")
// }

/**
 * 复制一个对象信息
 * @param {Object} obj 要复制的对象
 * @return {Object} 复制好的对象
 */
function cloneObject(obj) {
    // 复制一个对象信息
    let buf;
    if (obj instanceof Array) {
        buf = [];
        let i = obj.length;
        while (i--) {
            buf[i] = this.cloneObject(obj[i]);
        }
        return buf;
    } else if (obj instanceof Object) {
        buf = {};
        for (let k in obj) {
            buf[k] = this.cloneObject(obj[k]);
        }
        return buf;
    } else {
        return obj;
    }
}

/**
 * 获取echart基本option对象
 *
 */
function getTrendBasisOption() {
    return {
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            data: []
        },
        yAxis: {},
        legend: {
            right: 10,
            top: 'middle',
            orient: 'vertical',
            data: []
        },
        series: []
    }
}

/**
 * 获取json文件内容
 * @param {String} filePath 要获取文件的路径
 * @param {function} callbackFunction 获取到文件内容后的处理方法
 */
function getConfigJson(filePath, callbackFunction) {
    axios.get(filePath).then((res) => {
        if (res.status === 200) {
            if (callbackFunction) {
                callbackFunction(res.data);
            }
        } else {
            console.log(res);
        }
    }).catch((err) => {
        console.log(err);
    })
}

/**
 * 获取URL接口数据
 * @param {Object} url URL接口
 * @param {Object} params 接口需要传递的参数
 * @param {Object} callbackFunction 获取到数据后的处理方法
 */
function getRequestObjJson(url, params, callbackFunction) {
    axios.post(url, params).then((res) => {
        if (res.status == 200) {
            callbackFunction(res);
        } else {
            console.log(res)
        }
    }).catch((err) => {
        console.log(err);
    })
}

/**
 * 获取URL接口数据
 * @param {Object} url URL接口
 * @param {Object} params 接口需要传递的参数
 * @param {Object} callbackFunction 获取到数据后的处理方法
 */
function SyngetRequestObjJson(url, params, successCallback) {
    $.ajax({
        url: url,
        type: "post", //GET
        async: false, //或false,是否异步
        data: params,
        timeout: 5000, //超时时间
        dataType: "json", //返回的数据格式：
        success: function (res) {

            if (res) {
                successCallback(res);
            } else {
                // console.log(res)
            }
        },
        error: function (error) {
            console.log(error);
        }
    })
}

/**
 * 获取趋势图的开始查询时间，默认获取100个节点信息
 * @param {Object} endTime 趋势图结束时间点
 * @param {Object} sampleInterval 采样间隔
 */
function getTrendStartTime(endTime, sampleInterval) {
    let startTime = "";
    if (typeof sampleInterval == "undefind") {
        return startTime;
    }
    let time = new Date(endTime).getTime() - (sampleInterval * 100 * 1000);
    startTime = this.dateFormat(new Date(time), "yyyy-MM-dd HH:mm:ss", sampleInterval);
    return startTime;
}

/**
 * 获取URL接口数据
 * @param {Object} url URL接口
 * @param {Object} params 接口需要传递的参数
 * @param {Object} callbackFunction 获取到数据后的处理方法
 */
function post(url, params, callbackFunction, exceptionCallBack) {
    axios.post(url, params).then((res) => {
        if (res.status == 200) {
            if (callbackFunction) {
                callbackFunction(res.data);
            }
        } else {
            console.log(res)
        }
    }).catch((err) => {
        if (exceptionCallBack) {
            exceptionCallBack(err.msg);
        }
        console.log(err);
    });
}

function uploadFile(url, formData, callbackFunction) {
    // console.log(fileobj);
    // let formData = new FormData();
    // formData.append("img", fileobj);
    // formData.append("uesr", 'alex');
    $.ajax({
        type: 'POST',
        url: url,
        data: formData,
        processData: false,
        contentType: false,
        success: function (res) {
            if (callbackFunction) {
                callbackFunction(res);
            }
        }
    })

}

/**
 * 获取配置文件
 * @param {Object} url URL接口
 * @param {Object} params 接口需要传递的参数
 * @param {Object} callbackFunction 获取到数据后的处理方法
 */
function postConfig(filePath, callbackFunction) {
    axios.get(filePath).then((res) => {
        if (res.status == 200) {
            callbackFunction(res.data);
        } else {
            console.log(res);
        }
    }).catch((err) => {
        console.log(err);
    })
}

/**
 * 提取url 返回字符串对象
 * @returns {Object}
 */
function getUrlParams() {
    //location.search 返回url中返回URL的查询部分
    //如http://localhost:8088/emonitor/views/areaMonitor/area.html?CityID=236&CityName=滁州市
    //返回  ?CityID=236&CityName=滁州市
    var url = decodeURI(location.search); //使用 decodeURI() 对一个编码后的 URI 进行解码：
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest; //  {CityID:236,CityName:"滁州市"}
}

/**
 * 百分比计算
 * @param a
 * @param b
 * @returns {string}
 */
function perCompute(a, b, m = "-") {
    if (!isNaN(a) && !isNaN(b) && b > 0) {
        let c = Number(a) * 100 / Number(b);
        if (c % 1 === 0) {
            return parseInt(c);
        }
        return c.toFixed(2);
    } else {
        return m;
    }
}

/**
 * 比例计算
 * @param a
 * @param b
 * @returns {string}
 */
function rePerCompute(a, b, m = "-") {
    if (!isNaN(a) && !isNaN(b) && b > 0) {
        let c = Number(a) / Number(b);
        if (c % 1 === 0) {
            return parseInt(c);
        }
        return c.toFixed(2);
    } else {
        return m;
    }
}

/**
 * 针对质优率或者占比等刻度范围是0-100的处理方式
 * 趋势图设置Y轴最小刻度算法：
 * 1，默认值：90
 * 2，如果数值低于95,value-value%10-5，如果结果小于0，设置为0
 * @param value
 * @param nMin
 * @returns {number}
 */
function getGraphminValue(value, sVal = 0) {
    let nMin = 90;
    //低于85，采用以下算法
    if (value < 95) {
        nMin = value - value % 10 - 5 - sVal;
        if (nMin < 0)
            nMin = 0;
    }
    return nMin;
}

/**
 *
 * @param data 数据
 * @param key KPI指标名称
 * @param keytype KPI指标类型
 * @param precision 需要格式化方式：M,K,S,MS
 * @returns {*}
 */
function precisionGraphData(row, key, keytype, precision) {
    //不同字段各异的处理方式
    let val = row[key];

    //先判断有没有需要格式化的数据
    if (precision && precision.length > 0) {
        switch (precision) {
            case "K"://bps 转换成Kbps
                return (val / 1000).toFixed(2);
                break;
            case "M"://bps 转换成Mbps
                return (val / 1000000).toFixed(2);
                break;
            case "G"://bps 转换成Gbps
                return (val / 1000 / 1000 / 1000).toFixed(2);
                break;
            case "S"://us 转换成秒
                return (val / 1000000).toFixed(2);
                break;
            case "MS"://us 转换成毫秒
                return (val / 1000).toFixed(2);
                break;
        }
    }
    //通用处理
    if (keytype == "float" && val != '-')
        return Number(val).toFixed(2);
    else if (keytype == "int" && val != '-')
        return Number(val).toLocaleString();
    return val;
}

/**
 * 数据格式化
 * @param key 指标名称
 * @param keytype  指标类型：int ,float,String
 * @param value  指标值
 */
function formatTableData(key, keytype, value) {
    if (value == undefined) {
        return "-";
    }
    let val = value;
    //千位符和两位小数处理
    switch (keytype) {
        case "float":
            val = Number(value).toFixed(3);
            break;
        case "int":
            val = Number(val).toLocaleString();
            break;
    }
    return val;
}

/**
 * @param data 配置文件指标配置
 * @returns {string}
 */
function formatSqlSelectData(data) {
    let str = "";
    for (let item of data) {
        if (item.table) {
            str += `(${item.table}.${item.precision}) ${item.key},`;
        } else if (item.precision) {
            str += `(${item.precision}) ${item.key},`;
        } else {
            str += item.key + ",";
        }
    }
    str = str.substring(0, str.length - 1);
    return str;
}

/**
 * @param data 配置文件指标配置
 * @returns {string}
 */
function formatSqlSelectData1(data) {
    let str = "";
    for (let item of data) {
        if (item.statistics != "") {
            str += `(${item.statistics}) ${item.key},`;
        }
    }
    str = str.substring(0, str.length - 1);
    return str;
}


/**
 * 获取间隔时间
 * @param dataObj 处理的时间对象
 * @param interval 秒数
 */
function getInterval(dateObj, interval) {

    return new Date(dateObj.getTime() + interval * 1000).format("yyyy-MM-dd HH:mm:ss")
}

/**
 * 判断值是否为空
 * @param val 为空返回true
 */
function isEmpty(val, type = "all") {
    return val === undefined || val === null || (typeof val === 'number' || typeof val === "boolean" ? false : Object.keys(val).length === 0);
}

/**
 * 前端分页，当前页数据截取方法
 */
function curPageDataSlice(total, pagingInfo) {
    if (pagingInfo !== undefined && pagingInfo.total !== undefined && pagingInfo.size !== undefined && pagingInfo.index !== undefined) {
        if (total && total.length) {
            let index = (pagingInfo.index - 1) * pagingInfo.size;
            // return JSON.parse(JSON.stringify(total.slice(index,index + pagingInfo.size)));
            // 赋值总数
            pagingInfo.total = total.length;
            return total.slice(index, index + pagingInfo.size);
        } else {
            return [];
        }
    } else {
        console.error("分页信息必须为标准格式: {total: 0,size: 0, index: 0}")
    }
}

////////////////////jtopo拓扑方法， 需要引入 jtopo.js
function newNode(x, y, img, name, scene, c_id, p_id) {
    let node = new JTopo.Node(name);
    node.fontColor = "0, 0, 0";
    node.setImage(img, true);
    node.setLocation(x, y);
    node.serializedProperties.push(c_id);
    node["cdn_group_id"] = c_id;
    node["parent_group_id"] = p_id;
    if (p_id == -1) {
        node.selected = true;
    }
    scene.add(node);
    return node;
}

// 曲线
function newCurveLink(nodeA, nodeZ, text, scene) {
    var link = new JTopo.CurveLink(nodeA, nodeZ, text);
    link.lineWidth = 3; // 线宽
    scene.add(link);
    return link;
}

/**
 * elementUi 确认弹框方法
 * 注意： vue实例必须命名为vm
 * @param title
 * @param text
 * @param thenCallback
 * @param catchCallback
 */
function popConfirm(title, text, thenCallback, catchCallback) {
    // 弹窗提示
    vm.$confirm(
        text,
        title,
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            customClass: "location-custom-confirm"
        })
        .then(() => {
            if (thenCallback) {
                thenCallback();
            }
        })
        .catch(() => {
            // 取消
            if (catchCallback) {
                catchCallback()
            }
        });
}

/**
 * elementUi 确认弹框方法
 * 注意： vue实例必须命名为vm
 * @param msg
 * @param type
 */
function popMsg(msg, type) {
    vm.$notify({
        type: type,// success/warning/info/error
        message: msg, // 提示信息
        offset: 50, // 偏移
        duration: 1000 * 3, // 持续时间
        showClose: false, // 关闭按钮
    });
}

/**
 * elementUi 输入弹框方法
 * 注意： vue实例必须命名为vm
 * @param title
 * @param text
 * @param inputValue
 * @param inputValidator 验证信息方法，true为通过，false或者String不通过，string信息会打印到输入框提示中
 * @param thenCallback
 * @param catchCallback
 */
function popPrompt(title, text, inputValue, inputValidator, thenCallback, catchCallback) {
    vm.$prompt(
        text,
        title,
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            inputValue: inputValue,
            // modal: false,
            inputValidator(val) {
                if (inputValidator) {
                    return inputValidator(val);
                }
                return true;
            }
        })
        .then(({value}) => {
            if (thenCallback) {
                thenCallback(value);
            }
        })
        .catch(() => {
            // 取消
        });
}

/**
 * 判断是否为json标准格式的字符串
 * @param val
 */
function isJsonStr(val) {
    try {
        let obj = JSON.parse(val);
        if (typeof obj === "object" && obj) {
            return true;
        }
        return false;
    } catch (e) {
        return false;
    }
}

function splitStrByCsvAndJson(row) {
    // 转换两个双引号
    row = row.replace(/\"\"/g, "|");
    // 定义需要的变量
    // 字符转义范围(该范围开启时，逗号只会作为普通字符)
    let isInArea = false, splitRow = [];
    let bufferArr = [], bIndex = 0;
    let bufferArr1 = [], bIndex1 = 0;
    let writeControl = false;
    // 遍历行数据
    for (let a of row) {
        // "{|max|:1024,|min|:1,|name|:|yx|}"
        // {"max":1024}
        // 如果是双引号，开启转义范围，第一次遇到开启，第二次遇到结束
        if (a === "\"") {
            // 临时写入控制结束
            if (writeControl) {
                // 如果进到这里表示，没有需要转义的字符(逗号)，添加到主字符数组中
                // bufferArr1.unshift("\"");
                // bufferArr1.push("\"");
                bufferArr.push(...bufferArr1);
                bIndex += bufferArr1.length;
                bufferArr1 = [];
                bIndex1 = 0;
            }
            // 开启转义字符范围()
            isInArea = !isInArea;
            writeControl = isInArea;
            continue;
        }
        if (writeControl) {
            bufferArr1[bIndex1++] = a;
            if (a === ",") {
                writeControl = false;
                bufferArr.push(...bufferArr1);
                bIndex += bufferArr1.length;
                bufferArr1 = [];
                bIndex1 = 0;
            }
            continue;
        }
        if (!isInArea) {
            if (a === ",") {
                splitRow.push(bufferArr.join("").trim().replace(/\|/g, "\""));
                bufferArr = [];
                bIndex = 0;
                continue;
            }
        }
        bufferArr[bIndex++] = a;
    }
    splitRow.push(bufferArr.join("").trim().replace(/\|/g, "\""));
    return splitRow
}