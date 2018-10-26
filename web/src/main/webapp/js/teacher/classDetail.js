/**
 * Created by 吕港 on 2017/11/21.
 */

var over;
var attend;
var totalData;
var createTime;
var teacherName;
var classesName;
var count;

var basePath;
window.onload=function(){
    $("#span9DIv").hide();
    $("#hideTHead").hide();
    basePath=$("#basePath").val();
    var CId=getQueryString("cid");
    var countSign=getQueryString("countSign");
    var TId=getQueryString("tid");
    $("#teacherProfile").attr("href", basePath + "jsp/teacher/profile.jsp?TId=" + TId);
    $("#have_a_comment").attr("href", basePath + "jsp/teacher/comment.jsp?cid=" + CId + "&tid=" + TId)

    if(CId==null || TId==null || countSign==null){
        alert("不要修改域名哦！请重新放回上一个页面再使用！");
        $("#haveStudents").attr('disabled',true);
        $("#studentsDetail").attr('disabled',true);
    }else{
        var data={
            'CId':CId
        }
        var url=basePath+"find/getClass.do";
        $.post(url,data,function(result){
            if(result["status"]==0){
                alert("找不到该课程，您可能是该域名了！");
                $("#haveStudents").attr('disabled',true);
                $("#studentsDetail").attr('disabled',true);
            }else{
                var overDate=result["overtime"];
                over=Date.parse(new Date(overDate));
                var attendDate=result["attendtime"];
                attend=Date.parse(new Date(attendDate));
            }

            createTime=result["createtime"];
            teacherName=result["teacher"]["realname"];
            classesName=result["cname"];
            createTime=createTime.substr(0,10);
            var dates=createTime.split("-");
            createTime=dates[0]+"年"+dates[1]+"月"+dates[2]+"日";
            count=result["countsign"];
            $("#teacherName").html(result["teacher"]["realname"]);
        },'JSON');
    }
};

$("#haveStudents").click(function(){
    $("#main").hide()
    $("#span9DIv").show();
    $("#hideTHead").hide();
    $(".AllStudentsDetail").hide();
    //$("#lvgangH").html("所有的学生");
    //$("#lvgangH").show();
    $(".lvgangFS").show();
    $(".lvgangFSD").hide();
    $("#lvgangB").show();
    $("#lvgangC").hide();
    var url=basePath+'StuFind/studentsByCId.do';
    var CId=getQueryString("cid");
    var countSign=getQueryString("countSign");
    var data={
        'CId':CId
    };

    $.post(url,data,function(result){
        //有没有相应的在学习的课程
        var i=0;
        for(i in result){
            i=i;
        }

        $("#lvgangBody").html("");

        if(result[i]["status"]==0){
            $("#lvgangBody").html("该课程还没有学生哦！");
        }else {
            for(var i1 in result){
                if(i1<i){
                    $("#lvgangBody").append("<tr id='students"+i1+"'></tr>");
                    $("#students"+i1).append("<td>"+result[i1]["student"]["realname"]+"</td>");
                    $("#students"+i1).append("<td>"+result[i1]["student"]["username"]+"</td>");
                    $("#students"+i1).append("<td>"+result[i1]["student"]["iphone"]+"</td>");
                    $("#students"+i1).append("<td>"+result[i1]["student"]["mhUsername"]+"</td>");
                }
            }
        }

    },'JSON');
});

$("#studentsDetail").click(function(){
    $("#main").show()
    $("#span9DIv").show();
    $("#hideTHead").hide();
    $("#lvgangH1").html("班级整体签到情况");
    $(".lvgangFSD").show();
    $(".lvgangFS").hide();
    $("#lvgangH").hide();
    $("#lvgangB").hide();
    $("#lvgangC").show();
    //$(".AllStudentsDetail").hide();
    var countSign=getQueryString("countSign");

    $("#selectSignCount").html("");

    for(var i=countSign;i>=1;i--){
        if(i==countSign){
            $("#selectSignCount").append("<option value ='"+i+"'>最近一次签到(第"+i+"次签到)</option>");
        }else{
            $("#selectSignCount").append("<option value ='"+i+"'>第"+i+"次签到</option>");
        }
    }
    showTotal();
    printTotalDetail();

});

$("#selectSignCount").change(function(){
    $("#main").show()
    var SignCount=$("#selectSignCount option:selected").val();
    $("#lvgangH1").html("第"+SignCount+"次签到");
    studentDetail(SignCount);
});


function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

function studentDetail(SignCount){
    $("#main").show()
    $("#span9DIv").show();
    $("#hideTHead").hide();
    $(".lvGangTable").show();
    $(".lvgangFS").hide();
    var CId=getQueryString("cid");
    var countSign=getQueryString("countSign");
    var data={
        'CId':CId,
        'countSign':SignCount
    };
    var status;

    $("#lvgangFSDBody").html("");
    $("#lvgangFSDBody").show();
    $(".AllStudentsDetail").hide();
    var url=basePath+"StuFind/studentsDetail.do";

    var normal = 0
    var leave = 0
    var early = 0
    var late = 0
    var absence = 0

    $.post(url,data,function(result){
        //1:请假，2：上课签到正常，3：迟到，4：早退，5：正常上课，其他：未到
        //for(var i in result){
        //    switch (result[i]["signstate"]){
        //        case 1:status="请假";break;
        //        case 2:status="上课签到正常";break;
        //        case 3:status="迟到";break;
        //        case 4:status="早退";break;
        //        case 5:status="正常上课";break;
        //        default:status="未到";break;
        //    }
        //    alert(result[i]["student"]["realname"]+":"+status);
        //}

        var i=0;
        for(i in result){
            var overDate=result[i]["overtime"];
            var overTime=Date.parse(new Date(overDate));
            var attendDate=result[i]["attendTime"];
            var attendTime=Date.parse(new Date(attendDate));
            if(attendTime>overTime && countSign==SignCount){
                switch (result[i]["signstate"]){
                    case 1:status="请假";break;
                    case 2:status="上课签到正常";break;
                    case 3:status="迟到";break;
                    case 4:status="早退";break;
                    case 5:status="正常上课";break;
                    default:status="未到";break;
                }
            }else{
                switch (result[i]["signstate"]){
                    case 1:status="请假";leave = leave + 1;break;
                    case 3:status="迟到";late = late + 1;break;
                    case 2:
                    case 4:status="早退";leave = leave + 1;break;
                    case 5:status="正常上课";normal = normal + 1;break;
                    default:status="未到";absence = absence + 1;break;
                }
            }

            var studentSignstate;
            if(result[i]["signstate"]==null){
                studentSignstate=0;
            }else{
                studentSignstate=result[i]["signstate"];
            }

            $("#lvgangFSDBody").append("<tr id='studentsDetail"+i+"'></tr>");
            $("#studentsDetail"+i).append("<td>"+result[i]["student"]["realname"]+"</td>");
            $("#studentsDetail"+i).append("<td>"+result[i]["student"]["mhUsername"]+"</td>");
            $("#studentsDetail"+i).append("<td id='updateStatus"+result[i]["sid"]+"'>"+status+"</td>");
            $("#studentsDetail"+i).append("<td><input id='updateStatus"+result[i]["sid"]+"_signCount"+SignCount+"_signstate"+studentSignstate+"' class='updateStatus' type='button' value='修改签到情况'> <input style='display:none' id='ensureStudent"+result[i]["sid"]+"' class='ensure' type='button' value='确定'></td>");
            //$("#studentsDetail"+i).append("<input style='display:none' id='ensureStudent"+result[i]["sid"]+"' class='ensure' type='button' value='确定'>");
        }

        var title = "第" + SignCount + "次签到情况"
        createCharts(normal, absence, leave, late, early, title)

        //修改学生签到信息
        updateStatus(i);
    },'JSON');
}

$("#showTotal").click(function(){
    $("#lvgangH1").html("班级整体签到情况");
    showTotal();
});

function showTotal(){
    $("#trh").html("");
    $("#trBody").html("");
    $(".AllStudentsDetail").show();
    $("#lvgangFSDBody").hide();
    $(".lvGangTable").hide();
    //$("#AllStudentsDetail").append("<tr id='trh'></tr>");
    //$("#AllStudentsDetail").append("<tbody id='trBody'></tbody>");
    $("#trh").html("");
    $("#trBody").html("");

    var CId=getQueryString("cid");
    var countSign=getQueryString("countSign");
    var data={
        'CId':CId,
    };
    var url=basePath+"StuFind/findStudentsDetail.do";

    var normal = 0
    var leave = 0
    var early = 0
    var late = 0
    var absence = 0

    if(over<attend){
        alert("请先将第"+countSign+"次签到完成！(先进行下课签到后再来查看全部签到情况！)");
    }else{
        $.post(url,data,function(result){
            $("#trh").append("<th>学生姓名</th>");
            $("#trh").append("<th>学号</th>");
            $("#trh").append("<th>正常上课</th>");
            $("#trh").append("<th>未到</th>");
            $("#trh").append("<th>请假</th>");
            $("#trh").append("<th>迟到</th>");
            $("#trh").append("<th>早退</th>");
            if(result[0]==null){
                $("#trBody").html("还没有学生进行过签到！");
            }else{
                for(var i in result){
                    var leaveEarly=parseInt(result[i]["a2"])+parseInt(result[i]["a4"]);
                    $("#trBody").append("<tr id='allDetail"+i+"'></tr>");
                    $("#allDetail"+i).append("<td>"+result[i]["realname"]+"</td>");
                    $("#allDetail"+i).append("<td>"+result[i]["mhUsername"]+"</td>");
                    $("#allDetail"+i).append("<td>"+result[i]["a5"]+"次</td>");
                    $("#allDetail"+i).append("<td>"+(countSign-result[i]["studentCountSign"])+"次</td>");
                    $("#allDetail"+i).append("<td>"+result[i]["a1"]+"次</td>");
                    $("#allDetail"+i).append("<td>"+result[i]["a3"]+"次</td>");
                    $("#allDetail"+i).append("<td>"+leaveEarly+"次</td>");
                    normal = normal + result[i]["a5"]
                    absence = absence + parseInt(countSign) - parseInt(result[i]["studentCountSign"])
                    leave = leave + result[i]["a1"]
                    late = late + result[i]["a3"]
                    early = early + leaveEarly
                }
            }

            var title = "总签到情况"
            createCharts(normal, absence, leave, late, early, title)
            totalData=result;
        },'JSON');
    }
}

$("#printTotal").click(function () {
    // 使用outerHTML属性获取整个table元素的HTML代码（包括<table>标签），然后包装成一个完整的HTML文档，设置charset为urf-8以防止中文乱码
    var html = "<html><head><meta charset='utf-8' /></head><body>" + document.getElementById("hideTable").outerHTML + "</body></html>";
    // 实例化一个Blob对象，其构造函数的第一个参数是包含文件内容的数组，第二个参数是包含文件类型属性的对象
    var blob = new Blob([html], { type: "application/vnd.ms-excel" });
    var a = document.getElementById("printTotal");
    // 利用URL.createObjectURL()方法为a元素生成blob URL
    a.href = URL.createObjectURL(blob);
    // 设置文件名，目前只有Chrome和FireFox支持此属性
    var fileName=teacherName+"_"+classesName+"_课程创建时间为"+createTime;
    a.download = fileName+".xls";
});

function printTotalDetail(){
    var CId=getQueryString("cid");
    var countSign=getQueryString("countSign");
    var data={
        'CId':CId,
        'countSign':countSign
    };

    var average = 0
    if(countSign == 0){
        average = 100.0
    }else{
        average = 100.0 / countSign
    }

    var normal = average
    var leave = 0.8 * average
    var earlyOrLate = 0.6 * average
    var absence = 0 * average


    $("#hideTable").html("");

    $("#hideTable").append("<caption>学生成绩表  总共签到"+countSign+"次</caption>");
    $("#hideTable").append("<tr id='hideTrh'></tr>");
    $("#hideTrh").append("<th id='hideTrhSName' rowspan='2'>学生姓名</th>");
    $("#hideTrh").append("<th id='hideTrhSMHId' rowspan='2'>学号</th>");
    for(var i=1;i<=countSign;i++){
        $("#hideTrh").append("<th id='hideTrhSign"+i+"' rowspan='2'>第"+i+"次签到</th>");
    }
    $("#hideTrh").append("<th colspan='5'>总计</th>");


    $("#hideTable").append("<tr id='test'></tr>");
    $("#test").append("<th>正常上课</th>");
    $("#test").append("<th>未到</th>");
    $("#test").append("<th>请假</th>");
    $("#test").append("<th>迟到</th>");
    $("#test").append("<th>早退</th>");

    $("#hideTrh").append("<th rowspan='2'>总成绩</th>");

    var url=basePath+"StuFind/printDetail.do";

    if(over<attend){
        //alert("请先将第"+countSign+"次签到完成！(先进行下课签到后再来查看全部签到情况！)");
        $("#span9DIv").html("请先将第"+countSign+"次签到完成！(先进行下课签到后再来查看全部签到情况！)")

    }else{
        $.post(url,data,function(result){
            if(result[0]==null){
                alert("还没有学生签到过！");
            }else{
                for(var i in result){
                    $("#hideTable").append("<tr id='hideStudent"+i+"'></tr>");
                    $("#hideStudent"+i).append("<td>"+result[i]["student"]["realname"]+"</td>");
                    $("#hideStudent"+i).append("<td>"+result[i]["student"]["mhUsername"]+"</td>");
                    var dValue=1;
                    var number;
                    if(result[i]["scRealation"][0]!=null){
                        for( var num in result[i]["scRealation"]){
                            if((result[i]["scRealation"][num]["signcount"]-num)==dValue){
                                var status="";
                                switch (result[i]["scRealation"][num]["signstate"]){
                                    case 1:status="请假";break;
                                    case 3:status="迟到";break;
                                    case 2:
                                    case 4:status="早退";break;
                                    case 5:status="正常上课";break;
                                    default:status="未到";break;
                                }
                                $("#hideStudent"+i).append("<td>"+status+"</td>");
                            }else{
                                for(dValue;dValue<(result[i]["scRealation"][num]["signcount"]-num);dValue++){
                                    $("#hideStudent"+i).append("<td>未到</td>");
                                }

                                var status="";
                                switch (result[i]["scRealation"][num]["signstate"]){
                                    case 1:status="请假";break;
                                    case 3:status="迟到";break;
                                    case 2:
                                    case 4:status="早退";break;
                                    case 5:status="正常上课";break;
                                    default:status="未到";break;
                                }
                                $("#hideStudent"+i).append("<td>"+status+"</td>");

                            }

                            number=num;
                        }
                        for(dValue;dValue<(count-number);dValue++){
                            $("#hideStudent"+i).append("<td>未到</td>");
                        }
                    }else{
                        for(var iii=0;iii<countSign;iii++){
                            $("#hideStudent"+i).append("<td>未到</td>");
                        }
                    }

                }

                for(var i in totalData){
                    for(var j in result){
                        if(totalData[i]["mhUsername"] == result[j]["student"]["mhUsername"]){
                            var leaveEarly=parseInt(totalData[i]["a2"])+parseInt(totalData[i]["a4"]);
                            $("#hideStudent"+j).append("<td>"+totalData[i]["a5"]+"次</td>");
                            $("#hideStudent"+j).append("<td>"+(countSign-totalData[i]["studentCountSign"])+"次</td>");
                            $("#hideStudent"+j).append("<td>"+totalData[i]["a1"]+"次</td>");
                            $("#hideStudent"+j).append("<td>"+totalData[i]["a3"]+"次</td>");
                            $("#hideStudent"+j).append("<td>"+leaveEarly+"次</td>");
                            var score = 0
                            if(countSign == 0){
                                score = 100
                            }else{
                                score = totalData[i]["a5"] * normal + totalData[i]["a1"] * leave + (totalData[i]["a3"] + leaveEarly)*earlyOrLate
                                score = score.toFixed(2)
                            }
                            $("#hideStudent"+j).append("<td>"+score+"</td>");
                        }
                    }
                }
            }
        },'JSON');
    }
}


//$("#printTotal").hover(function() {
//    $(this).css("background", "#02bafa");
//}, function() {
//    $(this).css("background", "#e4e4e4");
//});

var signCount,need,studentsNum1;
var statusNum;
var status;

function updateStatus(studentsNum){
    $(".updateStatus").click(function(){
        studentsNum1=studentsNum;
        var val=$(this).attr("id");
        var removeId=$("#"+val).parent().parent().attr("id");
        var parentNum=removeId.substr(14);
        need=val.split("_");
        status=$("#"+need[0]).html();
        var SId=need[0].substr(12);
        signCount=need[1].substr(9);
        var signState=need[2].substr(9);

        $(".updateStatus").attr('disabled',true);
        $(".updateStatus").val("请先修改之前选中的学生");


        $("#"+need[0]).html("<select id='selectStatus'>" +
            "<option value ='1000'>请选择</option>"+
            "<option value ='1'>请假</option>"+
            "<option value ='3'>迟到</option>"+
            "<option value ='4'>早退</option>"+
            "<option value ='5'>正常上课</option>"+
            "</select>");
        if(signState==2){
            signState=4;
        }

        statusNum=signState;

        $("#selectStatus").val(signState);
        $("#"+val).hide();
        $("#ensureStudent"+SId).show();





        $("#selectStatus").change(function(){
            var selectStatus=signCount;
            statusNum=$("#selectStatus option:selected").val();
            status=$("#selectStatus").find("option:selected").text();
        });


        $("#ensureStudent"+SId).click(function(){
            $(".updateStatus").attr('disabled',false);
            $(".updateStatus").val("修改签到情况");
            $("#"+val).show();
            $("#ensureStudent"+SId).hide();
            $("#"+need[0]).html(status);

            var CId=getQueryString("cid");
            var postData={
                'CId':CId,
                'SId':SId,
                'SignState':statusNum,
                'SignCount':signCount
            };

            var url=basePath+"SCFind/updateStatus.do";

            $.post(url,postData,function(result){
                if(result["status"]==0){
                    alert("修改成功！");
                }else {
                    alert("修改失败！");
                }
            },'JSON');

        });


    });
}

$(".signOut").click(function(){
    var data={};
    var url=basePath+"Teacher/signOut.do";
    $.post(url,data,function(result){
        window.location.href=basePath+"jsp/teacher/login.jsp";
    },'JSON');
});


function createCharts(normal, absence, leave, late, early, title){
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));

    // 指定图表的配置项和数据
    var scale = 1;
    var echartData = [{
        value: normal,
        name: '正常上课'
    }, {
        value: absence,
        name: '未到'
    }, {
        value: leave,
        name: '请假'
    }, {
        value: late,
        name: '迟到'
    },{
        value: early,
        name: '早退'
    }]
    var rich = {
        yellow: {
            color: "#ffc72b",
            fontSize: 30 * scale,
            padding: [5, 4],
            align: 'center'
        },
        total: {
            color: "#ffc72b",
            fontSize: 40 * scale,
            align: 'center'
        },
        white: {
            color: "#031f2d",
            align: 'center',
            fontSize: 14 * scale,
            padding: [21, 0]
        },
        blue: {
            color: '#49dff0',
            fontSize: 16 * scale,
            align: 'center'
        },
        hr: {
            borderColor: '#0b5263',
            width: '100%',
            borderWidth: 1,
            height: 0,
        }
    }
    option = {
        //backgroundColor: '#031f2d',
        backgroundColor: '#efefef',
        title: {
            text:title,
            left:'center',
            top:'50%',
            padding:[24,0],
            textStyle:{
                color:'black',
                fontSize:18*scale,
                align:'center'
            }
        },
        legend: {
            selectedMode:false,
            formatter: function(name) {
                var total = 0;
                var averagePercent;
                echartData.forEach(function(value, index, array) {
                    total += value.value;
                });
                return '{total|' + total + '}';
            },
            data: [echartData[0].name],
            left: 'center',
            top: 'center',
            icon: 'none',
            align:'center',
            textStyle: {
                color: "#fff",
                fontSize: 16 * scale,
                rich: rich
            },
        },
        series: [{
            name: '总签到次数',
            type: 'pie',
            radius: ['42%', '50%'],
            hoverAnimation: false,
            color: ['#c487ee', '#deb140', '#49dff0', '#034079', '#6f81da', '#00ffb4'],
            label: {
                normal: {
                    formatter: function(params, ticket, callback) {
                        var total = 0;
                        var percent = 0;
                        echartData.forEach(function(value, index, array) {
                            total += value.value;
                        });
                        percent = ((params.value / total) * 100).toFixed(1);
                        return '{white|' + params.name + '}\n{hr|}\n{yellow|' + params.value + '}\n{blue|' + percent + '%}';
                    },
                    rich: rich
                },
            },
            labelLine: {
                normal: {
                    length: 55 * scale,
                    length2: 0,
                    lineStyle: {
                        color: '#0b5263'
                    }
                }
            },
            data: echartData
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}