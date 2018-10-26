/**
 * Created by 吕港 on 2017/11/26.
 */
var basePath;
var status;
window.onload=function(){
    $("#span9DIv").hide();
    $("#hideTHead").hide();
    basePath=$("#basePath").val();
    var data={};
    var url=basePath+"Administrator/findAdministrator.do";
    $.post(url,data,function(result){
        $("#administratorName").html(result["realname"]);
        status=result["status"];
        $("#getUsername").html("账号不能修改，账号为:" + result["username"]);
    },'JSON');
};
//查询所有有权限的管理员并可删除
$("#queryAdministrator").click(function(){
    $("#span9DIv").show();
    $("#hideTHead").hide();
    $("#displayAll").show();
    $("#appendAdministratorFrom").hide();
    //$("#newUsername").hide();
    $("#newUsername").html("查看管理员权限");
    $("#updatePassword").hide();
    $("#displayAll").html("");
    var data={};
    var url=basePath+"Administrator/queryAdministrator.do";
    $.post(url,data,function(result){
        if(result[0]==null){
            alert("查询出错，请刷新页面再来重试！");
        }else{
            $("#displayAll").append("<tr id='queryAdministratorTrH'></tr>");
            $("#queryAdministratorTrH").append("<td>管理员序号</td>");
            $("#queryAdministratorTrH").append("<td>管理员姓名</td>");
            $("#queryAdministratorTrH").append("<td>管理员账号</td>");
            $("#queryAdministratorTrH").append("<td>管理员邮箱</td>");
            $("#queryAdministratorTrH").append("<td>管理员级别</td>");
            $("#queryAdministratorTrH").append("<td>管理员电话</td>");
            $("#queryAdministratorTrH").append("<td>删除权限</td>");

            for(var i in result){
                $("#displayAll").append("<tr id='queryAdministratorTr"+result[i]["id"]+"'></tr>");
                var status;
                if(result[i]["id"]==1){
                    status="超级管理员";
                }else{
                    status="普通管理员";
                }
                $("#queryAdministratorTr"+result[i]["id"]).append("<td>"+result[i]["id"]+"</td>");
                $("#queryAdministratorTr"+result[i]["id"]).append("<td>"+result[i]["realname"]+"</td>");
                $("#queryAdministratorTr"+result[i]["id"]).append("<td>"+result[i]["username"]+"</td>");
                $("#queryAdministratorTr"+result[i]["id"]).append("<td>"+result[i]["email"]+"</td>");
                $("#queryAdministratorTr"+result[i]["id"]).append("<td>"+status+"</td>");
                $("#queryAdministratorTr"+result[i]["id"]).append("<td>"+result[i]["iphone"]+"</td>");
                $("#queryAdministratorTr"+result[i]["id"]).append("<td><input id='deleteAdministrator"+result[i]["id"]+"' class='delete' type='button' value='删除其权限'></td>");
            }

            var clickButton="Administrators";

            //删除管理员：超级管理员权限
            deleteAdministrator(clickButton);
        }
    },'JSON');
});

//添加新的管理员
$("#appendAdministrator").click(function(){
    $("#span9DIv").show();
    $("#hideTHead").hide();
    $("#displayAll").hide();
    $("#appendAdministratorFrom").show();
    //$("#newUsername").hide();
    $("#newUsername").html("账号自动生成，注册完后会告知！(密码默认为:123456,请自行修改！)");
    $("#displayAll").html("");
    $("#updatePassword").hide();
});

$("#appendAdministratorInput").click(function(){
    var email=$('input[name="email"]').val();
    var iphone=$('input[name="iphone"]').val();
    var realname=$('input[name="realname"]').val();
    var data={
        'email':email,
        'iphone':iphone,
        'realname':realname
    };
    var url=basePath+"Administrator/appendAdministrator.do";
    $.post(url,data,function(result){
        if(result["status"]==1){
            alert("添加成功");
            $("#newUsername").html("新生成的账号用户名为："+result["username"]+"密码为："+result["password"]+
                "<br/>可自行修改密码！");
            $("#appendAdministratorFrom").hide();
            $("#newUsername").show();
        }else{
            alert("注册失败，请刷新页面重新尝试！");
        }
    },'JSON');
});

//修改管理员密码
$("#updateAdministratorPassword").click(function(){
    var user=$("#getUsername").html();
    $("#newUsername").html(user);
    $("#span9DIv").show();
    $("#hideTHead").hide();
    $("#displayAll").hide();
    $("#appendAdministratorFrom").hide();
    //$("#newUsername").hide();
    $("#displayAll").html("");
    $("#updatePassword").show();
});

$("#updatePasswordFrom").click(function () {
    var password=$('input[name="password"]').val();
    var data={
        'password':password
    };
    var url=basePath+"Administrator/updatePassword.do";
    $.post(url,data,function(result){
        alert(result["msg"]);
        $("#updatePassword").hide();
    },'JSON');
});

//查看所有待审核的老师并可通过与拒绝
$("#queryAllCheckPending").click(function(){
    $("#newUsername").html("待审核的老师");
    $("#span9DIv").show();
    $("#hideTHead").hide();
    $("#displayAll").show();
    $("#appendAdministratorFrom").hide();
    //$("#newUsername").hide();
    $("#displayAll").html("");
    $("#updatePassword").hide();
    var data={
        'status':0,
        'ifDelete':0
    };
    var url=basePath+"Administrator/queryAllCheckPending.do";
    $.post(url,data,function(result){
        if(result[0]==null){
            $("#displayAll").html("还没有待审核的老师！");
        }else{
            $("#displayAll").append("<tr id='queryAllCheckPendingTrH'></tr>");
            $("#queryAllCheckPendingTrH").append("<td>老师序号</td>");
            $("#queryAllCheckPendingTrH").append("<td>老师姓名</td>");
            $("#queryAllCheckPendingTrH").append("<td>老师邮箱</td>");
            $("#queryAllCheckPendingTrH").append("<td>老师电话</td>");
            $("#queryAllCheckPendingTrH").append("<td>待审核老师照片</td>");
            $("#queryAllCheckPendingTrH").append("<td>批准</td>");
            $("#queryAllCheckPendingTrH").append("<td>不批准</td>");

            for(var i in result){
                $("#displayAll").append("<tr id='queryAllCheckPendingTr"+result[i]["tid"]+"'></tr>");
                $("#queryAllCheckPendingTr"+result[i]["tid"]).append("<td>"+result[i]["tid"]+"</td>");
                $("#queryAllCheckPendingTr"+result[i]["tid"]).append("<td>"+result[i]["realname"]+"</td>");
                $("#queryAllCheckPendingTr"+result[i]["tid"]).append("<td>"+result[i]["email"]+"</td>");
                $("#queryAllCheckPendingTr"+result[i]["tid"]).append("<td>"+result[i]["iphone"]+"</td>");
                $("#queryAllCheckPendingTr"+result[i]["tid"]).append("<td><input id='"+result[i]["identification"]+"' class='queryAllCheckPendingGang' type='button' value='点击可查看' /></td>");
                $("#queryAllCheckPendingTr"+result[i]["tid"]).append("<td><input id='agreePending"+result[i]["tid"]+"' class='agree' type='button' value='批准'></td>");
                $("#queryAllCheckPendingTr"+result[i]["tid"]).append("<td><input id='disagreePending"+result[i]["tid"]+"' class='disagree' type='button' value='不批准'></td>");
            }

            var clickButton="checkPending";

            //查看老师照片
            checkTeacher();

            //审核通过
            agreePending(clickButton);

            //审核不通过
            disagreePending(clickButton);
        }
    },'JSON');
});

//查看所有已审核的老师:可删除
$("#queryAllChecked").click(function(){
    $("#newUsername").html("已审核的老师");
    $("#span9DIv").show();
    $("#hideTHead").hide();
    $("#displayAll").show();
    $("#appendAdministratorFrom").hide();
    //$("#newUsername").hide();
    $("#displayAll").html("");
    $("#updatePassword").hide();
    var data={
        'status':1,
        'ifDelete':0
    };
    var url=basePath+"Administrator/queryAllChecked.do";
    $.post(url,data,function(result){
        if(result[0]==null){
            $("#displayAll").html("还没有已审核的老师！");
        }else{
            $("#displayAll").append("<tr id='queryAllCheckedTrH'></tr>");
            $("#queryAllCheckedTrH").append("<td>老师序号</td>");
            $("#queryAllCheckedTrH").append("<td>老师姓名</td>");
            $("#queryAllCheckedTrH").append("<td>老师邮箱</td>");
            $("#queryAllCheckedTrH").append("<td>老师电话</td>");
            $("#queryAllCheckedTrH").append("<td>老师照片</td>");
            $("#queryAllCheckedTrH").append("<td>取消教师资格</td>");
            $("#queryAllCheckedTrH").append("<td>审核通过的管理员序号</td>");
            $("#queryAllCheckedTrH").append("<td>审核通过的管理员姓名</td>");

            for(var i in result){
                $("#displayAll").append("<tr id='queryAllCheckPendingTr"+result[i]["tid"]+"'></tr>");
                $("#queryAllCheckPendingTr"+result[i]["tid"]).append("<td>"+result[i]["tid"]+"</td>");
                $("#queryAllCheckPendingTr"+result[i]["tid"]).append("<td>"+result[i]["realname"]+"</td>");
                $("#queryAllCheckPendingTr"+result[i]["tid"]).append("<td>"+result[i]["email"]+"</td>");
                $("#queryAllCheckPendingTr"+result[i]["tid"]).append("<td>"+result[i]["iphone"]+"</td>");
                $("#queryAllCheckPendingTr"+result[i]["tid"]).append("<td><input id='"+result[i]["identification"]+"' class='queryAllCheckPendingGang' type='button' value='点击可查看' /></td>");
                $("#queryAllCheckPendingTr"+result[i]["tid"]).append("<td><input id='disagreePending"+result[i]["tid"]+"' class='disagree' type='button' value='取消教师资格'></td>");
                $("#queryAllCheckPendingTr"+result[i]["tid"]).append("<td>"+result[i]["adoptByAId"]+"</td>");
                $("#queryAllCheckPendingTr"+result[i]["tid"]).append("<td>"+result[i]["adoptAdministrator"]["realname"]+"</td>");
            }

            var clickButton="allChecked";

            //查看老师照片
            checkTeacher();

            //取消教师资格
            disagreePending(clickButton);
        }
    },'JSON');
});

//查看所有已删除的老师：可恢复
$("#queryAllDeleted").click(function(){
    $("#newUsername").html("已删除的老师");
    $("#span9DIv").show();
    $("#hideTHead").hide();
    $("#displayAll").show();
    $("#appendAdministratorFrom").hide();
    //$("#newUsername").hide();
    $("#displayAll").html("");
    $("#updatePassword").hide();
    var data={
        'status':0,
        'ifDelete':1
    };
    var url=basePath+"Administrator/queryAllDeleted.do";
    $.post(url,data,function(result){
        if(result[0]==null){
            $("#displayAll").html("还没有已删除的老师！");
        }else{
            $("#displayAll").append("<tr id='queryAllCheckedTrH'></tr>");
            $("#queryAllCheckedTrH").append("<td>老师序号</td>");
            $("#queryAllCheckedTrH").append("<td>老师姓名</td>");
            $("#queryAllCheckedTrH").append("<td>老师邮箱</td>");
            $("#queryAllCheckedTrH").append("<td>老师电话</td>");
            $("#queryAllCheckedTrH").append("<td>老师照片</td>");
            $("#queryAllCheckedTrH").append("<td>取消教师资格</td>");
            $("#queryAllCheckedTrH").append("<td>取消资格的管理员序号</td>");
            $("#queryAllCheckedTrH").append("<td>取消资格的管理员姓名</td>");

            for(var i in result){
                $("#displayAll").append("<tr id='queryAllDeletedTr"+result[i]["tid"]+"'></tr>");
                $("#queryAllDeletedTr"+result[i]["tid"]).append("<td>"+result[i]["tid"]+"</td>");
                $("#queryAllDeletedTr"+result[i]["tid"]).append("<td>"+result[i]["realname"]+"</td>");
                $("#queryAllDeletedTr"+result[i]["tid"]).append("<td>"+result[i]["email"]+"</td>");
                $("#queryAllDeletedTr"+result[i]["tid"]).append("<td>"+result[i]["iphone"]+"</td>");
                $("#queryAllDeletedTr"+result[i]["tid"]).append("<td><input id='"+result[i]["identification"]+"' class='queryAllCheckPendingGang' type='button' value='点击可查看' /></td>");
                $("#queryAllDeletedTr"+result[i]["tid"]).append("<td><input id='agreePending"+result[i]["tid"]+"' class='agree' type='button' value='恢复教师资格'></td>");
                $("#queryAllDeletedTr"+result[i]["tid"]).append("<td>"+result[i]["deleteByAId"]+"</td>");
                $("#queryAllDeletedTr"+result[i]["tid"]).append("<td>"+result[i]["deleteAdministrator"]["realname"]+"</td>");
            }

            var clickButton="allDeleted";

            //查看老师照片
            checkTeacher();

            //取消教师资格
            agreePending(clickButton);
        }
    },'JSON');
});

//弹出隐藏层
function ShowDiv(show_div,bg_div,val){
    document.getElementById(show_div).style.display='block';
    document.getElementById(bg_div).style.display='block' ;
    var bgdiv = document.getElementById(bg_div);
    bgdiv.style.width = document.body.scrollWidth;
// bgdiv.style.height = $(document).height();
    $("#"+bg_div).height($(document).height());
    var src=basePath+val;
    $("#lvGangImg").attr("src",src);
};
//关闭弹出层
function CloseDiv(show_div,bg_div)
{
    document.getElementById(show_div).style.display='none';
    document.getElementById(bg_div).style.display='none';
};

function checkTeacher(){
    $(".queryAllCheckPendingGang").click(function(){
        $("#lvGangImg").attr("src","");
        var val=$(this).attr("id").substring(31);
        ShowDiv('MyDiv','fade',val);
    });
}

//1:agree,0:disagree
function agreePending(clickButton){
    $(".agree").click(function(){
        var val=$(this).attr("id");
        var TId=val.substr(12);
        var data={
            'TId':TId,
            'status':1,
            'ifDelete':0,
            'agree':1
        };
        var url=basePath+"Administrator/judgeCommon.do";
        $.post(url,data,function(result){
            alert(result["msg"]);
            $('#'+clickButton).trigger("click");
        },'JSON');
    });
}

//1:agree,0:disagree
function disagreePending(clickButton){
    $(".disagree").click(function(){
        var val=$(this).attr("id");
        var TId=val.substr(15);
        var removeId=$("#"+val).parent().parent().attr("id");
        var data={
            'TId':TId,
            'status':0,
            'ifDelete':1,
            'agree':0
        };
        var url=basePath+"Administrator/judgeCommon.do";
        $.post(url,data,function(result){
            alert(result["msg"]);
            $('#'+clickButton).trigger("click");
        },'JSON');
    });
}

function deleteAdministrator(clickButton){
    $(".delete").click(function(){
        var val=$(this).attr("id");
        var AId=val.substr(19);
        var removeId=$("#"+val).parent().parent().attr("id");
        var data={
            'AId':AId,
            'status':0
        };
        var url=basePath+"Administrator/deleteAdministrator.do";
        $.post(url,data,function(result){
            alert(result["msg"]);
            $('#'+clickButton).trigger("click");
        },'JSON');
    });
}

$(".signOut").click(function(){
    var data={
        'status':status
    };
    var url=basePath+"Administrator/signOut.do";
    $.post(url,data,function(result){
        window.location.href=basePath+"jsp/administrator/login.jsp";
    },'JSON');
});
