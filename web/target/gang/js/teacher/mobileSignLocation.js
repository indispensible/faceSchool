/**
 * Created by 吕港 on 2017/11/15.
 */

var SignLocation;
var lng,lat;
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

window.onload=function(){
    basePath=$("#basePath").val();

    // 百度地图API功能
    var map = new BMap.Map("allmap");
    var point = new BMap.Point(116.331398,39.897445);
    map.centerAndZoom(point,12);

    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r){
        if(this.getStatus() == BMAP_STATUS_SUCCESS){
            var mk = new BMap.Marker(r.point);
            map.addOverlay(mk);
            map.panTo(r.point);
            lng=r.point.lng;
            lat=r.point.lat;
            var testLoc = bd09togcj02(lng, lat)
            SignLocation=testLoc[0]+","+testLoc[1];
        }
        else {
            alert('failed'+this.getStatus());
        }
    },{enableHighAccuracy: true});

}

$("#signLocation").click(function(){
    if(judgeDevice()=="pc"){
        alert("老师，请用手机端登录此网站定位哦！");
    }else{
        var CId=getQueryString("CId");
        var data={
          'CId':CId,
          'SignLocation':SignLocation,
          'status':0
        };
        var url=basePath+"find/signLocation.do";
        $.post(url,data,function(result){
            alert(result["msg"]);
        },'JSON');
    }
});

$("#signOverLocation").click(function(){
    if(judgeDevice()=="pc"){
        alert("老师，请用手机端登录此网站定位哦！");
    }else{
        var CId=getQueryString("CId");
        var data={
            'CId':CId,
            'SignLocation':SignLocation,
            'status':1
        };
        var url=basePath+"find/signLocation.do";
        $.post(url,data,function(result){
            alert(result["msg"]);
        },'JSON');
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
