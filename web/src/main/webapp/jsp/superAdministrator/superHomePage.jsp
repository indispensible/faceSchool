<%--
  Created by IntelliJ IDEA.
  User: 吕港
  Date: 2017/11/25
  Time: 23:47
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path=request.getContextPath();
    String basePath=request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
    <title>超级管理员主页</title>
    <script src="<%=basePath%>js/jquery/jquery-3.2.1.js"></script>
    <style type="text/css">
        #appendAdministratorFrom{
            display: none;
        }
        #newUsername{
            display: none;
        }
        #updatePassword{
            display: none;
        }
        .black_overlay{
            display: none;
            position: absolute;
            top: 0%;
            left: 0%;
            width: 100%;
            height: 100%;
            background-color: black;
            z-index:1001;
            -moz-opacity: 0.8;
            opacity:.80;
            filter: alpha(opacity=80);
        }
        .white_content {
            display: none;
            position: absolute;
            top: 7%;
            left: 32%;
            width: 36%;
            height: 81%;
            border: 16px solid lightblue;
            background-color: white;
            z-index:1002;
            overflow: auto;
        }
        .white_content_small {
            display: none;
            position: absolute;
            top: 20%;
            left: 30%;
            width: 40%;
            height: 50%;
            border: 16px solid lightblue;
            background-color: white;
            z-index:1002;
            overflow: auto;
        }
    </style>
</head>
<body>
    <input id="queryAdministrator" value="查看所有有权限的管理员" type="button">
    <input id="appendAdministrator" value="添加新的管理员" type="button">
    <input id="updateAdministratorPassword" value="修改密码" type="button">
    <input id="queryAllCheckPending" value="查看所有待审核的老师" type="button">
    <input id="queryAllChecked" value="查看所有已审核的老师" type="button">
    <input id="queryAllDeleted" value="查看所有已删除的老师" type="button">

    <table id="displayAll"></table>

    <form id="appendAdministratorFrom">
        <h2>账号自动生成，注册完后会告知！(密码默认为:123456,请自行修改！)</h2>
        <input name="email" type="email" placeholder="请输入邮箱账号" required="required"><br/>
        <input name="iphone" type="tel" placeholder="请输入手机号" required="required"><br/>
        <input name="realname" type="text" placeholder="请输入真实姓名" required="required"><br/>
        <input id="appendAdministratorInput" type="button" value="创建新管理员">
    </form>

    <form id="updatePassword">
        <h3>账号不能修改，账号为:<%=session.getAttribute("superAdministrator")%></h3>
        <input type="text" name="password" placeholder="请输入修改的密码！" required="required">
        <input id="updatePasswordFrom" type="button" value="修改密码">
    </form>

    <h3 id="newUsername"></h3>

    <!--弹出层时背景层DIV-->
    <div id="fade" class="black_overlay"></div>
    <div id="MyDiv" class="white_content">
        <div style="position: absolute;right: 0px;cursor: pointer;">
            <span style="font-size: 16px;" onclick="CloseDiv('MyDiv','fade')">关闭</span>
        </div>
        <img src="" width="100%" id="lvGangImg"/>
    </div>

    <input value="<%=basePath%>" id="basePath" type="hidden">

    <script src="<%=basePath%>js/administrator/administratorCommon.js"></script>
</body>
</html>
