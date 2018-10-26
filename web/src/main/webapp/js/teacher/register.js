/**
 * Created by 吕港 on 2017/11/20.
 */
var basePath;
window.onload=function(){
    basePath=$("#basePath").val();
}

function uploadPic(){
    // 上传设置
    //var url= basePath+"Teacher/uploadPic.do";
    //var data=$("#jvForm").serialize();
    var options = {
        // 规定把请求发送到那个URL
        url: basePath+"Teacher/uploadPic.do",
        // 请求方式
        type: "post",
        // 服务器响应的数据类型
        dataType: "json",
        // 请求成功时执行的回调函数
        success: function(data, status, xhr) {
            // 图片显示地址
            $("#allUrl").attr("src", basePath+data["path"]);
            $("#allUrl").css("width", "100%");
            //$("#allUrl").css("height", "45%");
            $("#allUrl").show();
            $("#lvGang").val(data["imageUrl"]);
        }
    };

    $("#jvForm").ajaxSubmit(options);



    //$.post(url,data,function(result){
    //    for(var i in result){
    //        alert(i+":"+result[i]);
    //    }
    //},'JSON');
}

var teacher={
    register:function() {


        var email = $('input[name="username"]').val();
        var password = $('input[name="password"]').val();
        var identify = $('input[name="identify"]').val();
        var iphone = $('input[name="iphone"]').val();
        var realname = $('input[name="realname"]').val();
        //var username = $('input[name="username"]').val();
        var identification= $('#lvGang').val();

        var url = basePath+"Teacher/register.do";
        var data = {
            'email': email,
            'password': password,
            'identify':identify,
            'iphone': iphone,
            'realname':realname,
            'identification':identification,
            'username':email,
            'status':0,
            'ifDelete':0
        };

        if(email == "" || password == "" || identify == "" || iphone == "" || realname == ""){
            alert("请将注册信息填写完整！");
        }else if(identification==null || identification.trim()==""){
            alert("请上传你的教师证件照！");
        }else if(!checkMobile(iphone)){
            alert("请输入正确的手机号!")
        }else {
            $.post(url, data, function (result) {
                if(result["status"]==0){
                    alert("注册成功！");
                    window.location=basePath+"jsp/teacher/login.jsp";
                }else if(result["status"]==1){
                    alert("邮箱已被注册！");
                }else if(result["status"]==2){
                    alert("验证码错误！");
                }

            }, 'JSON');
        }
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