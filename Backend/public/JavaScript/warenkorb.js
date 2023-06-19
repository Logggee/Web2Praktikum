document.addEventListener("DOMContentLoaded", () =>
{
    const button = document.getElementById("reservieren");

    button.addEventListener('click', async() => 
    {
        if(checkEmail())
        {
            try
            {
                let email = document.getElementById("email").value;

                for (let i = 0; i < Produkte.length; i++)
                {
                    Produkte[i].mail = email;
                }

                if (Produkte.length !== 0) {
                    console.log('Button clicked!');
                    const response = await fetch('/api/v1/warenkorb',
                    {
                        method: 'POST',
                        headers:
                        {
                            Accept: 'application.json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({"Produkte" : Produkte})
                    });
                    
                    localStorage.removeItem('Produkte');
                    Produkte = [];
                    document.getElementById("email").value = "";
        
                    const status = await response.status;
                    const statusText = await response.text();
                    console.log(status, statusText);
                    document.getElementById("email").style.backgroundColor = "white";
                    location.reload()
                }
                else {
                    alert("Sie haben keine Produkte im Warenkorb.\nZum Reservieren fügen Sie bitte zuerst Produkte hinzu!");
                }
            }

            catch (error)
            {
                console.error(error);
            }
        }
    });
    

    //Wenn Reservieren gedrückt wurde soll das Popup geschlossen werden
    document.getElementById("reservieren").addEventListener("click", function() 
    {
        // Das Modal-Element wird gesucht und die Methode modal('hide') wird ausgeführt, um es zu schließen
        var modal = document.getElementById("staticBackdrop");
        var modalObj = bootstrap.Modal.getInstance(modal);
        modalObj.hide();
        closeCart();
    });
});

var Produkte = [];
let JSONString;

function addProduct(id, mengeId) 
{
    warehouseQuantity = parseInt(document.getElementById("bestandsmenge" + id).value);
    reservationQuantity = parseInt(document.getElementById(mengeId).value);

    if(warehouseQuantity >= reservationQuantity) //Prüfen ob mehr reserviert werden soll wie ware vorhanden ist
    {
        var JSONString = localStorage.getItem("Produkte");

        if (JSONString !== null) {
            Produkte = JSON.parse(JSONString);
        }
        
        let mail = "";
        let name = document.getElementById(id).innerHTML;
        let menge = parseInt(document.getElementById(mengeId).value);
        let einheit = document.getElementById("einheitReservierung" + id).innerHTML;
        let product = {id: id, mail: mail, name: name ,menge: menge, einheit: einheit}; // Neues Produkt mit Namen und Menge als JSON-Objekt erstellen
        Produkte.push(product); // Produkt zum Array hinzufügen
        console.log(Produkte); // Warenkorb im Console-Log anzeigen

        for (var i = 0; i < Produkte.length; i++) {     //Falls Produkt bereits im local storage ist soll nur die Menge erhöht werden
            for (var j = i+1; j < Produkte.length; j++) {
                if (Produkte[i].name === Produkte[j].name) {
                    Produkte[i].menge = parseInt(Produkte[i].menge) + parseInt(Produkte[j].menge);
                    Produkte.splice(j, j);
                }
            }
        }

        var JSONString = JSON.stringify(Produkte);
        localStorage.setItem("Produkte", JSONString);
        document.getElementById("bestandsmenge" + id).value = warehouseQuantity - reservationQuantity;  //Reservierte menge lokal von bestandsmenge abziehen
        document.getElementById(mengeId).style.backgroundColor = "white";   //Eventuell Rot Markierte felder wieder auf weiß setzen
        document.getElementById(mengeId).value = 1; //Zu Reservierunde Menge wieder auf 1 setzen
    }

    else
    {
        window.alert("Nicht genügend auf Lager!!!");
        document.getElementById(mengeId).style.backgroundColor = "red";
    }

    
}

function outputCart() 
{
        var JSONString = localStorage.getItem("Produkte");

        if (JSONString !== null) {
            Produkte = JSON.parse(JSONString);
        }
		// HTML-Element auswählen, an dem die Liste angezeigt werden soll
		var produktListe = document.getElementById('cart');
        let elementLi = '<li class="list-group-item d-flex justify-content-between align-items-start">' +
                    '<div class="ms-2 me-auto">' +
                        '<div class="fw-bold" id="productName"></div>' +
                    '</div>' +
                    '<span class="badge bg-primary rounded-pill" id="productQuantity"></span>' +
                    '<button type="button" id="buttonDelete" class="btn badge bg-primary rounded-pill">Löschen</button>'
                '</li>'

		// Schleife durchläuft jedes Produkt und fügt es der Liste hinzu
        for (var i = 0; i < Produkte.length; i++) {
			var product = Produkte[i];
			var listenElement = document.createElement('li');
            listenElement.setAttribute("id", ("productCart" + product.id));
            listenElement.innerHTML = elementLi;
            produktListe.appendChild(listenElement);

            //Anpassen der Id`s 
            document.getElementById('productName').id = "productName" + product.id;
            document.getElementById("productQuantity").id = "productQuantity" + product.id;
            document.getElementById("buttonDelete").id = "buttonDelete" + product.id;

            //Mit Contend befüllen
            var element = document.getElementById("productName" + product.id);
            element.innerHTML = product.name;
            element = document.getElementById("productQuantity" + product.id);
            element.innerHTML = "Menge: " + product.menge;
            document.getElementById("buttonDelete" + product.id).setAttribute("onclick", ("deleteProduct('productCart" + product.id + "','" + product.id + "')"));
        }
}

function closeCart() {
    var produktListe = document.getElementById('cart');
    produktListe.innerHTML = "";
}

function deleteProduct(productCartId, id) 
{
    var produktListe = document.getElementById(productCartId);
    produktListe.innerHTML = "";

    for (var i = 0; i < Produkte.length; i++) 
    {
        if (Produkte[i].id === id) 
        {
            document.getElementById("bestandsmenge" + id).value = parseInt(document.getElementById("bestandsmenge" + id).value) + Produkte[i].menge; //Bestandsmenge wieder erhöhen wenn im Warenkorb gelöscht wird

            if (i === 0) 
            {
                Produkte.splice(0, 1);
                localStorage.removeItem('Produkte');
                var JSONString = JSON.stringify(Produkte);
                localStorage.setItem("Produkte", JSONString);
            }
            else 
            {
                Produkte.splice(i, i);
                localStorage.removeItem('Produkte');
                var JSONString = JSON.stringify(Produkte);
                localStorage.setItem("Produkte", JSONString);
            }
        }
    }
}

function checkEmail()
{
    const element = document.getElementById("email").value;
    const emailFormat = /.+\@.+\..+/;

    if(emailFormat.test(element) == false)
    {
        window.alert("Eingegebene Email hat nicht das richtige Format!");
        document.getElementById("email").style.backgroundColor = "red";
        return false;
    }

    return true;
}