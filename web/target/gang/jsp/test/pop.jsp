<%--
  Created by IntelliJ IDEA.
  User: 吕港
  Date: 2017/11/26
  Time: 19:11
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path=request.getContextPath();
    String basePath=request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
    <title>jQuery弹出层效果</title>
    <script src="<%=basePath%>js/jquery/jquery-3.2.1.js"></script>
    <style>
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
    <script type="text/javascript">
        //弹出隐藏层
        function ShowDiv(show_div,bg_div){
            document.getElementById(show_div).style.display='block';
            document.getElementById(bg_div).style.display='block' ;
            var bgdiv = document.getElementById(bg_div);
            bgdiv.style.width = document.body.scrollWidth;
// bgdiv.style.height = $(document).height();
            $("#"+bg_div).height($(document).height());
        };
        //关闭弹出层
        function CloseDiv(show_div,bg_div)
        {
            document.getElementById(show_div).style.display='none';
            document.getElementById(bg_div).style.display='none';
        };
    </script>
</head>
<body>
<input id="Button1" type="button" value="点击弹出层" onclick="ShowDiv('MyDiv','fade')" />
<!--弹出层时背景层DIV-->
<div id="fade" class="black_overlay">
</div>
<div id="MyDiv" class="white_content">
    <div style="position: absolute;right: 0px;cursor: pointer;">
        <span style="font-size: 16px;" onclick="CloseDiv('MyDiv','fade')">关闭</span>
    </div>
    <img src="http://localhost:8080/123.jpg" width="100%"/>
</div>
</body>
</html>
