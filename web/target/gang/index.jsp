<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>faceSchool</title>

    <link rel="stylesheet" type="text/css" href="<%=basePath%>index/css/normalize.css" />
    <link rel="stylesheet" type="text/css" href="<%=basePath%>index/css/demo.css" />

    <!--必要样式-->
    <link rel="stylesheet" type="text/css" href="<%=basePath%>index/css/component.css" />

    <style type="text/css">
        body {
            font-family: "华文琥珀";
        }
        .image{
            opacity: 0.7;
        }
        .image:hover{
            opacity: 1;
        }
        a{
            opacity: 0.8;
        }
        a:hover{
            opacity: 1;
        }
    </style>

    <!--[if IE]>
    <script src="<%=basePath%>index/js/html5.js"></script>
    <![endif]-->
</head>
<body>
<div class="container demo-1">
    <div class="content">
        <div id="large-header" class="large-header">
            <canvas id="demo-canvas"></canvas>
            <div class="main-title">
                <img src="<%=basePath%>index/img/3.jpg" id="img1" class="image" alt="student" style="cursor:pointer;width: 158px;height: 158px;border-radius: 50%;"/>
                <img src="<%=basePath%>index/img/1.jpg" id="img2" class="image" alt="teacher" style="cursor:pointer;width: 158px;height: 158px;border-radius: 50%;"/>
                <img src="<%=basePath%>index/img/2.jpg" id="img3" class="image" alt="administrator" style="cursor:pointer;width: 158px;height: 158px;border-radius: 50%;"/>
            </div>
            <div class="main-title" style="top: 67%;font-size: 30px;letter-spacing: 2px;left: 32.3%;">
                <a style="color: #15dde2;" href="<%=basePath%>jsp/student/login.jsp" target="_blank">学生</a>
            </div>
            <div class="main-title" style="top: 67%;font-size: 30px;letter-spacing: 2px;">
                <a style="color: #15dde2;" href="<%=basePath%>jsp/teacher/login.jsp" target="_blank">教师</a>
            </div>
            <div class="main-title" style="top: 67%;font-size: 30px;letter-spacing: 2px;left: 67.7%;">
                <a style="color: #15dde2;" href="<%=basePath%>jsp/administrator/login.jsp" target="_blank">管理员</a>
            </div>
        </div>
    </div>
</div><!-- /container -->
<input value="<%=basePath%>" id="basePath" type="hidden">
<script src="<%=basePath%>index/js/TweenLite.min.js"></script>
<script src="<%=basePath%>index/js/EasePack.min.js"></script>
<script src="<%=basePath%>index/js/rAF.js"></script>
<script src="<%=basePath%>index/js/demo-1.js"></script>
<script src="<%=basePath%>js/jquery/jquery-3.2.1.js"></script>
<script src="<%=basePath%>index/index.js"></script>

</body>
</html>
