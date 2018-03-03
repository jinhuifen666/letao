/**
 * Created by Administrator on 2018/3/2.
 */
//如果函数的作用:
//   1.等待页面加载完成
//   2.防止全局变量的污染
$(function(){
// 1.校验表单
    $('form').bootstrapValidator({
    //    用户名不能为空 2-6
    //    密码不能为空 6-12

    //配置校验规则
        fields:{
        //校验用户名
            username:{
                validators:{
                //不能为空
                    notEmpty:{
                        message:'用户名不能为空!'
                    },
                //长度校验
                    stringLength:{
                        min:2,
                        max:6,
                        message:'用户名长度必须在2-6位'
                    },
                    //专门用来提示信息
                    callback:{
                        message:'用户名错误'
                    }
                }
            },
        //    检验密码
            password:{
                validators:{
                // 不能为空
                    notEmpty:{
                        message:'密码不能为空!'
                    },
                //    长度校验
                    stringLength:{
                        min:6,
                        max:12,
                        message:'密码长度必须在6-12位'
                    },
                //    专门用来提示信息
                    callback:{
                        message:'密码错误'
                    }
                }
            },
        },

        //配置小图标, 成功 失败  校验中
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

    })

// 2.给表单注册一个校验成功事件,成功的时候阻止表单的默认提交行为,使用ajax提交
   $('form').on('success.form.bv',function(e){
       e.preventDefault();
   //发送ajax请求数据
       console.log($('form').serialize());
       $.ajax({
           type:'post',
           url:'/employee/employeeLogin',
           data:$('form').serialize(),
           dataType:'json',

           success:function(info){
               console.log(info);
               //把username字段改为校验失败
               if(info.error===1000){
                   $('form').data('bootstrapValidator').updateStatus('username','INVALID','callback');
               }
               if(info.error===1001){
                   $("form").data('bootstrapValidator').updateStatus('password','INVALID','callback');
               }
               if(info.success){
                   location.href="index.html";
               }
           }
       })
   })
})