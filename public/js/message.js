

$(document).ready(function($) {

	$("#nba_team_send").click(function(event) {
		var senddata=$("#nba_team_form").serialize();
		$.ajax({
			url: '/msg/changeSet',
			type: 'POST',
			dataType: 'json',
			data: senddata,
		})
		.done(function(data) {
			console.log(data)
			if(data.result){
				$("#ajaxMsg").text("提交成功");
				$('#myModal').modal('show');
			}else{
				$("#ajaxMsg").text("修改失败");
				$('#myModal').modal('show');
			}
		})
		.fail(function() {
			$("#ajaxMsg").text("网络异常，操作失败");
			$('#myModal').modal('show');
		})
		return false;
	});
	$("#nba_player_send").click(function(event) {
		var senddata=$("#nba_player_form").serialize();
		$.ajax({
			url: '/msg/changeSet',
			type: 'POST',
			dataType: 'json',
			data: senddata,
		})
		.done(function(data) {
			if(data.result){
				$("#ajaxMsg").text("提交成功");
				$('#myModal').modal('show');
			}else{
				$("#ajaxMsg").text("修改失败");
				$('#myModal').modal('show');
			}
		})
		.fail(function() {
			$("#ajaxMsg").text("网络异常，操作失败");
			$('#myModal').modal('show');
		})
		return false;		
	});

	$("#update").click(function(event) {
		var msg = $("#inputplayer_msg").val();
		var senddata={msg:msg};
		$("#loddingModal").modal('show');
		$.ajax({
			url: '/msg/updateDatebase',
			type: 'POST',
			dataType: 'json',
			data:senddata
		})
		.done(function(data) {
			console.log(data)
			if(data.result){
				$("#loddingModal").modal('hide');
				$("#ajaxMsg").text("提交成功");
				$('#myModal').modal('show');
				setTimeout(function(){
					window.location.reload();
				},500)
			}else{
				$("#ajaxMsg").text("更新失败:"+data.reason);
				$('#myModal').modal('show');
			}
		})
		.fail(function() {
			$("#ajaxMsg").text("网络异常，操作失败");
			$('#myModal').modal('show');
		})
	});


});

