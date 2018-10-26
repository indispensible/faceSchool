<%--
  Created by IntelliJ IDEA.
  User: 吕港
  Date: 2017/11/8
  Time: 20:45
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
    <title>mmp</title>
    <script src="<%=basePath%>js/jquery/jquery-3.2.1.js"></script>
</head>
<body>
    <form id="findClass">
        <tr>
            <td>课程序号或者代码：<input type="text" name="class"></td>
        </tr>
        <input type="button" id="lvgang" value="mmp"> <hr>
        <table id="lvgangFC"></table>
    </form>

    <input value="<%=basePath%>" id="basePath" type="hidden">

    <script src="<%=basePath%>js/student/findClass.js"></script>
</body>
</html>
