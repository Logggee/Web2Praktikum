document.addEventListener("DOMContentLoaded", () =>
{
    const button = document.getElementById("reservieren");
    button.addEventListener('click', async() => 
    {
        try
        {
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

            const status = await response.status;
            const statusText = await response.text();
            console.log(status, statusText);
        }

        catch (error)
        {
            console.error(error);
        }
    });
});

let Produkte = [];

function addProduct(name, id) {
    let menge = document.getElementById(id).value;

    let product = {name: name, menge: menge }; // Neues Produkt mit Namen und Menge als JSON-Objekt erstellen
    Produkte.push(product); // Produkt zum Array hinzufügen
    console.log(Produkte); // Warenkorb im Console-Log anzeigen
}

function outputCart() {
		// JSON-Array in ein JavaScript-Array parsen
		// HTML-Element auswählen, an dem die Liste angezeigt werden soll
		var produktListe = document.getElementById('cart');

		// Schleife durchläuft jedes Produkt und fügt es der Liste hinzu
		for (var i = 0; i < Produkte.length; i++) {
			var product = Produkte[i];
			var productName = product.name;
			var productMenge = product.menge;
			var listenElement = document.createElement('li');
			listenElement.innerHTML = productName + ', Menge:' + productMenge;
			produktListe.appendChild(listenElement);
		}
}

function closeCart() {
    var produktListe = document.getElementById('cart');
    produktListe.innerHTML = "";
}

function deleteProduct() {
    var produkt = document.getElementById(this.id);
    produkt 
}