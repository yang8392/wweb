$(function(){

  // 加载分类数据
  function loadCateData(){
    return axios.get('categories');
  }
  // 渲染左侧菜单
  function renderLeftMenu(data){
    return new Promise(function(resolve,reject){
      // 渲染左侧菜单
      let html = template('leftMenuTpl',data.data);
      $('#leftMenuInfo').html(html);
      // 绑定菜单事件
      $('#leftMenuInfo').find('.items').on('click',function(){
        // 点击控制菜单选中
        $('#leftMenuInfo .cur').removeClass('cur');
        $(this).addClass('cur');
        // 渲染右侧
        // renderRightCate(data.data);
        renderRightCate.call(this,data.data);
      })
      // 添加菜单选中效果
      $('#leftMenuInfo').find('.items').eq(0).addClass('cur');
      resolve(data.data);
    })
  }
  // 渲染右侧分类信息
  function renderRightCate(data){
    // 如何从这里获取左侧菜单的索引
    let currentIndex = $(this).index();
    currentIndex = currentIndex === -1 ? 0 : currentIndex;
    let currentData = data[currentIndex] && data[currentIndex].children;
    return new Promise(function(resolve,reject){
      // 渲染右侧内容
      let html = template('rightCateTpl',currentData);
      $('#rightCateInfo').html(html);
      resolve();
    })
  }

  $(document).on("pageInit", function(e, pageId, $page) {
    // 先显示提示效果
    $.showPreloader('正在加载分类数据');
    // 调用接口
    loadCateData()
      .then(renderLeftMenu)
      .then(renderRightCate)
      .then(function(){
        $.toast('加载成功')
      })
      .catch(function(){
        $.toast('服务器错误')
      })
      .finally(function(){
        // 无论成功还是失败都会调用该方法
        $.hidePreloader('已经完成');
      })
  });
  $.init();
});