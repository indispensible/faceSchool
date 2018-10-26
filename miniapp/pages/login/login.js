var app = getApp();

Page({
  data:{
    username: null,
    password: null,
    url: null,
    unselected: true,
    users: null,
    userNum: 0,
    redirectUrl: '../classes/classes',
    statusAttend: "请使用校园网或者4G-学生端",
    statusOver: "请使用校园网或者4G-老师端",
    attendButton: true,
    overButton: true
  }, 
  //获取用户输入的用户名
  usernameInput: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
  //获取用户输入的密码
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  formSubmit: function (e) {
    var that = this
      console.log(e)
      wx.setStorage({
        key: "username",
        data: that.data.username
      })
      wx.setStorage({
        key: "password",
        data: that.data.password
      }) 
      wx.setStorage({
        key: "userNum",
        data: that.data.userNum
      }) 

      console.log(that.data.username)
      console.log(that.data.password)
      console.log(that.data.userNum)

    wx.request({
      url: that.data.url,
      data: {
        username: that.data.username,
        password: that.data.password
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      success: function (res) {
        console.log(res)
        if(res.data.status==1){

          app.globalData.username = that.data.username
          app.globalData.Cookie = res.data.sessionId
          app.globalData.userNum = that.data.userNum

          if(res.data.tid == null){
            app.globalData.tid = -1
          }else{
            app.globalData.tid = res.data.tid
          }
          wx.showToast({
            title: '成功登录',
            icon: 'success',
            duration: 666,
            success:function(){
              setTimeout(function () {
                //要延时执行的代码
                wx.switchTab({
                  url: that.data.redirectUrl
                })
              }, 666) 
            }
          })
          
        } else if(res.data.status==2){
          wx.showToast({
            title: '密码错误！',
            image: '../../image/error.png',
            duration: 1666
          })
        } else if (res.data.status == 4) {

          wx.showModal({
            title: '提示',
            content: '该账户还没有老师的权限，可以联系管理员获得（1547554745@qq.com）',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })

        } else{
          wx.showToast({
            title: '该账户不存在！',
            image: '../../image/error.png',
            duration: 1666
          })
        }
      }
    })
  },
  student: function(e){
    this.setData({ unselected: false})
    this.setData({ users: '学生' })
    this.setData({ userNum: 1 })
    this.setData({ redirectUrl: '../classes/classes' })
    this.setData({ url: app.globalData.basePath + 'login/login.do'})
  },
  teacher: function(e){
    this.setData({ unselected: false})
    this.setData({ users: '老师' })
    this.setData({ userNum: 2 })
    this.setData({ redirectUrl: '../classes/classes' })
    this.setData({ url: app.globalData.basePath + 'Teacher/login.do'})
  },
  navigated: function(e) {
    if(this.data.userNum == 1){
      this.setData({ unselected: false })
      this.setData({ users: '老师' })
      this.setData({ userNum: 2 })
      this.setData({ redirectUrl: '../classes/classes' })
      this.setData({ url: app.globalData.basePath + 'Teacher/login.do' })
    }else{
      this.setData({ unselected: false })
      this.setData({ users: '学生' })
      this.setData({ userNum: 1 })
      this.setData({ redirectUrl: '../classes/classes' })
      this.setData({ url: app.globalData.basePath + 'login/login.do' })
    }
  },
  onShow: function(){
    var that = this
    wx.getNetworkType({
      success: function (res) {
        // 返回网络类型, 有效值：
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        var networkType = res.networkType
        console.log(networkType)
        if (networkType == "wifi" || networkType == "4g"){

        }else{
          wx.showModal({
            title: '提示',
            content: '最好通过使用校园网或者4g来登录',
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

        that.setData({ statusAttend: '学生登录' })
        that.setData({ attendButton: false })
        that.setData({ statusOver: '老师登录' })
        that.setData({ overButton: false })

        var autoUsername
        var autoPassword
        var autoUserNum

        wx.getStorage({
          key: 'username',
          success: function (res) {
            autoUsername = res.data
          }
        })

        wx.getStorage({
          key: 'password',
          success: function (res) {
            autoPassword = res.data
          }
        })

        wx.getStorage({
          key: 'userNum',
          success: function (res) {
            autoUserNum = res.data
          }
        })

        if (autoUsername != null && autoUsername != null && autoUsername != null && autoUsername != '') {
          that.data.username = autoUsername
          that.data.password = autoPassword
          that.data.userNum = autoUserNum
          if (autoUserNum == 2) {
            that.setData({ unselected: false })
            that.setData({ users: '老师' })
            that.setData({ userNum: 2 })
            that.setData({ redirectUrl: '../classes/classes' })
            that.setData({ url: app.globalData.basePath + 'Teacher/login.do' })
          } else {
            that.setData({ unselected: false })
            that.setData({ users: '学生' })
            that.setData({ userNum: 1 })
            that.setData({ redirectUrl: '../classes/classes' })
            that.setData({ url: app.globalData.basePath + 'login/login.do' })
          }

          that.formSubmit()
        }

      }
    })
  }
})