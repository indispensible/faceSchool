/**
 * Created by 吕港 on 2018/3/13.
 */

var basePath;
var classInfo = [];
var TId;
var CId;

window.onload=function(){
    basePath=$("#basePath").val();
    TId=getQueryString("TId");
    CId=getQueryString("CId");
    var data={
        'TId':TId
    };
    var url=basePath+"find/classesByTId.do";
    //var basePath=$("#basePath").val();

    $.post(url,data,function(result){
        for(var i in result){
            if(CId == result[i]["cid"]){
                classInfo = result[i]
            }
        }

        $("#updateTitle").html(classInfo["cname"])
        $("#signlvgang").html(classInfo["countsign"] + "次")
        $("#name").val(classInfo["cname"])
        $("#phone").html(classInfo["cdescription"])
        $("#createTime").html(arrangeTime(classInfo["createtime"]))
        $("#nolvgang").html(classInfo["cid"])

    },'JSON');
}

$("#submit").click(function(){
    window.location=basePath + "jsp/teacher/updateClass.jsp?cid="+ CId +"&tid=" + TId;
})

$("#sendByLvgang").click(function(){
    var cname=$('input[name="realname"]').val();
    var cdescription = $('textarea[name="phone"]').val();
    var cid = $("#nolvgang").html()
    //alert(cdescription)

    var url = basePath+"Teacher/updateClass.do";
    var data = {
        'cid': cid,
        'cname':cname,
        'cdescription': cdescription
    };

    $.post(url,data,function(result){
        if(result["status"]==1){
            alert("修改成功！");
            window.location=basePath+"jsp/teacher/updateClass.jsp?cid="+ CId +"&tid=" + TId;
        }else {
            alert("发生了未知错误,请刷新也页面，重新尝试！");
        }
    },'JSON');

})

function arrangeTime(time){
    var aTime=time.substr(0,10);
    var data=aTime.split("-");
    var needTime=data[0]+"年"+data[1]+"月"+data[2]+"日";
    return needTime;
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}