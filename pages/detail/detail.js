const util = require('../../utils/util.js')
Page({
  data: {
    list: {},
    node: {},
    html: "<div>Hello World!</div>"
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '详情页面'
    })
  },
  onLoad: function (options) {
    
    let _bookInfo = {};
    var that = this

    for (let key in options) {
      _bookInfo[key] = decodeURIComponent(options[key]);
  }


    that.setData({
      title: _bookInfo.title,
      content: _bookInfo.content
    })
    wx.request({
      url: 'https://www.v2ex.com/api/replies/show.json?topic_id=' + _bookInfo.id,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {

        res.data.forEach(item => {

          item["last_modified"] = util.formatTime(new Date(item["last_modified"] * 1000));

        });

        that.setData({
          list: res.data
        });
      }
    })
  }

})