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
    <style type="text/css">
        #lvgangFClasses{
            display: none;
        }
        #lvgangFCForYou{
            display: none;
        }
        #findClass{
            display: inline;
            margin-left: 60%;
        }
    </style>
</head>
<body>
    <input id="basePath" type="hidden" value="<%=basePath%>"/>
    <input id="haveClasses" type="button" value="查询所选课程">

    <form id="findClass">
        <tr>
            <td>课程序号或者代码：<input type="text" name="class"></td>
        </tr>
        <input type="button" id="lvgang" value="mmp">
    </form>
    <hr>

    <table id="lvgangFClasses">
        <tr>
            <th>课程序号</th>
            <th>课程名</th>
            <th>课程描述</th>
            <th>课程创建时间</th>
            <th>课程老师</th>
            <th>老师邮箱</th>
            <th>加入课程</th>
        </tr>
        <tbody id="lvgangFindC"></tbody>
    </table>

    <table id="lvgangFCForYou">
        <tr>
            <th>课程序号</th>
            <th>课程名</th>
            <th>课程老师</th>
            <th>老师邮箱</th>
            <th>已点名</th>
            <th>删除课程</th>
        </tr>
        <tbody id="lvgangFC"></tbody>
    </table>

    <script src="<%=basePath%>js/student/classes.js"></script>
</body>
</html>
