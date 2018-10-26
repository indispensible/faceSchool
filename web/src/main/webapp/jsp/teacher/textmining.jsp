<%--
  Created by IntelliJ IDEA.
  User: 吕港
  Date: 2018/4/14
  Time: 17:03
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
    <title>评论词云</title>
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
    <script src="<%=basePath%>js/jquery/jquery-3.2.1.js"></script>
    <script src="<%=basePath%>js/teacher/echarts.min.js"></script>
    <script src="<%=basePath%>js/teacher/wordcloud.js"></script>
</head>
<body >
<div class="navbar navbar-fixed-top">
    <div class="navbar-inner">
        <div class="container1">
            <a class="btn btn-navbar" data-toggle="collapse" data-target=".navbar-inverse-collapse">
                <i class="icon-reorder shaded"></i>
            </a>
            <a class="brand" href="#" style="text-align: center;width: 100%;">
                faceSchool &nbsp; 评论分析
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

<div id="main" style="width: 80%;height:500px;border: 1px solid black;margin-left: 10%;margin-top: 14px;"></div>
<div id="main1" style="width: 80%;height:500px;border: 1px solid black;margin-left: 10%;margin-top: 14px;"></div>
<div id="main2" style="width: 80%;height:500px;border: 1px solid black;margin-left: 10%;margin-top: 14px;"></div>


<input value="<%=basePath%>" id="basePath" type="hidden">

<script type="text/javascript" src="<%=basePath%>jsp/common/js/jquery.min.js"></script>
<script type="text/javascript" src="<%=basePath%>jsp/common/js/jquery.comment.js" ></script>
<script type="text/javascript" src="<%=basePath%>jsp/common/js/bootstrap.min.js"></script>
<script type="text/javascript" src="<%=basePath%>js/teacher/textmining.js"></script>
</body>
</html>
