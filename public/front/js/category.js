/**
 * Created by Administrator on 2018/3/5.
 */
$(function(){
//一级分类请求
    $.ajax({
        type:'GET',
        url:'/category/queryTopCategory',
        success:function(info){
            //console.log(info);
            $('.first').html(template('firstTpl',info));

            //渲染二级分类
            renderSecond(info.rows[0].id);
        }
    });

    //点击一级菜单，重新渲染二级菜单
    $('.first').on('click','li',function(){
        $(this).addClass('current').siblings().removeClass('current');

        var id = $(this).data('id');
        renderSecond(id);

       //让区域滚动重新到0，0的位置
        mui('.mui-scroll-wrapper').scroll()[1].scrollTo(0,0,300);


    });

    //渲染二级分类
    function renderSecond(id){
        $.ajax({
            type:'GET',
            url:'/category/querySecondCategory',
            data:{
                id:id
            },
            success:function(info){
                //console.log(info);
                $('.second').html(template('secondTpl',info));
            }
        })
    }







})