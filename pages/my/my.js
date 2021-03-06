/** index.js **/

//获取app实例
const app = getApp();
const util = require('../../utils/util.js')
Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        list: []
    },

    /**
     * 跳转已购书籍页面
     */
    goMyBooks: function () {
        wx.navigateTo({
            url: '../logs/logs'
        });
    },

    /**
     * 从 globalData 中获取 userInfo
     */
    getUserInfo: function () {
        let that = this;

        let userInfo = app.globalData.userInfo;

        console.info('userInfo is:', userInfo);

        if (userInfo) {
            that.setData({
                hasLogin: true,
                userInfo: userInfo
            });
            wx.hideLoading();
        } else {
            console.log('globalData中userInfo为空');
        }
    },

    onLoad: function () {

    
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
    },
    getUserInfo: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },

    goDetail: function (ev) {

        let info = ev.currentTarget.dataset;
    
        let navigateUrl = '../detail/detail?';
        for (let key in info) {
            info[key] = encodeURIComponent(info[key]);
            navigateUrl += key + '=' + info[key] + '&';
        }

        navigateUrl = navigateUrl.substring(0, navigateUrl.length - 1);

        wx.navigateTo({
            url: navigateUrl
        });
    },

    onShow: function(){
        this.setData({
            list: util.unique(wx.getStorageSync('history') || [], 'id')
        });
    }


})