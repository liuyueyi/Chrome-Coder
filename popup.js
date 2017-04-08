$(document).ready(function() {

    // 显示当前的事件信息
    autoShowCurrentTime();
    

// ------------------------------
    // 日期转换相关
    $('#dateParse').click(function() {
        var stampTime = $('#stamptime').val().trim();
        var timeDate = $('#dateTime').val().trim();

        console.log("stamp", stampTime, timeDate);

        if (!isEmpty(stampTime)) {
            var result = time2date(stampTime);
            $('#dateTime').val(result);
            return;
        };

        if (!isEmpty(timeDate)) {
            var result = date2time(timeDate);
            $('#stamptime').val(result);
        };
    });

    $('#dateClear').click(function() {
        $('#stamptime').val('');
        $('#dateTime').val('');
    });
// ------------------------------



// ------------------------------
//  unicode 转码相关
    $('#unicodeParse').click(function(){
        var unicodeVal = $('#unicodeCode').val().trim();
        var unicodeCh = $('#unicodeChinese').val().trim();

        if (!isEmpty(unicodeVal)) {
            var result = unicode2Chinese(unicodeVal);
            $('#unicodeChinese').val(result);
            return;
        };

        if (!isEmpty(unicodeCh)) {
            var result = chinese2Unicode(unicodeCh);
            $('#unicodeCode').val(result);
        };
    });

    $('#unicodeClear').click(function() {
        $('#unicodeCode').val('');
        $('#unicodeChinese').val('');
    });

// ------------------------------
// 


// ------------------------------
//  utf8 转码相关
    $('#utf8Parse').click(function(){
        var utf8Val = $('#utf8Code').val().trim();
        var utf8Ch = $('#utf8Chinese').val().trim();

        if (!isEmpty(utf8Val)) {
            var result = utf82Chinese(utf8Val);
            $('#utf8Chinese').val(result);
            return;
        };

        if (!isEmpty(utf8Ch)) {
            var result = chinese2Utf8(utf8Ch);
            $('#utf8Code').val(result);
        };
    });

    $('#utf8Clear').click(function() {
        $('#utf8Code').val('');
        $('#utf8Chinese').val('');
    });

// ------------------------------



// ------------------------------
//  url 转码相关
    $('#urlParse').click(function(){
        var urlVal = $('#urlOrigin').val().trim();
        var urlEncode = $('#urlEncode').val().trim();

        if (!isEmpty(urlVal)) {
            var result = encodeUrl(urlVal);
            $('#urlEncode').val(result);
            return;
        };

        if (!isEmpty(urlEncode)) {
            var result = decodeUrl(urlEncode);
            $('#urlOrigin').val(result);
        };
    });

    $('#urlClear').click(function() {
        $('#urlOrigin').val('');
        $('#urlEncode').val('');
    });

});





// 时间相关----------------

function autoShowCurrentTime() {
    var timestamp = Date.parse(new Date()) / 1000
    var date = time2date(timestamp);
    $('#currentTime').empty().html(
        "日期: " +date + " &nbsp;时间戳: " + timestamp
    );

    // 实时显示当前时间 & 时间戳
    setInterval(function() {
        var timestamp = Date.parse(new Date()) / 1000
        var date = time2date(timestamp);
        $('#currentTime').empty().html(
            "日期: " +date + " &nbsp;时间戳: " + timestamp
        );
    }, 1000);
}

// 时间戳转日期
function time2date(timestamp) {
    var localDate =  new Date(parseInt(timestamp) * 1000);
    var result = localDate.getFullYear() + "-" + (localDate.getMonth() + 1) + "-" + localDate.getDate() + " " + localDate.getHours() + ":" + localDate.getMinutes() + ":" + localDate.getSeconds();
    return result;
}

// 日期转时间戳
// 日期格式 2014-07-10 10:21:12
function date2time(dateTime) {
    if (dateTime.indexOf(":") < 0) {
        dateTime += " 00:00:00";
    };
    return Date.parse(new Date(dateTime)) / 1000;
}



// 编码相关----------------
// url 编码
function encodeUrl(urlText) {
    return encodeURIComponent(urlText);
}


// url 解码
function decodeUrl(urlText) {
    return decodeURIComponent(urlText);
}


// 汉字转unicode
function chinese2Unicode(text) {
    return text.replace(/([\u4E00-\u9FA5]|[\uFE30-\uFFA0])/g, function(newStr) {
        return "\\u" + newStr.charCodeAt(0).toString(16);　　　　　　
    });
}


// unicode 转中文
function unicode2Chinese(text) {
    return eval("'" + text + "'");
}



// 中文转 utf8
function chinese2Utf8(text) {
    return text.replace(/[^\u0000-\u00FF]/g, function($0) {
        return escape($0).replace(/(%u)(\w{4})/gi, "&#x$2;") });
}

// 中文转 utf8
function utf82Chinese(text) {
    return unescape(text.replace(/&#x/g, '%u').replace(/;/g, ''));
}







// 工具
function isArray(o) {
    return Object.prototype.toString.call(o) == '[object Array]';
}


function isEmpty(value) {
    if (typeof(value) == 'undefined') {
        return true;
    }

    if (value == null) {
        return true;
    }

    if (value == 0 || value.length == 0) {
        return true;
    }
};