(function(win, doc){
	var Dpr = 1,
		uAgent = win.navigator.userAgent;
	var isIOS = uAgent.match(/iphone/i);
	var isYIXIN = uAgent.match(/yixin/i);
	var is2345 = uAgent.match(/Mb2345/i);
	var ishaosou = uAgent.match(/mso_app/i);
	var isSogou = uAgent.match(/sogoumobilebrowser/ig);
	var isLiebao = uAgent.match(/liebaofast/i);
	var isGnbr = uAgent.match(/GNBR/i);

	var winDevicePixelRatio = win.devicePixelRatio;
	var winInnerWidth = win.innerWidth;
	var winInnerHeight = win.innerHeight;
	var senWidth = screen.width;
	var senHeight = screen.height;

	var resizeRoot = function(){
		var wWidth = (senWidth > 0) ? ( (winInnerWidth >= senWidth || winInnerWidth === 0) ? senWidth : winInnerWidth ) : winInnerWidth,
			wHeight = (senHeight > 0) ? ( (winInnerHeight >= senHeight || winInnerHeight === 0) ? senHeight : winInnerHeight ) : winInnerHeight,
			wDpr,
			wFsize;

		if(winDevicePixelRatio){
			wDpr = winDevicePixelRatio;
		}else{
			wDpr = isIOS ? (wWidth > 818 ? 3 : (wWidth > 480 ? 2 : 1)) : 1;
		}

		if(isIOS){
			wWidth = senWidth;
			wHeight = senHeight;
		}

		if (wWidth > wHeight) {
			wWidth = wHeight;
		}

		//7.5的来源是设计稿按照750px设计的，页面按照100px为基准（方便计算），即750/100 = 7.5
		wFsize = wWidth > 1080 ? 144 : wWidth/7.5; 
		wFise = wFsize > 32 ? wFsize : 32;
		win.screenWidth_ = wWidth;

		if(isYIXIN || is2345 || ishaosou || isSogou || isLiebao || isGnbr){
			//YIXIN 和 2345 这里有个刚调用系统浏览器时候的bug，需要一点延迟来获取
			setTimeout(function(){
				wWidth = (senWidth > 0) ? ((winInnerWidth >= senWidth || winInnerWidth == 0) ? senWidth : winInnerWidth) : winInnerWidth;
				wHeight = (senHeight > 0) ? ((winInnerHeight >= senHeight || winInnerHeight ==0) ? senHeight : winInnerHeight) : winInnerHeight;
				wFsize = wWidth > 1080 ? 144 : wWidth / 7.5;
				wFsize = wFsize > 32 ? wFsize : 32;
				//document.getElementsByTagName('html')[0].dataset.dpr = wDpr;
				document.getElementsByTagName('html')[0].style.fontSize = wFsize + 'px';
				//document.getElementById("fixed").style.display = "none";
			}, 500);
		} else {
			//document.getElementsByTagName('html')[0].dataset.dpr = wDpr;
			document.getElementsByTagName('html')[0].style.fontSize = wFsize + 'px';
			//document.getElementById("fixed").style.display = "none";
		}
	};
})(window, document);