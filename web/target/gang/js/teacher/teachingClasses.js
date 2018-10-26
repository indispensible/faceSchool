/**
 * Created by 吕港 on 2017/11/11.
 */
var SignLocation;
var lng,lat;
var basePath;
var classes;

window.onload=function(){

    $("#span9DIv").hide();
    $("#hideTHead").hide();
    basePath=$("#basePath").val();
    var TId=getQueryString("TId");
    $("#teacherProfile").attr("href", basePath + "jsp/teacher/profile.jsp?TId=" + TId);
    var data={
        'TId':TId
    };
    var url=basePath+"find/classesByTId.do";

    $.post(url,data,function(result){
        //有没有相应的在学习的课程
        $("#teacherName").html(result[0]["teacher"]["realname"]);
    },'JSON');

    // 百度地图API功能
    var map = new BMap.Map("allmap");
    var point = new BMap.Point(116.331398,39.897445);
    map.centerAndZoom(point,12);

    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r){
        if(this.getStatus() == BMAP_STATUS_SUCCESS){
            var mk = new BMap.Marker(r.point);
            map.addOverlay(mk);
            map.panTo(r.point);
            lng=r.point.lng;
            lat=r.point.lat;
            SignLocation=lng+","+lat;
        }
        else {
            alert('failed'+this.getStatus());
        }
    },{enableHighAccuracy: true});

}

$("#haveClasses").click(function(){
    $("#span9DIv").show();
    $("#hideTHead").hide();
    $("#lvgangB").show();
    $("#lvgangC").hide();
    $(".lvgangFC").show();
    $("#create").hide();
    var TId=getQueryString("TId");
    var data={
        'TId':TId
    };
    var url=basePath+"find/classesByTId.do";
    //var basePath=$("#basePath").val();

    $.post(url,data,function(result){
        //有没有相应的在学习的课程
        $("#classes").html("");
        if(result[0]==null){
            $("#classes").html("你还没有创建课程！");
        }else{
            classes = result
            for(var i in result){
                var time = arrangeTime(result[i]["createtime"]);
                $("#classes").append("<tr id='classes"+result[i]["cid"]+"'></tr>");
                $("#classes"+result[i]["cid"]).append("<td style='text-align: center;'>"+result[i]["cid"]+"</td>");
                $("#classes"+result[i]["cid"]).append("<td style='text-align: center;'><a href='"+basePath+"jsp/teacher/teacherDetailPage.jsp?cid="+result[i]["cid"]+"&tid="+TId+"&countSign="+result[i]["countsign"]+"' target='_blank' style='text-align: center;'>"+result[i]["cname"]+"</a></td>");
                $("#classes"+result[i]["cid"]).append("<td style='text-align: center;'><a href='"+basePath+"jsp/teacher/updateClass.jsp?cid="+result[i]["cid"]+"&tid="+TId + "' target='_blank' style='color: #1e0ea5;text-align: center;'>更多详情…</a></td>");
                $("#classes"+result[i]["cid"]).append("<td style='text-align: center;'>"+time+"</td>");
                $("#classes"+result[i]["cid"]).append("<td id='count"+result[i]["cid"]+"' style='text-align: center;'>"+result[i]["countsign"]+"次</td>");
                $("#classes"+result[i]["cid"]).append("<td><input id='attendClass"+result[i]["cid"]+"_count"+result[i]["countsign"]+"'type='button' class='attendClass' value='上课'></td>");
                $("#classes"+result[i]["cid"]).append("<td><input id='overClass"+result[i]["cid"]+"'type='button' class='overClass' value='下课'></td>");
                $("#classes"+result[i]["cid"]).append("<td><input id='deleteClass"+result[i]["cid"]+"'type='button' class='deleteClass' value='删除课程'></td>");
            }
            //删除课程
            deleteClass();

            //上课
            attendClass();

            //下课
            overClass();
        }

    },'JSON');
});


function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

$("#createClasses").click(function(){
    $("#span9DIv").show();
    $("#hideTHead").hide();
    $(".lvgangFC").hide();
    $("#lvgangB").hide();
    $("#lvgangC").show();
    $("#create").show();
});

$("#createClass").click(function () {
    var CName = $('input[name="CName"]').val();
    var CDescription = $('textarea[name="CDescription"]').val();
    var TId=getQueryString("TId");
    var data={
        'TId':TId
    };
    data["CName"]=CName;
    data["CDescription"]=CDescription;
    var url=basePath+"find/insertClasses.do";
    $.post(url,data,function(result){
        alert(result["msg"]);
        window.location.reload();
    },'JSON');
});

function deleteClass(){
    $(".deleteClass").click(function(){
        var val=$(this).attr("id");
        var removeId=$("#"+val).parent().parent().attr("id");
        var CId=val.substr(11);
        var TId=getQueryString("TId");
        var data={
            'TId':TId,
            'CId':CId
        }
        var url=basePath+"find/deleteClass.do";
        $.post(url,data,function(result){
            alert(result["msg"]);
            $("#"+removeId).remove();
        },'JSON');
    });
}

function arrangeTime(time){
    var aTime=time.substr(0,10);
    var data=aTime.split("-");
    var needTime=data[0]+"年"+data[1]+"月"+data[2]+"日";
    return needTime;
}

function attendClass(){
    $(".attendClass").click(function () {
        if(judgeDevice()=="pc"){
            var vals=$(this).attr("id");
            var val=vals.split("_");
            var CId=val[0].substr(11);
            alert("请用手机端登录此网站定位哦！" +
                basePath+"jsp/teacher/mobileSignLocation.jsp?CId="+CId);
        }else{
            var vals=$(this).attr("id");
            var val=vals.split("_");
            var CId=val[0].substr(11);
            var countSign1=val[1].substr(5);
            var countSign=parseInt(countSign1)+1;
            var data={
                'CId':CId,
                'countSign':countSign,
                'SignLocation':SignLocation
            };
            var url=basePath+"find/updateClass.do";

            $.post(url,data,function(result){
                if(result["status"]==1){
                    alert(result["msg"]);
                    $("#count"+CId).html(countSign);
                }else {
                    alert(result["msg"]);
                }
            },'JSON');
        }
    });
}

function overClass(){
    $(".overClass").click(function () {
        if(judgeDevice()=="pc"){
            var val=$(this).attr("id");
            var CId=val.substr(9);
            alert("同学，请用手机端登录此网站定位哦！" +
                basePath+"jsp/teacher/mobileSignLocation.jsp?CId="+CId);
        }else{
            var val=$(this).attr("id");
            var CId=val.substr(9);
            var data={
                'CId':CId,
                'SignLocation':SignLocation
            };
            var url=basePath+"find/updateOverClass.do";

            $.post(url,data,function(result){
                alert(result["msg"]);
            },'JSON');
        }
    });
}

function judgeDevice(){
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        return "phone";
    } else {
        return "pc";
    }
}

$(".signOut").click(function(){
    var data={};
    var url=basePath+"Teacher/signOut.do";
    $.post(url,data,function(result){
        window.location.href=basePath+"jsp/teacher/login.jsp";
    },'JSON');
});


$("#selectedTime").change(function(){
    $("#lvgangFC_1").css("display", "")
    var SignCount=$("#selectedTime option:selected").val();
    //alert(SignCount)


    var res = classes;
    var result = [];
    var numTime = 0;



    for(var j in res){
        //alert(SignCount)
        //if(res[j]["createtime"] != null){
        //    alert(SignCount + ":" + res[j]["createtime"].substring(0,4))
            if(SignCount == res[j]["createtime"].substring(0,4)){
                result[numTime] = res[j]
                //alert(result)
                numTime++;
            }
        //}
    }

    //alert(result)
    //alert(result)

    if(SignCount == 2016){
        result = res
    }

    var TId=getQueryString("TId");

    //有没有相应的在学习的课程
    $("#classes").html("");
    if(result[0]==null){
        $("#lvgangFC_1").css("display", "none")
        $("#classes").html("你还没有创建课程！");
    }else {
        for (var i in result) {
            //alert(result[i]["cid"])
            var time = arrangeTime(result[i]["createtime"]);
            //alert(time)
            $("#classes").append("<tr id='classes" + result[i]["cid"] + "'></tr>");
            $("#classes" + result[i]["cid"]).append("<td style='text-align: center;'>" + result[i]["cid"] + "</td>");
            $("#classes" + result[i]["cid"]).append("<td style='text-align: center;'><a href='"+basePath+"jsp/teacher/teacherDetailPage.jsp?cid="+result[i]["cid"]+"&tid="+TId+"&countSign="+result[i]["countsign"]+"' target='_blank' style='text-align: center;'>"+result[i]["cname"]+"</a></td>");
            //$("#classes" + result[i]["cid"]).append("<td>aaa</td>");
            $("#classes"+result[i]["cid"]).append("<td style='text-align: center;'><a href='"+basePath+"jsp/teacher/updateClass.jsp?cid="+result[i]["cid"]+"&tid="+TId + "' target='_blank' style='color: #1e0ea5;text-align: center;'>更多详情…</a></td>");
            $("#classes" + result[i]["cid"]).append("<td style='text-align: center;'>" + time + "</td>");
            $("#classes" + result[i]["cid"]).append("<td id='count" + result[i]["cid"] + "' style='text-align: center;'>" + result[i]["countsign"] + "次</td>");
            $("#classes" + result[i]["cid"]).append("<td><input id='attendClass" + result[i]["cid"] + "_count" + result[i]["countsign"] + "'type='button' class='attendClass' value='上课'></td>");
            $("#classes" + result[i]["cid"]).append("<td><input id='overClass" + result[i]["cid"] + "'type='button' class='overClass' value='下课'></td>");
            $("#classes" + result[i]["cid"]).append("<td><input id='deleteClass" + result[i]["cid"] + "'type='button' class='deleteClass' value='删除课程'></td>");
        }
        //删除课程
        deleteClass();

        //上课
        attendClass();

        //下课
        overClass();
    }
});
