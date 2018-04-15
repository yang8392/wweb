$(function(){
	// 发送axios请求，加载列表数据
	function loadListData() {
		// body...
		return axios.get('goods/search');
	}
	// 渲染列表数据
	function renderListData(data){
		return new Promise(function (resolve,reject) {
			console.log(data)
			// body...
			let html = template('listTpl',data.data);
			$('#goodsInfo').html(html);
			resolve();
		})
	}
	// 页面加载事件
	$(document).on("pageInit", function(e, pageId, $page) {

		loadListData()
			.then(renderListData)
			.then(function(){
				$.toast('加载成功')
			})
			.catch(function(){
				$.toast('服务器错误')
			})

	})
	$.init();
});