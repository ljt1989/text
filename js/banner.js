$(function(){
	//主体商品展示
	//获取数据
	$.ajax({
		type: "get",
		url: "../json/ban_goods.json",
		async: true,
		success: function(response) {
			//获取写入位置
			var sectionDiv=$('#banner_cont div[class=section]');
			//解析数据并写入
			$(response).each(function(index,value){
				var temp1=response[index];
				var contUl=$('<ul class="cont"></ul>').css('background-color',temp1.bgColor).appendTo(sectionDiv);
				var h2=$('<h2></h2>').html(temp1.title).css('background-position','0 '+(-55*index)+'px').appendTo(contUl);
				$(temp1.cont).each(function(index,value){
					var temp2=temp1.cont[index];
					var li=$('<li></li>').appendTo(contUl);
					var a=$('<a class="good"></a>').prop('href',temp2.href).appendTo(li);
					var img=$('<img />').prop('src',temp2.img).appendTo(a);
					var nameP=$('<p class="name"></p>').appendTo(li);
					var name=$('<a></a>').prop('href',temp2.href).html(temp2.name).appendTo(nameP);
					var p=$('<p></p>').html(temp2.summary).appendTo(li);
					var span=$('<span>飞虎价：</span>').appendTo(li);
					var b=$('<b></b>').html(temp2.price).appendTo(li);
					var buy=$('<a class="buy">立即抢购</a>').prop('href',temp2.buyHref).appendTo(li);
				})
			})
		},
		error: function(response) {
			alert("获取数据失败"+response.status)
		}
	});
})