$(function() {
    $(".form").hide();
    $(".table_cla").hide();
    var username = localStorage.getItem("username");
    $(".username").html(username);
    localStorage.removeItem('username');
    var m = new Map();
    $.ajax({
        url: "http://www.cspy.online:8080/CSServlet_war/ClassServlet?type=sAll",
        type: 'post',
        dataType: 'json',
        async:false,
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
    $.ajax({
		url : "http://www.cspy.online:8080/CSServlet_war/StudentServlet?type=sAll",
		type : 'post',
		dataType: 'json',
		data: "{}",
		success : function(response){
            var data = response.data;
            for (i in data) {
                var tr=document.createElement("tr");
                var td1=document.createElement("td");
                td1.innerHTML=data[i].studentid;
                tr.appendChild(td1);
                var td2=document.createElement("td");
                td2.innerHTML=data[i].studentname;
                tr.appendChild(td2);
                var td3=document.createElement("td");
                td3.innerHTML=data[i].sex;
                tr.appendChild(td3);
                var td4=document.createElement("td");
                if(data[i].classid==="null"){
                    td4.innerHTML="班级未确定，请修改";
                    td4.style.color='red';
                }
                else if(m[data[i].classid]===undefined){
                    td4.innerHTML="班级对照表已失效，请刷新界面";
                    td4.style.color='red';
                }
                else{
                    td4.innerHTML=m[data[i].classid];
                }
                tr.appendChild(td4);
                var td5=document.createElement("td");
                td5.innerHTML=new Date(parseInt(data[i].registertime)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
                tr.appendChild(td5);
                var td6=document.createElement("td");
                var btn1=document.createElement("button");
                var span1=document.createElement("span");
                btn1.type = "button";
                btn1.setAttribute("class","btn btn-warning btn-sm");
                btn1.id = data[i].studentid;
                btn1.value = data[i].studentid;
                btn1.onclick = function () {updatestu(this);};
                span1.setAttribute("class","glyphicon glyphicon-pencil");
                span1.innerHTML="修改";
                btn1.appendChild(span1);
                td6.appendChild(btn1);
            	var btn2=document.createElement("button");
                var span2=document.createElement("span");
                btn2.type = "button";
                btn2.setAttribute("class","btn btn-danger btn-sm");
                btn2.id = data[i].studentid;
                btn2.value = data[i].studentid;
                btn2.onclick = function () {removestu(this);};
                span2.setAttribute("class","glyphicon glyphicon-remove");
                span2.innerHTML="删除";
                btn2.appendChild(span2);
                td6.appendChild(btn2);
                tr.appendChild(td6);
                $("#tbody-result").append(tr);
            }
            var tr1=document.createElement("tr");
            var td7=document.createElement("td");
            tr1.setAttribute("class","plus");
            td7.setAttribute("colspan","6");
            var btn3=document.createElement("button");
            var span3=document.createElement("span");
            btn3.type = "button";
            btn3.setAttribute("class","btn btn-info btn-sm");
            btn3.id = "btn-add";
            btn3.onclick = function(){addstu();};
            span3.setAttribute("class","glyphicon glyphicon-plus");
            span3.innerHTML="添加";
            btn3.appendChild(span3);
            td7.appendChild(btn3);
            var btn4=document.createElement("button");
            btn4.type = "button";
            btn4.setAttribute("class","btn btn-info btn-sm totop");
            btn4.id = "btn-add";
            btn4.onclick = function(){
                window.scrollTo(0,0);
            }
            btn4.innerHTML="返回顶部";
            td7.appendChild(btn4);
            tr1.appendChild(td7);
            $("#tbody-result").append(tr1);
        },
        error: function() {
        }
	});
})
function stab() {
    window.location.href="content.html";
}
function updatestu(obj) {
    var input1=document.createElement("input");
    input1.type="text";
    input1.style.width="100%";
    input1.value=$(obj).parent().parent().find("td").eq(1).text();
    $(obj).parent().parent().find("td").eq(1).html(input1);
    var select1=document.createElement("select");
    select1.style.width="100%";
    select1.id="select";
    var option1=document.createElement("option");
    option1.innerText="男";
    option1.id="op1";
    var option2=document.createElement("option");
    option2.innerText="女";
    option2.id="op2";
    select1.appendChild(option1);
    select1.appendChild(option2);
    if($(obj).parent().parent().find("td").eq(2).text()==="男"){
        select1.options[0].selected=true;
    }
    else {
        select1.options[1].selected=true;
    }
    $(obj).parent().parent().find("td").eq(2).html(select1);
    var select2=document.createElement("select");
    select2.style.width="100%";
    select2.id="selector";
    var deval=$(obj).parent().parent().find("td").eq(3).text();
    $.ajax({
        url: "http://www.cspy.online:8080/CSServlet_war/ClassServlet?type=sAll",
        type: 'post',
        dataType: 'json',
        data: "{}",
        success: function (response) {
            var data = response.data;
            for (i in data) {
                var option=document.createElement("option");
                option.setAttribute("value",data[i].classid);
                option.innerText=data[i].classname;
                select2.appendChild(option);
                if(deval===data[i].classname){
                    select2.options[i].selected=true;
                }
            }
        },
        error: function () {
        }
    })
    select2.style.color='black';
    $(obj).parent().parent().find("td").eq(3).html(select2);
    var td = document.createElement("td");
    var btn1=document.createElement("button");
    var span1=document.createElement("span");
    btn1.type = "button";
    btn1.setAttribute("class","btn btn-info btn-sm");
    btn1.id = "submit";
    btn1.onclick = function () {submit1(this);};
    span1.setAttribute("class","glyphicon glyphicon-ok");
    span1.innerHTML="提交";
    btn1.appendChild(span1);
    td.appendChild(btn1);
    var btn2=document.createElement("button");
    var span2=document.createElement("span");
    btn2.type = "button";
    btn2.setAttribute("class","btn btn-danger btn-sm");
    btn2.id = "cancel";
    btn2.onclick = function () {cancel1();};
    span2.setAttribute("class","glyphicon glyphicon-remove");
    span2.innerHTML="取消";
    btn2.appendChild(span2);
    td.appendChild(btn2);
    $(obj).parent().parent().append(td);
    $(obj).parent().hide();
}
function submit1(obj) {
    var sname=$(obj).parent().parent().find("input").eq(0).val();
    var cid=$("#selector option:selected").val();
    var sexx=$("#select option:selected").val();
    var sid=$(obj).parent().parent().find("td").eq(0).text();
    $.ajax({
        url: "http://www.cspy.online:8080/CSServlet_war/StudentServlet?type=update",
        type: 'post',
        dataType: 'json',
        data: {studentname:sname, classid:cid, sex:sexx, studentid:sid},
        success: function (response) {
            if(response.result==="成功"){
                alert(response.result);
                location.reload();
            }
            else{
                alert("修改失败");
            }
        },
        error: function () {
            alert("连接服务器失败");
        }
    })
}
function cancel1() {
    window.location.href="content.html";
}
function removestu(obj) {
    if(confirm('确定删除吗？')) {
        $.ajax({
            url: "http://www.cspy.online:8080/CSServlet_war/StudentServlet?type=delete",
            type: 'post',
            dataType: 'json',
            data: {studentid: $(obj).attr("id")},
            success: function () {
                $(obj).parent().parent().hide(1000, function () {
                    $(obj).parent().parent().remove();
                });
            },
            error: function () {
            }
        })
        return true;
    }
    else{
        return false;
    }
}
function addstu(){
	$("#btn-add").attr("disabled","disabled");
	var tr=document.createElement("tr");
    var td=document.createElement("td");
    var br=document.createElement("br");
    tr.setAttribute("class","add");
    td.setAttribute("colspan","6");
    var label1=document.createElement("label");
    label1.innerHTML="添加的学生信息：";
    td.appendChild(label1);
    td.appendChild(br);
    var label2=document.createElement("label");
    label2.innerHTML="姓名：";
    td.appendChild(label2);
    var input1=document.createElement("input");
    input1.type="text";
    input1.setAttribute("class","form-control");
    input1.id="addams";
    td.appendChild(input1);
    var label3=document.createElement("label");
    label3.innerHTML="班级：";
    td.appendChild(label3);
    var input2=document.createElement("input");
    input2.type="text";
    input2.setAttribute("class","form-control");
    input2.id="acid";
    td.appendChild(input2);
    var label4=document.createElement("label");
    label4.innerHTML="性别：";
    td.appendChild(label4);
    var input3=document.createElement("input");
    input3.type="text";
    input3.setAttribute("class","form-control");
    input3.id="adder";
    td.appendChild(input3);
    var btn1=document.createElement("button");
    var span1=document.createElement("span");
    btn1.type = "button";
    btn1.setAttribute("class","btn btn-info btn-sm");
    btn1.id = "submit";
    btn1.onclick = function () {sub();};
    span1.setAttribute("class","glyphicon glyphicon-ok");
    span1.innerHTML="提交";
    btn1.appendChild(span1);
    td.appendChild(btn1);
    var btn2=document.createElement("button");
    var span2=document.createElement("span");
    btn2.type = "button";
    btn2.setAttribute("class","btn btn-danger btn-sm");
    btn2.id = "cancel";
    btn2.onclick = function () {cancel();};
    span2.setAttribute("class","glyphicon glyphicon-remove");
    span2.innerHTML="取消";
    btn2.appendChild(span2);
    td.appendChild(btn2);
    tr.appendChild(td);
    $("#tbody-result").append(tr);
}
function sub(){
    var mydate = new Date();
    var mytime=mydate.getTime();
	if($("#addams").val()===""||$("#acid").val()===""||$("#adder").val()===""){
		alert("请填写完整的信息");
	}
	else{
        var map = new Map();
        $.ajax({
            url: "http://www.cspy.online:8080/CSServlet_war/ClassServlet?type=sAll",
            type: 'post',
            dataType: 'json',
            async: false,
            data: "{}",
            success: function (response) {
                var data = response.data;
                for (i in data) {
                    var key=data[i].classname;
                    map[key]=data[i].classid;
                }
            },
            error: function () {
            }
        })
        $.ajax({
			url : "http://www.cspy.online:8080/CSServlet_war/StudentServlet?type=insert",
			type : 'post',
			dataType: 'json',
			data: {studentname:$("#addams").val(),classid:map[$("#acid").val()],sex:$("#adder").val(),registertime:mytime},
			success : function(response){
	            var result = response.result;
                alert(result);
	            location.reload();
            },
	        error: function() {
	        	alert("添加失败");
	        	$("#addams").val("");
                $("#acid").val("");
                $("#adder").val("");
	        }
	    })
	}
}
function cancel(){
	$(".add").remove();
	$("#btn-add").attr("disabled",false);
}