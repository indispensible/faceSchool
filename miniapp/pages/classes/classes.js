var app = getApp()

Page({
  data: {
    classes: null,
    classes_beifen: null,
    hasMore: true,
    showLoading: true,
    loadMoreLoading: false,
    tid: 0,
    createtime: null,
    sid: 0,
    class_num: 0,
    array: ['全部', '2017年第二学期', '2018年第一学期'],
    objectArray: [
      {
        id: 0,
        name: '全部'
      },
      {
        id: 1,
        name: '2017年第二学期'
      },
      {
        id: 2,
        name: '2018年第一学期'
      }
    ],
    index: 0,
  },
  onReady: function(){
    if(app.globalData.userNum == 2){
      wx.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: '#99CCCC',
        animation: {
          duration: 550
        }
      })

      wx.setTabBarItem({
        index: 1,
        text: '创建课程'
      })

      wx.setTabBarStyle({
        "color": "#666",
        "selectedColor": "#99CCCC",
        "borderStyle": "white",
        "backgroundColor": "#fafafa",
      })
      
    }
  },

  onShow: function (options) {
    var app = getApp();
    // console.log(app)
    var that = this
    if (app.globalData.username == null){
      wx.redirectTo({
        url: '../login/login',
      })
    }else{
      that.setData({showLoading:false})
      that.setData({ index: 0 })

      var url = ""

      if(app.globalData.userNum == 1){
        url = app.globalData.basePath + 'StuFind/classes.do'
      }else{
        url = app.globalData.basePath + 'find/classesByTId.do'
      }

      that.setData({ tid: app.globalData.tid })

      wx.request({
        url: url,
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Cookie': app.globalData.Cookie
        },
        data: {
          username: app.globalData.username,
          TId: app.globalData.tid
        },
        success: function(res){
          // console.log(res)
          for(var i in res.data){
            // console.log(i)
            if (res.data[i].createtime != null){
              res.data[i].createtime = res.data[i].createtime.split(" ")[0]
              var data = res.data[i].createtime.split("-")
              var needTime = data[0] + "年" + data[1] + "月" + data[2] + "日"
              res.data[i].createtime = needTime
            }

            if (res.data[i].SId != null) {
              that.setData({ sid: res.data[i].SId }),
              app.globalData.sid = res.data[i].SId
            }
          }

          var sid_test = that.data.sid

          if(sid_test != 0){

            if (res.data[1] != null) {
              that.setData({
                class_num: 1
              })
            } else {
              that.setData({
                class_num: 0
              })
            }

          }else if(res.data[0] != null){
              that.setData({
                class_num: 1
              })
          }else{
            that.setData({
              class_num: 0
            })
          }

          that.setData({ classes: res.data})
          that.setData({ classes_beifen: res.data })
        }
      })
    }
  },

  classByStu: function(e){
    var cid = e.currentTarget.id
    var sid = this.data.sid
    var countSign = e.currentTarget.dataset.countsign
    var url = "../student/classesDetail/classesDetail?cid=" + cid + "&sid=" + sid + "&countSign=" + countSign 
    wx.navigateTo({
      url: url,
    })
  },

  classByTId: function(e){
    var cid = e.currentTarget.dataset.cid
    var tid = e.currentTarget.dataset.tid
    var countsign = e.currentTarget.dataset.countsign
    var url = "../teacher/classesDetail/classesDetail?cid=" + cid + "&tid=" + tid + "&countsign=" + countsign
    wx.navigateTo({
      url: url,
    })
  },

  deleteClassByTea: function(e){
    var that = this
    var TId = that.data.tid
    var CId = e.currentTarget.dataset.id
    var data = {
      'TId': TId,
      'CId': CId
    }
    var url = app.globalData.basePath + "find/deleteClass.do";

    wx.showModal({
      title: '提示',
      content: '确认删除？',
      success: function (res) {
        if (res.confirm) {
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
              wx.showToast({
                title: res.data.msg,
                icon: 'success',
                duration: 888,
                success: function () {
                  setTimeout(function () {
                    //要延时执行的代码
                    wx.switchTab({
                      url: '../index/index',
                    })
                  }, 888)
                }
              })
            },
            fail: function (res) {
              console.log(res)
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  deleteClassByStu: function(e){
    var that = this
    var SId = that.data.sid
    var CId = e.currentTarget.dataset.id
    var data = {
      'SId': SId,
      'CId': CId
    }
    var url = app.globalData.basePath + "StuFind/deleteClass.do";

    wx.showModal({
      title: '提示',
      content: '确认删除？',
      success: function (res) {
        if (res.confirm) {
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
              wx.showToast({
                title: res.data.msg,
                icon: 'success',
                duration: 888,
                success: function () {
                  setTimeout(function () {
                    //要延时执行的代码
                    wx.switchTab({
                      url: '../index/index',
                    })
                  }, 888)
                }
              })
            },
            fail: function (res) {
              console.log(res)
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  bindPickerChange: function (e) {
    var that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })

    var time = e.detail.value

    var classes_time = that.data.classes_beifen
    var classes = []
    var num = 0

    if(time == 1){
      for(var i in classes_time){
        var time = classes_time[i]["createtime"]
        if(time != null){
          time = time.substring(0,4)
          
          if(time == 2017){
            classes[num] = classes_time[i]
            num = num + 1
          }
        }
      }

      if(num == 0){
        wx.showModal({
          title: '提示',
          content: '没有加入任何2017年第二学期的课程',
          success: function (res) {

            that.setData({
              index: 0
            })
            that.setData({
              classes: classes_time
            })

            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }else{
        that.setData({
          classes: classes
        })
      }
    }else if(time == 2){

      for (var i in classes_time) {
        var time = classes_time[i]["createtime"]
        if (time != null) {
          time = time.substring(0, 4)

          if (time == 2018) {
            classes[num] = classes_time[i]
            num = num + 1
          }
        }
      }

      if (num == 0) {
        wx.showModal({
          title: '提示',
          content: '没有加入任何2018年第一学期的课程',
          success: function (res) {

            that.setData({
              index: 0
            })
            that.setData({
              classes: classes_time
            })

            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      } else {
        that.setData({
          classes: classes
        })
      }

    }else{
      that.setData({
        classes : classes_time
      })
    }
    
  },

   bindTeacherChange: function(e){
     var that = this
     console.log('picker发送选择改变，携带值为', e.detail.value)
     this.setData({
       index: e.detail.value
     })

     var time = e.detail.value

     var classes_time = that.data.classes_beifen
     var classes = []
     var num = 0

     if (time == 1) {
       for (var i in classes_time) {
         var time = classes_time[i]["createtime"]
         if (time != null) {
           time = time.substring(0, 4)

           if (time == 2017) {
             classes[num] = classes_time[i]
             num = num + 1
           }
         }
       }

       if (num == 0) {
         wx.showModal({
           title: '提示',
           content: '没有加入任何2017年第二学期的课程',
           success: function (res) {

             that.setData({
               index: 0
             })
             that.setData({
               classes: classes_time
             })

             if (res.confirm) {
               console.log('用户点击确定')
             } else if (res.cancel) {
               console.log('用户点击取消')
             }
           }
         })
       } else {
         that.setData({
           classes: classes
         })
       }
     } else if (time == 2) {

       for (var i in classes_time) {
         var time = classes_time[i]["createtime"]
         if (time != null) {
           time = time.substring(0, 4)

           if (time == 2018) {
             classes[num] = classes_time[i]
             num = num + 1
           }
         }
       }

       if (num == 0) {
         wx.showModal({
           title: '提示',
           content: '没有加入任何2018年第一学期的课程',
           success: function (res) {

             that.setData({
               index: 0
             })
             that.setData({
               classes: classes_time
             })
            
             if (res.confirm) {
               console.log('用户点击确定')
             } else if (res.cancel) {
               console.log('用户点击取消')
             }
           }
         })
       } else {
         that.setData({
           classes: classes
         })
       }

     } else {
       that.setData({
         classes: classes_time
       })
     }
   }
})