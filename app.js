/**
 * セレクターから要素を取得しランダムに並び替える
 *
 * @param {*} selectors
 * @returns
 */
var randomElements = function(selectors){
	//受け取ったセレクターから要素を作成
	var elements = document.querySelectorAll(selectors);

	//結果を格納する配列
	var arr = [];

	//elementの個数をカウント
	var len = elements.length;
	
	//要素がない場合中止
	if(len === 0) return null;

	//数字配列作成
	var nums = [];
	for (i = 0; i < len; i++) {
		nums.push(i);
	}
	
	//数字配列をランダムに
	for(var i = len - 1; i > 0; i--){
		var r = Math.floor(Math.random() * (i + 1));
		var tmp = nums[i];
		nums[i] = nums[r];
		nums[r] = tmp;
	}

	//ランダムに並び替えた数字配列を基に要素をシャッフルし配列に格納
	for (i = 0; i < len; i++) {
		arr.push(elements[nums[i]]);
	}
	return arr;
};



/**
 * 要素のwidth,height,y,xを取得
**/
var getElementRects = function(element){
	if(element.length === null) return false;
	
	var rect = element.getBoundingClientRect();
	var rects = {};
	rects['w'] = rect.width;
	rects['h'] = rect.height;
	rects['x'] = rect.left + window.pageXOffset
	rects['y'] = rect.top + window.pageYOffset;
	rects['wx'] = rects['w'] + rects['x'];
	rects['hy'] = rects['h'] + rects['y'];
	return rects;
};



/**
 * サイドコンテンツを追従させる
**/
var beforeY,nowY;
var stickySideContent = function(){
	//要素取得
	var mainElement = document.querySelector('#index-main,#search-results-main');
	var sideElement = document.querySelector('aside.widgets');
	var sideInnerElement = document.querySelector('#aside-inner');
	var headerElement = document.querySelector('#header');
	
	//要素がなければ終了
	if(mainElement === null || sideElement.length === null || sideInnerElement.length === null) return false;
	
	//要素からSize、Position取得
	var mainRects = getElementRects(mainElement);
	var sideRects = getElementRects(sideElement);
	var sideInnerRects = getElementRects(sideInnerElement);
	var headerRects = getElementRects(headerElement);
	
	//メインがサイドインナーより低ければ終了
	if(mainRects.h < sideInnerRects.h) return false;
	
	//スクロール量取得
	beforeY = nowY === undefined ? window.scrollY :nowY;
	nowY = window.scrollY;
	
	//windowサイズ
	w = window.innerWidth;
	h = window.innerHeight;
	
	//スクロール向き判定
	var scrollMoving = nowY >= beforeY ? 'down' : 'up';
	
	//sideInnerElement.style.transition = '0.5s';
	if(mainRects.y > nowY){ //スクロール量がメインの上端を越えたとき
		sideInnerElement.style.transform = 'translateY(0px)';
	} else if(mainRects.hy < nowY + h){  //スクロール量がメインの下端を越えたとき
		sideInnerElement.style.transform = 'translateY(' + (mainRects.hy - sideInnerRects.h  - sideRects.y) + 'px)';
	} else if(scrollMoving === 'down' && nowY + h < mainRects.hy && nowY + h > sideInnerRects.hy){ //下スクロール
		sideInnerElement.style.transform = 'translateY(' + (nowY + h - sideRects.hy) + 'px)';
	} else if(scrollMoving === 'up' && nowY < sideInnerRects.y + headerRects.h && sideRects.y < sideInnerRects.y){ //上スクロール
		sideInnerElement.style.transform = 'translateY(' + (nowY + headerRects.h - sideRects.y) + 'px)';
	}
};