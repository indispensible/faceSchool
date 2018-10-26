var app = getApp();

Page({
  onReady:function(){
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
    if (app.globalData.userNum == 2) {
      wx.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: '#99CCCC',
        animation: {
          duration: 550
        }
      })
    }
    if (app.globalData.userNum == 1) {
      wx.navigateTo({
        url: '../student/search/search',
      })
    } else {
      wx.navigateTo({
        url: '../teacher/create/create',
      })
    }
  },

  changePage: function(){
    if (app.globalData.userNum == 1) {
      wx.navigateTo({
        url: '../student/search/search',
      })
    } else {
      wx.navigateTo({
        url: '../teacher/create/create',
      })
    }
  }
})