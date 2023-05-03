document.addEventListener("DOMContentLoaded", async() =>
{
    try 
    {
        //Load all Products when DOM is Loaded
        console.log("Alle Produkte geladen")
        const response = await fetch("/api/v1/produkte/alle");
        const data = await response.json();
        console.log(data);
        generateAccordionOwner(data);

        const buttonAddProduct = document.getElementById("addNewProduct");

        //Fetch um ein neues Produkt hinzuzufügen
        buttonAddProduct.addEventListener('click', async() => 
        {
            try
            {
                console.log('Produkt hinzufügen');
                productName = document.getElementById("inputname");
                productText = document.getElementById("inputtext");
                productQuantity = document.getElementById("inputquantity");
                allId = await fetch("/api/v1/produkte/id/alle");
                //Hier muss Code kommen der die erste verfügbare id in allId Array findet
                const response = await fetch("/api/v1/produkte/hinzufuegen",
                {
                    method: 'POST',
                    headers:
                    {
                        Accept: 'application.json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {'name': productName, 
                        'text': productText, 
                        'quantity': productQuantity
                        })
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
    } 

    catch (error) 
    {
        console.error(error);
    }

    document.getElementById("addNewProduct").addEventListener("click", function() 
    {
        // Das Modal-Element wird gesucht und die Methode modal('hide') wird ausgeführt, um es zu schließen
        var modal = document.getElementById("modalProduct");
        var modalObj = bootstrap.Modal.getInstance(modal);
        modalObj.hide();
    });
});

//Fetch für Bestandsmenge ändern
async function changeProduct(id) 
{
    try {
      console.log('Produkt ändern');
      const response = await fetch(`/api/v1/produkte/aendern/${id}`, 
      { 
        method: 'PATCH' 
      });
      const status = await response.status;
      const statusText = await response.text();
      console.log(status, statusText);
    } 
    
    catch (error) 
    {
      console.error(error);
    }
}
  
//Fetch um Produkt zu löschen
async function deleteProduct(id)
{
    try
    {
        console.log('Produkt löschen');
        const response = await fetch(`/api/v1/produkte/loeschen/${id}`,
        {
            method: 'DELETE'
        });
        const status = await response.status;
        const statusText = await response.text();
        console.log(status, statusText);
    }

    catch (error)
    {
        console.error(error);
    }
}

//Generieren des Akkordions der Produktverwaltung
function generateAccordionOwner(data) 
{
    let elementAccordion = '<div class="accordion accordion-flush" id="accordionFlushExample">' +
                            '<div class="accordion-item">' +
                                '<h2 class="accordion-header">' +
                                    '<button id="id" class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse" aria-expanded="false" aria-controls="flush-collapseOne"></button>' +
                                '</h2>' +
                                '<div id="flush-collapse" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">' +
                                    '<div class="akordionInhalt">' +
                                        '<img class="bilderAkordion" src="../Bilder/apfel.jpg" alt="Ei">' +
                                        '<a id="info">Frische Äpfel von den eigenen Obstwiesen</a>' +
                                            '<div class="inputDiv">' +
                                                '<label id="einheit" class="labelInput"></label>' +
                                                '<input type="number" id="menge" name="menge" value="1" min="1" class="input">' +
                                            '</div>' +
                                        '<button type="submit" class="editButton" id="buttonChange">Ändern</button>' +
                                        '<button type="submit" class="deleteButton" id="buttonDelete">Löschen</button>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>'

    let accordion = document.getElementById("main");

    for (let i = 0; i < data.length; i++) 
    {
        let product = data[i];
		let accordionElement = document.createElement('div');
        accordionElement.innerHTML = elementAccordion;
        accordion.appendChild(accordionElement);

        document.getElementById("id").id = product.produkt_id;
        document.getElementById("flush-collapse").id = "flush-collapse" + product.produkt_id;
        document.getElementById(product.produkt_id).setAttribute("data-bs-target", ("#flush-collapse" + product.produkt_id));
        document.getElementById("info").id = "info" + product.produkt_id;
        document.getElementById("einheit").id = "einheit" + product.produkt_id;
        document.getElementById("menge").id = "menge" + product.produkt_id;
        document.getElementById("buttonChange").id = "buttonChange" + product.produkt_id;
        document.getElementById("buttonDelete").id = "buttonDelete" + product.produkt_id;
        document.getElementById("buttonChange" + product.produkt_id).setAttribute("onclick", ("changeProduct('" + product.produkt_id + "')"));
        document.getElementById("buttonDelete" + product.produkt_id).setAttribute("onclick", ("deleteProduct('" + product.produkt_id + "')"));
        

        let element = document.getElementById(product.produkt_id);
        element.innerHTML = product.name;
        element = document.getElementById("info" + product.produkt_id);
        element.innerHTML = product.beschreibung;
        element = document.getElementById("menge" + product.produkt_id);
        element.setAttribute("value", product.lagermenge);
    }
}