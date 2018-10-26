/**
 * Created by 吕港 on 2017/11/2.
 */

var basePath;
//var clawer;

$(document).ready(function() {

    basePath = $("#basePath").val();


    $("#register").attr('disabled',true);

    if (navigator.userAgent.indexOf('Firefox') >= 0) {
        var ojbk = 1
    } else {
        alert('请使用火狐浏览器登录本网站！')
        $("#bodyTest").html("请使用火狐浏览器登录本网站!")
    }

    navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;

    if(navigator.getUserMedia){

    } else {
        alert("该电脑不支持摄像头，请换电脑或者使用小程序注册")
    }

    //提醒检测是否是正确的上财门户账号
    //$("#inputSchoolUsername").blur(function(){
    //    alert("请确保您输入的是正确的上财门户账号，方便老师修改成绩！")
    //});

    //$("#btn").hide();
    //alert(111);

    //$("#getAllCaptcha").click(function() {
    //    $("#imageGang").attr("src",basePath+"images/captcha/captcha.png");
    //    $("#getAllCaptcha").hide();
    //    $("#imageGang").show();
    //});

    //var url=basePath+"login/getCaptcha.do";
    //var data={};
    //$.post(url,data,function(result){
    //    clawer=result["clawer"];
    //    //$("#imageGang").attr("src",basePath+"images/captcha/captcha.png");
    //    //$("#getAllCaptcha").hide();
    //    //$("#imageGang").show();
    //    //$("#getAllCaptcha").attr('disabled',true);
    //    $("#getAllCaptcha").val("按照页面输入验证码！");
    //    $("#btn").show();
    //},'JSON');

})

$("#btn").click(function(){
    var test_src = $("#video").attr("src")
    if( test_src == null){
        alert("请刷新页面后打开你的摄像头")
        $("#register").html("请打开你的摄像头");
    }else{
        $("#register").attr('disabled',false);
    }
})

//window.onload=function(){
//    basePath = $("#basePath").val();
//
//    alert(111);
//
//    $("#getAllCaptcha").click(function() {
//        $("#imageGang").attr("src","<%=basePath%>images/captcha/captcha.png");
//        $("#getAllCaptcha").hide();
//        $("#imageGang").show();
//    });
    //var url=basePath+"login/getCaptcha.do";
    //var data={};
    //$.post(url,data,function(result){
    //
    //},'JSON');
//}

//这段代 主要是获取摄像头的视频流并显示在Video 签中
window.addEventListener("DOMContentLoaded", function () {
    var video = document.getElementById("video");
    var videoObj = { "video": true };
    var errBack = function (error){
        console.log("Video capture error: " + error.message, error.code);
    };
    //  支持浏览器  谷歌,火狐,360,欧朋
    //navigator.getUserMedia这个写法在Opera中好像是navigator.getUserMedianow
    if (navigator.getUserMedia) {
        navigator.getUserMedia(videoObj, function (stream) {
            video.src = stream;
            video.play();
        }, errBack);
    } else if (navigator.webkitGetUserMedia) {
        navigator.webkitGetUserMedia(videoObj, function (stream) {
            video.src = window.URL.createObjectURL(stream);
            video.play();
        }, errBack);
    } else if (navigator.mozGetUserMedia){
        navigator.mozGetUserMedia(videoObj, function (stream) {
            video.src = window.URL.createObjectURL(stream);
            video.play();
        }, errBack);
    }

}, false);


var sign={
    register:function() {
        //实际运用可不写，测试代 ， 为单击拍照按钮就获取了当前图像，有其他用途
        var canvans = document.getElementById("canvas");
        var video = document.getElementById("video");
        var context = canvas.getContext("2d");

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video,0,0);

        //获取浏览器页面的画布对象
        //以下开始编 数据
        var imgData = canvans.toDataURL("image/jpg");
        //将图像转换为base64数据
        var base64Data = imgData.split(",")[1];

        var username = $('input[name="username"]').val();
        var password = $('input[name="password"]').val();
        var identify = $('input[name="identify"]').val();
        var iphone = $('input[name="iphone"]').val();
        var mhUsername = $('input[name="mhUsername"]').val();
        //var mhPassword = $('input[name="mhPassword"]').val();
        var realname = $('input[name="realname"]').val();
        //var name = $('input[name="name"]').val();
        //var Captcha = $('input[name="Captcha"]').val();

        var url = basePath+"login/register.do";
        var data = {
            'doc':base64Data,
            'username': username,
            'password': password,
            'identify':identify,
            'iphone': iphone,
            'mhUsername': mhUsername,
            //'mhPassword': mhPassword,
            'realname':realname
            //'name':name,
            //'Captcha':Captcha,
            //'clawer':clawer
        };


        if(!checkMobile(iphone)){
            alert("请输入正确的手机号！")
        }else if(!isEmail(username)){
            alert("请输入正确的邮箱地址！")
        }else if(username == "" || password == "" || identify == "" || iphone == "" ||mhUsername == "" || realname == ""){
            alert("请将注册信息填完！")
        }else{
            $.post(url, data, function (result) {
                if(result["code"]){
                    if (result["status"] == 0) {
                        alert("啊偶，人脸识别失败，重新试一下吧！");
                    } else {
                        if(result["msg"]==2){
                            alert("恭喜"+result["realname"]+"注册成功了！来使用我们的系统吧！嘻嘻");
                            window.location=basePath+"jsp/student/studentHomePage.jsp";
                        }else if(result["msg"]==1){
                            if(result["success"]){
                                alert("啊偶！注册失败了哦！因为上财门户登录账号："+result["mhUsername"]+"已经被注册了！");
                            }else{
                                alert("啊偶！注册失败了哦！因为邮箱："+result["username"]+"已经被注册了！");
                            }
                        }else{
                            alert("输入的密码或者验证码有误！");
                            $("#register").attr('disabled',false);
                            $("#register").html("注册");
                        }
                    }
                }else{
                    alert("验证码错误！");
                }
            }, 'JSON');
        }

        //$("#register").attr('disabled',true);
        //$("#register").html("正在注册中……别着急！");

    }
}

//验证手机号
function checkMobile(s){
    var length = s.length;
    if(length == 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|)+\d{8})$/.test(s) ){
        return true;
    }else{
        return false;
    }
}

function isEmail(email)
{
    var pattern= /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    var strEmail=pattern.test(email);
    if (strEmail && email != null)
    {
        return true;
    }
    else
    {
        return false;
    }
}