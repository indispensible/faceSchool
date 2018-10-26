<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path=request.getContextPath();
    String basePath=request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>教师主页</title>
    <link type="text/css" href="<%=basePath%>bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link type="text/css" href="<%=basePath%>bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet">
    <link type="text/css" href="<%=basePath%>css/theme.css" rel="stylesheet">
    <link type="text/css" href="<%=basePath%>images/icons/css/font-awesome.css" rel="stylesheet">
    <%--<link type="text/css" href='http://fonts.googleapis.com/css?family=Open+Sans:400italic,600italic,400,600' rel='stylesheet'>--%>
    <script src="<%=basePath%>js/jquery/jquery-3.2.1.js"></script>
    <script src="<%=basePath%>js/teacher/echarts.min.js"></script>
    <style type="text/css">
        #teacherName{
            font-size: 18.5px;
        }
        #DataTables_Table_0_filter{
            display: none;
        }
        #lvgangDiv{
            width: 100%;
            position: absolute;
            top: 50px;
            bottom: 0px;
            left: 0px;
        }
        #lvgangFC{
            display: none;
        }
        #create{
            display: none;
        }
        #allmap {
            display: none;
        }
        #lvTextarea{
            width: 80%;
        }
        #CName{
            height: 26px;
            margin-bottom: 0px;
        }
        #lvgangFS{
            display: none;
        }
        #lvgangFSD{
            display: none;
        }
        #AllStudentsDetail{
            display: none;
        }
        /*#printTotal{*/
            /*height: 21px;*/
            /*line-height: 21px;*/
            /*padding: 0 11px;*/
            /*background: #e4e4e4;*/
            /*border: 1px #26bbdb solid;*/
            /*border-radius: 3px;*/
            /*!*color: #fff;*!*/
            /*display: inline-block;*/
            /*text-decoration: none;*/
            /*font-size: 12px;*/
            /*outline: none;*/
            /*cursor: pointer;*/
        /*}*/
        #hideTable{
            display: none;
        }
        #selectSignCount{
            width: 86%;
            margin-bottom: 0px;
        }
    </style>

    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=XHnF54hWXV76ElgzEnvDeTTP9dY1QqFi"></script>
</head>
<body style='background-image: url("<%=basePath%>index/img/demo-3-bg.jpg");background-size: 100%;'>

<div class="navbar navbar-fixed-top">
    <div class="navbar-inner" style='background-image: url("<%=basePath%>index/img/demo-3-bg.jpg");background-size: 100%;'>
        <div class="container">
            <a class="btn btn-navbar" data-toggle="collapse" data-target=".navbar-inverse-collapse">
                <i class="icon-reorder shaded"></i>
            </a>

            <a class="brand" id="studentTitle" href="#" style="color: #25d2ec;text-shadow: 0 0px 0 #25d2ec;font-size: 20px;">
                faceSchool &nbsp;   教师端
            </a>

            <div class="nav-collapse collapse navbar-inverse-collapse">


                <ul class="nav pull-right">
                    <li><a href="#" id="teacherName" style="color: #25d2ec;text-shadow: 0 0px 0 #25d2ec;font-size: 20px;font-family: FZShuTi;">
                        xxx
                    </a></li>
                    <li class="nav-user dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <img src="<%=basePath%>images/user.png" class="nav-avatar" />
                            <b class="caret"></b>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a id="teacherProfile" href="" target="_blank">个人详情页</a></li>
                            <li class="divider"></li>
                            <li><a href="#" class="signOut">退出</a></li>
                        </ul>
                    </li>
                </ul>
            </div><!-- /.nav-collapse -->
        </div>
    </div><!-- /navbar-inner -->
</div><!-- /navbar -->



<div class="wrapper" id="lvgangDiv">
    <div class="container">
        <div class="row">
            <div class="span3">
                <div class="sidebar">

                    <ul class="widget widget-menu unstyled">

                        <li>
                            <a href="#" id="have_a_comment" target="_blank" style="color: #e6e6e6e6;">
                                <i class="menu-icon icon-cog" style="color: #e6e6e6e6;"></i>
                                留言板
                            </a>
                        </li>

                        <li>
                            <a href="#" id="haveStudents" style="color: #e6e6e6e6;">
                                <i class="menu-icon icon-cog" style="color: #e6e6e6e6;"></i>
                                查询课程的所有学生
                            </a>
                        </li>

                        <li>
                            <a class="collapsed" data-toggle="collapse" href="#togglePages" id="studentsDetail" style="color: #e6e6e6e6;">
                                <i class="menu-icon icon-cog" style="color: #e6e6e6e6;"></i>
                                <i class="icon-chevron-down pull-right" style="color: #e6e6e6e6;"></i><i class="icon-chevron-up pull-right" style="color: #e6e6e6e6;"></i>
                                查询课程的学生的签到情况
                            </a>
                            <ul id="togglePages" class="collapse unstyled">
                                <li>
                                    <a href="#">
                                        <i class="icon-inbox"></i>
                                        <select id="selectSignCount"></select>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" id="showTotal">
                                        <i class="icon-inbox"></i>
                                        查看班级整体签到情况
                                    </a>
                                </li>
                                <li>
                                    <a id="printTotal" href="#">
                                        <i class="icon-inbox"></i>
                                        打印班级整体签到的所有情况
                                    </a>
                                </li>
                            </ul>
                        </li>

                    </ul><!--/.widget-nav-->

                    <ul class="widget widget-menu unstyled">
                        <li>
                            <a href="#" class="signOut" style="color: #e6e6e6e6;">
                                <i class="menu-icon icon-signout" style="color: #e6e6e6e6;"></i>
                                退出
                            </a>
                        </li>
                    </ul>

                </div><!--/.sidebar-->
            </div><!--/.span3-->

            <div class="span9" id="span9DIv">
                <div class="content">
                    <div class="module">
                        <div class="module-head" id="lvgangB">
                            <h3>所有的学生</h3>
                        </div>
                        <div id="lvgangC" class="module-head" >
                            <h3 id="lvgangH1"></h3>
                        </div>
                        <div class="module-body table">
                            <table cellpadding="0" cellspacing="0" border="0" class="datatable-1 table table-bordered table-striped	 display" width="100%">

                                <thead id="hideTHead"></thead>

                                <%--<select id="selectSignCount"></select>--%>

                                <thead class="lvgangFS">
                                    <tr>
                                        <td>学生姓名</td>
                                        <td>学生邮箱</td>
                                        <td>学生电话</td>
                                        <td>学号</td>
                                    </tr>
                                </thead>
                                <tbody id="lvgangBody" class="lvgangFS"></tbody>

                                <thead class="lvGangTable lvgangFSD">
                                    <tr>
                                        <td>学生姓名</td>
                                        <td>学号</td>
                                        <td>签到状态</td>
                                        <td>修改签到状态</td>
                                    </tr>
                                </thead>
                                <tbody id="lvgangFSDBody" class="lvGangTable lvgangFSD"></tbody>

                                <%--<table id="AllStudentsDetail" class="lvgangFSD"></table>--%>

                                <thead class="AllStudentsDetail">
                                    <tr id='trh'></tr>
                                </thead>
                                <tbody id='trBody' class="AllStudentsDetail"></tbody>

                            </table>


                        </div>

                        <div id="main" style="width: 100%;height:466px;display: none;"></div>

                    </div><!--/.module-->

                    <br />

                </div><!--/.content-->
            </div><!--/.span9-->

        </div>
    </div><!--/.container-->
</div><!--/.wrapper-->

<!--     <div class="footer">
        <div class="container">


            <b class="copyright">&copy; faceSchool</b>  All rights reserved.
        </div>
    </div> -->

<table id="hideTable" border="1"></table>
<div id="allmap"></div>

<input value="<%=basePath%>" id="basePath" type="hidden">
<script src="<%=basePath%>js/teacher/classDetail.js"></script>

<script src="<%=basePath%>scripts/jquery-1.9.1.min.js"></script>
<script src="<%=basePath%>scripts/jquery-ui-1.10.1.custom.min.js"></script>
<script src="<%=basePath%>bootstrap/js/bootstrap.min.js"></script>
<script src="<%=basePath%>scripts/datatables/jquery.dataTables.js"></script>
<script>
    $(document).ready(function() {
        $('.datatable-1').dataTable();
        $('.dataTables_paginate').addClass("btn-group datatable-pagination");
        $('.dataTables_paginate > a').wrapInner('<span />');
        $('.dataTables_paginate > a:first-child').append('<i class="icon-chevron-left shaded"></i>');
        $('.dataTables_paginate > a:last-child').append('<i class="icon-chevron-right shaded"></i>');
    } );
</script>

</body>