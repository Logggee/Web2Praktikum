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

                //checkForm() überprüft ob alles im Forular ausgefüllt wurde
                if(checkForm())
                {
                    const productName = document.getElementById("inputname").value;                 //Produktnamen holen
                    const picPath = document.getElementById("inputpic").value;
                    const productText = document.getElementById("inputtext").value;                 //Beschreibungstext holen
                    const productQuantity = document.getElementById("inputquantity").value;         //Bestandsmenge holen
                    const selectedRadio = document.querySelector('input[name="btnradio"]:checked'); //Herausfinden welcher Radio gesetzt wurde
                    const selectedLabel = document.querySelector(`label[for="${selectedRadio.id}"]`);
                    const unit = selectedLabel.innerText;

                    console.log(productName);
                    console.log(productText);
                    console.log(unit);
                    console.log(productQuantity);

                    //Alle Daten in den Post Request verpacken und schicken
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
                            'picPath': picPath,
                            'text': productText,
                            'unit':  unit,
                            'quantity': productQuantity
                            })
                    });

                    //Alle Felder im Formular wieder zurücksetzen
                    document.getElementById("inputname").value = "";                 //Produktnamen zurücksetzen
                    document.getElementById("inputtext").value = "";                 //Beschreibungstext zurücksetzen
                    document.getElementById("btnradio1").checked = true;             //Radio zurücksetzen
                    document.getElementById("inputquantity").value = "";             //Bestandsmenge zurücksetzen
                    document.getElementById("inputname").style.backgroundColor = "white";       //backgoundcolor zurücksetzen
                    document.getElementById("inputtext").style.backgroundColor = "white";       //backgoundcolor zurücksetzen
                    document.getElementById("inputquantity").style.backgroundColor = "white";   //backgoundcolor zurücksetzen
                    document.getElementById("inputpic").style.backgroundColor = "white";

                    //Response in der Konsole ausgeben
                    const status = await response.status;
                    const statusText = await response.text();
                    console.log(status, statusText);
                    location.reload()
                }

                else
                {
                    console.log("Ein fehler im Formular ist aufgetreten");
                }
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
      const quantity = document.getElementById("menge" + id).value;
      const response = await fetch(`/api/v1/produkte/aendern/${id}?quantity=${quantity}`, 
      { 
        method: 'PATCH' 
      });
      const status = await response.status;
      const statusText = await response.text();
      console.log(status, statusText);
      location.reload()
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
        location.reload()
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
                                        '<img class="bilderAkordion" src="" alt="Ei" id="productPic">' +
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
        console.log(product);
		let accordionElement = document.createElement('div');
        accordionElement.innerHTML = elementAccordion;
        accordion.appendChild(accordionElement);

        document.getElementById("id").id = product.produkt_id;
        document.getElementById("flush-collapse").id = "flush-collapse" + product.produkt_id;
        document.getElementById(product.produkt_id).setAttribute("data-bs-target", ("#flush-collapse" + product.produkt_id));
        document.getElementById("productPic").id = "productPic" + product.produkt_id;
        document.getElementById("info").id = "info" + product.produkt_id;
        document.getElementById("einheit").id = "einheit" + product.produkt_id;
        document.getElementById("menge").id = "menge" + product.produkt_id;
        document.getElementById("buttonChange").id = "buttonChange" + product.produkt_id;
        document.getElementById("buttonDelete").id = "buttonDelete" + product.produkt_id;
        document.getElementById("buttonChange" + product.produkt_id).setAttribute("onclick", ("changeProduct('" + product.produkt_id + "')"));
        document.getElementById("buttonDelete" + product.produkt_id).setAttribute("onclick", ("deleteProduct('" + product.produkt_id + "')"));
        

        let element = document.getElementById(product.produkt_id);
        element.innerHTML = product.name;
        element = document.getElementById("productPic" + product.produkt_id);
        element.src = "../Bilder/" + product.bild;
        element = document.getElementById("info" + product.produkt_id);
        element.innerHTML = product.beschreibung;
        element = document.getElementById("menge" + product.produkt_id);
        element.setAttribute("value", product.lagermenge);
    }
}

function checkForm()
{
    let formValid = true;
    var regex = /^[a-zA-Z0-9]+\.(jpg|jpeg|png|gif)$/;

    if(document.getElementById("inputname").value == "")
    {
        window.alert("Bitte einen Namen für das Produkt vergeben");
        document.getElementById("inputname").style.backgroundColor = "red";
        formValid = false;
    }

    if(document.getElementById("inputpic").value == "")
    {
        window.alert("Bitte ein Bilddateinamen Eingeben");
        document.getElementById("inputpic").style.backgroundColor = "red";
        formValid = false;
    }

    else if(!regex.test(document.getElementById("inputpic").value))
    {
        window.alert("Bitte ein Gültiges Bilddateiformat eingeben");
        document.getElementById("inputpic").style.backgroundColor = "red";
        formValid = false;
    }

    if(document.getElementById("inputtext").value == "")
    {
        window.alert("Bitte eine Beschreibung für das Produkt vergeben");
        document.getElementById("inputtext").style.backgroundColor = "red";
        formValid = false;
    }

    if(document.getElementById("inputquantity").value == "")
    {
        window.alert("Bitte eine Bestandmenge für das Produkt vergeben");
        document.getElementById("inputquantity").style.backgroundColor = "red";
        formValid = false;
    }

    return formValid;
}