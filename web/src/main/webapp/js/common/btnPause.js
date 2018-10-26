/**
 * Created by 吕港 on 2017/11/3.
 */

var basePath;
window.onload=function() {
    basePath = $("#basePath").val();
}

var wait = 60;
document.getElementById("btn").onclick = function() {
    createCode();
    time(this);
}

function createCode(){
    var code=Math.floor(Math.random()*1000000);
    while(code<100000){
        code=Math.floor(Math.random()*1000000);
    }
    var username = $('input[name="username"]').val();
    var data={
        'username':username,
        'code':code
    };
    if(username==null){
        alert("邮箱不能为空！");
    }else{
        var url=basePath+"login/sendEmail.do";
        $.post(url, data, function (result) {
            if(result["success"]){
                alert("验证码已发送至你的邮箱，请耐心等待吧！");
            }else{
                alert("验证码发送失败，请检查你的邮箱是否输入正确！");
            }
        }, 'JSON');
    }
}

function time(o) {
    if (wait == 0) {
        o.removeAttribute("disabled");
        o.innerHTML = "获取验证码";
        wait = 60;
    } else {
        o.setAttribute("disabled", true);
        o.innerHTML = wait + "秒后可以重新发送";
        wait--;
        setTimeout(function() {
            time(o)
        }, 1000)
    }
}
