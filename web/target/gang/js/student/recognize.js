var basePath;
window.onload=function(){
    basePath=$("#basePath").val();
         try{
             //动态创建一个canvas元 ，并获取他2Dcontext。如果出现异常则表示不支持
             document.createElement("canvas").getContext("2d");
             document.getElementById("support").innerHTML = "浏览器支持HTML5 CANVAS";
         }catch(e){
             document.getElementById("support").innerHTML = "浏览器不支持HTML5 CANVAS";
         }
     };

     //这段代 主要是获取摄像头的视频流并显示在Video 签中
     window.addEventListener("DOMContentLoaded", function () {
         var video = document.getElementById("video");
         var videoObj = { "video": true };
         var errBack = function (error){
                 console.log("Video capture error: " + error.message, error.code);
             };
         //  支持浏览器  谷歌,火狐,360,欧朋
         //navigator.getUserMedia这个写法在Opera中好像是navigator.getUserMedianow
         if (navigator.getUserMedia) {
             navigator.getUserMedia(videoObj, function (stream) {
                 video.src = stream;
                 video.play();
             }, errBack);
         } else if (navigator.webkitGetUserMedia) {
             navigator.webkitGetUserMedia(videoObj, function (stream) {
                 video.src = window.URL.createObjectURL(stream);
                 video.play();
             }, errBack);
         } else if (navigator.mozGetUserMedia){
             navigator.mozGetUserMedia(videoObj, function (stream) {
                      video.src = window.URL.createObjectURL(stream);
                     video.play();
             }, errBack);
         }
         
         
         //这个是拍照按钮的事件，
         document.getElementById("snap").addEventListener("click",function(){
                 CatchCode();
         });
     }, false);
     //定时器
     //var interval = setInterval(CatchCode, "300");
     //这个是 刷新上 图像的
     function CatchCode() {
         //实际运用可不写，测试代 ， 为单击拍照按钮就获取了当前图像，有其他用途
         var canvans = document.getElementById("canvas");
         var video = document.getElementById("video");
         var context = canvas.getContext("2d");

         canvas.width = video.videoWidth;
         canvas.height = video.videoHeight;
         context.drawImage(video,0,0);

         //获取浏览器页面的画布对象
         //以下开始编 数据
         var imgData = canvans.toDataURL("image/jpg");
         //将图像转换为base64数据
         var base64Data = imgData.split(",")[1];
         var userId=$("#userId").val();



         var data = {'doc':base64Data,'userId':userId};
         alert(data);
         var url=basePath+"login/check.do";



         $.ajax({
             url:url,
             type:"POST",
             data:data,
             dataType:"JSON",
             success:function(data){
                 if(data['status']==1){
                     if(data["msg"]==0){
                         if(data["data"]>=80){
                             alert("登录成功");
                         }else{
                             alert("你这脸还未注册吧?要不在试试？(小冰没有认出来你。)");
                         }
                     }

                     if(data["msg"]==1){
                         if(data["data"]>=80){
                             alert("成功签到，耐心等到下课再来签到吧！");
                         }else{
                             alert("这怕不是你的脸啊！要不在试试？（不允许代签哦！）");
                         }
                     }

                 }else{
                         alert("啊偶，人脸识别失败，重新试一下吧！");
                 }


             },
             error:function(jqXHR){
                 alert("发生错误:"+jqXHR.status);
             }
         });

     }