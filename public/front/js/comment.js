/**
 * Created by Administrator on 2018/3/5.
 */
//初始化区域滚动
mui('.mui-scroll-wrapper').scroll({
    indicators: false,
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
//轮播图播放
mui('.mui-slider').slider({
    interval:500//自动轮播周期，若为0则不自动播放，默认为0；
});