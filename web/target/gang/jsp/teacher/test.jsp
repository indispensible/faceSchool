<%--
  Created by IntelliJ IDEA.
  User: 吕港
  Date: 2018/2/28
  Time: 22:25
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
    <meta charset="utf-8">
    <title>ECharts</title>
    <!-- 引入 echarts.js -->
    <script src="<%=basePath%>js/teacher/echarts.min.js"></script>
</head>
<body>
<!-- 为ECharts准备一个具备大小（宽高）的Dom -->
<div id="main" style="width: 600px;height:466px;"></div>
<script type="text/javascript">
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));

    // 指定图表的配置项和数据
    var scale = 1;
    var echartData = [{
        value: 2154,
        name: '曲阜师范大学'
    }, {
        value: 3854,
        name: '潍坊学院'
    }, {
        value: 3515,
        name: '青岛职业技术学院'
    }, {
        value: 3515,
        name: '淄博师范高等专科'
    }]
    var rich = {
        yellow: {
            color: "#ffc72b",
            fontSize: 30 * scale,
            padding: [5, 4],
            align: 'center'
        },
        total: {
            color: "#ffc72b",
            fontSize: 40 * scale,
            align: 'center'
        },
        white: {
            color: "#fff",
            align: 'center',
            fontSize: 14 * scale,
            padding: [21, 0]
        },
        blue: {
            color: '#49dff0',
            fontSize: 16 * scale,
            align: 'center'
        },
        hr: {
            borderColor: '#0b5263',
            width: '100%',
            borderWidth: 1,
            height: 0,
        }
    }
    option = {
        backgroundColor: '#031f2d',
        title: {
            text:'总签到情况',
            left:'center',
            top:'53%',
            padding:[24,0],
            textStyle:{
                color:'#fff',
                fontSize:18*scale,
                align:'center'
            }
        },
        legend: {
            selectedMode:false,
            formatter: function(name) {
                var total = 0; //各科正确率总和
                var averagePercent; //综合正确率
                echartData.forEach(function(value, index, array) {
                    total += value.value;
                });
                return '{total|' + total + '}';
            },
            data: [echartData[0].name],
            // data: ['高等教育学'],
            // itemGap: 50,
            left: 'center',
            top: 'center',
            icon: 'none',
            align:'center',
            textStyle: {
                color: "#fff",
                fontSize: 16 * scale,
                rich: rich
            },
        },
        series: [{
            name: '总考生数量',
            type: 'pie',
            radius: ['42%', '50%'],
            hoverAnimation: false,
            color: ['#c487ee', '#deb140', '#49dff0', '#034079', '#6f81da', '#00ffb4'],
            label: {
                normal: {
                    formatter: function(params, ticket, callback) {
                        var total = 0; //考生总数量
                        var percent = 0; //考生占比
                        echartData.forEach(function(value, index, array) {
                            total += value.value;
                        });
                        percent = ((params.value / total) * 100).toFixed(1);
                        return '{white|' + params.name + '}\n{hr|}\n{yellow|' + params.value + '}\n{blue|' + percent + '%}';
                    },
                    rich: rich
                },
            },
            labelLine: {
                normal: {
                    length: 55 * scale,
                    length2: 0,
                    lineStyle: {
                        color: '#0b5263'
                    }
                }
            },
            data: echartData
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
</script>
</body>
</html>
