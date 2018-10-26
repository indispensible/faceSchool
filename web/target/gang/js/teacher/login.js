/**
 * Created by 吕港 on 2017/11/20.
 */
var basePath;
window.onload=function(){
    basePath=$("#basePath").val();
}

$("#loginTeacher").click(function(){
    var username=$('input[name="username"]').val();
    var password = $('input[name="password"]').val();
    //var identify = $('input[name="identify"]').val();
    var url = basePath+ "Teacher/login.do";
    var data = {
        'username': username,
        'password': password
        //'identify':identify
    };

    $.ajax({
        type: 'POST',
        url: url,
        data: data,
        success: function(res){
            var result = JSON.parse(res)
            //if(result["status"]==0){
            //    alert("验证码错误！");
            //}else
            if(result["status"]==1){
                alert("成功登录！");
                window.location=basePath+"jsp/teacher/teacherHomePage.jsp?TId="+result["tid"];
            }else if(result["status"]==2){
                alert("密码错误！");
            }else if(result["status"]==3){
                alert("该账户不存在！您可以注册该账号！");
            }else{
                alert("你还没有教师权限，请联系管理员邮箱获得！邮箱：1547554745@qq.com。");
            }
        },
        error:function(result){
            alert("请检查你的邮箱是否正确！")
        }

    });

});

$("#btn").click(function(){
    window.location=basePath + "jsp/teacher/updatePassword.jsp";
})