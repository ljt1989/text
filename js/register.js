$(function(){
	var atext=$('#reg_cont input[class=text]');
	var Prompt=$('#reg_cont span[class=Prompt]');
	var textPrompt1=['4-20位字符，可由英文、数字组成','6-14位，可由英文、数字及特殊字符组合','请再次输入密码','请输入邮箱，用于找回密码、接受订单通知等','推荐人用户名，区分大小写','请输入活动代码','请输入图片中的数字'];
	var textPrompt2=['用户名不能为空','密码不能为空','请重新输入密码','邮箱格式不正确','','','请填写验证码'];
	//输入框获取焦点
	$('#reg_cont form').delegate('input','focus',function(){
		var index=($(this).index()-2)/4;
		Prompt.eq(index).html(textPrompt1[index])
	}).delegate('input','blur',function(){
		var index=($(this).index()-2)/4;
		
		if(this.value==''){
			Prompt.eq(index).html(textPrompt2[index])
		}else{
			Prompt.html('');
			//用户名验证
			if(index==0){
				var reg1=/\W/g;
				if(this.value.match(reg1).length!=0){
					Prompt.eq(index).html('用户名格式不对')
				}
			};
			//密码验证
			if(index==1){
				var reg2=/\W/g;
				if(this.value.match(reg2).length!=0){
					Prompt.eq(index).html('密码格式不对')
				}
			}
			//密码二次验证
			if(index==2){
				if(this.value!=atext[1].value){
					Prompt.eq(index).html('两次输入密码不一样')
				}
			}
		}
	});
	//提交操作
	$('#reg_cont input[type=submit]').click(function(){
		
	})
})