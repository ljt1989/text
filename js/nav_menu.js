$(function() {
	//二级菜单
	//获取数据
	$.ajax({
		type: "get",
		url: "../json/nav_menu.json",
		async: true,
		success: function(response) {
			//获取写入位置
			var sec_menu=$('#shop_nav div[class=sec_menu]');
			var typeMenu = $('#shop_nav ul[class=typeMenu]');
			var contDiv=$('#shop_nav div[class=cont]');
			var hotCom = $('#shop_nav a[class=hot]');
			//数据解析并写入
			var mainData = response.main;
			var hotData = response.hotCom;
			//分类内容写入
			$(mainData).each(function(index, value) {
				var temp1 = mainData[index];
				var type = $('<li></li>').appendTo(typeMenu);
				var typeName = $('<a></a>').html(temp1.type).prop('href', temp1.href).appendTo(type);
				var cont=$('<ul class="main"></ul>').appendTo(contDiv);
				$(temp1.cont).each(function(index, value) {
					var temp2 = temp1.cont[index];
					var sort = $('<li></li>').appendTo(cont);
					var sortName = $('<a></a>').html(temp2.name).prop('href', temp2.href).appendTo(sort);
				});
			});
			$(typeMenu).delegate('li','mouseover',function(){
				$(this).addClass('active').siblings().removeClass('active');
				//具体内容显示
				contDiv.css('display','block');
				var _index=$(this).index();
				$('#shop_nav ul[class=main]').css('height','0').eq(_index).css('height','auto');
				//位置移动
				if(_index>3){
					$(contDiv).css('top',(52*(_index-3)-2)+'px')
				}else{
					$(contDiv).css('top','-2px')
				}
			});
			
			//热门品牌写入
			$(hotData).each(function(index, value) {
					var temp3 = hotData[index];
					hotCom.eq(index).html(temp3.name).prop('href', temp3.href);
					if(index >= 10) {
						return
					}
				})
				//二级菜单控制
			var close = $('#shop_nav b[class=close]');
			$('#shop_nav a[class=menu]').mouseover(function() {
				sec_menu.css('display', 'block')
			}).mouseout(function() {
				sec_menu.css('display', 'none')
			});
			sec_menu.mouseover(function() {
				$(this).css('display', 'block')
			}).mouseout(function() {
				$(this).css('display', 'none')
			});
			close.click(function() {
				sec_menu.css('display', 'none')
			});
		},
		error: function(response) {
			alert("加载数据失败" + response.status)
		}
	});

})