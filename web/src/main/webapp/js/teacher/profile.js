/**
 * Created by 吕港 on 2018/3/1.
 */
var basePath;

window.onload=function(){
    basePath=$("#basePath").val();
    var data={};
    var url=basePath+"Teacher/getTeacher.do";
    $.post(url,data,function(result){
        $("#name").val(result["realname"])
        $("#usernamelvgang").html(result["email"])
        //$("#password").val(result["mhUsername"])
        $("#phone").val(result["iphone"])
        $("#upload_org_code_img").attr("src","https://www.uhouse.site/faceSchool/" + result["identification"].substring(31));
        $("#upload_org_code_img").css("display","")
    },'JSON');
}

$("#sendByLvgang").click(function(){
    var realname=$('input[name="realname"]').val();
    var iphone = $('input[name="phone"]').val();
    var email = $("#usernamelvgang").html()

    var url = basePath+"Teacher/updateProfile.do";
    var data = {
        'email': email,
        'iphone':iphone,
        'realname': realname
    };

    if(!checkMobile(iphone)){
        alert("请填写正确的手机号！");
    }else if(realname=="" || iphone==""){
        alert("请将修改信息填写完整，不能为空！");
    }else{
        $.post(url,data,function(result){
            if(result["status"]==1){
                alert("修改成功！");
                window.location=basePath+"jsp/teacher/profile.jsp";
            }else {
                alert("发生了未知错误,请刷新也页面，重新尝试！");
            }
        },'JSON');
    }
})

//验证手机号
function checkMobile(s){
    var length = s.length;
    if(length == 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|)+\d{8})$/.test(s) ){
        return true;
    }else{
        return false;
    }
}
