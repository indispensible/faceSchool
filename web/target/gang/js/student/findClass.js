/**
 * Created by 吕港 on 2017/11/8.
 */
var basePath;
window.onload=function() {
    basePath = $("#basePath").val();
}

$("#lvgang").click(function(){
    var para=$('input[name="class"]').val();
    var isString;

    var url=basePath+"find/class.do";
    if(isNaN(para)){
        isString="true";
    }else{
        isString="false";
    }
    var data={
      'para':para,
      'isString':isString
    };

    $.post(url,data,function(result){

        //判断是通过课程序号还是课程名来查询课程并
        if(isNaN(para)){
            //有没有相应的课程查询结果
            var i=0;
            for( i in result){
                i++;
            }
            if(i==0){
                $('#lvgangFC').html("");
                alert("输入的课程名不存在！");
            }else{
                $('#lvgangFC').html("");

                $("#lvgangFC").append("<tr id='trh'></tr>");
                for(var i2 in result[0]){
                    $("#trh").append("<th>"+i2+"</th>");
                }

                for(var i1 in result){
                    $("#lvgangFC").append("<tr id='"+i1+"'></tr>");
                    for(var j in result[i1]){
                        $("#"+i1).append("<td>"+result[i1][j]+"</td>");
                    }
                }
            }
        }else{
            if(result["classes"]==0){
                $('#lvgangFC').html("");
                alert("输入的课程序号不存在！");
            }else{

                $('#lvgangFC').html("");

                $("#lvgangFC").append("<tr id='trh'></tr>");
                $("#lvgangFC").append("<tr id='tr1'></tr>");
                for(var j in result){
                    $("#trh").append("<th>"+j+"</th>");
                    $("#tr1").append("<td>"+result[j]+"</td>");
                }

            }
        }

    },'JSON');
});