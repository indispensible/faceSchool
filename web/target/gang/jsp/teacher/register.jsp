<%--
  Created by IntelliJ IDEA.
  User: 吕港
  Date: 2017/11/20
  Time: 8:48
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
    <%--<meta http-equiv="Content-Type" content="multipart/form-data; charset=utf-8" />--%>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>教师注册</title>
    <link type="text/css" href="<%=basePath%>bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link type="text/css" href="<%=basePath%>bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet">
    <link type="text/css" href="<%=basePath%>css/theme.css" rel="stylesheet">
    <link type="text/css" href="<%=basePath%>images/icons/css/font-awesome.css" rel="stylesheet">
    <script src="<%=basePath%>js/jquery/jquery-3.2.1.js"></script>
    <script src="<%=basePath%>js/jquery/jquery.form.js"></script>
    <style type="text/css">
        #jvForm{
            position: relative;
            height: 22.5px;
            background: #D0EEFF;
            border: 1px solid #99D3F5;
            border-radius: 4px;
            padding: 4px 12px;
            overflow: hidden;
            color: #1E88C7;
            text-decoration: none;
            text-indent: 0;
            line-height: 20px;
        }
        #lvgangFile{
            position: absolute;
            font-size: 100px;
            right: 0;
            top: 0;
            opacity: 0;
            cursor: pointer;
        }
        #allUrl{
            display: none;
        }
    </style>
</head>
<body>

    <div class="navbar navbar-fixed-top">
        <div class="navbar-inner">
            <div class="container">
                <a class="btn btn-navbar" data-toggle="collapse" data-target=".navbar-inverse-collapse">
                    <i class="icon-reorder shaded"></i>
                </a>
                <a class="brand" href="#">faceSchool</a>
                <div class="nav-collapse collapse navbar-inverse-collapse">
                    <ul class="nav pull-right">
                        <li>
                            <a href="<%=basePath%>jsp/teacher/login.html">登录</a>
                        </li>
                    </ul>
                </div><!-- /.nav-collapse -->
            </div>
        </div><!-- /navbar-inner -->
    </div><!-- /navbar -->

    <div class="wrapper">
        <div class="container">
            <div class="row">
                <div class="module module-login span4 offset4">
                    <div class="form-vertical">
                        <div class="module-head">
                            <h3>注册</h3>
                        </div>
                        <div class="module-body">

                            <div class="control-group">
                                <div class="controls row-fluid">
                                        <img id="allUrl"/>
                                </div>
                            </div>

                            <%--上传教师证--%>
                            <div class="control-group">
                                <div class="controls row-fluid">
                                    <form enctype="multipart/form-data" id="jvForm" method="post">
                                        <span style="margin-left: 37%;font-size: 125%;line-height: 140%;">上传教师证</span>
                                        <input type="file" id="lvgangFile"  name="pic" onchange="uploadPic()">
                                    </form>
                                </div>
                            </div>

                            <div class="control-group">
                                <div class="controls row-fluid">
                                    <input class="span12" name="username" type="email" id="inputEmail" placeholder="邮箱名">
                                </div>
                            </div>
                            <div class="control-group">
                                <div class="controls row-fluid">
                                    <input class="span12" name="identify" type="text" id="inputChapcha" placeholder="邮箱验证码">
                                </div>
                            </div>
                            <div class="control-group">
                                <div class="controls row-fluid">
                                    <input class="span12" name="password" type="password" id="inputPassword" placeholder="密码">
                                </div>
                            </div>
                            <%--<div class="control-group">--%>
                                <%--<div class="controls row-fluid">--%>
                                    <%--<input class="span12" type="text" name="username" id="inputNickname" placeholder="昵称">--%>
                                <%--</div>--%>
                            <%--</div>--%>
                            <div class="control-group">
                                <div class="controls row-fluid">
                                    <input class="span12" name="realname" type="text" id="inputRealname" placeholder="真实姓名">
                                </div>
                            </div>
                            <div class="control-group">
                                <div class="controls row-fluid">
                                    <input class="span12" name="iphone" type="text" id="inputPhone" placeholder="手机号">
                                </div>
                            </div>
                        </div>
                        <div class="module-foot">
                            <div class="control-group" id="getCaptcha">
                                <div class="controls clearfix">
                                    <button type="button" class="btn btn-primary pull-left" id="btn" onclick="createCode()">获取验证码</button>
                                    <button type="button" class="btn btn-primary pull-right" onclick="teacher.register()">注册</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div><!--/.wrapper-->

    <div class="footer">
        <div class="container">
            <b class="copyright">&copy; faceSchool - faceYourTeam </b> All rights reserved.
        </div>
    </div>

    <input id="lvGang" type="hidden">

    <input value="<%=basePath%>" id="basePath" type="hidden">
    <script src="<%=basePath%>js/teacher/register.js"></script>
    <script src="<%=basePath%>js/common/btnPause.js"></script>
    <%--<script src="<%=basePath%>scripts/jquery-1.9.1.min.js" type="text/javascript"></script>--%>
    <%--<script src="<%=basePath%>scripts/jquery-ui-1.10.1.custom.min.js" type="text/javascript"></script>--%>
    <%--<script src="<%=basePath%>bootstrap/js/bootstrap.min.js" type="text/javascript"></script>--%>
    <%--<script type="text/javascript">--%>
        <%--$(document).ready(function() {--%>
            <%--$(".hide").hide();--%>
            <%--$("#get-captcha").click(function() {--%>
                <%--$(".hide").show();--%>
                <%--$("#getCaptcha").hide();--%>
            <%--});--%>
        <%--})--%>
    <%--</script>--%>
</body>
</html>
