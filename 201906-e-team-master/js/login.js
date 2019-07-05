function login(){
  var id = document.getElementById("ID").value;
  var pass = document.getElementById("pass").value;
  $.ajax({
    url:"http://18.221.70.230:8080/login/"+id,
    data:{
      //name:id
      },
    success:function(data){
      if(data==pass){
        location.href = "index.html";
      }else if(data==""){
        document.getElementById("message").innerHTML="ユーザー名が登録されていません"
      }
      else{
        document.getElementById("message").innerHTML="パスワードが違います"
      }
    }
  })
  //location.href = "index.html";
}
