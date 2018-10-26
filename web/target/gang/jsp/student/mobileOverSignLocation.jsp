<%--
  Created by IntelliJ IDEA.
  User: 吕港
  Date: 2017/11/15
  Time: 14:29
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<html>
<head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <script type="text/javascript" src="https://api.map.baidu.com/api?v=2.0&ak=XHnF54hWXV76ElgzEnvDeTTP9dY1QqFi"></script>
    <script src="<%=basePath%>js/common/aes_2.js"></script>
    <title>手机地理位置定位</title>
    <script src="<%=basePath%>js/jquery/jquery-3.2.1.js"></script>
</head>
<body>
    <input id="OverSignLocation" type="button" value="地理位置定位-下课签到"/>

    <input value="<%=basePath%>" id="basePath" type="hidden">
    <script src="<%=basePath%>js/student/mobileSignLocation.js"></script>
</body>
</html>
