#Encoder
> 一个chrome扩展小工具，实现unicode/utf8/中文的转码, 实现日期和时间戳的互换

## 简单说明

目前的功能比较简单，主要实现编码转换 & 时间戳&日期互转

### 1. utf8 / chinese

```javascript
// 中文转 utf8
function chinese2Utf8(text) {
    return text.replace(/[^\u0000-\u00FF]/g, function($0) {
        return escape($0).replace(/(%u)(\w{4})/gi, "&#x$2;") });
}

// 中文转 utf8
function utf82Chinese(text) {
    return unescape(text.replace(/&#x/g, '%u').replace(/;/g, ''));
}
```

### 2. unicode / chinese

```javascript
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
```


### 3. url 编码/解码

```javascript
// url 编码
function encodeUrl(urlText) {
    return encodeURIComponent(urlText);
}


// url 解码
function decodeUrl(urlText) {
    return decodeURIComponent(urlText);
}
```


### 4. 时间戳转换

```javascript
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
```

说明下日期转时间戳时，如果只传入了日期，利用  `new Date(dateTime)` 生成的时间会是8点， 时区的问题，js我也不会玩，就用最low的方法兼容了下

