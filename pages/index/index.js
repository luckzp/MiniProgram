//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  
    navData: [{
        text: '最热'
      },
      {
        text: '技术'
      },
      {
        text: '交易'
      }
    ],
    currentTab: 0,
    navScrollLeft: 0,
    list: []
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  switchNav(event) {
    var cur = event.currentTarget.dataset.current;
    //每个tab选项宽度占1/5
    var singleNavWidth = this.data.windowWidth / 5;
    //tab选项居中                            
    this.setData({
      navScrollLeft: (cur - 2) * singleNavWidth
    })
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  onLoad: function () {

    var that = this;
  
    wx.request({
      url: 'https://www.v2ex.com/api/topics/hot.json',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
         that.setData({
           list: res.data
         })
         console.log(res.data)
      }
    })
  },

  goDetail: function(ev) {

    let info = ev.currentTarget.dataset;
    var history = wx.getStorageSync('history') || []
    history.unshift(info);
    wx.setStorageSync('history', history)
    let navigateUrl = '../detail/detail?';
    for (let key in info) {
      if(key != 'avatar'){
      info[key] = encodeURIComponent(info[key]);
      navigateUrl += key + '=' + info[key] + '&';
      }
  }

  navigateUrl = navigateUrl.substring(0, navigateUrl.length - 1);

  wx.navigateTo({
      url: navigateUrl
  });
 }
})