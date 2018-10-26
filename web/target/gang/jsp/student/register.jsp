<%--
  Created by IntelliJ IDEA.
  User: 吕港
  Date: 2017/11/2
  Time: 16:06
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
    <%--<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />--%>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>学生注册</title>
    <link type="text/css" href="<%=basePath%>bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link type="text/css" href="<%=basePath%>bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet">
    <link type="text/css" href="<%=basePath%>css/theme.css" rel="stylesheet">
    <link type="text/css" href="<%=basePath%>images/icons/css/font-awesome.css" rel="stylesheet">
    <style type="text/css">
        #canvas{
            display: none;
        }
    </style>
</head>
<body id="bodyTest">

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
                            <a href="<%=basePath%>jsp/student/login.jsp">登录</a>
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
                    <form class="form-vertical">
                        <div class="module-head">
                            <h3>注册</h3>
                        </div>
                        <div class="module-body">
                            <div class="control-group">
                                <div class="controls row-fluid" align="center">
                                    <video id="video" width="260" height="195" style="border:1px solid red" autoplay></video>
                                    <canvas style="border:1px solid red" id="canvas"></canvas>
                                </div>
                            </div>
                            <div class="control-group">
                                <div class="controls row-fluid">
                                    <input name="username" class="span12" type="email" id="inputEmail" placeholder="邮箱名" required="required">
                                </div>
                            </div>
                            <div class="control-group">
                                <div class="controls row-fluid">
                                    <input class="span12" type="text" id="inputChapcha" name="identify" placeholder="验证码" required="required">
                                </div>
                            </div>
                            <div class="control-group">
                                <div class="controls row-fluid">
                                    <input class="span12" type="password" name="password" id="inputPassword" placeholder="密码" required="required">
                                </div>
                            </div>
                            <%--<div class="control-group">--%>
                                <%--<div class="controls row-fluid">--%>
                                    <%--<input class="span12" type="text" name="name" id="inputNickname" placeholder="昵称">--%>
                                <%--</div>--%>
                            <%--</div>--%>
                            <div class="control-group">
                                <div class="controls row-fluid">
                                    <input class="span12" type="text" name="mhUsername" id="inputSchoolUsername" placeholder="上财门户账号" required="required">
                                </div>
                            </div>
                            <div class="control-group">
                                <div class="controls row-fluid">
                                    <input class="span12" type="text" name="iphone" id="inputPhone" placeholder="手机号" required="required">
                                </div>
                            </div>
                            <div class="control-group">
                                <div class="controls row-fluid">
                                    <input class="span12" type="text" name="realname" id="inputRealname" placeholder="真实姓名" required="required">
                                </div>
                            </div>
                            <%--<div class="control-group">--%>
                                <%--<div class="controls row-fluid">--%>
                                    <%--<input class="span12" type="password" name="mhPassword" id="inputSchoolPassword" placeholder="校园网密码">--%>
                                <%--</div>--%>
                            <%--</div>--%>

                            <%--<div class="control-group">--%>
                                <%--<div class="controls row-fluid">--%>
                                    <%--<input class="span12" name="Captcha" type="text" id="inputCaptcha" style="width: 46%;" placeholder="验证码">--%>
                                    <%--<input class="span12" name="Captcha1" type="button" id="getAllCaptcha" style="margin-left:6%;width: 46%;" value="爬取验证码中……" disabled="disabled">--%>
                                    <%--<img id="imageGang" src="" style="margin-left: 16%;display: none">--%>
                                <%--</div>--%>
                            <%--</div>--%>

                        </div>
                        <div class="module-foot">
                            <div class="control-group" id="getCaptcha">
                                <div class="controls clearfix">
                                    <button type="button" class="btn btn-primary pull-left" id="btn"  onclick="createCode()">获取验证码</button>
                                    <button type="button" class="btn btn-primary pull-right" id="register" onclick="sign.register()">注册</button>
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

    <script src="<%=basePath%>js/jquery/jquery-3.2.1.js"></script>
    <script src="<%=basePath%>js/student/register.js"></script>
    <script src="<%=basePath%>js/common/btnPause.js"></script>

</body>
</html>
