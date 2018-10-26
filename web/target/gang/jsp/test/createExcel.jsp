<%--
  Created by IntelliJ IDEA.
  User: 吕港
  Date: 2017/11/22
  Time: 17:59
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" import="java.util.*" %>
<%@ page import="java.io.*" %>
<%@ page import="com.gang.common.*" %>
<%
    String fName = "学校竞争力情况";
    OutputStream os = response.getOutputStream();//取得输出流
    response.reset();//清空输出流
    System.out.println(fName);

    //下面是对中文文件名的处理
    response.setCharacterEncoding("UTF-8");//设置相应内容的编码格式
    //fName = java.net.URLEncoder.encode(fName,"UTF-8");
    response.setHeader("Content-Disposition","attachment;filename="+new String(fName.getBytes(),"iso-8859-1")+".xls");
    response.setContentType("application/msexcel");//定义输出类型
    ExcelWrite sw = new ExcelWrite();
    sw.createExcel(os);
%>
<html>
<head>

    <title></title>

</head>

<body>
</body>
</html>
