var m = new Map();
function search(){
    $(".table").hide();
    $(".table_cla").hide();
    $(".form").show();
    $(".active").removeClass();
    $.ajax({
        url: "http://www.cspy.online:8080/CSServlet_war/ClassServlet?type=sAll",
        type: 'post',
        dataType: 'json',
        data: "{}",
        success: function (response) {
            var data = response.data;
            for (i in data) {
                var key=data[i].classid;
                m[key]=data[i].classname;
            }
        },
        error: function () {
        }
    })
}
function search1(){
    if($("#searchsid").val()===""){
        alert("未填写学号，无法查询");
    }
    else {
        $.ajax({
            url : "http://www.cspy.online:8080/CSServlet_war/StudentServlet?type=sId",
            type : 'post',
            dataType: 'json',
            data: {studentid:$("#searchsid").val()},
            success : function(response){
                var data = response.data;
                var result = response.result;
                if(result==="成功"){
                    var time=new Date(parseInt(data[0].registertime)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
                    alert("查询结果："+"\n"+
                        "学号："+data[0].studentid+"\n"+
                        "姓名："+data[0].studentname+"\n"+
                        "性别："+data[0].sex+"\n"+
                        "班级："+m[data[0].classid]+"\n"+
                        "注册时间："+time);

                }
                else{
                    alert(result);
                }
            },
            error: function() {
            }
        });
        $("#searchsid").val("");
    }
}
function search2(){
    if($("#searchsname").val()===""){
        alert("未填写姓名，无法查询");
    }
    else {
        $.ajax({
            url: "http://www.cspy.online:8080/CSServlet_war/StudentServlet?type=sName",
            type: 'post',
            dataType: 'json',
            data: {studentname: $("#searchsname").val()},
            success: function (response) {
                var data = response.data;
                var result = response.result;
                if (result === "成功") {
                    for(i in data){
                        var time=new Date(parseInt(data[i].registertime)).toLocaleString().replace(/年|月/g,"-").replace(/日/g," ");
                        alert("查询结果："+"\n"+
                            "学号："+data[i].studentid+"\n"+
                            "姓名："+data[i].studentname+"\n"+
                            "性别："+data[i].sex+"\n"+
                            "班级："+m[data[i].classid]+"\n"+
                            "注册时间："+time);
                    }
                }
                else {
                    alert(result);
                }
            },
            error: function () {
            }
        });
        $("#searchsname").val("");
    }
}
function search3(){
    if($("#searchcid").val()===""){
        alert("未填写班级号，无法查询");
    }
    else {
        $.ajax({
            url: "http://www.cspy.online:8080/CSServlet_war/ClassServlet?type=sId",
            type: 'post',
            dataType: 'json',
            data: {classid: $("#searchcid").val()},
            success: function (response) {
                var data = response.data;
                var result = response.result;
                if (result === "成功") {
                    var time=new Date(parseInt(data[0].opentime)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
                    alert("查询结果：" + "\n" +
                        "班级号：" + data[0].classid + "\n" +
                        "班级名：" + data[0].classname + "\n" +
                        "注册时间：" + time);
                }
                else {
                    alert(result);
                }
            },
            error: function () {
            }
        });
        $("#searchcid").val("");
    }
}
function search4(){
    if($("#searchcname").val()===""){
        alert("未填写班级名，无法查询");
    }
    else {
        $.ajax({
            url: "http://www.cspy.online:8080/CSServlet_war/ClassServlet?type=sName",
            type: 'post',
            dataType: 'json',
            data: {classname: $("#searchcname").val()},
            success: function (response) {
                var data = response.data;
                var result = response.result;
                if (result === "成功") {
                    var time=new Date(parseInt(data[0].opentime)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
                    alert("查询结果：" + "\n" +
                        "班级号：" + data[0].classid + "\n" +
                        "班级名：" + data[0].classname + "\n" +
                        "注册时间：" + time);
                }
                else {
                    alert(result);
                }
            },
            error: function () {
            }
        });
        $("#searchcname").val("");
    }
}