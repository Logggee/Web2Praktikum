function loggingin(){
    var meta_user="admin";
    var meta_pw="admin";
    var user=document.getElementById("inputuser").value;
    var password=document.getElementById("inputpassword").value

    if(meta_user==user && meta_pw==password){
      //weiterleitung auf produktverwaltung.html
      //window.alert(window.location.href);
      //window.location.assign("produktverwaltung.html")
    }
    else{
      window.alert("Falsche Logindaten");
      //window.location.href("http://www.google.de")
    }

}