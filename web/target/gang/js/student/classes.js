/**
 * Created by 吕港 on 2017/11/11.
 */
var SId;
//开始时加载用于获取学生id
var basePath;
var mhUsername;
var classes = [];

window.onload=function(){
    $("#findClass").hide();
    $("#span9DIv").hide();
    $("#hideTHead").hide();
    basePath=$("#basePath").val();
    var data={};
    var url=basePath+"StuFind/getStuId.do";
    $.post(url,data,function(result){
        SId=result["id"];
        mhUsername=result["mhUsername"];
        $("#usernameForStudent").html(result["realname"]);
    },'JSON');
}

$("#haveClasses").click(function(){
    $(".myClass").hide();
    $(".myBook").hide();
    $("#span9DIv").show();
    $("#findClass").hide();
    $("#DataTables_Table_0_length").show();
    $("#lvgangB").show();
    $("#lvgangH3").html("我的课程");
    $("#selectedTime").show();
    var data={};
    var url=basePath+"StuFind/classes.do";
    $(".lvgangFClasses").hide();
    $(".lvgangFCForYou").show();

    $.post(url,data,function(result){
        //有没有相应的在学习的课程
        var i=0;
        for( i in result){
            i=i;
        }

        //获取学生ID
        var sid=result[i]["SId"];
        if(result[0] == null){
            $('#lvgangFC').html("");
            $('#lvgangFC').html("你还没有加入任何课堂哦!");
        }else{

            classes = result;

            $('#lvgangFC').html("");

            //插入课程列表
            var i2=0;
            for(i2 in result){
                if(i2<i){
                    $("#lvgangFC").append("<tr id='haveClass"+i2+"'></tr>");
                    $("#haveClass"+i2).append("<td style='text-align: center;'>"+result[i2]["classes"]["cid"]+"</td>");
                    $("#haveClass"+i2).append("<td style='text-align: center;'><a href='"+basePath+"jsp/student/classDetail.jsp?cid="+result[i2]["classes"]["cid"]+"&sid="+sid+"' target='_blank'>"+result[i2]["classes"]["cname"]+"</a></td>");
                    $("#haveClass"+i2).append("<td style='text-align: center;'>"+result[i2]["teacher"]["realname"]+"</td>");
                    $("#haveClass"+i2).append("<td style='text-align: center;'>"+result[i2]["teacher"]["email"]+"</td>");
                    $("#haveClass"+i2).append("<td style='text-align: center;'>"+result[i2]["classes"]["countsign"]+"次</td>");
                    $("#haveClass"+i2).append("<td style='text-align: center;'><input id='deleteClass"+result[i2]["classes"]["cid"]+"'type='button' class='deleteClass' value='删除课程'></td>");
                }
            }

            //删除课程
            deleteClass();
        }

    },'JSON');
});

$("#lvgang").click(function(){
    $(".myClass").hide();
    $(".myBook").hide();
    $(".lvgangFCForYou").hide();
    $(".lvgangFClasses").show();

    var para=$('input[name="class"]').val();
    var isString;


    var url=basePath+"find/class.do";
    if(isNaN(para)){
        isString="true";
    }else{
        isString="false";
    }
    var data={
        'para':para,
        'isString':isString
    };

    $.post(url,data,function(result){

        //判断是通过课程序号还是课程名来查询课程并
        if(isNaN(para)){
            //有没有相应的课程查询结果
            var i=0;
            for( i in result){
                i++;
            }
            if(i==0){
                $('.lvgangFClasses').html("");
                alert("输入的课程名不存在！");
            }else{
                $('#lvgangFindC').html("");

                for(var i1 in result){
                    var time = arrangeTime(result[i1]["createtime"]);
                    $("#lvgangFindC").append("<tr id='findClass"+i1+"'></tr>");
                    $("#findClass"+i1).append("<td>"+result[i1]["cid"]+"</td>");
                    $("#findClass"+i1).append("<td>"+result[i1]["cname"]+"</td>");
                    $("#findClass"+i1).append("<td>"+result[i1]["cdescription"]+"</td>");
                    $("#findClass"+i1).append("<td>"+time+"</td>");
                    $("#findClass"+i1).append("<td>"+result[i1]["teacher"]["realname"]+"</td>");
                    $("#findClass"+i1).append("<td>"+result[i1]["teacher"]["email"]+"</td>");
                    $("#findClass"+i1).append("<td><input id='joinClass"+result[i1]["cid"]+"' type='button' class='joinClass' value='加入课程'></td>");
                }
            }

            //加入课程
            //joinClass();
        }else{
            if(result["classes"]==0){
                $('.lvgangFClasses').html("");
                alert("输入的课程序号不存在！");
            }else{

                $('#lvgangFindC').html("");

                var time = arrangeTime(result["createtime"]);

                $("#lvgangFindC").append("<tr id='tr1'></tr>");

                $("#tr1").append("<td>"+result["cid"]+"</td>");
                $("#tr1").append("<td>"+result["cname"]+"</td>");
                $("#tr1").append("<td>"+result["cdescription"]+"</td>");
                $("#tr1").append("<td>"+time+"</td>");
                $("#tr1").append("<td>"+result["teacher"]["realname"]+"</td>");
                $("#tr1").append("<td>"+result["teacher"]["email"]+"</td>");
                $("#tr1").append("<td><input id='joinClass"+result["cid"]+"' type='button' class='joinClass' value='加入课程'></td>");

            }
        }

        //加入课程
        joinClass();

    },'JSON');
});

function arrangeTime(time){
    var aTime=time.substr(0,10);
    var data=aTime.split("-");
    var needTime=data[0]+"年"+data[1]+"月"+data[2]+"日";
    return needTime;
}

function joinClass(){
    $(".joinClass").click(function(){
        var val=$(this).attr("id");
        var CId=val.substr(9);
        var data={
            'CId':CId,
            'SId':SId
        };
        var url=basePath+"StuFind/insertClassForStudent.do";
        $.post(url,data,function(result){
            alert(result["msg"]);
        },'JSON');
    });
}

function deleteClass(){
    $(".deleteClass").click(function(){
        var val=$(this).attr("id");
        var removeId=$("#"+val).parent().parent().attr("id");
        var CId=val.substr(11);
        var data={
            'SId':SId,
            'CId':CId
        }
        var url=basePath+"StuFind/deleteClass.do";
        $.post(url,data,function(result){
            alert(result["msg"]);
            $("#"+removeId).remove();
        },'JSON');
    });
}

$("#lvgangA").click(function(){
    $("#span9DIv").show();
    $("#findClass").show();
    $(".lvgangFCForYou").hide();
    $("#DataTables_Table_0_length").hide();
    $("#lvgangB").hide();
    $(".lvgangFClasses").hide();
    $(".myClass").hide();
    $(".myBook").hide();
    $("#selectedTime").hide();
});

$(".signOut").click(function(){
    var data={};
    var url=basePath+"login/signOut.do";
    $.post(url,data,function(result){
        window.location.href=basePath+"jsp/student/login.jsp";
    },'JSON');
});

$("#myClasses").click(function(){

    $(".myClass").show();
    $("#span9DIv").show();
    $("#lvgangB").show();
    $("#lvgangH3").html("我的课程");
    $(".myBook").hide();
    $(".lvgangFClasses").hide();
    $(".lvgangFCForYou").hide();
    $("#findClass").hide();
    $("#lvgangClasses").html("");

    var url=basePath+"login/myClasses.do";
    var data={
        'mhUsername':mhUsername
    };
    $.post(url,data,function(result){
        //有没有相应的在学习的课程
        var i=0;
        for( i in result){
            i=i;
        }

        //获取学生ID
        var sid=result[i]["SId"];
        if(i==0){
            $('#lvgangClasses').html("");
            $('#lvgangClasses').html("你这学期没有课程哦!");
        }else {

            $('#lvgangClasses').html("");

            //插入课程列表
            var i2 = 0;
            for (i2 in result) {
                if (i2 < i) {
                    $("#lvgangClasses").append("<tr id='myClass" + i2 + "'></tr>");
                    $("#myClass" + i2).append("<td>" + result[i2]["coursename"] + "</td>");
                    $("#myClass" + i2).append("<td>" + result[i2]["teacher"] + "</td>");
                    $("#myClass" + i2).append("<td style='width: 40%;'>" + result[i2]["coursetime"] + "</td>");
                }
            }
        }
    },'JSON');
});

$("#selectedTime").change(function(){
    $("#lvgangTime").css("display", "")
    $("#lvgangFC").html("")
    var SignCount=$("#selectedTime option:selected").val();
    //alert(SignCount)

    var res = classes;
    var result = [1];
    var numTime = 0;

    for(var j in res){
        //alert(SignCount)
        if(res[j]["createtime"] != null){
            //alert(SignCount + ":" + res[j]["createtime"].substring(0,4))
            if(SignCount == res[j]["createtime"].substring(0,4)){
                result[numTime] = res[j]
                //alert(result)
                numTime++;
            }
        }
    }

    if(SignCount == 2016){
        result = res
    }

    var i = 0;
    for(i in result){
        i = i;
    }


    //获取学生ID
    var sid=result[i]["SId"];
    if(result[0] == 1){
        //alert(111)
        $("#lvgangTime").css("display", "none")
        $('#lvgangFC').html("你还没有加入任何课堂哦!");
    }else{
        var i2=0;
        for(i2 in result){
            //if(i2<i){
                $("#lvgangFC").append("<tr id='haveClass"+i2+"'></tr>");
                $("#haveClass"+i2).append("<td style='text-align: center;'>"+result[i2]["classes"]["cid"]+"</td>");
                $("#haveClass"+i2).append("<td style='text-align: center;'><a href='"+basePath+"jsp/student/classDetail.jsp?cid="+result[i2]["classes"]["cid"]+"&sid="+sid+"' target='_blank'>"+result[i2]["classes"]["cname"]+"</a></td>");
                $("#haveClass"+i2).append("<td style='text-align: center;'>"+result[i2]["teacher"]["realname"]+"</td>");
                $("#haveClass"+i2).append("<td style='text-align: center;'>"+result[i2]["teacher"]["email"]+"</td>");
                $("#haveClass"+i2).append("<td style='text-align: center;'>"+result[i2]["classes"]["countsign"]+"次</td>");
                $("#haveClass"+i2).append("<td style='text-align: center;'><input id='deleteClass"+result[i2]["classes"]["cid"]+"'type='button' class='deleteClass' value='删除课程'></td>");
            //}
        }

        //删除课程
        deleteClass();
    }
});