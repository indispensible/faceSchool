var app = getApp()

var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
var PI = 3.1415926535897932384626;
var a = 6378245.0;
var ee = 0.00669342162296594323;

Page({

  data: {
    cid: null,
    sid: null,
    detail: null,
    statusAttend: "请链接校园网-上课",
    statusOver: "请链接校园网-下课",
    // statusOver: "签到的时间还未到哦！",
    attendButton: true,
    overButton: true,
    centerLon: null,
    centerLat: null,
    gpsLon: null,
    gpsLat: null,
    markers: null,
    countSign: null,
    tempImage: null,
    display: 'none',
    ifAttend: null,
    currentTime: null,
    diffOver: null,
    diffAttend: null,
    numLoc: 0,
    trueLoc: 0,
    testdata: 0
  },

  markertap(e) {
    console.log(e.markerId)
  },

  onLoad: function (options) {
    console.log(options)
    this.setData({ cid: options.cid })
    this.setData({ sid: options.sid })
    this.setData({ countSign: options.countSign })
    // wx.showModal({
    //   title: '提示',
    //   showCancel: false,
    //   content: '小程序的效率受手机性能影响较大，如遇小程序终止签到情况，可使用网站来签到！'
    // })
  },

  onShow: function () {
    var that = this

    wx.getNetworkType({
      success: function (res) {
        // 返回网络类型, 有效值：
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        var networkType = res.networkType
        console.log(networkType)
        if (networkType == "wifi" || networkType == "4g") {
          that.setData({ testdata: 1 })
          that.setData({ statusAttend: '签到的时间还未到哦！' })
          that.setData({ statusOver: '签到的时间还未到哦！' })

          var url = app.globalData.basePath + "StuFind/findEnsureClass.do";

          var testdata = that.data.testdata

          wx.request({
            url: url,
            method: 'POST',
            header: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
              'Cookie': app.globalData.Cookie
            },
            data: {
              CId: that.data.cid,
              SId: that.data.sid
            },
            success: function (res) {
              console.log(res)
              var ensure = 0
              that.setData({ detail: res.data })

              if (testdata == 1) {
                var currentTime = Date.parse(new Date());
                var result = that.data.detail
                //老师设置的上课时间和下课时间
                var attendTime = result[0]["classes"]["attendtime"];
                console.log(attendTime)

                if (attendTime == null) {
                  attendTime = currentTime + 100000
                  ensure = ensure + 1
                } else {
                  attendTime = attendTime.substring(0, 19);
                  attendTime = attendTime.replace(/-/g, '/');
                }
                var diffAttend = new Date(attendTime).getTime();
                var difference1 = (currentTime - diffAttend) / 1000;

                var overTime = result[0]["classes"]["overtime"];
                console.log(overTime)

                if (overTime == null) {
                  overTime = currentTime + 100000
                  ensure = ensure + 1
                } else {
                  overTime = overTime.substring(0, 19);
                  overTime = overTime.replace(/-/g, '/');
                }
                var diffOver = new Date(overTime).getTime();
                var difference2 = (currentTime - diffOver) / 1000;

                if (difference1 <= 7200 && diffAttend > diffOver) {
                  that.setData({ statusAttend: '上课签到' })
                  that.setData({ attendButton: false })
                  that.setData({ ifAttend: 1 })
                }
                if (difference2 <= 7200 && diffAttend < diffOver) {
                  that.setData({ statusOver: '下课签到' })
                  that.setData({ overButton: false })
                  that.setData({ ifAttend: 2 })
                }
                that.setData({ currentTime: currentTime })
                that.setData({ diffAttend: diffAttend })
                that.setData({ diffOver: diffOver })

                if (ensure == 0) {
                  that.position_teacher(result)
                } else {

                  wx.showModal({
                    title: '提示',
                    content: '该课程老师还未签到过!',
                    showCancel: false,
                    success: function (res) {
                      if (res.confirm) {
                        console.log('用户点击确定')
                      } else if (res.cancel) {
                        console.log('用户点击取消')
                      }
                    }
                  })

                }
              }

            }
          })

        } else {
          wx.showModal({
            title: '提示',
            content: '请使用校园网或者4G使用此系统！',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      }
    })
  },
  position_teacher: function(result){
    //点标记
    var pointCoordinate = result[0]["classes"]["signlocation"];
    var data = pointCoordinate.split(",");
    var that = this
    that.setData({ centerLon: data[0] })
    that.setData({ centerLat: data[1] })

    var test = that.gcj02towgs84(data[0], data[1])
    console.log(test)
    that.setData({ gpsLon: parseFloat(test[0]) })
    that.setData({ gpsLat: parseFloat(test[1]) })
    
    that.setData({
      markers: [{
        iconPath: "../../../image/position_teacher.png",
        id: 0,
        latitude: data[1],
        longitude: data[0],
        width: 35,
        height: 35,
        label: {
          content: "老师的位置",
          color: '#DC143C',
          fontSize: 15,
          x: 5.666,
          bgColor: '#fff',
          padding: 2,
          y: 3,
          borderRadius: 5
        }
      }]})
  },
  attend: function(e){
    var that = this
    that.attend_location()
    wx.showLoading({
      title: '努力提高定位中！',
      mask: true
    })
  },

  attend_location: function(){
    var that = this
    that.data.numLoc = that.data.numLoc + 1
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude * 10000
        latitude = Math.round(latitude) / 10000
        var longitude = res.longitude
        var locTest = that.wgs84togcj02(longitude, latitude)
        var signLocation = locTest[0] + "," + locTest[1]
        var accuracy = res.accuracy
        var distance = that.getDisance(latitude, longitude, that.data.gpsLat, that.data.gpsLon)
        console.log(signLocation)
        console.log(accuracy)
        console.log(distance)
        var diff = accuracy - distance
        console.log(diff)
        console.log("测试中！")
        // that.attend_location()

        // if(numbers == 1){
        //   wx.hideLoading()
        //   that.signLocation(signLocation)
        // } else if(numbers == 0){

        if (that.data.numLoc >= 88){
          wx.hideLoading()

          if(accuracy >= 1400){
            wx.showModal({
              title: '提示',
              content: '请使用校园网定位！',
              showCancel: false,
              success: function (result) {
              }
            })
          }else{
            wx.showModal({
              title: '提示',
              content: '你离老师太远（定位存在误差，也可重新尝试！）',
              showCancel: false,
              success: function (result) {

              }
            })
          }
          that.setData({ numLoc: 0 })
        } else if (accuracy <= 2100 && accuracy > 100.667) {

          if (distance <= 50.888) {
            that.setData({ numLoc: 0 })
            that.signLocation(signLocation)
          }else{
            setTimeout(function () {
              that.attend_location()
            }, 7)
          }

        } else if (accuracy <= 100.666) {
            wx.hideLoading()
            if ((accuracy +30.888) < distance){
              that.setData({ numLoc: 0 })
              wx.showModal({
                title: '提示',
                content: '你离老师太远（定位存在误差，也可重新尝试！）',
                showCancel: false,
                success: function (result) {

                }
              })

            }else if (diff <= 21.888 && diff >= -21.888) {
              that.setData({ numLoc : 0 })
              that.signLocation(signLocation)
            } else if (distance <= 50.888 || (distance / accuracy) < 1.4) {
              that.setData({ numLoc: 0 })
              that.signLocation(signLocation)
            } else {
              that.setData({ numLoc: 0 })
              wx.showModal({
                title: '提示',
                content: '你离老师太远（定位存在误差，也可重新尝试！）',
                showCancel: false,
                success: function (result) {
                }
              })
            }
          } else {
            setTimeout(function () {
              that.attend_location()
            },7)
          }

        // }else if(numbers == 2){
        //   wx.hideLoading()
        //   wx.showToast({
        //       title: '请重新尝试',
        //       image: '../../../image/error.png',
        //       duration: 1666
        //     })
        // }

      }
    })
  },

  over: function(e){
    var that = this
    that.over_location()
    wx.showLoading({
      title: '努力提高定位中',
      mask: true
    })
  },

  over_location: function(){
    var that = this
    that.data.numLoc = that.data.numLoc + 1
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude * 10000
        latitude = Math.round(latitude) / 10000
        var longitude = res.longitude

        var locTest = that.wgs84togcj02(longitude, latitude)
        var OverSignLocation = locTest[0] + "," + locTest[1]
        // var OverSignLocation = longitude + "," + latitude

        var accuracy = res.accuracy
        var distance = that.getDisance(latitude, longitude, that.data.gpsLat, that.data.gpsLon)
        var diff = accuracy - distance
        console.log(OverSignLocation)
        console.log(accuracy)
        console.log(distance)
        console.log(diff)
        if (that.data.numLoc >= 88) {
          wx.hideLoading()
          if (accuracy >= 1400) {
            wx.showModal({
              title: '提示',
              content: '请使用校园网定位！',
              showCancel: false,
              success: function (result) {
              }
            })
          } else {
            wx.showModal({
              title: '提示',
              content: '你离老师太远（定位存在误差，也可重新尝试！）',
              showCancel: false,
              success: function (result) {

              }
            })
          }

          that.setData({ numLoc: 0 })
        } else if (accuracy <= 2100 && accuracy > 100.667){

          if (distance <= 50.888) {
            that.setData({ numLoc: 0 })
            that.overSignLocation(OverSignLocation)
          } else {
            setTimeout(function () {
              that.over_location()
            }, 7)
          }

        } else if (accuracy <= 100.666) {
          wx.hideLoading()
          if ((accuracy + 30.888) < distance) {
            that.setData({ numLoc: 0 })
            wx.showModal({
              title: '提示',
              content: '你离老师太远（定位存在误差，也可重新尝试！）',
              showCancel: false,
              success: function (result) {
              }
            })
          } else if (diff <= 21.888 && diff >= -21.888) {
            that.setData({ numLoc: 0 })
            that.overSignLocation(OverSignLocation)
          } else if (distance <= 50.888 || (distance/accuracy) < 1.4) {
            that.setData({ numLoc: 0 })
            that.overSignLocation(OverSignLocation)
          } else {
            that.setData({ numLoc: 0 })
            wx.showModal({
              title: '提示',
              content: '你离老师太远（定位存在误差，也可重新尝试！）',
              showCancel: false,
              success: function (result) {
              }
            })
          }
        } else {
          setTimeout(function () {
            that.over_location()
          }, 7)
        }
      }
    })
  },

  toRad: function (d) {
    return d * Math.PI / 180;
  },

  getDisance: function (lat1, lng1, lat2, lng2){
    var that = this
    var dis = 0;
    var radLat1 = that.toRad(lat1);
    var radLat2 = that.toRad(lat2);
    var deltaLat = radLat1 - radLat2;
    var deltaLng = that.toRad(lng1) - that.toRad(lng2);
    var dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));
    return dis * 6378137;
  },

  distance_judge: function(latitude, longitude){
    var that = this
    var centerLat = that.data.centerLat
    var centerLon = that.data.centerLon
    var num = that.data.numLoc + 1
    var trueNum = that.data.trueLoc
    that.setData({ numLoc: num })
    if ((centerLon - longitude) >= -0.00088 && (centerLon - longitude) <= 0.00088 && (centerLat - latitude) >= -0.00088 && (centerLat - latitude) <= 0.00088) {
      trueNum = trueNum + 1
      that.setData({ trueLoc: trueNum })
    }
    if (trueNum >= 5) {
      return 1
    }
    if (num >= 66) {
      return 2
    }
    return 0
  },

  faceRecognition: function(){
    var that = this
    var data = {
      SId: that.data.sid,
      CId: that.data.cid,
      countSign: that.data.countSign
    }

    // // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示 
    if (wx.createCameraContext()) {
      this.cameraContext = wx.createCameraContext('myCamera')
    } else { 
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    } 

    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'], 
      sourceType: ['camera'], 
      success: function (res) {
        console.log(res)
        that.setData({ display: '' })
        that.setData({ tempImage:res.tempFilePaths[0] })

        wx.showLoading({
          title: '人脸识别中',
        })

        var url = app.globalData.basePath + "login/checkApp.do";

        wx.uploadFile({
          url: url, 
          filePath: res.tempFilePaths[0],
          name: 'image',
          formData: {
            userId: that.data.sid,
            basePath: "https://www.uhouse.site/faceSchool/",
            miniapp: 1
          },
          header: {
            "content-type": "multipart/form-data",
            'Cookie': app.globalData.Cookie
          },  
          success: function (res) {
            wx.hideLoading()
            that.statusForClass(res)
          },
          fail: function(res){
            wx.hideLoading()
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '人脸识别失败，请重新尝试。(请本人来识别！)'
            })
          }
        })
      }
    });
  },
  statusForClass: function(result){
    var that = this
    var ifAttend = that.data.ifAttend
    console.log(result.data)
    try{
      result = JSON.parse(result.data)
    }catch(e){
      var str = '{"status":2}'
      result = JSON.parse(str)
    }
    var currentTime = that.data.currentTime
    var diffAttend = that.data.diffAttend
    var diffOver = that.data.diffOver

    if (result.status == 1) {
      if (result.msg == 0) {
        if (result.data >= 80) {
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 1666
          })
        } else {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '你这脸还未注册吧?要不在试试？'
          })
        }
      }
      if (result.msg == 1) {
        if (result.data >= 80) {

          var postData={
         'SId': that.data.sid,
         'CId': that.data.cid,
         'countSign': that.data.countSign
          };

          //上课签到完成，并告知是否迟到
          if (that.data.ifAttend == 1) {
            //上课签到状态
            postData["ifAttend"] = "true"
            postData["IfSign"] = 1;
            if (currentTime - diffAttend > 300000) {
              postData["SignState"] = 3;
            } else {
              postData["SignState"] = 2;
            }
            that.SignAttendState(postData);


          } else {
            //下课签到状态
            postData["ifAttend"] = "false"
            postData["IfSign"] = 2;
            if (currentTime - diffOver > 300000) {
              postData["SignState"] = 4;
            } else {
              postData["SignState"] = 5;
            }
            that.SignOverState(postData);
          }

        } else if (result.data == -10){

          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '请使用活体检验！照片视频是不行的！'
          })

        }else {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '这怕不是你的脸啊！要不在试试？'
          })
        }
      }
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '人脸识别失败，请不要代签。(光线太亮也会造成签到失败)'
      })
    }
  },

  SignAttendState: function(data){
    var url = app.globalData.basePath + "SCFind/attendUltimately.do";
    wx.request({
      url: url,
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': app.globalData.Cookie
      },
      data: data,
      success: function (res) {
        console.log(res)
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: res.data.msg
        })
      }
    })
  },

  SignOverState: function (data) {
    var url = app.globalData.basePath + "SCFind/overUltimately.do";
    wx.request({
      url: url,
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': app.globalData.Cookie
      },
      data: data,
      success: function (res) {
        console.log(res)
        if (res.data.msg != "" && res.data.msg != null){
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: res.data.msg
          })
        }else{
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: "同学，请先进行上课签到。（不然算未到）"
          })
        }
      },
      fail: function(res){
        console.log("mmp")
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: "遇见未知错误，可重新尝试，或者联系管理员解决。(关注faceSchool即可联系管理员)"
        })
      }
    })
  },

  signLocation: function (signLocation){
    var that = this
    var cid = that.data.cid
    var sid = that.data.sid
    var countSign = that.data.countSign
    var currentTime = Date.parse(new Date()); 
    var data = {
      'CId': cid,
      'SId': sid,
      'countSign': countSign,
      'signLocation': signLocation,
      'currentTime': currentTime
    }
    var url = app.globalData.basePath + "SCFind/signLocation.do";

    wx.request({
      url: url,
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': app.globalData.Cookie
      },
      data: data,
      success: function (res) {
        that.faceRecognition()
      }
    })
  },

  overSignLocation: function (OverSignLocation) {
    var that = this
    var cid = that.data.cid
    var sid = that.data.sid
    var countSign = that.data.countSign
    var currentTime = Date.parse(new Date());
    var data = {
      'CId': cid,
      'SId': sid,
      'countSign': countSign,
      'OverSignLocation': OverSignLocation,
      'currentTime': currentTime
    }
    var url = app.globalData.basePath + "SCFind/OverSignLocation.do";

    wx.request({
      url: url,
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': app.globalData.Cookie
      },
      data: data,
      success: function (res) {
        that.faceRecognition()
      }
    })
  },

  gcj02towgs84: function (lng, lat) {
    var that = this
    var dlat = that.transformlat(lng - 105.0, lat - 35.0);
    var dlng = that.transformlng(lng - 105.0, lat - 35.0);
    var radlat = lat / 180.0 * PI;
    var magic = Math.sin(radlat);
    magic = 1 - ee * magic * magic;
    var sqrtmagic = Math.sqrt(magic);
    dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
    dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
    var mglat = parseFloat(lat) + dlat;
    var mglng = parseFloat(lng) + dlng;
    return [(parseFloat(lng) * 2 - parseFloat(mglng)).toFixed(5), (parseFloat(lat) * 2 - parseFloat(mglat)).toFixed(4)]
  },

  transformlat: function (lng, lat) {
    var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
    return ret
  },

  transformlng: function (lng, lat) {
    var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
    return ret
  },

  wgs84togcj02: function (lng, lat){
    var that = this
    var dlat = that.transformlat(parseFloat(lng) - 105.0, parseFloat(lat) - 35.0);
    var dlng = that.transformlng(parseFloat(lng) - 105.0, parseFloat(lat) - 35.0);
    var radlat = parseFloat(lat) / 180.0 * PI;
    var magic = Math.sin(radlat);
    magic = 1 - ee * magic * magic;
    var sqrtmagic = Math.sqrt(magic);
    dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
    dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
    var mglat = parseFloat(lat) + dlat;
    var mglng = parseFloat(lng) + dlng;
    return [mglng, mglat]
  },
  backToTabBar: function () {
    wx.switchTab({
      url: '../../classes/classes',
    })
  },

})