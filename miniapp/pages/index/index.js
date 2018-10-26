const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
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
  //事件处理函数
  bindViewTap: function() {
    
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    // console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  logout: function(e){
    app.globalData.username = null
    app.globalData.Cookie = null
    app.globalData.userNum = null
    app.globalData.tid = null
    wx.setStorage({
      key: "username",
      data: null
    })
    wx.setStorage({
      key: "password",
      data: null
    })
    wx.setStorage({
      key: "userNum",
      data: 0
    })
    wx.redirectTo({
      url: '../login/login',
    })
  },
  testLoc: function () {
    var that = this
    wx.showModal({
      title: '提示',
      content: '定位不准的话可先测试五秒再去签到(蓝点稳定后为佳)',
      showCancel: false,
      success: function (result) {
        wx.chooseLocation({
          success: function (res) {
            console.log("okok")
          }
        })
      }
    })
  },
  previewImage: function (e) {
    var scene_img = 'https://www.uhouse.site/faceSchool/666.jpg'
    wx.previewImage({
      urls: scene_img.split(',')
      // 需要预览的图片http链接  使用split把字符串转数组。不然会报错  
    })
  }
})
