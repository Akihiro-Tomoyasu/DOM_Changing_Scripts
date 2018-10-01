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