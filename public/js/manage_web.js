$(document).ready(function($) {

	$(".delete_button").click(function(event) {
		var uno=$(this).attr("data-uno"),
			messageSet_no = $(this).attr("data-messageSet_no");
			console.log(messageSet_no)
		var senddata = {
			uno:uno,
			messageSet_no:messageSet_no
		}
		$.ajax({
			url: '/manage/deleteuser',
			type: 'POST',
			dataType: 'json',
			data: senddata,
		})
		.done(function(data) {
			if(data.result){
				$("#ajaxMsg").text("删除成功");
				$('#myModal').modal('show');
				setTimeout(function(){
					window.location.reload();
				},500)
			}else{
				$("#ajaxMsg").text("删除失败");
				$('#myModal').modal('show');
			}
		})
		.fail(function() {
			$("#ajaxMsg").text("网络异常，删除失败");
			$('#myModal').modal('show');
		})
		return false;		
	});


});

