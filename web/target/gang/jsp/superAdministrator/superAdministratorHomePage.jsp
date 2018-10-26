<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path=request.getContextPath();
    String basePath=request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>管理员主页</title>
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
        #span9DIv{
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
        #appendAdministratorFrom{
            display: none;
        }
        /*#newUsername{*/
            /*display: none;*/
        /*}*/
        #updatePassword{
            display: none;
        }
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
        #administratorInput1{
            margin-bottom: 0px;
            height: 25px;
        }
        #administratorInput2{
            margin-bottom: 0px;
            height: 25px;
        }
        #administratorInput3{
            margin-bottom: 0px;
            height: 25px;
        }
        #administratorInput4{
            margin-bottom: 0px;
            height: 25px;
        }
        #displayAll{
            margin-left: 1.8%;
        }
    </style>

</head>
<body>

    <div class="navbar navbar-fixed-top">
        <div class="navbar-inner">
            <div class="container">
                <a class="btn btn-navbar" data-toggle="collapse" data-target=".navbar-inverse-collapse">
                    <i class="icon-reorder shaded"></i>
                </a>

                <a class="brand" id="studentTitle" href="#">
                    faceSchool &nbsp;   超级管理员
                </a>

                <div class="nav-collapse collapse navbar-inverse-collapse">

                
                    <ul class="nav pull-right">
                        <li><a href="#" id="administratorName">
                            xxx
                        </a></li>
                        <li class="nav-user dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <img src="<%=basePath%>images/user.png" class="nav-avatar" />
                                <b class="caret"></b>
                            </a>
                            <ul class="dropdown-menu">
                                <%--<li><a href="#">个人详情页</a></li>--%>
                                <%--<li class="divider"></li>--%>
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
                                <a href="#" id="updateAdministratorPassword">
                                    <i class="menu-icon icon-cog"></i>
                                    修改密码
                                </a>
                            </li>

                            <%--管理员生成和查看权限--%>
                            <li>
                                <a class="collapsed" data-toggle="collapse" href="#togglePages" id="studentsDetail">
                                    <i class="menu-icon icon-cog"></i>
                                    <i class="icon-chevron-down pull-right"></i><i class="icon-chevron-up pull-right"></i>
                                    查看或添加管理员
                                </a>
                                <ul id="togglePages" class="collapse unstyled">
                                    <li>
                                        <a href="#" id="queryAdministrator">
                                            <i class="icon-inbox" id="Administrators"></i>
                                            查看管理员权限
                                        </a>
                                    </li>
                                    <li>
                                        <a id="appendAdministrator" href="#">
                                            <i class="icon-inbox"></i>
                                            添加新的管理员
                                        </a>
                                    </li>
                                </ul>
                            </li>

                            <%--教师审核、删除--%>
                            <li>
                                <a class="collapsed" data-toggle="collapse" href="#togglePages1" id="studentsDetail1">
                                    <i class="menu-icon icon-cog"></i>
                                    <i class="icon-chevron-down pull-right"></i><i class="icon-chevron-up pull-right"></i>
                                    教师查看
                                </a>
                                <ul id="togglePages1" class="collapse unstyled">
                                    <li>
                                        <a href="#" id="queryAllCheckPending">
                                            <i class="icon-inbox" id="checkPending"></i>
                                            待审核的老师
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" id="queryAllChecked">
                                            <i class="icon-inbox" id="allChecked"></i>
                                            已审核的老师
                                        </a>
                                    </li>
                                    <li>
                                        <a id="queryAllDeleted" href="#">
                                            <i class="icon-inbox" id="allDeleted"></i>
                                            已删除的老师
                                        </a>
                                    </li>
                                </ul>
                            </li>

                        </ul><!--/.widget-nav-->

                        <ul class="widget widget-menu unstyled">
                            <li>
                                <a href="#" class="signOut">
                                    <i class="menu-icon icon-signout"></i>
                                    退出
                                </a>
                            </li>
                        </ul>

                    </div><!--/.sidebar-->
                </div><!--/.span3-->

                <div class="span9" id="span9DIv">
                    <div class="content">
                        <div class="module">
                            <div class="module-head">
                                <h3 id="newUsername">xxx</h3>
                            </div>
                            <div class="module-body table">
                                <table cellpadding="0" cellspacing="0" border="0" class="datatable-1 table table-bordered table-striped	 display" width="100%">

                                    <thead id="hideTHead"></thead>

                                    <%--<table id="displayAll"></table>--%>

                                    <tbody id="appendAdministratorFrom">
                                        <%--<tr><td><h2>账号自动生成，注册完后会告知！(密码默认为:123456,请自行修改！)</h2></td></tr>--%>
                                        <tr><td><input name="email" type="email" placeholder="请输入邮箱账号" required="required" id="administratorInput1"></td></tr>
                                        <tr><td><input name="iphone" type="tel" placeholder="请输入手机号" required="required" id="administratorInput2"></td></tr>
                                        <tr><td><input name="realname" type="text" placeholder="请输入真实姓名" required="required" id="administratorInput3"></td></tr>
                                        <tr><td><input id="appendAdministratorInput" type="button" value="创建新管理员"></td></tr>
                                    </tbody>

                                    <tbody id="updatePassword">
                                        <tr style="display: none" ><td><h3 id="getUsername">账号不能修改，账号为:<%=session.getAttribute("superAdministrator")%></h3></td></tr>
                                        <tr><td><input type="text" name="password" placeholder="请输入修改的密码！" required="required" id="administratorInput4"></td></tr>
                                        <tr><td><input id="updatePasswordFrom" type="button" value="修改密码"></td></tr>
                                    </tbody>


                                </table>

                                <table id="displayAll"></table>


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

    <!--弹出层时背景层DIV-->
    <div id="fade" class="black_overlay"></div>
    <div id="MyDiv" class="white_content">
        <div style="position: absolute;right: 0px;cursor: pointer;">
            <span style="font-size: 16px;" onclick="CloseDiv('MyDiv','fade')">关闭</span>
        </div>
        <img src="" width="100%" id="lvGangImg"/>
    </div>

    <input value="<%=basePath%>" id="basePath" type="hidden">
    <script src="<%=basePath%>js/administrator/administratorCommon.js"></script>

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