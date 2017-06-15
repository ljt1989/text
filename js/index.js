$(function() {
	//轮播图
	//获取数据
	var slide = $('#ind_banner .slide');
	$.ajax({
		type: "get",
		url: "json/banner.json",
		async: true,
		success: function(response) {
			//生成控制
			var prev=$('<span class="prev"></span>');
			var next=$('<span class="next"></span>');
			var control = $('<div class="control"></div>').append(prev).append(next);
			var pages = $('<ul class="pages"></ul>').appendTo(control);
			var aImg=[];
			
			//遍历数据并写入
			$(response).each(function(index, value) {
				//生成图片
				var img = $('<img />').prop('src', response[index].src);
				var a = $('<a></a>').prop('href', response[index].href).append(img);
				var li = $('<li name="img"></li>').append(a).appendTo(slide);
				
				//生成页码
				var _page = $('<li name="bt"></li>').appendTo(pages);
				
				aImg.push(img);
	
				//设置默认
				if(index==0){
					li.addClass('active');
					_page.addClass('active');
				}
			});

			//调整页码宽度
			pages.css('width',48*response.length+'px');
			//写入文档
			control.append(pages);
			slide.append(control);
			//控制图片下标
			var sl_index = 0;
			//控制默认滚动效果开关
			var onOff = true;
			//默认自动滚动效果
			setInterval(function() {
					if(onOff) {
						sl_index++;
						sl_index = changeView(sl_index);
					} else {
						return
					}
				}, 2000)
				//界面开关默认效果
			slide.mouseover(function() {
					onOff = false
				}).mouseout(function() {
					onOff = true
				})
				//添加上一张点击操作
			prev.click(function() {
					sl_index--;
					sl_index = changeView(sl_index);
				})
				//添加下一张点击操作
			next.click(function() {
					sl_index++;
					sl_index = changeView(sl_index);
				})
				//点击索引的操作
			pages.delegate('li', 'click', function() {
					sl_index = $(this).index();
					changeView(sl_index);
				})
				//切换视图的函数
			function changeView(index) {
				//调整下标
				if(index < 0) {
					index = aImg.length - 1
				};
				if(index > aImg.length - 1) {
					index = 0
				};
				//切换图片
				$('.slide li[name=img]').eq(index).addClass('active').siblings().removeClass('active');
				//索引样式
				$('.slide li[name=bt]').eq(index).addClass('active').siblings().removeClass('active');
				return index;
			}
		},
		error: function(response) {
			alert("加载数据失败" + response.status)
		}
	});

	//商品分类

	//获取数据
	$.ajax({
		type: "get",
		url: "json/temp.json",
		async: true,
		success: function(response) {
			var shops = $('.shops');
			//遍历数据并写入
			$(response).each(function(index, value) {
				var url = 'url(' + response[index].bg + ') no-repeat 23px center';
				var good = $('<a></a>').prop('href', response[index].href).html(response[index].name).css('background', url);
				var oLi = $('<li></li>').append(good).appendTo(shops)
			})
		},
		error: function(response) {
			alert("获取数据失败")
		}
	});
	//消息框
	
	//获取数据
	$.ajax({
		type:"get",
		url:"json/news.json",
		async:true,
		success: function(response) {
			var news=$('#ind_banner ul[class=info]');
			$(response).each(function(index,value){
				var n_a=$('#ind_banner a[name=news]');
				
				//裁剪内容
				var info=response[index].news.slice(0,15);
				//写入
				$(n_a[index]).prop('href',response[index].href).html(info);
				if(index>=5){
					return
				}
			});
		},
		error: function(response) {
			alert("获取最新消息失败"+response.status)
		}
	});
	//推广栏
	
	//获取数据
	$.ajax({
		type:"get",
		url:"json/news_show.json",
		async:true,
		success: function(response) {
			var img=$('<img />').prop("src",response[0].src).appendTo($('#ind_banner a[name=n_show]'))
		},
		error: function(response) {
			alert("获取最新活动失败"+response.status)
		}
	});
	
	//每日秒杀
	
	//获取数据
	$.ajax({
		type:"get",
		url:"json/dayShow.json",
		async:true,
		success: function(response) {
			var a=$('#dayShow a[name=shop]');
			var img=$('#dayShow img[class=pic]');
			var name=$('#dayShow span[class=name]');
			var n_price=$('#dayShow span[class=n_price]');
			var o_price=$('#dayShow span[class=o_price]');
			$(response).each(function(index,value){
				$(a[index]).prop('href',response[index].href);
				$(img[index]).prop('src',response[index].src);
				$(name[index]).html(response[index].name.slice(0,11));
				$(n_price[index]).html(response[index].n_price);
				$(o_price[index]).html(response[index].o_price);
				if(index>=5){
					return
				}
			})
		},
		error: function(response) {
			alert("获取最新秒杀失败"+response.status)
		}
	});
	
	//主体内容
	//获取数据
	$.ajax({
		type:"get",
		url:"json/hotGoods.json",
		async:true,
		success: function(response) {
			//获取内容插入位置
			var ind_main=$('#ind_main');
			$(response).each(function(index,value){
				var _index=index;
				var temp1=response[index];
				var sideData=temp1.cont.side;
				var mainData=temp1.cont.main;
				//分类块
				var cont=$('<div class="cont"></div>').appendTo(ind_main);
				//侧边栏
				var title=$('<h2 class="title"></h2>').html(temp1.title).appendTo(cont);
				var side=$('<div class="side"></div>').css('background','url('+sideData.bg+')').appendTo(cont);
				var side_bt=$('<ul class="clearfix"></ul>').appendTo(side);
				$(sideData.bt).each(function(index,value){
					var temp2=sideData.bt[index];
					var li=$('<li></li>').appendTo(side_bt);
					var bt=$('<a class="bt"></a>').prop('href',temp2.href).html(temp2.name).appendTo(li);
					//添加按钮事件
					$(side_bt).delegate('li','mouseover',function(){
						$(this).css('background-position','0 '+(-63*_index)+'px')
					});
					$(side_bt).delegate('li','mouseout',function(){
						$(this).css('background-position','0 -440px')
					});
				});
				
				var type=$('<a class="type"></a>').prop('href',sideData.href).appendTo(side);
				
				//主体商品展示
				var main=$('<div class="main"></div>').appendTo(cont);
				var main_1=$('<ul></ul>').appendTo(main);
				var main_2=$('<ul></ul>').appendTo(main);
				$(mainData).each(function(index,value){
					var temp3=mainData[index];
					var li=$('<li></li>');
					var a=$('<a></a>').prop('href',temp3.href).appendTo(li);
					var img=$('<img class="good"/>').prop('src',temp3.img).appendTo(a);
					var p=$('<p class="name"></p>').html(temp3.name.slice(0,30)).appendTo(a);
					var span=$('<span class="price"></span>').html(temp3.price).appendTo(a);
					if(index<=4){
						main_1.append(li)
					}else{
						main_2.append(li)
					}
				})
				//热牌链接
				var links=$('<div class="links"></div>').css('background','url('+temp1.links.bg+')').appendTo(cont);
				var links_href=temp1.links.href;
				for(i=0;i<10;i++){
					$('<a class="link"></a>').prop('href',links_href[index]).appendTo(links)
				}
			})
		},
		error: function(response) {
			alert("获取数据失败"+response.status)
		}
	});
})