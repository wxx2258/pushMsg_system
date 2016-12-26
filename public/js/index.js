

$(document).ready(function($) {
	$("#login").click(function(event) {
		var senddata=$("#sign_form").serialize();
		$.ajax({
			url: '/login/sign',
			type: 'POST',
			dataType: 'json',
			data: senddata,
		})
		.done(function(data) {
			console.log(data)
			if(data.result){
				$("#ajaxMsg").text("注册成功");
				$('#myModal').modal('show');
			}else{
				$("#ajaxMsg").text("注册失败，原因："+data.reason);
				$('#myModal').modal('show');
			}
		})
		.fail(function() {
			$("#ajaxMsg").text("网络异常，操作失败");
			$('#myModal').modal('show');
		})
		return false;
	});
	$("#signIn").click(function(event) {
		var senddata=$("#login_form").serialize();
		$.ajax({
			url: '/login/login',
			type: 'POST',
			dataType: 'json',
			data: senddata,
		})
		.done(function(data) {
			if(data.result){
				location.href = "/msg/"+data.uno;
				// console.log(data);
			}else{
				$("#ajaxMsg").text("登录失败,请重新登录");
				$('#myModal').modal('show');
			}
		})
		.fail(function() {
			$("#ajaxMsg").text("网络异常，操作失败");
			$('#myModal').modal('show');
		})
		return false;		
	});
});

