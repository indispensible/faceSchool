<%--
  Created by IntelliJ IDEA.
  User: 吕港
  Date: 2017/11/25
  Time: 15:01
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>管理员登录</title>
    <link type="text/css" href="<%=basePath%>bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link type="text/css" href="<%=basePath%>bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet">
    <link type="text/css" href="<%=basePath%>css/theme.css" rel="stylesheet">
    <link type="text/css" href="<%=basePath%>images/icons/css/font-awesome.css" rel="stylesheet">
    <script src="<%=basePath%>js/jquery/jquery-3.2.1.js"></script>
</head>
<body>
<%--<form>--%>
<%--<input type="email" name="username" placeholder="请输入登录账号"><br/>--%>
<%--<input type="password" name="password" placeholder="请输入登录密码"><br/>--%>
<%--<input type="button" id="loginAdministrator" value="登录">--%>
<%--</form>--%>


<div class="wrapper">
    <div class="container">
        <div class="row">
            <div class="module module-login span4 offset4">
                <form class="form-vertical">
                    <div class="module-head">
                        <h3>登录</h3>
                    </div>
                    <div class="module-body">
                        <div class="control-group">
                            <div class="controls row-fluid">
                                <input class="span12" type="text" id="inputEmail" name="username" placeholder="请输入登录账号">
                            </div>
                        </div>
                        <div class="control-group">
                            <div class="controls row-fluid">
                                <input class="span12" type="password" id="inputPassword" name="password" placeholder="请输入登录密码">
                            </div>
                        </div>
                    </div>
                    <div class="module-foot">
                        <div class="control-group">
                            <div class="controls clearfix">
                                <button type="button" class="btn btn-primary pull-right" id="loginAdministrator">登录</button>
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
<script src="<%=basePath%>js/administrator/login.js"></script>

<script src="<%=basePath%>scripts/jquery-1.9.1.min.js" type="text/javascript"></script>
<script src="<%=basePath%>scripts/jquery-ui-1.10.1.custom.min.js" type="text/javascript"></script>
<script src="<%=basePath%>bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
</body>
</html>
