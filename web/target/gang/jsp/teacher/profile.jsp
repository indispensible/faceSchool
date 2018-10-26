<%--
  Created by IntelliJ IDEA.
  User: 吕港
  Date: 2018/3/1
  Time: 9:48
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path=request.getContextPath();
    String basePath=request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
    <title>教师个人资料</title>

    <!-- Bootstrap -->
    <link type="text/css" href="<%=basePath%>css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom Theme Style -->
    <link href="<%=basePath%>css/custom.min.css" rel="stylesheet">
    <script src="<%=basePath%>js/jquery/jquery-3.2.1.js"></script>

</head>
<body>

    <div class="clearfix"></div>

        <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="x_panel">
                    <div class="x_title">
                        <h2>教师个人资料</h2>
                        <div class="clearfix"></div>
                    </div>
                    <div class="x_content">

                        <form class="form-horizontal form-label-left" novalidate id="lvgangde">

                            <div class="item form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">姓名</span>
                                </label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input id="name" class="form-control col-md-7 col-xs-12" name="realname" required="required" type="text" value="">
                                </div>
                            </div>

                            <div class="item form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">邮箱</span>
                                </label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <p class="lvgang" id="usernamelvgang" style="display: inline;"></p>
                                    <span id="usernamelvgangde">(邮箱不可改变)</span>
                                </div>
                            </div>

                            <div class="item form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">手机号</span>
                                </label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input id="phone" class="form-control col-md-7 col-xs-12" name="phone" required="required" type="text" value="" >
                                </div>
                            </div>

                            <div class="item form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">教师证件照:</label>
                                <div class="col-sm-5">
                                    <span id="imagetest">(教师证件照,如需修改请联系管理员，邮箱：m15801872696@163.com)</span>
                                    <img style="display: none;margin-left: 8.3%;" id="upload_org_code_img"  width="326" src="">
                                </div>
                            </div>

                            <div class="ln_solid"></div>
                            <div class="form-group">
                                <div class="col-md-6 col-md-offset-3">
                                    <button type="submit" class="btn btn-primary">取消修改</button>
                                    <button id="sendByLvgang" type="button" class="btn btn-success">确认修改</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </div>
        <!-- /page content -->
        </div>
    </div>
    <input id="basePath" type="hidden" value="<%=basePath%>"/>

    <script src="<%=basePath%>js/teacher/profile.js"></script>

    <!-- Custom Theme Scripts -->
    <script src="<%=basePath%>js/common/custom.min.js"></script>

</body>
</html>
