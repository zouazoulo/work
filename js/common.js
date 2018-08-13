var pub = {};

pub.apiHandle = {
		init :function(data,d){
			switch (data)
				{
				case '1' : 
					pub.apiHandle.land.apiData(d);
					break;
				case '2' : 
					pub.apiHandle.storehouse.apiData(d,0);
					break;
				case '3' : 
					pub.apiHandle.trends.apiData(d);
					break;
				case '4' : 
					pub.apiHandle.frame.apiData(d);
					break;
				}
		},
		land : {
			apiData:function(){
				var v = d.data;
				var html = "";
				
				for(var i in v){
					html +=	`<li>
							<img src=${v[i].img}/>
							<p>${v[i].txt}</p>
						</li>`
				}
				$(".land_content")[0].innerHTML = html;
			}
			
		},
		storehouse : {
				apiData :function(d,index){
					var v = d.item[index].objects;
					var html="";
					var num = v.length;
					var w =	$(".show li").width();
					for(var i in v){
						html += `<dl>
								<dt class="ccsl">${v[i].name}</dt>
								<dd class="num">x${v[i].num}</dd>
								<dd><img src="${v[i].img}"/></dd>
								<dd><span class="button">立即使用</span></dd>
							</dl>`
					}
					if(index == 0){
						$(".show0")[0].innerHTML = html;
						}else if(index == 1){
							$(".show1")[0].innerHTML = html;
						}else{
							$(".show2")[0].innerHTML = html;
					}
					console.log($(".show li").width())
					$(".show").width(270*num) 
				}
		},
		trends :{
			apiData:function(){
				var v = d.data;
				var html = "";
				for(var i in v){
				html +=`<li>
						<p> ${pub.event.getNowFormatDate()}</p>
						<p>${v[i].p}</p>
					</li>`
				}
				$('.trends_content').append(html)
			}
		},
		frame:{
			apiData:function(){
				var html ="" ;
				html = `<div id="frame" class="frame" style="display:none">
							<span class="close"></span>
							<div class="icon">
								<img src="../img/p2x.png" alt="" />
							</div>
							<p>农场等级经验 + ${d.r}</p>
							<p>浇水次数 + 2</p>
							<p>化肥 + 1</p>
							<p>${d.n}种子 + ${d.z}</p>
						</div>
					<div id ="mask" class="common_mask" style="display:none"></div>`
				$("body").append(html)
			}
		}
	
}


pub.event = {
		land : function() {
			
			pub.event.commons('956px');
			$(".land_content").on("click"," li",function(){
				$(".common_wrap").animate({height:"0px"});
				$("#mask").hide();
			})
			
		},
		storehouse : function(){
			pub.event.commons('610px');
			
			$(".menu li").on("click",function(){
				$(this).addClass("active").siblings().removeClass("active");
				pub.apiHandle.storehouse.apiData(d,$(this).attr("data")); 
				if($(this).attr("data") == 0){
					$(".show0").addClass("add").siblings().removeClass("add");
				}else if($(this).attr("data") == 1){
					$(".show1").addClass("add").siblings().removeClass("add");
				}else{
					$(".show2").addClass("add").siblings().removeClass("add");
				}
			})
			
		},
		trends :function(){
			pub.event.commons('748px');
			$(".trends_wrap").on("click",".load_more",function(){
				
					pub.apiHandle.trends.apiData()
			})
		},
		frame : function(){
			$("#click").on("click",function(){
				$("#frame , #mask").show();
			})
			$(".close , .common_mask").on("click",function(){
				$("#frame , #mask").hide();
			})
		},
		commons : function(num){
			$("#click").on("click",function(){
				$(".common_wrap").animate({height:num});
				$("#mask").show();
			})
			$(".common_close, #mask").on("click",function(){
				$(".common_wrap").animate({height:"0px"});
				$("#mask").hide();
			})
		},
		getNowFormatDate :function() {
		    var date = new Date();
		    var seperator1 = "-";
		    var seperator2 = ":";
		    var month = date.getMonth() + 1;
		    var strDate = date.getDate();
		    if (month >= 1 && month <= 9) {
		        month = "0" + month;
		    }
		    if (strDate >= 0 && strDate <= 9) {
		        strDate = "0" + strDate;
		    }
		    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
		            + "&nbsp;&nbsp;&nbsp;" + date.getHours() + seperator2 + date.getMinutes()
		            + seperator2 + date.getSeconds();
		    return currentdate;
		}
}
