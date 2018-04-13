$(function() {
  // 隔离的空间
  // 实现登录
  // 基于Promise的编码风格：分而治之（把单个的业务封装到独立的方法中，然后通过then串联起来）
  // 表单验证
  function checkForm(params){
    return new Promise(function(resolve,reject){
      // 这里进行验证
      let reg = /^\d{11}$/g;
      if(!params.username || !reg.test(params.username)) {
        reject('手机号格式错误！');
      }
      if(!params.password || params.password.length < 6) {
        reject('密码至少是6位！');
      }
      resolve(params);
    });
  } 
  // 调用登录验证接口
  function login(params){
    return axios.post('login',params)
  }
  // 验证成功与否
  function check(data) {
    return new Promise(function(resolve,reject){
      console.log(data)
      if(data.meta.status === 200){
        // 登录成功
        // 保存token和用户相关信息
        let info = JSON.stringify(data.data);
        localStorage.setItem('userInfo',info);
        resolve();
      } else {
        // 登录失败
        reject(data.meta.msg);
      }
    })
  }
  $('#loginBtn').on('click', function() {
    // 获取页面表单数据
    let mobile = $('#mobile').val();
    let password = $('#password').val();
    // 调用接口要提交的参数
    let params = {
      username:mobile,
      password:password
    }
    // 调用上面定义函数，执行登录任务
    checkForm(params)
        .then(login)
        .then(check)
        .then(function(ret){
            location.href = '/index.html';
        })
        .catch(function(err){
           $.toast(data.meta.msg);
        })
  })
  
  // $('#loginBtn').on('click', function() {
  //   let mobile = $('#mobile').val();
  //   let password = $('#password').val();
  //   axios.post('login', {
  //       username: mobile,
  //       password: password
  //     })
  //     .then(function(data) {
  //       if(data.meta.status === 200){
  //         // 登录成功
  //         // 保存token和用户相关信息
  //         let info = JSON.stringify(data.data);
  //         localStorage.setItem('userInfo',info);
  //         // 跳转页面
  //         location.href = '/index.html';
  //       } else {
  //         // 登录失败
  //         $.toast(data.meta.msg);
  //       }
  //     })
  // })

  // 页面初始化完成之后，触发该事件
  $(document).on("pageInit", function(e, pageId, $page) {
    // 从本地缓存中取出用户信息，显示到输入框中
    let info = localStorage.getItem('userInfo');
    let uname = JSON.parse(info).username;
    $('#mobile').val(uname);
  });
  // 必须显示的调用该方法，从而触发pageInit事件
  $.init();
});
