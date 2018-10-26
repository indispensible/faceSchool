<%--
  Created by IntelliJ IDEA.
  User: 吕港
  Date: 2017/11/11
  Time: 9:54
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path=request.getContextPath();
    String basePath=request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
    <title>你的课程</title>
    <script src="<%=basePath%>js/jquery/jquery-3.2.1.js"></script>
</head>
<body>

    <input id="haveClasses" type="button" value="查询所选课程">
    <input id="haveStudents" type="button" value="查询课程所对应的学生"><hr>
    <table id="lvgangFC"></table><hr>
    <table id="lvgangFS"></table>

    <input value="<%=basePath%>" id="basePath" type="hidden">
    <script src="<%=basePath%>js/teacher/classes.js"></script>
</body>
</html>
