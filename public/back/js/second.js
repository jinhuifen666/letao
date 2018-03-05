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

        //发送ajax请求，渲染模态框的一级分类
        $.ajax({
            type:'GET',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:1,
                pageSize:100
            },
            success:function(info){
                console.log(info);
                console.log(template('add_category'), info);
                $('.dropdown-menu').html(template('add_category',info));
            }
        });






    });


    //给dropdown-menu下所有的a注册点击事件
    $('.dropdown-menu').on('click','a',function(){
        //获取a的内容
        var text=$(this).text();
        //赋值给span
        $('.dropdown_text').text(text);
        //获取li的id
        var id = $(this).parent().data('id');

        $("[name='categoryId']").val(id);









    })




    // 表单校验功能
    var $form = $("form");
    $form.bootstrapValidator({
        //小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //校验规则
        fields:{
            categoryId:{
                validators:{
                    notEmpty:{
                        message:'请选择一级分类'
                    }
                }
            },
            brandName:{
                validators:{
                    notEmpty:{
                        message:'请输入品牌的名称'
                    }
                }
            },
            brandLogo: {
                validators:{
                    notEmpty:{
                        message:'请上传品牌的图片'
                    }
                }
            }
        },
        excluded:[]
    });




})