<%--
  Created by IntelliJ IDEA.
  User: 吕港
  Date: 2017/11/4
  Time: 16:48
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <style type="text/css">
        body, html,#allmap {width: 100%;height: 100%;overflow: hidden;margin:0;font-family:"微软雅黑";}
    </style>
    <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=XHnF54hWXV76ElgzEnvDeTTP9dY1QqFi"></script>
    <title>测距</title>
</head>
<body>
    <div id="allmap"></div>
</body>
</html>
<script type="text/javascript">
    var map = new BMap.Map("allmap");

    var point = new BMap.Point(106.486654,29.490295);

    map.centerAndZoom(point,19);

    //在地图中添加标记点
    var marker = new BMap.Marker(point);
    map.addOverlay(marker);

    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
</script>
