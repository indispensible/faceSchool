<%@ page import="org.json.JSONArray" %><%--
  Created by IntelliJ IDEA.
  User: 吕港
  Date: 2017/11/13
  Time: 10:36
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path=request.getContextPath();
    String basePath=request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <title>课程详情</title>
    <link type="text/css" href="<%=basePath%>bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link type="text/css" href="<%=basePath%>bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet">
    <link type="text/css" href="<%=basePath%>css/theme.css" rel="stylesheet">
    <link type="text/css" href="<%=basePath%>images/icons/css/font-awesome.css" rel="stylesheet">
    <style type="text/css">
        #span9Div{
            margin-left: 9%;
            width: 86%;
        }
        #myMap {
            /*position: absolute;*/
            /*left: 3%;*/
            /*top: 33%;*/
            width: 99%;
            height: 358px;
            margin: 0;
            margin-left: 0px;
            font-family: "微软雅黑";
            border: 1px solid red;
            margin-left: 0.5%;
        }

        .BMap_cpyCtrl
        {
            display:none;
        }
        .anchorBL{
            display:none;
        }

        #canvas{
            display: none;
        }


        #video{
            /*position: absolute;*/
            /*right: 12%;*/
            /*top: 33%;*/
            width: 100%;
            height: 360px;
        }

        img {
            max-width: 100%;
            width: auto\9;
            height: auto;
            vertical-align: middle;
            border: 0;
            -ms-interpolation-mode: bicubic;
            max-width: inherit;
        }
    </style>
    <script type="text/javascript" src="https://api.map.baidu.com/api?v=2.0&ak=XHnF54hWXV76ElgzEnvDeTTP9dY1QqFi"></script>
    <script src="<%=basePath%>js/jquery/jquery-3.2.1.js"></script>
    <script src="<%=basePath%>js/common/layer/layer.js"></script>
    <script src="<%=basePath%>js/common/aes_2.js"></script>
</head>
<body style='background-image: url("<%=basePath%>index/img/demo-3-bg.jpg");background-size: 100%;'>
    <div class="navbar navbar-fixed-top">
        <div class="navbar-inner" style='background-image: url("<%=basePath%>index/img/demo-3-bg.jpg");background-size: 100%;'>
            <div class="container">
                <a class="btn btn-navbar" data-toggle="collapse" data-target=".navbar-inverse-collapse">
                    <i class="icon-reorder shaded"></i>
                </a>
                <a class="brand" href="#" style="color: #25d2ec;text-shadow: 0 0px 0 #25d2ec;font-size: 20px;">
                    faceSchool &nbsp; 学生端
                </a>
                <div class="nav-collapse collapse navbar-inverse-collapse">



                    <ul class="nav pull-right">

                        <li>
                            <a href="#" id="usernameForStudent" style="color: #25d2ec;text-shadow: 0 0px 0 #25d2ec;font-size: 20px;font-family: FZShuTi;">
                                欢迎使用
                            </a>
                        </li>
                        <li class="nav-user dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <img src="<%=basePath%>images/user.png" class="nav-avatar" />
                                <b class="caret"></b>
                            </a>
                            <ul class="dropdown-menu">
                                <li><a href="<%=basePath%>jsp/student/profile.jsp" target="_blank">个人详情页</a></li>
                                <li class="divider"></li>
                                <li><a href="#" class="signOut">退出</a></li>
                            </ul>
                        </li>
                    </ul>
                </div><!-- /.nav-collapse -->
            </div>
        </div><!-- /navbar-inner -->
    </div><!-- /navbar -->

    <div class="wrapper">
        <div class="container">
            <div class="row">



            <div class="span9" id="span9Div">
                <div class="content">
                    <div class="module">
                        <div class="module-head">
                            <h2 style="display: inline;" id="classTitle">xxx </h2> &nbsp;
                            <span style="font-size: 16px;" id="classH2">xxx</span>
                            <a style="font-size: 16px;float: right;margin-top: 10px;margin-right: 10px;" id="classA2" target="_blank">留言板</a>
                        </div>
                        <div class="module-body">
                            <table class="datatable-1 table table-bordered table-striped" cellpadding="0" cellspacing="0" border="0">
                                <thead>
                                    <tr>
                                        <th>教师姓名</th>
                                        <th>教师邮箱</th>
                                        <th>上课</th>
                                        <th>下课</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr id="classBody"></tr>
                                </tbody>

                            </table>

                            <table class="datatable-1 table table-bordered table-striped" cellpadding="0" cellspacing="0" border="0">

                                <thead>
                                    <tr>
                                        <th>课程描述</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr id="trd"></tr>
                                </tbody>

                            </table>


                            <table class="datatable-1 table table-bordered table-striped" cellpadding="0" cellspacing="0" border="0">

                                <div style="height: 8px;"></div>

                                <tbody>
                                <tr>
                                    <td style="width: 50%;"><div id="myMap"></div></td>
                                    <td>
                                        <div id="contentHolder">
                                            <video id="video" width="160" height="120"  autoplay></video>
                                            <canvas  id="canvas"></canvas>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>

                            </table>

                            <%--<input value="<%=basePath%>" id="basePath" type="hidden">--%>
                        </div>
                        <br />
                        </div>
                    </div><!--/.content-->
                </div><!--/.span9-->
            </div>
        </div><!--/.container-->
    </div><!--/.wrapper-->

    <input value="<%=basePath%>" id="basePath" type="hidden">
    <script src="<%=basePath%>js/student/classDetail.js"></script>
    <script src="<%=basePath%>scripts/jquery-1.9.1.min.js"></script>
    <script src="<%=basePath%>scripts/jquery-ui-1.10.1.custom.min.js"></script>
    <script src="<%=basePath%>bootstrap/js/bootstrap.min.js"></script>
    <script src="<%=basePath%>scripts/datatables/jquery.dataTables.js"></script>
</body>
</html>
