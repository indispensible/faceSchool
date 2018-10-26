/**
 * Created by 吕港 on 2017/11/15.
 */
var basePath;

function bd09togcj02(bd_lon, bd_lat) {
    var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
    var x = parseFloat(bd_lon - 0.0065);
    var y = parseFloat(bd_lat - 0.006);
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
    var gg_lng = z * Math.cos(theta);
    var gg_lat = z * Math.sin(theta);
    return [gg_lng, gg_lat]
}

window.onload=function() {
    basePath = $("#basePath").val();
}

$("#signLocation").click(function(){
    if(judgeDevice()=="pc"){
        alert("同学，请用手机端登录此网站定位哦！");
    }else{
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
            if(this.getStatus() == BMAP_STATUS_SUCCESS){
                var point1= r.point;
                var testLoc = bd09togcj02(point1["lng"], point1["lat"])
                var signLocation=testLoc[0]+","+testLoc[1];
                var encrypt=getQueryString("encrypt");
                var sortOutDecrypted1=encrypt.substr(1);
                var sortOutDecrypted=sortOutDecrypted1.substr(0,sortOutDecrypted1.length-1);
                var decrypt=decrypted(sortOutDecrypted);
                var decryptedData=decrypt.split(",");

                if(decryptedData[0]==null){
                    alert("你输入的域名有误！")
                }else{
                    var date = new Date($.ajax({async: false}).getResponseHeader("Date"));
                    var currentTime=Date.parse(date);
                    var data={
                        'CId':decryptedData[0],
                        'SId':decryptedData[1],
                        'countSign':decryptedData[2],
                        'signLocation':signLocation,
                        'currentTime':currentTime
                    };
                    var url=basePath+"SCFind/signLocation.do";
                    $.post(url,data,function(result){
                        if(result["status"]==0){
                            alert("同学，你已经过了此次上课定位签到的时间！或者是你访问了以前的url地址！请重新去上课签到获得新的定位签到地址！");
                        }else{
                            alert(result["msg"]);
                        }
                    },'JSON');
                }
            }
            else {
                alert('failed'+this.getStatus());
            }
        },{enableHighAccuracy: true});
    }
});

$("#OverSignLocation").click(function(){
    if(judgeDevice()=="pc"){
        alert("同学，请用手机端登录此网站定位哦！");
    }else{
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r){
        if(this.getStatus() == BMAP_STATUS_SUCCESS){
            var point1= r.point;
            var testLoc = bd09togcj02(point1["lng"], point1["lat"])
            var OverSignLocation=testLoc[0]+","+testLoc[1];
            var encrypt=getQueryString("encrypt");
            var sortOutDecrypted1=encrypt.substr(1);
            var sortOutDecrypted=sortOutDecrypted1.substr(0,sortOutDecrypted1.length-1);
            var decrypt=decrypted(sortOutDecrypted);
            var decryptedData=decrypt.split(",");

            if(decryptedData[0]==null){
                alert("你输入的域名有误！")
            }else{
                var date = new Date($.ajax({async: false}).getResponseHeader("Date"));
                var currentTime=Date.parse(date);
                var data={
                    'CId':decryptedData[0],
                    'SId':decryptedData[1],
                    'countSign':decryptedData[2],
                    'OverSignLocation':OverSignLocation,
                    'currentTime':currentTime
                };
                var url=basePath+"SCFind/OverSignLocation.do";
                $.post(url,data,function(result){
                    if(result["status"]==0){
                        alert("同学，你已经过了此次下课定位签到的时间！或者是你访问了以前的url地址！请重新去下课签到获得新的定位签到地址！");
                    }else{
                        alert(result["msg"]);
                    }
                },'JSON');
            }
        }
        else {
            alert('failed'+this.getStatus());
        }
    },{enableHighAccuracy: true});
    }
});

function judgeDevice(){
        var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        var bIsMidp = sUserAgent.match(/midp/i) == "midp";
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
        if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
            return "phone";
        } else {
            return "pc";
        }
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

function decrypted(encrypt){
    var pwd = "8NONwyJtHesysWpM";
    var decrypted = CryptoJS.AES.decrypt(encrypt,pwd).toString(CryptoJS.enc.Utf8);
    return decrypted;
}