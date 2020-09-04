Page({
  data: {
    list: {},
    node:{},
    html:"<div>Hello World!</div>"
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

       res.data.forEach(item => {
        var newDate = new Date();
        newDate.setTime(item["last_modified"] * 1000);
        item["last_modified"] = newDate.toLocaleString() ;
       });

         that.setData({
          list: res.data
         });
      }
    })
  }

})