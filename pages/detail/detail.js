const util = require('../../utils/util.js')
const createRecycleContext = require('miniprogram-recycle-view')
const app = getApp()
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
  itemSizeFunc: function (item, idx) {
    return {
        width: 162,
        height: 182
    }
},
  onLoad: function (options) {
    
    let _bookInfo = {};
    var ctx = createRecycleContext({
      id: 'recycleId',
      dataKey: 'recycleList',
      page: this,
      itemSize: function(item, index) {
        return {
          width: app.globalData.windowHeight,
            height: 180
        }
    }
    })
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
        ctx.append(res.data);
        that.setData({
          list: res.data
        });
      }
    })


  }

})