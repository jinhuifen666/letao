/**
 * Created by Administrator on 2018/3/2.
 */
$(function () {
    //禁用进度环
    NProgress.configure({
        showSpinner: false
    })

    $(document).ajaxStart(function(){
    //进度条加载效果
        NProgress.start();
    })
    $(document).ajaxStop(function(){
        setTimeout(function(){
            NProgress.done();
        },500)
    })


//二级菜单的显示与隐藏
//找到二级菜单的a标签
$('.second').prev().on('click',function(){
    //切换动画
     $(this).next().slideToggle();
});


//侧边栏的显示与隐藏
// 点击icon_menu,侧边栏隐藏,再次点击,侧边栏显示,根据原有的样式,加个类名,切换
 $('.icon_menu').on("click",function(){
     //改变侧边栏的left
     $('.lt_aside').toggleClass('now');
     //改变主体部分的左边距
     $('.lt_main').toggleClass('now');
 });


//退出功能
$('.icon_logout').on('click',function(){
    //模态框显示
    $('#logoutModal').modal('show');
});

//不能在事件里面注册事件
$('.btn_logout').on('click',function(){
    // 发送请求,告诉服务器,我要退出,让服务器把对应的session删掉
    $.ajax({
        type:'GET',
        url:'/employee/employeeLogout',
        success:function(info){
            console.log(info);
            if(info.success){
                location.href='index.html';
            }
        }
    })
});

// 判断当前页面是不是登录页,发送ajax请求,是否可以登录
if(location.href.indexOf('login.html') == -1){
    //发送请求
    $.ajax({
        type:'GET',
        url:'/employee/checkRootLogin',
        success:function(info){
            if(info.error==400){
                location.href="login.html";
            }
        }
    })
}

});
