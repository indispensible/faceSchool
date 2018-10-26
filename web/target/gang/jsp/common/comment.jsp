<%--
  Created by IntelliJ IDEA.
  User: 吕港
  Date: 2018/3/14
  Time: 10:39
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
    <title>课程评论</title>
    <link rel="stylesheet" type="text/css" href="<%=basePath%>jsp/common/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="<%=basePath%>jsp/common/css/style.css">
    <link type="text/css" href="<%=basePath%>bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link type="text/css" href="<%=basePath%>bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet">
    <link type="text/css" href="<%=basePath%>css/theme.css" rel="stylesheet">
    <link type="text/css" href="<%=basePath%>images/icons/css/font-awesome.css" rel="stylesheet">
    <style>
        .container{
            width: 1000px;
        }
        .commentbox{
            width: 900px;
            margin: 20px auto;
        }
        .mytextarea {
            width: 100%;
            overflow: auto;
            word-break: break-all;
            height: 100px;
            color: #000;
            font-size: 1em;
            resize: none;
        }
        .comment-list{
            width: 900px;
            margin: 20px auto;
            clear: both;
            padding-top: 20px;
        }
        .comment-list .comment-info{
            position: relative;
            margin-bottom: 20px;
            margin-bottom: 20px;
            border-bottom: 1px solid #ccc;
        }
        .comment-list .comment-info header{
            width: 10%;
            position: absolute;
        }
        .comment-list .comment-info header img{
            width: 100%;
            border-radius: 50%;
            padding: 5px;
        }
        .comment-list .comment-info .comment-right{
            padding:5px 0px 5px 11%;
        }
        .comment-list .comment-info .comment-right h3{
            margin: 5px 0px;
        }
        .comment-list .comment-info .comment-right .comment-content-header{
            height: 25px;
        }
        .comment-list .comment-info .comment-right .comment-content-header span,.comment-list .comment-info .comment-right .comment-content-footer span{
            padding-right: 2em;
            color: #aaa;
        }
        .comment-list .comment-info .comment-right .comment-content-header span,.comment-list .comment-info .comment-right .comment-content-footer span.reply-btn,.send,.reply-list-btn{
            cursor: pointer;
        }
        .comment-list .comment-info .comment-right .reply-list {
            border-left: 3px solid #ccc;
            padding-left: 7px;
        }
        .comment-list .comment-info .comment-right .reply-list .reply{
            border-bottom: 1px dashed #ccc;
        }
        .comment-list .comment-info .comment-right .reply-list .reply div span{
            padding-left: 10px;
        }
        .comment-list .comment-info .comment-right .reply-list .reply p span{
            padding-right: 2em;
            color: #aaa;
        }
    </style>
</head>
<body>
<div class="navbar navbar-fixed-top">
    <div class="navbar-inner">
        <div class="container1">
            <a class="btn btn-navbar" data-toggle="collapse" data-target=".navbar-inverse-collapse">
                <i class="icon-reorder shaded"></i>
            </a>
            <a class="brand" href="#" style="text-align: center;width: 100%;">
                faceSchool &nbsp; 评论专区
            </a>
            <div class="nav-collapse collapse navbar-inverse-collapse">



                <ul class="nav pull-right">

                    <li>
                        <a href="#" id="usernameForStudent">
                            欢迎使用
                        </a>
                    </li>
                    <li class="nav-user dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <img src="<%=basePath%>images/user.png" class="nav-avatar" />
                            <b class="caret"></b>
                        </a>
                    </li>
                </ul>
            </div><!-- /.nav-collapse -->
        </div>
    </div><!-- /navbar-inner -->
</div><!-- /navbar -->

<div class="container1">
    <div class="commentbox">
        <p id="title" style="font-size: 20px;margin-bottom: 20px;color: black;text-align: center;"></p>
        <textarea cols="80" rows="50" placeholder="来说几句吧......" class="mytextarea" id="content" style="margin-bottom: 15px;" name="content"></textarea>
        <div class="btn btn-info pull-right" id="comment">评论</div>

        <div class="container1 xsmall">
            <div class="pagination" style="margin: 0px;">
                <ul>
                    <li style="margin-right: 5px;"><a href="#" id="a_1" style="border: 1px solid #dddddd;"></a></li>
                    <li class="active" style="margin-right: 5px;"><span href="#" id="a_2" style="border: 1px solid #dddddd;border-radius: 0.2rem;">1</span></li>
                    <li><a href="#" id="a_3" style="border: 1px solid #dddddd;"></a></li>
                </ul>
                    <span id="page" style="position: relative;top: 5px;left: 6.666px;"></span>
            </div>
        </div>

    </div>
    <div class="comment-list">

    </div>
</div>
<input value="<%=basePath%>" id="basePath" type="hidden">

<script type="text/javascript" src="<%=basePath%>jsp/common/js/jquery.min.js"></script>
<script type="text/javascript" src="<%=basePath%>jsp/common/js/jquery.comment.js" ></script>
<script type="text/javascript" src="<%=basePath%>jsp/common/js/bootstrap.min.js"></script>
<script type="text/javascript" src="<%=basePath%>js/common/comment.js"></script>

</body>
</html>
