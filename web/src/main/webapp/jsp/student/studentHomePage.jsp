<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path=request.getContextPath();
    String basePath=request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
    <title>学生主页</title>
    <link type="text/css" href="<%=basePath%>bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link type="text/css" href="<%=basePath%>bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet">
    <link type="text/css" href="<%=basePath%>css/theme.css" rel="stylesheet">
    <link type="text/css" href="<%=basePath%>images/icons/css/font-awesome.css" rel="stylesheet">
    <%--<link type="text/css" href='http://fonts.googleapis.com/css?family=Open+Sans:400italic,600italic,400,600' rel='stylesheet'>--%>
    <script src="<%=basePath%>js/jquery/jquery-3.2.1.js"></script>
    <style type="text/css">
        #usernameForStudent{
            font-size: 18.5px;
        }
        #DataTables_Table_0_filter{
            display: none;
        }
        #lvgangFClasses{
            display: none;
        }
        #lvgangFCForYou{
            display: none;
        }
        #findClass{
            /*display: ruby-text-container;*/
            /*margin-left: 60%;*/
            /*margin-left: 2px;*/
        }
        #DataTables_Table_0_info{
            display: none;
        }
        #lvgang{
            margin-bottom: 5px;
            margin-top: -8px;
        }
        #lvInput{
            height: 25px;
        }
        .myClass{
            display: none;
        }
        .myBook{
            display: none;
        }
    </style>
</head>
<body style='background-image: url("<%=basePath%>index/img/demo-3-bg.jpg")'>
    <input id="basePath" type="hidden" value="<%=basePath%>"/>
    <div class="navbar navbar-fixed-top">
        <div class="navbar-inner" style='background-image: url("<%=basePath%>index/img/demo-3-bg.jpg")'>
            <div class="container">
                <a class="btn btn-navbar" data-toggle="collapse" data-target=".navbar-inverse-collapse">
                    <i class="icon-reorder shaded"></i>
                </a>

                <a class="brand" id="studentTitle" href="#" style="color: #25d2ec;text-shadow: 0 0px 0 #25d2ec;font-size: 21px;">
                    faceSchool &nbsp;   学生端
                </a>

                <div class="nav-collapse collapse navbar-inverse-collapse">

                
                    <ul class="nav pull-right">
                        <li><a href="#" id="usernameForStudent" style="color: #25d2ec;text-shadow: 0 0px 0 #25d2ec;font-size: 20px;font-family: FZShuTi;">
                            欢迎使用
                        </a></li>
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



    <div class="wrapper" id="lvgangDiv">
        <div class="container">
            <div class="row">
                <div class="span3">
                    <div class="sidebar">

                        <ul class="widget widget-menu unstyled">

                            <li style="display: none;">
                                <a class="collapsed" data-toggle="collapse" href="#togglePages">
                                    <i class="menu-icon icon-cog"></i>
                                    <i class="icon-chevron-down pull-right"></i><i class="icon-chevron-up pull-right"></i>
                                    我的大学
                                </a>
                                <ul id="togglePages" class="collapse unstyled">
                                    <li>
                                        <a href="#" id="myClasses">
                                            <i class="icon-inbox"></i>
                                            本学期所学课程
                                        </a>
                                    </li>
                                    <%--<li>--%>
                                        <%--<a href="#">--%>
                                            <%--<i class="icon-inbox"></i>--%>
                                            <%--本学期所需书籍--%>
                                        <%--</a>--%>
                                    <%--</li>--%>
                                </ul>
                            </li>

                            <li>
                                <a class="collapsed" data-toggle="collapse" href="#studentPages" style="color: #e6e6e6e6;">
                                    <i class="menu-icon icon-cog" style="color: #e6e6e6e6;"></i>
                                    <i class="icon-chevron-down pull-right"></i><i class="icon-chevron-up pull-right"></i>
                                    我要学习
                                </a>
                                <ul id="studentPages" class="collapse unstyled">
                                    <li>
                                        <a href="#" id="haveClasses">
                                            <i class="icon-inbox"></i>
                                            我的课程
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" id="lvgangA">
                                            <i class="icon-inbox"></i>
                                            查询课程
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

                <div class="span9" id="span9DIv" style="display: none">
                    <div class="content">
                        <div class="module">
                            <div class="module-head" id="lvgangB">
                                <h3 id="lvgangH3">我的课程</h3>

                                <select id="selectedTime" class="module-head" style="padding: 0px;margin: -25px 0px 0px 80px;position: absolute;background: #fff;">
                                    <option value="2016">全部</option>
                                    <option value="2017">2017年第二学期</option>
                                    <option value="2018">2018年第一学期</option>
                                </select>

                                <span style="position: absolute;margin-left: 320px;margin-top: -18px;color: #00000080;">&nbsp;(加入课程的时间)</span>
                            </div>
                            <div id="findClass" class="module-head" style="display: none">
                                <h3>课程序号或者代码：<input type="text" name="class" id="lvInput">
                                <input type="button" id="lvgang" value="查询"></h3>
                            </div>

                            <%--<div id="selectedTime" class="module-head" >--%>

                            <%--</div>--%>

                            <div class="module-body table">
                                <table cellpadding="0" cellspacing="0" border="0" class="datatable-1 table table-bordered table-striped	 display" width="100%">

                                    <thead id="hideTHead" style="display: none"></thead>


                                    <thead class="myClass">
                                    <tr>
                                        <th>课程名</th>
                                        <th>课程老师</th>
                                        <th>课程时间</th>
                                    </tr>
                                    </thead>
                                    <tbody id="lvgangClasses" class="myClass"></tbody>


                                    <thead class="myBook">
                                    <tr>
                                        <th>课程序号</th>
                                        <th>课程名</th>
                                        <th>课程老师</th>
                                        <th>老师邮箱</th>
                                        <th>已点名</th>
                                        <th>删除课程</th>
                                    </tr>
                                    </thead>
                                    <tbody id="lvgangBooks" class="myBook"></tbody>
                                    
                                        <thead class="lvgangFClasses">
                                            <tr>
                                                <th style="width: 32px;">课程序号</th>
                                                <th style="width: 32px;">课程名</th>
                                                <th>课程描述</th>
                                                <th style="width: 52px;">课程创建时间</th>
                                                <th style="width: 32px;">课程老师</th>
                                                <th>老师邮箱</th>
                                                <th>加入课程</th>
                                            </tr>
                                        </thead>
                                    <tbody id="lvgangFindC" class="lvgangFClasses"></tbody>

                                    <thead class="lvgangFCForYou" id="lvgangTime">
                                        <tr>
                                            <th style="text-align: center;">课程序号</th>
                                            <th style="text-align: center;">课程名</th>
                                            <th style="text-align: center;">课程老师</th>
                                            <th style="text-align: center;">老师邮箱</th>
                                            <th style="text-align: center;">已点名</th>
                                            <th style="text-align: center;">删除课程</th>
                                        </tr>
                                    </thead>
                                    <tbody id="lvgangFC" class="lvgangFCForYou"></tbody>


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

    <script src="<%=basePath%>scripts/jquery-1.9.1.min.js"></script>
    <script src="<%=basePath%>scripts/jquery-ui-1.10.1.custom.min.js"></script>
    <script src="<%=basePath%>bootstrap/js/bootstrap.min.js"></script>
    <script src="<%=basePath%>scripts/datatables/jquery.dataTables.js"></script>
    <script src="<%=basePath%>js/student/classes.js"></script>
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