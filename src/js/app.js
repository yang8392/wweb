// 设置图片基准路径
 let getURLParamByName = function(paramName){
  let str = location.search.substring(1);// cid=12&abc=hello
  let arr = str.split('&');
  let allParams = {};
  arr.forEach(function(item){
    let kv = item.split('=');
    // 把所有的参数以键值对的方式存入对象中
    allParams[kv[0]] = kv[1];
    // if(paramName == kv[0]){
    //   // 对比传递的参数名和url中的参数名是否一致，如果一致就找到了对应的值
    // }
  })
  return allParams[paramName];
}
const APP = {
  imgBaseUrl : 'http://47.96.21.88:8888/', // 设置图片基准路径
  qs: getURLParamByName
}
 // const APP = {
 // 	imgBaseUrl:'http://47.96.21.88:8888/'
 // }
// 设置请求的基准路径
axios.defaults.baseURL = 'http://47.96.21.88:8888/api/public/v1';
// 响应拦截器
axios.interceptors.response.use(function (response) {
    // 在我们得到服务器返回的数据之前做一些处理
    return response.data;
  }, function (error) {
    return Promise.reject(error);
  });
