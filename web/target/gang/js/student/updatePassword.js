/**
 * Created by 吕港 on 2018/2/28.
 */

var basePath;
window.onload=function() {
    basePath = $("#basePath").val();

    if (navigator.userAgent.indexOf('Firefox') >= 0) {
        var ojbk = 1
    } else {
        alert('请使用火狐浏览器登录本网站！')
        $("#bodyTest").html("请使用火狐浏览器登录本网站!")
    }
}

$("#loginStu").click(function(){
    var username=$('input[name="username"]').val();
    var password = $('input[name="password"]').val();
    var identify = $('input[name="identify"]').val();
    var url = basePath+"login/updatePassword.do";
    var data = {
        'username': username,
        'password': password,
        'identify':identify
    };

    if(username=="" || password=="" || identify==""){
        alert("请将修改信息填写完整！");
    }else{
        $.post(url,data,function(result){
            if(result["status"]==0){
                alert("验证码错误！");
            }else if(result["status"]==1){
                alert("成功修改！");
                window.location=basePath+"jsp/student/login.jsp";
            }else if(result["status"]==2){
                alert("该账户不存在！您可以注册该账号！");
            }else{
                alert("发生了未知错误！");
            }
        },'JSON');
    }
});
