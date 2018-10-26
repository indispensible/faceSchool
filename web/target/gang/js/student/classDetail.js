/**
 * Created by 吕港 on 2017/11/13.
 */

var point;
var map;
//老师设置的上课时间和下课时间
var diffAttend;
var diffOver;
//当前时间
var currentTime;

var basePath;
window.onload=function(){

   navigator.getUserMedia = navigator.getUserMedia ||
       navigator.webkitGetUserMedia ||
       navigator.mozGetUserMedia ||
       navigator.msGetUserMedia;

   if(navigator.getUserMedia){

   } else {
      alert("该电脑不支持摄像头，请换电脑或者使用小程序进行签到")
   }

   basePath=$("#basePath").val();
   // 创建Map实例
   map = new BMap.Map("myMap");


   var CId=getQueryString("cid");
   var SId=getQueryString("sid");
   var data={
      'CId':CId,
      'SId':SId
   };
   var url=basePath+"StuFind/findEnsureClass.do";
   var attendTime;
   var overTime;
   var date = new Date($.ajax({async: false}).getResponseHeader("Date"));
   currentTime=Date.parse(date);
   var currentTime1=Date.parse(new Date());
   if((currentTime-currentTime1)>6666){
      alert("同学，休想修改电脑的系统时间来蒙混过关签到！有本事黑进我的服务器来修改时间！");
   }

   $.post(url,data,function(result){

      $('#classTitle').html(result[0]["classes"]["cname"]);
      $('#classH2').html("第"+result[0]["classes"]["countsign"]+"次签到");

      $("#classA2").attr("href", basePath + "jsp/student/comment.jsp?cid=" + CId +"&sid=" + SId)

      $('#classBody').html("");
      $('#trd').html("");
      $("#trd").append("<td>"+result[0]["classes"]["cdescription"]+"</td>");
      $("#classBody").append("<td>"+result[0]["teacher"]["realname"]+"</td>");
      $("#classBody").append("<td>"+result[0]["teacher"]["email"]+"</td>");
      $("#classBody").append("<td><input id='attendClass' type='button' value='上课签到'></td>");
      $("#classBody").append("<td><input id='overClass' type='button' value='下课签到'></td>");

      //老师设置的上课时间和下课时间
      attendTime=result[0]["classes"]["attendtime"];
      attendTime = attendTime.substring(0,19);
      attendTime = attendTime.replace(/-/g,'/');
      diffAttend = new Date(attendTime).getTime();
      var difference1=(currentTime-diffAttend)/1000;
      if(difference1>7200){
         $("#attendClass").attr('disabled',true);
         $("#attendClass").val("签到的时间还未到哦！");
      }

      overTime=result[0]["classes"]["overtime"];
      overTime = overTime.substring(0,19);
      overTime = overTime.replace(/-/g,'/');
      diffOver = new Date(overTime).getTime();
      var difference2=(currentTime-diffOver)/1000;
      if(difference2>7200){
         $("#overClass").attr('disabled',true);
         $("#overClass").val("签到的时间还未到哦！");
      }

      var countSign=result[0]["classes"]["countsign"];
      var postData={
         'SId':SId,
         'CId':CId,
         'countSign':countSign
      };

      //上课按钮事件
      attendClass(postData);

      //下课按钮事件
      overClass(postData);

      //点标记
      var pointCoordinate=result[0]["classes"]["signlocation"];
      var data=pointCoordinate.split(",");
      var test1 = gcj02tobd09(data[0],data[1])
      createMap(test1[0],test1[1]);


   },'JSON');
}


function checkVideo(){
   var test_src = $("#video").attr("src")
   if(test_src == null){
      $("#overClass").attr('disabled',true);
      $("#overClass").val("请打开你的摄像头");
      $("#attendClass").attr('disabled',true);
      $("#attendClass").val("请打开你的摄像头");
      alert("请刷新页面后打开你的摄像头或者更换电脑或者使用小程序注册!")
      return false
   }
   return true
}

function gcj02tobd09(lng, lat) {
   var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
   var PI = 3.1415926535897932384626;
   var a = 6378245.0;
   var ee = 0.00669342162296594323;
   var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
   var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
   var bd_lng = z * Math.cos(theta) + 0.0065;
   var bd_lat = z * Math.sin(theta) + 0.006;
   return [bd_lng, bd_lat]
}

function getQueryString(name) {
   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
   var r = window.location.search.substr(1).match(reg);
   if (r != null) return unescape(r[2]); return null;
}

function createMap(longitude,latitude){


      // 百度地图API功能
      point=new BMap.Point(longitude, latitude)
      map.centerAndZoom(point, 19);  // 初始化地图,设置中心点坐标和地图级别

      //创建点标记
      var marker = new BMap.Marker(point);  // 创建标注
      map.addOverlay(marker);               // 将标注添加到地图中
      marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画

      //点标记的文字标签
      var label = new BMap.Label("老师在这里哦！",{offset:new BMap.Size(20,-10)});
      //设置文字标签的样式
      label.setStyle({
         //backgroundColor:"rgba(255,255,255,0)",  
         fontFamily:"STFangsong",
         fontSize:"13px",
         border:"1px solid #CC3333"
      });
      marker.setLabel(label);
      map.setCurrentCity("上海");          // 设置地图显示的城市 此项是必须设置的
      map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
}

function attendClass(data){
   var SId=data["SId"];
   var CId=data["CId"];
   var countSign=data["countSign"];

   $("#attendClass").click(function(){
      data["ifAttend"]="true";
      alert("人脸识别需要时间，请耐心等待!并请于老师上课的五分钟内完成上课签到哦！不然算迟到哦！");

      //删除上课签到的在这里的标签
      var allOverlay = map.getOverlays();
      map.removeOverlay(allOverlay[2]);

      var url=basePath+"SCFind/SCR.do";

      if(checkVideo()){
         $.post(url,data,function(result){
            if(result["state"]==0){
               var stringCombine=CId+","+SId+","+countSign;

               var encrypt= encrypted(stringCombine);

               alert("你还没在手机端进行定位签到！请先用手机端登陆此网站进行签到！ " +
                   basePath+"jsp/student/mobileSignLocation.jsp?encrypt="+'"'+encrypt+'"');
            }else{
               var location=result["signlocation"].split(",");
               var longitude=location[0];
               var latitude=location[1];

               var test1 = gcj02tobd09(longitude, latitude);
               longitude=test1[0];
               latitude=test1[1];

               // 百度地图API功能
               var point1=new BMap.Point(longitude, latitude);
               //创建点标记
               //var marker = new BMap.Marker(point1);  // 创建标注
               //map.addOverlay(marker);               // 将标注添加到地图中
               ////点标记的文字标签
               //var label = new BMap.Label("你在这里哦！上课！",{offset:new BMap.Size(-122,2.5)});
               ////设置文字标签的样式
               //label.setStyle({
               //   //backgroundColor:"rgba(255,255,255,0)",  
               //   fontFamily:"STFangsong",
               //   fontSize:"13px",
               //   border:"1px solid #CC3333"
               //});
               //marker.setLabel(label);
               //
               //var points = [point, point1];
               //var view = map.getViewport(eval(points));
               //var mapZoom = view.zoom;
               //var centerPoint = view.center;
               //map.centerAndZoom(centerPoint,mapZoom);

               //老师和学生间的距离
               var distance = distanceBetweenTwoPoints(point1);
               var distanceJudge=ifDistanceOK(distance);

               //判断是否可以进行到第二步签到：人脸签到！
               ifFaceRecognition(distanceJudge,SId,data);
            }
         },'JSON');
      }

   });
}


function overClass(data){
   var SId=data["SId"];
   var CId=data["CId"];
   var countSign=data["countSign"];

   $("#overClass").click(function(){
      data["ifAttend"]="false";
      alert("人脸识别需要时间，请耐心等待!并请于老师下课的五分钟内完成下课签到哦！不然算早退哦！");

      //删除上课签到的我在这里的标签
      var allOverlay = map.getOverlays();
      map.removeOverlay(allOverlay[2]);

      //得到现在的时间用于判断是否进行下课定位
      var date = new Date($.ajax({async: false}).getResponseHeader("Date"));
      var currentTime=Date.parse(date);

      var url=basePath+"SCFind/SCROver.do";

      if(checkVideo()){
         $.post(url,data,function(result){
            if(result["state"]==0){
               alert("同学，你还没进行上课签到吧！请先进行上课签到！");
            }else if(result["state"]==1) {
               var stringCombine=CId+","+SId+","+countSign;

               var encrypt= encrypted(stringCombine);

               alert("你还没在手机端进行定位签到！请先用手机端登陆此网站进行签到！ " +
                   basePath+"jsp/student/mobileOverSignLocation.jsp?encrypt="+'"'+encrypt+'"');
            }else{
               var location=result["oversignlocation"].split(",");
               var longitude=location[0];
               var latitude=location[1];

               var test1 = gcj02tobd09(longitude, latitude);
               longitude=test1[0];
               latitude=test1[1];

               // 百度地图API功能
               var point1=new BMap.Point(longitude, latitude);
               //创建点标记
               //var marker = new BMap.Marker(point1);  // 创建标注
               //map.addOverlay(marker);               // 将标注添加到地图中
               ////点标记的文字标签
               //var label = new BMap.Label("你在这里哦！下课！",{offset:new BMap.Size(-122,2.5)});
               ////设置文字标签的样式
               //label.setStyle({
               //   //backgroundColor:"rgba(255,255,255,0)",  
               //   fontFamily:"STFangsong",
               //   fontSize:"13px",
               //   border:"1px solid #CC3333"
               //});
               //marker.setLabel(label);
               //
               //var points = [point, point1];
               //var view = map.getViewport(eval(points));
               //var mapZoom = view.zoom;
               //var centerPoint = view.center;
               //map.centerAndZoom(centerPoint,mapZoom);

               //老师和学生间的距离
               var distance = distanceBetweenTwoPoints(point1);
               var distanceJudge=ifDistanceOK(distance);

               //判断是否可以进行到第二步签到：人脸签到！
               ifFaceRecognition(distanceJudge,SId,data);
            }
         },'JSON');
      }

   })
}


function distanceBetweenTwoPoints(point2){
   return (map.getDistance(point,point2)).toFixed(2);  //获取两点距离,保留小数点后两位
}

function ifDistanceOK(distance){
   if(distance>32.666){
      return false;
   }else{
      return true;
   }
}

function faceRecognition(SId,data){
   try{
      //动态创建一个canvas元 ，并获取他2Dcontext。如果出现异常则表示不支持
      document.createElement("canvas").getContext("2d");
     // document.getElementById("support").innerHTML = "浏览器支持HTML5 CANVAS";
      //拍照按钮的事件，
      CatchCode(SId,data);
   }catch(e){
      alert("该浏览器或者电脑不支持HTML5 CANVAS");
   }
}

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
}, false);

function CatchCode(SId,postData) {
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
   var userId=SId;
   var data = {
      'doc':base64Data,
      'userId':userId,
      'basePath':basePath
   };
   var url=basePath+"login/check.do";

   var index = layer.load(1, {
      shade: [0.1,'#fff'] //0.1透明度的白色背景
   });

   $.post(url,data,function(result){
      layer.close(index);
      if(result['status']==1){
         if(result["msg"]==0){
            if(result["data"]>=80){
               alert("登录成功");
            }else{
               alert("你这脸还未注册吧?要不在试试？(小face没有认出来你。)");
            }
         }
         if(result["msg"]==1){
            if(result["data"]>=80){
               //alert("成功签到，耐心等到下课再来签到吧！");

               //上课签到完成，并告知是否迟到
               if(postData["ifAttend"]=="true"){
                  //上课签到状态
                  postData["IfSign"]=1;
                  if(currentTime-diffAttend>300000){
                     postData["SignState"]=3;
                  }else{
                     postData["SignState"]=2;
                  }
                  SignAttendState(postData);


               }else{
                  //下课签到状态
                  postData["IfSign"]=2;
                  if(currentTime-diffOver>300000){
                     postData["SignState"]=4;
                  }else{
                     postData["SignState"]=5;
                  }
                  SignOverState(postData);
               }

            }else if(result["data"] == -10){
               alert("请使用活体检验！照片视频是不行的！");
            }else {
               alert("这怕不是你的脸啊！要不在试试？（不允许代签哦！）");
            }

         }
      }else{
         alert("啊偶，人脸识别失败，重新试一下吧！");
      }
   },'JSON');

}

function ifFaceRecognition(distanceJudge,SId,data){
   if(distanceJudge){
      faceRecognition(SId,data);
   }else{
      alert("同学，你距离老师的位置有些远啊！请确保你在老师的20米内签到！此次签到失败！");
   }
}

function encrypted(word){
   var pwd = "8NONwyJtHesysWpM";

   var encrypted=CryptoJS.AES.encrypt(word,pwd).toString();

   return encrypted;

}

function SignAttendState(postData){
   var url=basePath+"SCFind/attendUltimately.do";
   $.post(url,postData,function(result){
         alert(result["msg"]);
   },'JSON');
}

function SignOverState(postData){
   var url=basePath+"SCFind/overUltimately.do";
   $.post(url,postData,function(result){
      alert(result["msg"]);
   },'JSON');
}

$(".signOut").click(function(){
   var data={};
   var url=basePath+"login/signOut.do";
   $.post(url,data,function(result){
      window.location.href=basePath+"jsp/student/login.jsp";
   },'JSON');
});
