/**
 * Created by Administrator on 2018/3/4.
 */
$(function(){
    var page = 1;
    var pageSize = 5;
    //发送ajax请求，获取数据，渲染在页面上
    var render = function(){
        $.ajax({
            type:'GET',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:page,
                pageSize:pageSize,
            },
            success:function(info){
                //组装数据渲染
                $('tbody').html(template('second_tmp',info));

                //渲染分页
                $('#paginator').bootstrapPaginator({
                    //如果使用的是bootstrap3，必须指定版本
                    bootstrapMajorVersion:3,
                    //设置当前页
                    currentPage:page,
                    //设置总页码数
                    totalPages:Math.ceil(info.total/info.size),
                    //当页码被点击时触发的事件
                    onPageClicked:function(a,b,c,p){
                        page=p;
                        //重新渲染页面
                        render();
                    }
                });

            }
        });

    }
    render();

    //添加功能
    //点击添加按钮，模态框显示
    $('.btn_add').on('click',function(){
        $('#secondModal').modal('show');
    })










})