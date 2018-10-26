<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%--
  Created by IntelliJ IDEA.
  User: 吕港
  Date: 2017/11/21
  Time: 18:46
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path=request.getContextPath();
    String basePath=request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<html>
<head>
    <title>课程详情</title>
    <script src="<%=basePath%>js/jquery/jquery-3.2.1.js"></script>
    <style type="text/css">
        #lvgangFS{
            display: none;
        }
        #lvgangFSD{
            display: none;
        }
        #AllStudentsDetail{
            display: none;
        }
        #printTotal{
            height: 21px;
            line-height: 21px;
            padding: 0 11px;
            background: #e4e4e4;
            border: 1px #26bbdb solid;
            border-radius: 3px;
            /*color: #fff;*/
            display: inline-block;
            text-decoration: none;
            font-size: 12px;
            outline: none;
            cursor: pointer;
        }
        #hideTable{
            display: none;
        }
    </style>
</head>
<body>
    <input id="haveStudents" type="button" value="查询课程所对应的学生">
    <input id="studentsDetail" type="button" value="查询课程所对应的学生的签到情况"><hr/>
    <table id="lvgangFS">
        <h2 id="lvgangH"></h2>
        <tr>
            <td>学生姓名</td>
            <td>学生邮箱</td>
            <td>学生电话</td>
            <td>学号</td>
        </tr>
        <tbody id="lvgangBody"></tbody>
    </table>
    <div id="lvgangFSD">
        <select id="selectSignCount"></select>
        <input id="showTotal" type="button" value="查看班级整体签到情况">
        <a id="printTotal">打印班级整体签到的所有情况</a><br/>
        <h2 id="lvgangH1"></h2>
        <table id="lvGangTable">
            <tr>
                <td>学生姓名</td>
                <td>学号</td>
                <td>签到状态</td>
                <td>修改签到状态</td>
            </tr>
            <tbody id="lvgangFSDBody"></tbody>
        </table>

        <table id="AllStudentsDetail"></table>
    </div>

    <table id="hideTable" border="1"></table>

    <input value="<%=basePath%>" id="basePath" type="hidden">
    <script src="<%=basePath%>js/teacher/classDetail.js"></script>
</body>
</html>
