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
        <div class="x_panel" style="height: 90%;">
            <div class="x_title">
                <h2 id="updateTitle"></h2>
                <div class="clearfix"></div>
            </div>
            <div class="x_content">

                <form class="form-horizontal form-label-left" novalidate id="lvgangde">

                    <div class="item form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">课程名:</span>
                        </label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <input id="name" class="form-control col-md-7 col-xs-12" name="realname" required="required" type="text" value="">
                        </div>
                    </div>

                    <div class="item form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">课程序号:</span>
                        </label>
                        <div class="col-md-6 col-sm-6 col-xs-12" style="margin: 6.5px 0px;">
                            <p  id="nolvgang" style="display: inline;margin: 0;font-size: 15px;"></p>
                        </div>
                    </div>

                    <div class="item form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">签到次数:</span>
                        </label>
                        <div class="col-md-6 col-sm-6 col-xs-12" style="margin: 6.5px 0px;">
                            <p  id="signlvgang" style="display: inline;margin: 0;font-size: 15px;"></p>
                        </div>
                    </div>

                    <div class="item form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">创建时间:</span>
                        </label>
                        <div class="col-md-6 col-sm-6 col-xs-12" style="margin: 6.5px 0px;">
                            <p  id="createTime" style="display: inline;margin: 0;font-size: 15px;"></p>
                        </div>
                    </div>


                    <div class="item form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">课程简介:</span>
                        </label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <textarea id="phone" class="form-control col-md-7 col-xs-12" name="phone" required="required" style="height: 120px;"></textarea>
                        </div>
                    </div>


                    <div class="ln_solid"></div>
                    <div class="form-group">
                        <div class="col-md-6 col-md-offset-3">
                            <input id="submit" class="btn btn-primary" value="取消修改" style="width: 15%;">
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

<script src="<%=basePath%>js/teacher/updateClass.js"></script>

<!-- Custom Theme Scripts -->
<script src="<%=basePath%>js/common/custom.min.js"></script>

</body>
</html>
