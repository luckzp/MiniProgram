//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    list: []
  },
  onLoad: function () {
    this.setData({
      list : this.unique( wx.getStorageSync('history') || [], 'id')
    })
  },
  unique: function(arr, val){
    const res = new Map();
    return arr.filter(item => !res.has(item[val]) && res.set(item[val], 1));
  },
  goDetail: function(ev) {

    let info = ev.currentTarget.dataset;
    var history = wx.getStorageSync('history') || []
    history.unshift(info);
    wx.setStorageSync('history', history)
    let navigateUrl = '../detail/detail?';
    for (let key in info) {
      // info[key] = encodeURIComponent(info[key]);
      navigateUrl += key + '=' + info[key] + '&';
  }

  navigateUrl = navigateUrl.substring(0, navigateUrl.length - 1);

  wx.navigateTo({
      url: navigateUrl
  });
 }
})
