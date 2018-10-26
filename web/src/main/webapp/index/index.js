/**
 * Created by 吕港 on 2018/3/15.
 */
var basePath;

window.onload = function(){
    basePath=$("#basePath").val();
    $(".image").click(function(){
        var val = $(this).attr("id")
        if(val == "img1"){
            window.open(basePath + "jsp/student/login.jsp")
        }else if(val == "img2"){
            window.open(basePath + "jsp/teacher/login.jsp")
        }else {
            window.open(basePath + "jsp/administrator/login.jsp")
        }
    })
}