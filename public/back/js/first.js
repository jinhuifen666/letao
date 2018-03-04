/**
 * Created by Administrator on 2018/3/4.
 */
$(function(){
    var page = 1;
    var pageSize = 5;
    //发送ajax请求，获取数据，渲染到页面
    var render = function(){
        $.ajax({
            type:'GET',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(info){
                //组装数据渲染到页面
                $('tbody').html(template('first_tmp',info));

                //渲染分页
                $('#paginator').bootstrapPaginator({
                    //指定当前使用的版本
                    bootstrapMajorVersion:3,
                    currentPage:page, //设置当前页
                    totalPages:Math.ceil(info.total/info.size), //设置总页数
                    numberofPages:5,//设置每页显示多少条数据
                    //当页码被点击的时候触发，
                     onPageClicked:function(a,b,c,p){
                         //修改page的值，这样渲染的就是当前修改的page
                         page=p;
                        //重新渲染页面
                         render();
                     }
                })






            }
        })
    }
    //第一次渲染
    render();

    //添加分类的功能
    $('.btn_add').on('click',function(){
        //模态框显示
        $('#firstModal').modal('show');
    });

    //初始化表单校验
    var $form = $('form');
    $form.bootstrapValidator({

        // 配置小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //配置校验规则
        fields:{
            categoryName:{
                validators:{
                    notEmpty:{
                        message:'一级分类名称不能为空'
                    }
                }
            }

        }
    });

    //表单成功校验事件
    $form.on('success.form.bv',function(e){
        e.preventDefault();
        console.log($form.serialize());
        //发送请求
        $.ajax({
            type:'POST',
            url:'/category/addTopCategory',
            data:$form.serialize(),
            success:function(info){
                console.log(info);
            //隐藏模态框
                $('#firstModal').modal('hide');
            //重置表单和样式
                $form.data("bootstrapValidator").resetForm(true);
            //每次重新渲染第一页
                page=1;
                render();
            }
        })














    })













})