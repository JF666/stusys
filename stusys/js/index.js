function login() {
    var user=$("#input1").val();
    if($("#input1").val()===""||$("#input2").val()===""){
        alert("用户名或密码未填写");
    }
    else {
        $.ajax({
            url: "http://www.cspy.online:8080/CSServlet_war/UserServlet?type=search",
            data:{username:user},
            dataType:"json",
            async:false,
            success:function (msg) {
                if(msg.result==="成功"){
                    if($("#input2").val()===msg.data[0].password){
                        alert("登录成功");
                        $("#input1").val("");
                        $("#input2").val("");
                        localStorage.setItem("username",user);
                        window.location.href="content.html";
                    }
                    else {
                        alert("登录失败");
                        $("#input1").val("");
                        $("#input2").val("");
                    }
                }
                else {
                    alert("无此用户");
                    $("#input1").val("");
                    $("#input2").val("");
                }
            },
            error:function () {
                alert("连接失败");
                $("#input1").val("");
                $("#input2").val("");
            }
        });
    }
}
function reset() {
    $("#input1").val("");
    $("#input2").val("");
}