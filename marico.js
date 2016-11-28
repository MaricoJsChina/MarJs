var root = "http://test.nongshiye.com";

function helps() {
	this.help = function(str) {
		switch(str) {
			case 'tab':
				{
					console.log('####### Help for class tab #########################################');
					console.log("Function 1     :  set_tab(jsonStr)");
					console.log("  PamramType      jsonStr -> json string");
					console.log("  PamramEg        {'tab':'ul>li','content':'section.hall','callback':function(){} }");
					console.log("  PamramExplain   tab->(string)the menus you will click.");
					console.log("  PamramExplain   content->(string)the content you will show when a nemu is clicked.");
					console.log("  PamramExplain   callback->(string)the function body you will call when this sets.");
					console.log('####### End help for class tab #########################################');
				}
				break;
			case 'sizer':
				{
					console.log('####### Help for class sizer #########################################');
					console.log("Function 1     :  set_size(jsonStr)");
					console.log("  PamramType      jsonStr -> json string");
					console.log("  PamramEg        {'dom':'.hall','content':{'height':'100rem','width':'100%'}}");
					console.log("  PamramExplain   dom->(string)the dom you will set size.");
					console.log("  PamramExplain   content->(json string)the css style you set.");
					console.log("");
					console.log("Function 2     :  parseRem(num)");
					console.log("  Usage           parse a number or a string to a number when you use the size unit 'rem'");
					console.log("  PamramType      num -> (string/number) this must contains a num");
					console.log('####### End help for class sizer #########################################');
				}
				break;
			default:
				{
					console.log('####### Help for class MaricoJs #########################################');
					console.log("");
					console.log("Please set the pamram string ,eg. this.help('sizer')");
					console.log("");
					console.log("Pramas List : tab , sizer");
					console.log("");
					console.log('####### End help for class MaricoJs #########################################');
				}
		}
	}
}
//tab
//{'tab':'ul>li','content':'section.hall'}
function tab() {
	this.set_tab = function(jsonStr) {
		this.obj = jsonStr;

		if(this.obj.callback) {

			var callback = this.obj.callback;

		}

		if(this.obj.tab && this.obj.content) {
			var t = this.obj.tab;
			var c = this.obj.content;

			$(t).each(function(index) {
				$(this).on('click', function(event) {
					event.stopPropagation();
					$(this).siblings().removeClass('cur');
					$(this).addClass('cur');
					$(c).siblings().removeClass('cur');
					$(c).eq(index).addClass('cur');
					if(callback) {
						callback();
					}

				});
			});
		} else {
			if(!this.obj.tab) console.log("ERR:Param tab is not exist");
			if(!this.obj.content) console.log("ERR:Param content is not exist");
		}
	}

}

function sizer() {
	this.set_size = function(jsonStr) {
		this.obj = jsonStr;
		if(this.obj.dom && this.obj.content) {
			var d = this.obj.dom;
			var c = this.obj.content;
			$(d).css(c);
		} else {
			if(!this.obj.tab) console.log("ERR:Param tab is not exist");
			if(!this.obj.content) console.log("ERR:Param content is not exist");
		}
	}
	this.parseRem = function(num) {
		return num / parseInt($("html").css('font-size'));
	}
}

function dom_ctrl() {
	this.ctrl = function(dom, action, content) {

	}
}

function parseDom() {
	/*this.dom2str = function(dom, prop) { 
		var htmlArr = "";
		switch(prop) {
			case "html":
				{
					htmlArr = dom.html();
					break;
				}
			case "input":
				{
					htmlArr = dom.val();
					break;
				}
			case "textarea":
				{
					htmlArr = dom.val();
					break;
				}
			default:
				{
					alert("无法解析属性" + prop);
				}
		}
		}
		*/

	this.str2Dom = function(dom) {
		var div = document.createElement("div");
		div.innerHTML = html;
		return div.children[0];
	}

	this.dom2Str = function(htmlDOM) {
		if(outerHTML in htmlDOM) {
			return htmlDOM.outerHTML;
		} else {
			var div = document.createElement("div");
			div.appendChild(htmlDOM);
			return div.innerHTML
		}
	}

}

function timer(total, step) {
	this.total = total;
	this.step = step;
	this.run = function(dom, callbak) {
		var i = 1;
		dom.html(total - i);
		setInterval(function() {
			if(i == total) {
				clearInterval(this);
				callbak();
			}
			dom.html(total - i);
			i += step;
		}, 1000 * step);
	}
}

function checker() {
	this.check = function(type, str) {
		switch(type) {

			case "tel":
				//手机号检测
				return /^1[34578]\d{9}$/.test(str);

				break;
			case "idcard":
				//身份证检测
				var id1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
				var id2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/;
				return(id1.test(str) || id2.test(str));
				break;
			case "email":
				//检测Email
				return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(str);
				break;
			case "cn":
				//检测是否是中文
				return /^([\u4E00-\u9FA5])*$/.test(str);
				break;
			case "num":
				return /^[0-9]*$/.test(str);
				break;
			default:
				return true;
		}

		/*function checkPhone(){ 
    var phone = document.getElementById('phone').value;
    if(!(/^1[34578]\d{9}$/.test(phone))){ 
        alert("手机号码有误，请重填");  
        return false; 
    } */
	}
}

function masks() {

	this.mask = function() {
		$("body").append("<div class = 'masks'></div>");
		$(".masks").css({
			'position': 'fixed',
			'left': '0',
			'top': '0',
			'background': 'rgba(50,50,50,0.95)'
		});
		$(".masks").css({
			'height': $(window).height() + 'px',
			'z-index': '9999',
			'width': '100%'
		});
		$(".masks").css({
			'display': 'block'
		});
		$(window).resize(function() {
			$(".masks").css({
				'height': $(window).height() + 'px',
				'z-index': '9999',
				'width': '100%'
			});
		});
	}
	this.unmask = function() {
		$(".masks").remove();
	}
	this.content = function(title, content) {
		if(!$(".masks").size()) {
			this.mask();
		}
		$(".masks").append("<div class='wrap tc'><p class='ht1'><h3></h3><p class='ht15'></p><div class='content'></div></div>");
		$(".masks").find(".wrap").css({
			'width': '80%',
			'max-width': '600px',
			'min-height': "10rem",
			'text-align': 'center',
			'background': '#f5f5f5'
		});
		$(".masks").find(".wrap").find("h3").html(title);
		$(".masks").find(".wrap").find(".content").html(content);
		$(".masks").find(".wrap").css({
			'margin-top': ($(window).height() - $(".masks").find(".wrap").height()) * 0.5 + 'px',
			'margin-left': '10%',
			'border-radius': '1rem'
		});
	}

}

