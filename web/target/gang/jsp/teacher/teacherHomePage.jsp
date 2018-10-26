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
    </style>

    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <script type="text/javascript" src="https://api.map.baidu.com/api?v=2.0&ak=XHnF54hWXV76ElgzEnvDeTTP9dY1QqFi"></script>
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
                                <a href="#" id="haveClasses" style="color: #e6e6e6e6;">
                                    <i class="menu-icon icon-cog" style="color: #e6e6e6e6;"></i>
                                    所教课程
                                </a>
                            </li>

                            <li>
                                <a href="#" id="createClasses" style="color: #e6e6e6e6;">
                                    <i class="menu-icon icon-cog" style="color: #e6e6e6e6;"></i>
                                    添加课程
                                </a>
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

                <div class="span9" id="span9DIv" style="display: none">
                    <div class="content">
                        <div class="module">
                            <div class="module-head" id="lvgangB">
                                <h3>所教课程</h3>

                                <select id="selectedTime" class="module-head" style="padding: 0px;margin: -25px 0px 0px 80px;position: absolute;background: #fff;">
                                    <option value="2016">全部</option>
                                    <option value="2017">2017年第二学期</option>
                                    <option value="2018">2018年第一学期</option>
                                </select>

                            </div>
                            <div id="lvgangC" class="module-head" >
                                <h3>添加课程</h3>
                            </div>
                            <div class="module-body table">
                                <table cellpadding="0" cellspacing="0" border="0" class="datatable-1 table table-bordered table-striped	 display" width="100%">

                                    <thead id="hideTHead" style="display: none"></thead>

                                    <thead class="lvgangFC" id="lvgangFC_1">
                                        <tr>
                                            <td style="width: 65px;text-align: center;">课程序号</td>
                                            <td style="width: 150px;text-align: center;">课程名</td>
                                            <td style="width: 90px;text-align: center;">课程简介</td>
                                            <td style="width: 120px;text-align: center;">课程创建时间</td>
                                            <td style="text-align: center;">签到</td>
                                            <td style="text-align: center;">上课</td>
                                            <td style="text-align: center;">下课</td>
                                            <td style="text-align: center;">删除课程</td>
                                        </tr>
                                    </thead>
                                    <tbody id="classes" class="lvgangFC"></tbody>

                                    <tbody id="create">
                                        <tr>
                                            <td>
                                                <input id="CName" name="CName" type="text" placeholder="课程名" required="required">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <textarea id="lvTextarea" name="CDescription" type="text" placeholder="课程简介" required="required"></textarea>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <input id="createClass" type="button" value="创建课程">
                                            </td>
                                        </tr>
                                    </tbody>

                                </table>


                            </div>
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

    <div id="allmap"></div>

    <input value="<%=basePath%>" id="basePath" type="hidden">
    <script src="<%=basePath%>js/teacher/teachingClasses.js"></script>

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