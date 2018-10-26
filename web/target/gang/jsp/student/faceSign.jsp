<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>webcam</title>
    <script src="<%=basePath%>js/jquery/jquery-3.2.1.js"></script>
    <style type="text/css">
        #canvas{
            visibility: hidden;
        }
    </style>
    
</head>
    <body>
        <div id="support"></div>
        <input id="userId" type="text"> 
        <div id="contentHolder">       
            <video id="video" width="160" height="120" style="border:1px solid red" autoplay></video>       
            <button id="snap"> 拍照</button>        
            <canvas style="border:1px solid red" id="canvas"></canvas>
        </div>

        <input value="<%=basePath%>" id="basePath" type="hidden">

        <script src="<%=basePath%>js/student/recognize.js"></script>
        
    </body>
</html>