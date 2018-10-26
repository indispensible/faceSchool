<%--
  Created by IntelliJ IDEA.
  User: 吕港
  Date: 2017/11/20
  Time: 8:47
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
    <title>教师登录</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link type="text/css" href="<%=basePath%>bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link type="text/css" href="<%=basePath%>bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet">
    <link type="text/css" href="<%=basePath%>css/theme.css" rel="stylesheet">
    <link type="text/css" href="<%=basePath%>images/icons/css/font-awesome.css" rel="stylesheet">
    <script src="<%=basePath%>js/jquery/jquery-3.2.1.js"></script>
    <style type="text/css">
        #colorDiv{
            opacity:0.76;
        }
        #colorDiv:hover {
            opacity:1;
        }
    </style>
</head>
<body style='background-image: url("<%=basePath%>index/img/demo-3-bg.jpg");background-size: 100%;'>
    <div class="navbar navbar-fixed-top">
        <div class="navbar-inner" style='background-image: url("<%=basePath%>index/img/demo-3-bg.jpg");background-size: 100%;'>
            <div class="container">
                <a class="btn btn-navbar" data-toggle="collapse" data-target=".navbar-inverse-collapse">
                    <i class="icon-reorder shaded"></i>
                </a>
                <a class="brand" href="#" style="color: #25d2ec;text-shadow: 0 0px 0 #25d2ec;font-size: 22px;">faceSchool</a>
                <div class="nav-collapse collapse navbar-inverse-collapse">
                    <ul class="nav pull-right">
                        <li>
                            <a href="<%=basePath%>jsp/teacher/register.jsp" style="color: #25d2ec;text-shadow: 0 0px 0 #25d2ec;font-size: 20px;font-family: FZShuTi;">注册</a>
                        </li>
                    </ul>
                </div><!-- /.nav-collapse -->
            </div>
        </div><!-- /navbar-inner -->
    </div><!-- /navbar -->

    <div class="wrapper">
        <div class="container">
            <div class="row">
                <div class="module module-login span4 offset4" id="colorDiv">
                    <form class="form-vertical">
                        <div class="module-head">
                            <h3>登录</h3>
                        </div>
                        <div class="module-body">
                            <div class="control-group">
                                <div class="controls row-fluid">
                                    <input class="span12" type="email" name="username" id="inputEmail" placeholder="邮箱名">
                                </div>
                            </div>
                            <%--<div class="control-group" id="captcha">--%>
                                <%--<div class="controls row-fluid">--%>
                                    <%--<input class="span12" type="text" name="identify" id="inputCaptcha" placeholder="验证码">--%>
                                <%--</div>--%>
                            <%--</div>--%>
                            <div class="control-group" id="password">
                                <div class="controls row-fluid">
                                    <input class="span12" type="password" name="password" id="inputPassword" placeholder="密码">
                                </div>
                            </div>
                        </div>
                        <div class="module-foot">
                            <div class="control-group" id="getCaptcha">
                                <div class="controls clearfix">
                                    <%--<button type="button" class="btn btn-primary pull-left" id="btn" onclick="createCode()">获取验证码</button>--%>
                                    <button id="btn" type="button" class="btn btn-primary pull-left" >忘记密码</button>
                                    <button type="button" id="loginTeacher" class="btn btn-primary pull-right">登录</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div><!--/.wrapper-->

    <div class="footer">
        <div class="container">
            <b class="copyright">&copy; faceSchool - faceYourTeam </b> All rights reserved.
        </div>
    </div>

    <input value="<%=basePath%>" id="basePath" type="hidden">
    <script src="<%=basePath%>js/teacher/login.js"></script>
    <%--<script src="<%=basePath%>js/common/btnPause.js"></script>--%>
    <script src="<%=basePath%>scripts/jquery-1.9.1.min.js" type="text/javascript"></script>
    <script src="<%=basePath%>scripts/jquery-ui-1.10.1.custom.min.js" type="text/javascript"></script>
    <script src="<%=basePath%>bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
</body>
</html>
