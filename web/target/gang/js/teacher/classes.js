/**
 * Created by 吕港 on 2017/11/11.
 */
var basePath;
window.onload=function() {
    basePath = $("#basePath").val();
}

$("#haveClasses").click(function(){
    var data={};
    var url=basePath+"SCFind/classesBySId.do";

    $.post(url,data,function(result){
        //有没有相应的在学习的课程
        var i=0;
        for( i in result){
            i++;
        }
        if(i==0){
            $('#lvgangFC').html("");
            $('#lvgangFC').html("你还没有加入任何课堂哦!");
        }else{

            $('#lvgangFC').html("");

            $("#lvgangFC").append("<tr id='trh'></tr>");
            for(var i2 in result[0]){
                if(i2!="teacher"){
                    $("#trh").append("<th>"+i2+"</th>");
                }else{
                    $("#trh").append("<th>老师</th>");
                }
            }

            for(var i1 in result){
                $("#lvgangFC").append("<tr id='"+i1+"'></tr>");
                for(var j in result[i1]){
                    if(j!="teacher"){
                        $("#"+i1).append("<td>"+result[i1][j]+"</td>");
                    }else{
                        $("#"+i1).append("<td>"+result[i1][j]["realname"]+"</td>");
                    }
                }
            }
        }

    },'JSON');
});

$("#haveStudents").click(function(){
    var url=basePath+'SCFind/studentsById.do';
    var data={};

    $.post(url,data,function(result){
        //有没有相应的在学习的课程
        var i=0;
        for( i in result){
            i++;
        }
        if(i==0){
            $('#lvgangFS').html("");
            $('#lvgangFS').html("你还没有开设任何课堂哦!");
        }else {

            $('#lvgangFS').html("");

            $("#lvgangFS").append("<tr id='trFS'></tr>");

            //插入标题
            for (var i2 in result[0]) {
                if (i2 == "student") {
                    for(var i3 in result[0][i2]){
                        $("#trFS").append("<th>"+i3+"</th>");
                    }
                } else {
                    if(i2=="classes"){
                        for(var i3 in result[0][i2]){
                            $("#trFS").append("<th>"+i3+"</th>");
                        }
                    }else{
                        $("#trFS").append("<th>"+i2+"</th>");
                    }
                }
            }

            //插入数据
            for(var j in result){
                $("#lvgangFS").append("<tr id='data"+j+"'></tr>");
                for (var i2 in result[j]) {
                    if (i2 == "student") {
                        for(var i3 in result[j][i2]){
                            $("#data"+j).append("<th>"+result[j][i2][i3]+"</th>");
                        }
                    } else {
                        if(i2=="classes"){
                            for(var i3 in result[0][i2]){
                                $("#data"+j).append("<th>"+result[j][i2][i3]+"</th>");
                            }
                        }else{
                            $("#data"+j).append("<th>"+result[j][i2]+"</th>");
                        }
                    }
                }
            }

        }
    },'JSON');
});