function cdata() {
    $(".form").hide();
    $(".table").hide();
    $(".table_cla").show();
    $(".active").removeClass();
}
$(function () {
	$.ajax({
		url : "http://www.cspy.online:8080/CSServlet_war/ClassServlet?type=sAll",
		type : 'post',
		dataType: 'json',
		data: "{}",
		success : function(response){
            var data = response.data;
            for (i in data) {
                var tr=document.createElement("tr");
                var td1=document.createElement("td");
                td1.innerHTML=data[i].classid;
                tr.appendChild(td1);
                var td2=document.createElement("td");
                td2.innerHTML=data[i].classname;
                tr.appendChild(td2);
                var td3=document.createElement("td");
                td3.innerHTML=new Date(parseInt(data[i].opentime)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
                tr.appendChild(td3);
                var td4=document.createElement("td");
                // var btn3=document.createElement("button");
                // var span3=document.createElement("span");
                // btn3.type = "button";
                // btn3.setAttribute("class","btn btn-warning btn-sm");
                // btn3.id = data[i].classid;
                // btn3.value = data[i].classid;
                // btn3.onclick = function () {updatecla(this);};
                // span3.setAttribute("class","glyphicon glyphicon-pencil");
                // span3.innerHTML="修改";
                // btn3.appendChild(span3);
                // td4.appendChild(btn3);
                var btn1=document.createElement("button");
                var span1=document.createElement("span");
                btn1.type = "button";
                btn1.setAttribute("class","btn btn-danger btn-sm");
                btn1.id = data[i].classid;
                btn1.value = data[i].classid;
                btn1.onclick = function () {removecla(this);};
                span1.setAttribute("class","glyphicon glyphicon-remove");
                span1.innerHTML="删除";
                btn1.appendChild(span1);
                td4.appendChild(btn1);
                tr.appendChild(td4);
                $("#tbody-result-cla").append(tr);
            }
            var tr1=document.createElement("tr");
            var td5=document.createElement("td");
            tr1.setAttribute("class","plus");
            td5.setAttribute("colspan","4");
            var btn2=document.createElement("button");
            var span2=document.createElement("span");
            btn2.type = "button";
            btn2.setAttribute("class","btn btn-info btn-sm");
            btn2.id = "btn-add";
            btn2.onclick = function(){addcla();};
            span2.setAttribute("class","glyphicon glyphicon-plus");
            span2.innerHTML="添加";
            btn2.appendChild(span2);
            td5.appendChild(btn2);
            tr1.appendChild(td5);
            $("#tbody-result-cla").append(tr1);
        },
        error: function() {
        }
	});
})
function addcla(){
    $("#btn-add").attr("disabled","disabled");
    var tr=document.createElement("tr");
    var td=document.createElement("td");
    var br=document.createElement("br");
    tr.setAttribute("class","add");
    td.setAttribute("colspan","4");
    var label1=document.createElement("label");
    label1.innerHTML="添加的班级信息：";
    td.appendChild(label1);
    td.appendChild(br);
    var label2=document.createElement("label");
    label2.innerHTML="班级名：";
    td.appendChild(label2);
    var input1=document.createElement("input");
    input1.type="text";
    input1.setAttribute("class","form-control");
    input1.id="acne";
    td.appendChild(input1);
    var btn1=document.createElement("button");
    var span1=document.createElement("span");
    btn1.type = "button";
    btn1.setAttribute("class","btn btn-info btn-sm");
    btn1.id = "submit";
    btn1.onclick = function () {sub1();};
    span1.setAttribute("class","glyphicon glyphicon-ok");
    span1.innerHTML="提交";
    btn1.appendChild(span1);
    td.appendChild(btn1);
    var btn2=document.createElement("button");
    var span2=document.createElement("span");
    btn2.type = "button";
    btn2.setAttribute("class","btn btn-danger btn-sm");
    btn2.id = "cancel";
    btn2.onclick = function () {cancel(this.value);};
    span2.setAttribute("class","glyphicon glyphicon-remove");
    span2.innerHTML="取消";
    btn2.appendChild(span2);
    td.appendChild(btn2);
    tr.appendChild(td);
    $("#tbody-result-cla").append(tr);
}
function sub1(){
    var mate = new Date();
    var mime=mate.getTime();
    if($("#acne").val()===""){
        alert("请填写完整的信息");
    }
    else{
        var acne=$("#acne").val();
        $.ajax({
            url : "http://www.cspy.online:8080/CSServlet_war/ClassServlet?type=insert",
            type : 'post',
            dataType: 'json',
            data: {classname:acne,opentime:mime},
            success : function(response){
                var data = response.data;
                alert(response.result);
                $(".plus").remove();
                $(".add").remove();
                var tr_n=document.createElement("tr");
                var td_1=document.createElement("td");
                td_1.innerHTML=data;
                tr_n.appendChild(td_1);
                var td_2=document.createElement("td");
                td_2.innerHTML=acne;
                tr_n.appendChild(td_2);
                var td_3=document.createElement("td");
                td_3.innerHTML=new Date(parseInt(mime)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
                tr_n.appendChild(td_3);
                var td_4=document.createElement("td");
                var btn1=document.createElement("button");
                var span1=document.createElement("span");
                btn1.type = "button";
                btn1.setAttribute("class","btn btn-danger btn-sm");
                btn1.id = data;
                btn1.value = data;
                btn1.onclick = function () {removecla(this);};
                span1.setAttribute("class","glyphicon glyphicon-remove");
                span1.innerHTML="删除";
                btn1.appendChild(span1);
                td_4.appendChild(btn1);
                tr_n.appendChild(td_4);
                $("#tbody-result-cla").append(tr_n);
                var tr1=document.createElement("tr");
                var td5=document.createElement("td");
                tr1.setAttribute("class","plus");
                td5.setAttribute("colspan","4");
                var btn2=document.createElement("button");
                var span2=document.createElement("span");
                btn2.type = "button";
                btn2.setAttribute("class","btn btn-info btn-sm");
                btn2.id = "btn-add";
                btn2.onclick = function(){addcla();};
                span2.setAttribute("class","glyphicon glyphicon-plus");
                span2.innerHTML="添加";
                btn2.appendChild(span2);
                td5.appendChild(btn2);
                tr1.appendChild(td5);
                $("#tbody-result-cla").append(tr1);
            },
            error: function() {
                alert("已存在");
                $("#acne").val("");
            }
        })
    }
}
function cancel(){
    $(".add").remove();
    $("#btn-add").attr("disabled",false);
}
// function updatecla(obj) {
//
// }
function removecla(obj) {
    if(confirm('确定删除吗？')) {
        $.ajax({
            url: "http://www.cspy.online:8080/CSServlet_war/ClassServlet?type=delete",
            type: 'post',
            dataType: 'json',
            data: {classid: $(obj).attr("id")},
            success: function (response) {
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