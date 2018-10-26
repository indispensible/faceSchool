var app = getApp()

Page({

  data: {
    para: null,
    isString: null,
    isData: null,
    classes: null,
    sid: null
  },

  classInput: function (e) {
    this.setData({
      para: e.detail.value
    })
  },
  formSubmit: function (e) {
    var that = this
    var para = that.data.para
    if(para == null){
      wx.showToast({
        title: '请输入查询内容',
        image: '../../../image/error.png',
        duration: 1666
      })
    }else{
      var isString
      var url = app.globalData.basePath + "find/class.do";
      if (isNaN(para)) {
        isString = "true";
      } else {
        isString = "false";
      }
      var data = {
        para: para,
        isString: isString
      };
      var navigateUrl = "search?isData=1&para=" + para + "&isString=" + isString

      wx.request({
        url: url,
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Cookie': app.globalData.Cookie
        },
        data: data,
        success: function (res) {
          var result = res.data

          if (isNaN(para)) {
            //有没有相应的课程查询结果
            var i = 0;
            for (i in result) {
              i++;
            }
            if (i == 0) {
              wx.showToast({
                title: '课程名不存在',
                image: '../../../image/error.png',
                duration: 1666
              })
            } else {
                wx.navigateTo({
                  url: navigateUrl,
                })
            }

          } else {
            if (result["classes"] == 0) {
              wx.showToast({
                title: '课程序号不存在',
                image: '../../../image/error.png',
                duration: 1666
              })
            } else {
              wx.navigateTo({
                url: navigateUrl,
              })
            }
          }

        },
        fail:function(res){
          console.log(res)
        }
      })

    }
  },

  onLoad: function (options) {
    // console.log(options)
    if (options == null) {
      var i = 1
    } else if (options.isData == 1) {
      this.setData({ isData: options.isData })
      this.setData({ para: options.para })
      this.setData({ isString: options.isString })
    }
  },

  onShow: function () {
    var that = this
    that.setData({sid: app.globalData.sid})
    var sid = app.globalData.sid
    if (that.data.isData == 1){
      
      var isString = that.data.isString
      var para = that.data.para
      var url = app.globalData.basePath + "find/class.do";

      var data = {
        para: para,
        isString: isString
      };

      wx.request({
        url: url,
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Cookie': app.globalData.Cookie
        },
        data: data,
        success: function (res) {
          var classes = []
          var result = res.data
          if(result.cid != null){
            classes[0] = result 
          }else{
            classes = result
          }
          that.setData({ classes: classes })
          console.log(that.data.classes)
        },
        fail: function (res) {
          console.log(res)
        }
      })

    }
  },

  backToTabBar: function(){
    wx.switchTab({
      url: '../../classes/classes',
    })
  },

  attendClassByStu:function(e){
    var that = this
    var CId = e.currentTarget.dataset.id
    var SId = that.data.sid
    var url = app.globalData.basePath + "StuFind/insertClassForStudent.do"
    var data = {
      CId: CId,
      SId: SId
    }

    wx.request({
      url: url,
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': app.globalData.Cookie
      },
      data: data,
      success: function (res) {     
        if(res.data.status == 0){
          wx.showToast({
            title: '已加入过该课程',
            image: '../../../image/error.png',
            duration: 1666
          })
        }else{
          wx.showToast({
            title: '成功加入该课程',
            icon: 'success',
            duration: 888,
            success: function () {
              setTimeout(function () {
                //要延时执行的代码
                wx.switchTab({
                  url: '../../classes/classes',
                })
              }, 888)
            }
          })
        }
      },
      fail: function (res) {
        console.log(res)
      }
    })
  }
})