var app = getApp()

Page({
  data: {
    tid: null,
    cid: null,
    detail: null,
    statusAttend: "请使用校园网或者4G-上课",
    statusOver: "请使用校园网或者4G-下课",
    attendButton: true,
    overButton: true,
  },
  onReady: function () {
    if (app.globalData.userNum == 2) {
      wx.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: '#99CCCC',
        animation: {
          duration: 550
        }
      })
    }
  },

  onLoad: function (options) {
    this.setData({ tid: options.tid })
    this.setData({ cid: options.cid })
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
          that.setData({ statusAttend: '开始上课' })
          that.setData({ attendButton: false })
          that.setData({ statusOver: '开始下课' })
          that.setData({ overButton: false })
        } else {
          wx.showModal({
            title: '提示',
            content: '请连接校园网或则4g使用此系统！',
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

    var url = app.globalData.basePath + 'find/classesByTId.do'
       wx.request({
        url: url,
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Cookie': app.globalData.Cookie
        },
        data: {
          TId: this.data.tid
        },
        success: function(res){
          for(var i in res.data){
            if (res.data[i].cid == that.data.cid){
              if (res.data[i].createtime != null) {
                res.data[i].createtime = res.data[i].createtime.split(" ")[0]
                var data = res.data[i].createtime.split("-")
                var needTime = data[0] + "年" + data[1] + "月" + data[2] + "日"
                res.data[i].createtime = needTime
              }
              var detail = [res.data[i]]
              that.setData({ detail: detail })
              break
            }
          }
        }
      })
    },

  attend: function(){
    var that = this
    wx.showModal({
      title: '提示',
      content: '为了更好的点名效果，请耐心等待一会后选择地图蓝点固定后的位置附近为您的上课地点！',
      showCancel: false,
      success: function (result) {
        wx.chooseLocation({
          success: function (res) {
            that.attend_location(res.longitude, res.latitude)
          }
        })
      }
    })

  },

  attend_location: function (longitude, latitude){
    var that = this
    // wx.getLocation({
    //   type: 'gcj02',
    //   success: function (res) {
    //     var latitude = res.latitude * 10000
    //     latitude = Math.round(latitude) / 10000
    //     var longitude = res.longitude
    //     var accuracy = res.accuracy
    //     console.log(latitude)
    //     console.log(longitude)
    //     console.log(accuracy)
    //     if (accuracy <= 66) {
    //       wx.hideLoading()
          var SignLocation = longitude + "," + latitude
          console.log(SignLocation)

          var data = {
            CId: that.data.cid,
            SignLocation: SignLocation,
            status: 0
          }
          var url = app.globalData.basePath + "find/signLocation.do"

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
                content: res.data.msg,
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })

            },
            fail: function (res) {
              console.log(res)
            }
          })
    //     } else {
    //       setTimeout(function () {
    //         that.attend_location()
    //       }, 888)
    //     }
    //   }
    // })
  },

  over: function () {
    var that = this

    wx.showModal({
      title: '提示',
      content: '为了更好的点名效果，请精确选择地图蓝点固定后的位置附近为准确地点为您的上课地点！',
      showCancel: false,
      success: function (result) {
        wx.chooseLocation({
          success: function (res) {
            that.over_location(res.longitude, res.latitude)
          }
        })
      }
    })
  },

  over_location: function (longitude, latitude){
    var that = this
    // wx.getLocation({
    //   type: 'gcj02',
    //   success: function (res) {
    //     var latitude = res.latitude * 10000
    //     latitude = Math.round(latitude) / 10000
    //     var longitude = res.longitude
    //     var accuracy = res.accuracy
    //     console.log(latitude)
    //     console.log(longitude)
    //     console.log(accuracy)

    //     if (accuracy <= 100) {
    //       wx.hideLoading()
          var SignLocation = longitude + "," + latitude
          console.log(SignLocation)


          var data = {
            CId: that.data.cid,
            SignLocation: SignLocation,
            status: 1
          }
          var url = app.globalData.basePath + "find/signLocation.do"

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
                content: res.data.msg,
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })

            },
            fail: function (res) {
              console.log(res)
            }
          })
    //     } else {
    //       setTimeout(function () {
    //         that.over_location()
    //       }, 888)
    //     }

    //   }
    // })
  }
})