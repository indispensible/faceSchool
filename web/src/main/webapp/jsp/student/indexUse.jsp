<%--
  Created by IntelliJ IDEA.
  User: 吕港
  Date: 2017/11/12
  Time: 19:01
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
    <title>总的目录页</title>
</head>
<body>
    <input value="<%=basePath%>" id="basePath" type="hidden">
    <a src="<%=basePath%>jsp/student/findClass.jsp">通过课程序号或者课程名查询课程</a>
    <a src="<%=basePath%>jsp/student/classes.jsp"></a>
</body>
</html>
