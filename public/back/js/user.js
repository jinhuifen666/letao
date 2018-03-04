/**
 * Created by Administrator on 2018/3/4.
 */
$(function(){
    var page=1;  //当前打开的那一页
    var pageSize=5; //每页可以显示的最多条数

    //分页要多次渲染,所以封装,提高代码复用率
    function render(){
        //发送ajax请求,获取数据,渲染在页面中
        $.ajax({
            type: 'GET',
            url: '/user/queryUser',
            data: {
                page: page,
                pageSize: pageSize,
            },
            success: function (info) {
                //console.log(info);
                //组装数据进行渲染
                $('tbody').html(template('use_tmp', info));

                //渲染分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3, //如果使用了bootstrap3版本，必须指定
                    currentPage: page,  //设置当前页
                    totalPages: Math.ceil(info.total/info.size),//设置总页数
                    numberOfPages:5,// 设置显示多少页
                    //当页码被点击的时候触发
                    onPageClicked: function (a,b,c,p) {
                        //修改一下page的值
                        page = p;
                        //重新渲染
                        render();
                    }

                });
            },
        })
    }

    render();

    //启用禁用用户----事件绑定给表格
    $('tbody').on('click','.btn',function(){
        //显示模态框
        $('#userModal').modal('show');

        //获取当前用户的ID
        var id = $(this).parent().data('id');
        var isDelete = $(this).hasClass('btn-success')?1:0;

        $('.btn_confirm').on('click',function(){
        //发送ajax请求
            $.ajax({
                type:'POST',
                url:'/user/updateUser',
                data:{
                    id:id,
                    isDelete:isDelete
                },
                success:function(info){
                    //console.log(info);
                //隐藏模态框，
                    $('#userModal').modal('hide');
                //重新渲染页面
                    render();
                }
            })




        })

    })










})