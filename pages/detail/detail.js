Page({
  data: {
    list: {},
    node:{}
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '详情页面'
    })
  },
  onLoad: function (options) {


    var that = this

    that.setData({
      title: options.title,
      content: options.content
     })
    wx.request({
      url: 'https://www.v2ex.com/api/replies/show.json?topic_id=' + options.id,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
         that.setData({
          list: res.data
         })
      }
    })
  }
})