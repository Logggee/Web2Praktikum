document.addEventListener("DOMContentLoaded", () =>
{
    const button = document.getElementById("reservieren");
    button.addEventListener('click', async() => 
    {
        try
        {
            if (Produkte.length !== 0) {
                console.log('Button clicked!');
                const response = await fetch('/api/v1/warenkorb',
                {
                    method: 'POST',
                    headers:
                    {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({"Produkte" : Produkte})
                });
    
                localStorage.removeItem('Produkte');
                Produkte = [];
    
                const status = await response.status;
                const statusText = await response.text();
                console.log(status, statusText);
            }
            else {
                alert("Sie haben keine Produkte im Warenkorb.\nZum Reservieren fügen Sie bitte zuerst Produkte hinzu!");
            }
        }

        catch (error)
        {
            console.error(error);
        }
    });

    document.getElementById("reservieren").addEventListener("click", function() {
        // Das Modal-Element wird gesucht und die Methode modal('hide') wird ausgeführt, um es zu schließen
        var modal = document.getElementById("staticBackdrop");
        var modalObj = bootstrap.Modal.getInstance(modal);
        modalObj.hide();
        closeCart();
    });
});

var Produkte = [];
let JSONString;
let elementLi = '<li class="list-group-item d-flex justify-content-between align-items-start">' +
                    '<div class="ms-2 me-auto">' +
                        '<div class="fw-bold" id="productName"></div>' +
                    '</div>' +
                    '<span class="badge bg-primary rounded-pill" id="productQuantity"></span>' +
                '</li>'

function addProduct(id, mengeId) {
    console.log("Test");
    var JSONString = localStorage.getItem("Produkte");

    if (JSONString !== null) {
        Produkte = JSON.parse(JSONString);
    }
    
    let name = document.getElementById(id).innerHTML;
    let menge = parseInt(document.getElementById(mengeId).value);
    let product = {id: id, name: name ,menge: menge}; // Neues Produkt mit Namen und Menge als JSON-Objekt erstellen
    Produkte.push(product); // Produkt zum Array hinzufügen
    console.log(Produkte); // Warenkorb im Console-Log anzeigen

    for (var i = 0; i < Produkte.length; i++) {
        for (var j = i+1; j < Produkte.length; j++) {
            if (Produkte[i].name === Produkte[j].name) {
                Produkte[i].menge = parseInt(Produkte[i].menge) + parseInt(Produkte[j].menge);
                Produkte.splice(j, j);
            }
        }
    }

    var JSONString = JSON.stringify(Produkte);
    localStorage.setItem("Produkte", JSONString);
}

function outputCart() {
        var JSONString = localStorage.getItem("Produkte");

        if (JSONString !== null) {
            Produkte = JSON.parse(JSONString);
        }
		// HTML-Element auswählen, an dem die Liste angezeigt werden soll
		var produktListe = document.getElementById('cart');

		// Schleife durchläuft jedes Produkt und fügt es der Liste hinzu
        for (var i = 0; i < Produkte.length; i++) {
			var product = Produkte[i];
			var listenElement = document.createElement('li');
            listenElement.innerHTML = elementLi;
            produktListe.appendChild(listenElement);

            document.getElementById('productName').id = "productName" + product.id;
            document.getElementById("productQuantity").id = "productQuantity" + product.id;

            var element = document.getElementById("productName" + product.id);
            element.innerHTML = product.name;
            element = document.getElementById("productQuantity" + product.id);
            element.innerHTML = "Menge: " + product.menge;
        }
}

function closeCart() {
    var produktListe = document.getElementById('cart');
    produktListe.innerHTML = "";
}