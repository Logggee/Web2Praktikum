function loggingin(){
    var meta_user="admin";
    //geheimespasswort01
    var meta_pw="c9ac4148ff27d4a045d6d41de2af3fbe";
    var user=document.getElementById("inputuser").value;
    var password=document.getElementById("inputpassword").value;
    var weiterleitung="cHJvZHVrdHZlcndhbHR1bmcuaHRtbA==";    
    

    if(meta_user==user && meta_pw==md5(password))
    {
      //weiterleitung auf produktverwaltung.html
      //codiert in Base64
      window.location.href=atob(weiterleitung);
      document.getElementById("inputuser").style.backgroundColor = "white";
      document.getElementById("inputpassword").style.backgroundColor = "white";
    }

    else if(meta_user != user)
    {
      document.getElementById("inputuser").style.backgroundColor = "red";
      window.alert("Falscher Benutzername");
    }

    else
    {
      document.getElementById("inputpassword").style.backgroundColor = "red";
      window.alert("Falsches Passwort");
    }
}