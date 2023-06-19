function loggingin(){ //login für Userbereich
    var meta_user="admin";  //username
    //geheimespasswort01
    var meta_pw="c9ac4148ff27d4a045d6d41de2af3fbe"; //md5 hash des passworts
    var user=document.getElementById("inputuser").value;
    var password=document.getElementById("inputpassword").value;
    var weiterleitung="cHJvZHVrdHZlcndhbHR1bmcuaHRtbA=="; //base 64   
    

    if(meta_user==user && meta_pw==md5(password)) //user und passwort wird md5 gehashed
    {
      //weiterleitung auf produktverwaltung.html
      //codiert in Base64
      window.location.href=atob(weiterleitung); //rücktransormation von base64
      document.getElementById("inputuser").style.backgroundColor = "white"; //nach richtiger eingabe wieder weißer hintergrund 
      document.getElementById("inputpassword").style.backgroundColor = "white";
    }

    else if(meta_user != user)  //falscher username
    {
      document.getElementById("inputuser").style.backgroundColor = "red";
      window.alert("Falscher Benutzername");
    }

    else  //falsches passwort
    {
      document.getElementById("inputpassword").style.backgroundColor = "red";
      window.alert("Falsches Passwort");
    }
}