/**
 * Created by 吕港 on 2018/3/14.
 */

var commentId;
var CId;
var TId;
var SId;
var basePath;
var comments = [];
var totalPage;
var nowPage = 1;
var name="小明";
var email = ""

window.onload=function(){

    $("#a_1").css("display", "none")

    CId=getQueryString("cid");
    commentId=getQueryString("commentid");
    TId=getQueryString("tid");
    SId = getQueryString("sid")

    basePath=$("#basePath").val();

    //这个用来判断是学生还是老师
    if(SId != null){
        getStudent()
    }else{
        getClassTroughTea()
    }


    if(commentId == null){

        if(SId != null){
            getClass()
        }

        var data = {
            'CId': CId
        }
        var url = basePath + "comment/commentsByCId.do"
        $.post(url,data,function(result){
            if(result[0] == null){
                alert("还没有人评论！")
                $("#a_3").css("display", "none")
                $("#page").html("共1页")
            }else {
                var arr = [];
                var num = 0;
                var j = 0;
                var score = 0;
                var needScore = 0;
                comments = result
                for(j in result){
                    j = j
                    if(result[j]["name"] != "老师"){
                        score = score + parseFloat(result[j]["positive"])
                        needScore = parseInt(needScore) + 1
                    }
                }
                if(needScore == 0){
                    score = 1
                }else{
                    score = parseFloat(score / needScore)
                }
                score = (score * 100).toFixed(1)

                num = j
                var page = Math.floor(j/10) + 1
                $("#page").html("共" + page + "页")

                if(page == 1){
                    $("#a_3").css("display", "none")
                    $("#page").html("共1页")
                }

                var teacherNum = 0

                var m = 0
                if(j >= 10){
                    m = 9
                    $("#comment_mining").attr('disabled', false)
                    $("#comment_mining").html("评论词云")
                }else{
                    m = j
                }
                totalPage = page

                for(var i = 0; i <= m;i++){
                    var arrTest = []
                    var time = new Date(Date.parse(new Date(result[num]["time"])) - 50400000).format("yyyy-MM-dd hh:mm:ss")
                    var arrString
                    if(result[num]["ifdelete"] == 1){

                        if(TId != null && TId != ""){
                            var sentiment = "情感偏正向"
                            if(result[num]["sentiment"] == 2){
                                sentiment = "情感偏正向"
                            }else if(result[num]["sentiment"] == 1){
                                sentiment = "情感偏中性"
                            }else{
                                sentiment = "情感偏消极"
                            }
                            arrString = '{"id":' + result[num]["commentid"] + ',"img":"'+ basePath +'jsp/common/images/student.jpg","beReplyName":"","replyName":"' + result[num]["name"] + '","content":"' + result[num]["comment"] + '","time":"' + time +  '","address":"' + sentiment + '","browse":"情感得分：' + Math.round(result[num]["positive"] * 100) + '%","replyBody":[]}'
                            $("#reference").html("课程参考评价分数:" + score)
                        }else{
                            arrString = '{"id":' + result[num]["commentid"] + ',"img":"'+ basePath +'jsp/common/images/student.jpg","beReplyName":"","replyName":"' + result[num]["name"] + '","content":"' + result[num]["comment"] + '","time":"' + time + '","replyBody":[]}';
                        }
                        var arrJSON = JSON.parse(arrString)
                        arr[i] = arrJSON

                        //$("#"+result[num]["commentid"]).append("<div class='col-md-offset-3 col-md-6'>" +
                        //    "<h3 class='progressbar-title'>CSS3</h3>" +
                        //    "<div class='progress'>" +
                        //    "<div class='progress-bar' style='width: 85%; background:#FF6B0F;'> " +
                        //    "<span>85%</span>" +
                        //    "</div>" +
                        //    "</div>" +
                        //    "</div>");

                    }else{
                            arrString = '{"id":' + result[num]["commentid"] + ',"img":"'+ basePath +'jsp/common/images/teacher.jpg","beReplyName":"","replyName":"' + result[num]["name"] + '","content":"' + result[num]["comment"] + '","time":"' + time +'","osname":"(老师的评论)","replyBody":[]}';
                            var arrJSON = JSON.parse(arrString)
                            arr[i] = arrJSON
                        teacherNum++
                    }

                    num--;
                }



                $(".comment-list").addCommentList({data:arr,add:""});

                if( commentId != "" && commentId != null){
                    $(".reply-btn1").css("display", "none")
                }

                $(".content").css("width", "90%")

                comment_list()

                if(TId != null){
                    deleteComment()
                }else{
                    $(".delete-btn").css("display", "none")
                }

                pressPre()

                pressNext()

            }
        },'JSON')
    }else{

        $("#comment_mining").css('display', 'none')

        var data = {
            'CId': CId,
            'commentId': commentId
        }
        var url = basePath + "comment/commentsByCommentId.do"
        $.post(url,data,function(result){
            $("#title").html(result["comment"])
        },'JSON')

        $("#a_2").css("display", "none")
        $("#a_3").css("display", "none")

        if(TId != null){
            deleteComment()
        }else{
            $(".delete-btn").css("display", "none")
        }

        getCommentDetail()

    }
    createComment()

}

function deleteComment(){
    $(".delete-btn").click(function(){
        var val=$(this).attr("id");
        var comId = val.split("_")[1]
        var data = {
            'commentId': comId
        }
        var url = basePath + "comment/deleteComments.do"

        var removeId = $("#"+val).parent().parent().parent().parent().parent().attr("id");

        $.post(url, data, function(result){
            if(result["status"] == 1){
                alert("成功删除")
                $("#" + removeId).remove()
            }else{
                alert("发生未知错误，请刷新页面")
            }
        },'JSON')
    })
}

function createComment(){
    $("#comment").click(function(){
        var comment = $('textarea[name="content"]').val();
        if(TId != null && SId != null){
            alert("请不要修改域名！")
        }else if(CId == null){
            alert("请不要修改域名！")
        } else if(comment == ""){
            alert("评论不能为空!")

        //学生对课程的评论
        }else if(commentId == null && SId != null){
            var data = {
                'CId': CId,
                'name': name,
                'email': email,
                'comment': comment,
                'applaud': 0,
                'ifDelete': 1
            }
            var url = basePath + "comment/commentsCreate.do"
            $.post(url,data, function(result){
                if(result["status"] == 1){
                    alert("成功评论")
                }else{
                    alert("发生位置错误")
                }
                window.location=basePath + "jsp/student/comment.jsp?cid=" + CId +"&sid=" + SId;
            },'JSON')

        //学生对评论的评论
        }else if(commentId != null && SId != null){
            var data = {
                'CId': 0,
                'name': name,
                'email': email,
                'comment': comment,
                'applaud': commentId,
                'ifDelete': 1
            }
            var url = basePath + "comment/commentsCreate.do"
            $.post(url,data, function(result){
                if(result["status"] == 1){
                    alert("成功评论")
                }else{
                    alert("发生位置错误")
                }
                window.location=basePath + "jsp/student/comment.jsp?cid=" + CId + "&commentid=" + commentId +"&sid=" + SId;
            },'JSON')

        //老师对课程的评论
        }else if(commentId == null && TId != null){
            var data = {
                'CId': CId,
                'name': "老师",
                'email': email,
                'comment': comment,
                'applaud': 0,
                'ifDelete': 2
            }
            var url = basePath + "comment/commentsCreate.do"
            $.post(url,data, function(result){
                if(result["status"] == 1){
                    alert("成功评论")
                }else{
                    alert("发生位置错误")
                }
                window.location=basePath + "jsp/teacher/comment.jsp?cid=" + CId  + "&tid=" + TId;
            },'JSON')

        //老师对评论的评论
        }else if(commentId != null && TId != null){
            var data = {
                'CId': 0,
                'name': "老师",
                'email': email,
                'comment': comment,
                'applaud': commentId,
                'ifDelete': 2
            }
            var url = basePath + "comment/commentsCreate.do"
            $.post(url,data, function(result){
                if(result["status"] == 1){
                    alert("成功评论")
                }else{
                    alert("发生位置错误")
                }
                window.location=basePath + "jsp/teacher/comment.jsp?cid=" + CId + "&commentid=" + commentId +"&tid=" + TId;
            },'JSON')

        }else{
            alert("请不要修改域名！")
        }
    })
}

function getClass(){
    var data={
        'CId':CId,
        'SId':SId
    };
    var url=basePath+"StuFind/findEnsureClass.do";
    $.post(url,data,function(res){
        $("#title").html(res[0]["classes"]["cname"])
    },'JSON')
}

function getClassTroughTea(){
    var data={
        'CId':CId
    }
    var url=basePath+"find/getClass.do";
    $.post(url,data,function(result){
        $("#title").html(result["cname"])
        name = result["teacher"]["realname"]
        email = result["teacher"]["email"]
    },'JSON');
}

function getStudent(){
    var data={
        'SId':SId
    };
    var url=basePath+"login/findStudent.do";
    $.post(url,data,function(res){
        name = res["realname"]
        email = res["username"]
    },'JSON')
}

function getCommentDetail(){
    var data={
        'CId':CId,
        'applaud':commentId
    };
    var url=basePath+"comment/commentsByApplaud.do";
    $.post(url,data,function(result){
        if(result[0] == null){
            alert("还没有人评论！")
        }else {
            var arr = [];
            var num = 0;
            var j = 0;
            comments = result
            for(j in result){
                j = j;
            }
            num = j

            var teacherNum = 0

            var m = 0

            for(var i = 0; i <= j;i++){
                var time = new Date(Date.parse(new Date(result[num]["time"])) - 50400000).format("yyyy-MM-dd hh:mm:ss")
                var arrString
                if(result[num]["ifdelete"] == 1){
                    arrString = '{"id":' + result[num]["commentid"] + ',"img":"'+ basePath +'jsp/common/images/student.jpg","beReplyName":"","replyName":"' + result[num]["name"] + '","content":"' + result[num]["comment"] + '","time":"' + time +'","replyBody":[]}';
                    var arrJSON = JSON.parse(arrString)
                    arr[i] = arrJSON
                }else{
                    arrString = '{"id":' + result[num]["commentid"] + ',"img":"'+ basePath +'jsp/common/images/teacher.jpg","beReplyName":"","replyName":"' + result[num]["name"] + '","content":"' + result[num]["comment"] + '","time":"' + time +'","osname":"(老师的评论)","replyBody":[]}';
                    var arrJSON = JSON.parse(arrString)
                    arr[i] = arrJSON
                    teacherNum++
                }

                num--;
            }

            $(".comment-list").addCommentList({data:arr,add:""});

            if(TId != null){
                deleteComment()
            }else{
                $(".delete-btn").css("display", "none")
            }

            if( commentId != "" && commentId != null){
                $(".reply-btn1").css("display", "none")
            }

            $(".content").css("width", "96%")


        }
    },'JSON')
}


function  pressNext(){
    $("#a_3").click(function(){
        $(".comment-list").html("")
        nowPage = nowPage + 1
        if(nowPage == totalPage){
            $("#a_3").css("display", "none")
        }else{
            $("#a_3").css("display", "")
        }

        $("#a_2").html(nowPage)

        if(nowPage == 2){
            $("#a_1").css("display", "")
        }

        var arr = []
        var num = 0;
        var j = 0;
        var result = comments
        for(j in result){
            j = j;
        }
        num = j - 10 * (nowPage - 1)
        var page = Math.floor(j/10) + 1
        $("#page").html("共" + page + "页")


        var m = 0
        if(j >= 10 * nowPage){
            m = 9 + 10 * (nowPage - 1)
        }else{
            m = j
        }

        var number =0
        for(var i = 10 * (nowPage - 1); i <= m;i++){
            var time = new Date(Date.parse(new Date(result[num]["time"])) - 50400000).format("yyyy-MM-dd hh:mm:ss")
            var arrString
            if(result[num]["ifdelete"] == 1){
                if(TId != null && TId != ""){
                    var sentiment = "情感偏正向"
                    if(result[num]["sentiment"] == 2){
                        sentiment = "情感偏正向"
                    }else if(result[num]["sentiment"] == 1){
                        sentiment = "情感偏中性"
                    }else{
                        sentiment = "情感偏消极"
                    }
                    arrString = '{"id":' + result[num]["commentid"] + ',"img":"'+ basePath +'jsp/common/images/student.jpg","beReplyName":"","replyName":"' + result[num]["name"] + '","content":"' + result[num]["comment"] + '","time":"' + time +  '","address":"' + sentiment + '","browse":"情感得分：' + Math.round(result[num]["positive"] * 100) + '%","replyBody":[]}'
                }else{
                    arrString = '{"id":' + result[num]["commentid"] + ',"img":"'+ basePath +'jsp/common/images/student.jpg","beReplyName":"","replyName":"' + result[num]["name"] + '","content":"' + result[num]["comment"] + '","time":"' + time + '","replyBody":[]}';
                }

                var arrJSON = JSON.parse(arrString)
                arr[number] = arrJSON
            }else{
                arrString = '{"id":' + result[num]["commentid"] + ',"img":"'+ basePath +'jsp/common/images/teacher.jpg","beReplyName":"","replyName":"' + result[num]["name"] + '","content":"' + result[num]["comment"] + '","time":"' + time +'","osname":"(老师的评论)","replyBody":[]}';
                var arrJSON = JSON.parse(arrString)
                arr[number] = arrJSON
            }

            number++;
            num--;
        }
        $(".comment-list").addCommentList({data:arr,add:""});

        if( commentId != "" && commentId != null){
            $(".reply-btn1").css("display", "none")
        }

        if(TId != null){
            deleteComment()
        }else{
            $(".delete-btn").css("display", "none")
        }

        comment_list()

    })
}

function pressPre(){

    $("#a_1").click(function(){
        $(".comment-list").html("")
        nowPage = nowPage - 1

        if(nowPage == 1){
            $("#a_1").css("display", "none")
        }else{
            $("#a_1").css("display", "")
        }

        $("#a_2").html(nowPage)

        if(nowPage == totalPage - 1){
            $("#a_3").css("display", "")
        }

        var arr = []
        var num = 0;
        var j = 0;
        var result = comments
        for(j in result){
            j = j;
        }
        num = j - 10 * (nowPage - 1)
        var page = Math.floor(j/10) + 1
        $("#page").html("共" + page + "页")

        var m = 0
        if(j >= 10 * nowPage){
            m = 9 + 10 * (nowPage - 1)
        }else{
            m = j
        }

        var number = 0
        for(var i = 10 * (nowPage - 1); i <= m;i++){
            var time = new Date(Date.parse(new Date(result[num]["time"])) - 50400000).format("yyyy-MM-dd hh:mm:ss")
            var arrString
            if(result[num]["ifdelete"] == 1){
                if(TId != null && TId != ""){
                    var sentiment = "情感偏正向"
                    if(result[num]["sentiment"] == 2){
                        sentiment = "情感偏正向"
                    }else if(result[num]["sentiment"] == 1){
                        sentiment = "情感偏中性"
                    }else{
                        sentiment = "情感偏消极"
                    }
                    arrString = '{"id":' + result[num]["commentid"] + ',"img":"'+ basePath +'jsp/common/images/student.jpg","beReplyName":"","replyName":"' + result[num]["name"] + '","content":"' + result[num]["comment"] + '","time":"' + time +  '","address":"' + sentiment + '","browse":"情感得分：' + Math.round(result[num]["positive"] * 100) + '%","replyBody":[]}'
                }else{
                    arrString = '{"id":' + result[num]["commentid"] + ',"img":"'+ basePath +'jsp/common/images/student.jpg","beReplyName":"","replyName":"' + result[num]["name"] + '","content":"' + result[num]["comment"] + '","time":"' + time + '","replyBody":[]}';
                }

                var arrJSON = JSON.parse(arrString)
                arr[number] = arrJSON
            }else{
                arrString = '{"id":' + result[num]["commentid"] + ',"img":"'+ basePath +'jsp/common/images/teacher.jpg","beReplyName":"","replyName":"' + result[num]["name"] + '","content":"' + result[num]["comment"] + '","time":"' + time +'","osname":"(老师的评论)","replyBody":[]}';
                var arrJSON = JSON.parse(arrString)
                arr[number] = arrJSON
            }


            number = number + 1;
            num--;
        }
        $(".comment-list").addCommentList({data:arr,add:""});

        if( commentId != "" && commentId != null){
            $(".reply-btn1").css("display", "none")
        }

        if(TId != null){
            deleteComment()
        }else{
            $(".delete-btn").css("display", "none")
        }

        comment_list()

    })
}

//时间日期的转换
Date.prototype.format = function(fmt) {
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}



function comment_list(){
    $(".reply-btn1").click(function(){
        var val=$(this).attr("id");
        var comment_id = val.split("_")[1]
        if(TId == null && SId != null){
            window.open(basePath + "jsp/student/comment.jsp?cid=" + CId +"&commentid=" + comment_id + "&sid=" + SId)
        }else if(TId != null && SId == null){
            window.open(basePath + "jsp/teacher/comment.jsp?cid=" + CId +"&commentid=" + comment_id + "&tid=" + TId)
        }else{
            alert("不要修改域名")
        }

    })
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

$("#comment_mining").click(function(){
    window.open(basePath + "jsp/teacher/textmining.jsp?cid= " + CId);
})