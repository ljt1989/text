$(function(){
	//综合专区控制
	$('#sort_cont a[class=complex]').mouseover(function(){
		$(this).css('opacity','1').css('filter','alpha(opacity:1)')
	})
	//页面控制
	var page_1=$('#sort_cont div[class=page_1]');
	var page_2=$('#sort_cont div[class=page_2]');
	//全部商品分类页面控制
	$('#sort_cont strong[name=page_1]').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
		page_2.css('display','none');
		page_1.css('display','block');
	});
	//全部品牌页面控制
	$('#sort_cont strong[name=page_2]').click(function(){
		$(this).addClass('active').siblings().removeClass('active')
		page_1.css('display','none');
		page_2.css('display','block');
	});
	//全部商品分类页面
	//获取数据
	$.ajax({
		type:"get",
		url:"../json/nav_menu.json",
		async:true,
		success:function(response){
			//获取写入位置
			var contDiv=$('#sort_cont div[name=cont]');
			$(response.main).each(function(index,value){
				var temp1=response.main[index];
				var sect=$('<div class="sect"></div>').appendTo(contDiv);
				var h3=$('<h3></h3>').html(temp1.type).appendTo(sect);
				$(temp1.cont).each(function(index,value){
					var temp2=temp1.cont[index];
					var a=$('<a></a>').prop('href',temp2.href).html(temp2.name).appendTo(sect);		
					if(index==temp1.cont.length-1){
						return
					};	
					sect.append('|')		
				})
			})
		},
		error:function(response){
			alert("加载数据失败"+response.status)
		}
	});
	//全部品牌页
	//获取数据
	
	$.ajax({
		type:"get",
		url:"../json/sort_famouse.json",
		async:true,
		success:function(response){
			//logo
			//获取写入位置
			var famouseDiv=$('#sort_cont div[class=famouse]');
			//解析数据并写入
			$(response.logos).each(function(index,value){
				var temp1=response.logos[index];
				var logoA=$('<a></a>').prop('href',temp1.href).appendTo(famouseDiv);
				var logo=$('<img />').prop('src',temp1.logo).appendTo(logoA);
			});
			//名字
			//获取写入位置
			var searchDiv=$('#sort_cont div[class=search]');
			$(response.names).each(function(index,value){
				var temp1=response.names[index];				
				
				var nameDiv=$('<div class="name"></div>').appendTo(searchDiv);
				$(temp1).each(function(index,value){
					var temp2=temp1[index];
					var nameA=$('<a></a>').prop('href',temp2.href).html(temp2.name).appendTo(nameDiv);
				})
			});
			//添加点击切换操作
			var bts=$('#sort_cont b');
			var nameDivS=$('#sort_cont div[class=name]');
			var activeBt=bts.eq(0);
			var activeName=nameDivS.eq(0);
			//设置默认
			nameDivS.eq(0).css('display','block');
			var pointer=$('<span class="pointer"></span>').appendTo(activeBt);
			
			$(searchDiv).delegate('b','click',function(){
				var tempIndex=$(this).index();
				$(activeBt).css('background-color','#333333');
				$(activeName).css('display','none');
				
				activeBt=this;
				activeName=nameDivS.eq(tempIndex-1);
				$(activeBt).css('background-color','#c7012c');
				$(activeName).css('display','block');
				$(this).append(pointer).siblings().remove(pointer);
			})
		},
		error:function(response){
			alert("加载数据失败"+response.status)
		}
	});
	
})
