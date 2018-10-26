<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%--
  Created by IntelliJ IDEA.
  User: 吕港
  Date: 2017/11/21
  Time: 15:16
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path=request.getContextPath();
    String basePath=request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
    <title>教师主页</title>
    <script src="<%=basePath%>js/jquery/jquery-3.2.1.js"></script>
    <style type="text/css">
        #lvgangFC{
            display: none;
        }
        #create{
            display: none;
        }
        #allmap {
            display: none;
        }
    </style>

    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=XHnF54hWXV76ElgzEnvDeTTP9dY1QqFi"></script>

</head>
<body>
    <h1 id="teacherName"></h1>
    <input id="haveClasses" type="button" value="查询所教课程">
    <input id="createClasses" type="button" value="添加课程"><hr>
    <table id="lvgangFC">
        <tr>
            <td>课程序号</td>
            <td>课程名</td>
            <td>课程简介</td>
            <td>课程创建时间</td>
            <td>总共签到次数</td>
            <td>上课</td>
            <td>下课</td>
            <td>删除课程</td>
        </tr>
        <tbody id="classes">

        </tbody>
    </table>

    <div id="create">
        <input name="CName" type="text" placeholder="课程名" required="required">
        <textarea name="CDescription" type="text" placeholder="课程简介" required="required"></textarea>
        <input id="createClass" type="button" value="创建课程">
    </div>



    <div id="allmap"></div>

    <input value="<%=basePath%>" id="basePath" type="hidden">
    <script src="<%=basePath%>js/teacher/teachingClasses.js"></script>
</body>
</html>
