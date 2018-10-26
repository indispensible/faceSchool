/**
 * Created by 吕港 on 2017/11/25.
 */

var basePath;
window.onload=function() {
    basePath = $("#basePath").val();
}

$("#loginAdministrator").click(function(){
    var username=$('input[name="username"]').val();
    var password = $('input[name="password"]').val();
    var url = basePath+"Administrator/login.do";
    var data = {
        'username': username,
        'password': password
    };

    $.post(url,data,function(result){
        if(result["status"]==0){
            if(result["degree"]==1){
                alert("登录成功,超级管理员！");
                window.location.href=basePath+'jsp/superAdministrator/superAdministratorHomePage.jsp';
            }else{
                alert("登录成功,普通管理员！");
                window.location.href=basePath+'jsp/administrator/administratorHomePage.jsp';
            }
        }else if(result["status"]==1){
            alert("该账户不存在!");
        }else if(result["status"]==2){
            alert("密码错误！");
        }else if(result["status"]==3){
            alert("该账户已经没有管理员权限！");
        }else {
            alert("发生未知错误，请刷新页面重新尝试登录或者联系系统管理员解决！");
        }
    },'JSON');
});
