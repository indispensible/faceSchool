var app =getApp()

Page({

  data: {
    CName: null,
    CDescription: null
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
  classNameInput: function (e) {
    this.setData({
      CName: e.detail.value
    })
  },
  introduceInput: function (e) {
    this.setData({
      CDescription: e.detail.value
    })
  },
  formSubmit: function (e){
    var that = this
    var CName = that.data.CName
    var CDescription = that.data.CDescription
    if(CName == null){
      wx.showToast({
        title: '课程名不能为空',
        image: '../../../image/error.png',
        duration: 1666
      })
    }else if(CDescription == null){
      wx.showToast({
        title: '课程简介不能为空',
        image: '../../../image/error.png',
        duration: 1666
      })
    }else{
      wx.request({
        url: app.globalData.basePath + 'find/insertClasses.do',
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Cookie': app.globalData.Cookie
        },
        data: {
          TId: app.globalData.tid,
          CName: CName,
          CDescription: CDescription
        },
        success: function(res){
          // console.log(res)
          if (res.data.msg == "添加成功"){

            wx.showToast({
              title: '课程创建成功',
              icon: 'success',
              duration: 888,
              success: function(){
                setTimeout(function () {
                  wx.switchTab({
                    url: '../../classes/classes',
                  })
                }, 888) 
              }
            })
          }else{
            wx.showToast({
              title: '创建失败',
              image: '../../../image/error.png',
              duration: 1666
            })
          }
        }
      })
    }
  }
})