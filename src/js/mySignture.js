import axios from "axios";
import vueJsonp from 'vue-jsonp'
let Base64 = require('js-base64').Base64;
let mySignture = {};

// mySignture.aa=function(){

// }
mySignture.MultBrowser = function(){
	return{
			openBrowserURL :function(url, top, func){
			var param = {"command":110,"code":0,"parameter":[url, top, document.cookie]};
			var jsonData =JSON.stringify(param);
			var data = Base64.encode(jsonData);
			var callBack = Math.random().toString(36).substr(2);
			try	{
				console.log(vueJsonp.install)
				vueJsonp()
				// var ajax=$.ajax({
				// type : "get",
				// async:false,
				// url :"http://127.0.0.1:16888?data="+data,
				// dataType : "jsonp",
				// jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
				// jsonpCallback:"success_jsonpCallback" + callBack,//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
				// success : function(json){
				// 		if(json.error == 0){
				// 			func(json.error, json.parameter[0]);
				// 		}
				// 		else{
				// 			func(json.error, json.msg);
				// 		}
				// 	}
				// });
			}catch (e){
				alert("jsonp发送数据失败！");
				}
			},
			executeJS :function(id, js, func){
				var param = {"command":110,"code":1,"parameter":[id, js]};
				var jsonData =JSON.stringify(param);
				var data = Base64.encode(jsonData);
				var callBack = Math.random().toString(36).substr(2);;
				try{
					var ajax=$.ajax({
					type : "get",
					async:false,
					url :"http://127.0.0.1:16888?data="+data,
					dataType : "jsonp",
					jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
					jsonpCallback:"success_jsonpCallback" + callBack,//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
					success : function(json){
							if(json.error == 0){
								func(json.error, json.parameter[0]);
							}
							else{
								func(json.error, json.msg);
							}
						}
					});
				}catch (e){
					alert("jsonp发送数据失败！");
				}
			},
			waitStatus : function(id, outTime, func){
				var param = {"command":110,"code":2,"parameter":[id, outTime]};
				var jsonData =JSON.stringify(param);
				var data = Base64.encode(jsonData);
				var callBack = Math.random().toString(36).substr(2);
				try{
					var ajax=$.ajax({
					type : "get",
					async:false,
					url :"http://127.0.0.1:16888?data="+data,
					dataType : "jsonp",
					jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
					jsonpCallback:"success_jsonpCallback"  + callBack,//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
					success : function(json){
							if(json.error == 0){
								func(id,json.error, json.parameter[0], json.parameter[1]);
							}
							else{
								func(id,json.error, "-1", json.msg);
							}
						}
					});
				}catch (e){
					alert("jsonp发送数据失败！");
				}
			},
			sendStatus :function(status, data){
				window.external.sendStatus(status, data);
			},
			closeBrowser : function(){
				window.external.closeBrowser();
			}
	}
}();
//通过AZTBrowser来打开需要的地址
mySignture.openURL = function(pdfPath){
    var test = window.location.href;
    var string =test.split("/");
    let path = string[0]+"//"+string[2]+"/"+string[3];
    // var ActivexURL=path + "/jsp/zfba/aztDzqz/iWebEditor.html?pdfPath="+pdfPath;  
    var ActivexURL = './index.vue';  
    
    //功能说明：创建AZTBrowser浏览器并打开URL地址
    //参数1：URL地址
    //参数2：是否置顶 1表示置顶，0表示不置顶
	//参数3：回调函数

    mySignture.MultBrowser.openBrowserURL(ActivexURL, "1", callBackBrowserURL);
}
//功能说明：创建AZTBrowser浏览器并打开URL地址后的回调用函数
//参数1：状态值
//参数2：AZTBrowser浏览器的ID号，如果打开多个，此ID不同
function callBackBrowserURL(error, id){
  if(error == 0){  //调用成功
    //功能说明：监听AZTBrowser浏览器返回状态和数据
    //参数1：AZTBrowser浏览器的ID号
    //参数2：监听间隔时间，以秒位单位
    //参数3：回调函数
    MultBrowser.waitStatus(id, "2", callBackWaitStatus);
  }
}
//功能说明：监听AZTBrowser浏览器返回状态和数据
//参数1：AZTBrowser浏览器的ID号，如果打开多个，此ID不同
//参数2：状态值
//参数3：AZTBrowser浏览器返回来的ID号
//参数4：AZTBrowser浏览器返回来的内容
function callBackWaitStatus(id, error, status, msg){
    if(error == 0){
      if(status == "0"){
        //超时
        //alert("我啥也不做");
      }
      else{
        //成功
        alert(status + "---" + msg);  //通过这里的数据进行刷新调用方页面等操作
      }
        
      //继续循环监听
      MultBrowser.waitStatus(id, "2", callBackWaitStatus);
    }
  }

  (function(global) {
    'use strict';
    // existing version for noConflict()
    var _Base64 = global.Base64;
    var version = "2.1.9";
    // if node.js, we use Buffer
    var buffer;
    if (typeof module !== 'undefined' && module.exports) {
        try {
            buffer = require('buffer').Buffer;
        } catch (err) {}
    }
    // constants
    var b64chars
        = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    var b64tab = function(bin) {
        var t = {};
        for (var i = 0, l = bin.length; i < l; i++) t[bin.charAt(i)] = i;
        return t;
    }(b64chars);
    var fromCharCode = String.fromCharCode;
    // encoder stuff
    var cb_utob = function(c) {
        if (c.length < 2) {
            var cc = c.charCodeAt(0);
            return cc < 0x80 ? c
                : cc < 0x800 ? (fromCharCode(0xc0 | (cc >>> 6))
                                + fromCharCode(0x80 | (cc & 0x3f)))
                : (fromCharCode(0xe0 | ((cc >>> 12) & 0x0f))
                   + fromCharCode(0x80 | ((cc >>>  6) & 0x3f))
                   + fromCharCode(0x80 | ( cc         & 0x3f)));
        } else {
            var cc = 0x10000
                + (c.charCodeAt(0) - 0xD800) * 0x400
                + (c.charCodeAt(1) - 0xDC00);
            return (fromCharCode(0xf0 | ((cc >>> 18) & 0x07))
                    + fromCharCode(0x80 | ((cc >>> 12) & 0x3f))
                    + fromCharCode(0x80 | ((cc >>>  6) & 0x3f))
                    + fromCharCode(0x80 | ( cc         & 0x3f)));
        }
    };
    var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
    var utob = function(u) {
        return u.replace(re_utob, cb_utob);
    };
    var cb_encode = function(ccc) {
        var padlen = [0, 2, 1][ccc.length % 3],
        ord = ccc.charCodeAt(0) << 16
            | ((ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8)
            | ((ccc.length > 2 ? ccc.charCodeAt(2) : 0)),
        chars = [
            b64chars.charAt( ord >>> 18),
            b64chars.charAt((ord >>> 12) & 63),
            padlen >= 2 ? '=' : b64chars.charAt((ord >>> 6) & 63),
            padlen >= 1 ? '=' : b64chars.charAt(ord & 63)
        ];
        return chars.join('');
    };
    var btoa = global.btoa ? function(b) {
        return global.btoa(b);
    } : function(b) {
        return b.replace(/[\s\S]{1,3}/g, cb_encode);
    };
    var _encode = buffer ? function (u) {
        return (u.constructor === buffer.constructor ? u : new buffer(u))
        .toString('base64')
    }
    : function (u) { return btoa(utob(u)) }
    ;
    var encode = function(u, urisafe) {
        return !urisafe
            ? _encode(String(u))
            : _encode(String(u)).replace(/[+\/]/g, function(m0) {
                return m0 == '+' ? '-' : '_';
            }).replace(/=/g, '');
    };
    var encodeURI = function(u) { return encode(u, true) };
    // decoder stuff
    var re_btou = new RegExp([
        '[\xC0-\xDF][\x80-\xBF]',
        '[\xE0-\xEF][\x80-\xBF]{2}',
        '[\xF0-\xF7][\x80-\xBF]{3}'
    ].join('|'), 'g');
    var cb_btou = function(cccc) {
        switch(cccc.length) {
        case 4:
            var cp = ((0x07 & cccc.charCodeAt(0)) << 18)
                |    ((0x3f & cccc.charCodeAt(1)) << 12)
                |    ((0x3f & cccc.charCodeAt(2)) <<  6)
                |     (0x3f & cccc.charCodeAt(3)),
            offset = cp - 0x10000;
            return (fromCharCode((offset  >>> 10) + 0xD800)
                    + fromCharCode((offset & 0x3FF) + 0xDC00));
        case 3:
            return fromCharCode(
                ((0x0f & cccc.charCodeAt(0)) << 12)
                    | ((0x3f & cccc.charCodeAt(1)) << 6)
                    |  (0x3f & cccc.charCodeAt(2))
            );
        default:
            return  fromCharCode(
                ((0x1f & cccc.charCodeAt(0)) << 6)
                    |  (0x3f & cccc.charCodeAt(1))
            );
        }
    };
    var btou = function(b) {
        return b.replace(re_btou, cb_btou);
    };
    var cb_decode = function(cccc) {
        var len = cccc.length,
        padlen = len % 4,
        n = (len > 0 ? b64tab[cccc.charAt(0)] << 18 : 0)
            | (len > 1 ? b64tab[cccc.charAt(1)] << 12 : 0)
            | (len > 2 ? b64tab[cccc.charAt(2)] <<  6 : 0)
            | (len > 3 ? b64tab[cccc.charAt(3)]       : 0),
        chars = [
            fromCharCode( n >>> 16),
            fromCharCode((n >>>  8) & 0xff),
            fromCharCode( n         & 0xff)
        ];
        chars.length -= [0, 0, 2, 1][padlen];
        return chars.join('');
    };
    var atob = global.atob ? function(a) {
        return global.atob(a);
    } : function(a){
        return a.replace(/[\s\S]{1,4}/g, cb_decode);
    };
    var _decode = buffer ? function(a) {
        return (a.constructor === buffer.constructor
                ? a : new buffer(a, 'base64')).toString();
    }
    : function(a) { return btou(atob(a)) };
    var decode = function(a){
        return _decode(
            String(a).replace(/[-_]/g, function(m0) { return m0 == '-' ? '+' : '/' })
                .replace(/[^A-Za-z0-9\+\/]/g, '')
        );
    };
    var noConflict = function() {
        var Base64 = global.Base64;
        global.Base64 = _Base64;
        return Base64;
    };
    // export Base64
    global.Base64 = {
        VERSION: version,
        atob: atob,
        btoa: btoa,
        fromBase64: decode,
        toBase64: encode,
        utob: utob,
        encode: encode,
        encodeURI: encodeURI,
        btou: btou,
        decode: decode,
        noConflict: noConflict
    };
    // if ES5 is available, make Base64.extendString() available
    if (typeof Object.defineProperty === 'function') {
        var noEnum = function(v){
            return {value:v,enumerable:false,writable:true,configurable:true};
        };
        global.Base64.extendString = function () {
            Object.defineProperty(
                String.prototype, 'fromBase64', noEnum(function () {
                    return decode(this)
                }));
            Object.defineProperty(
                String.prototype, 'toBase64', noEnum(function (urisafe) {
                    return encode(this, urisafe)
                }));
            Object.defineProperty(
                String.prototype, 'toBase64URI', noEnum(function () {
                    return encode(this, true)
                }));
        };
    }
    // that's it!
    if (global['Meteor']) {
       Base64 = global.Base64; // for normal export in Meteor.js
    }
})(this);

export default mySignture;