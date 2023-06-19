document.addEventListener("DOMContentLoaded", async() => 
{
    try 
    {
        const response = await fetch("/api/v1/produkte/alle");
        const data = await response.json();
        console.log(data);
        generateAccordion(data);
        var JSONString = localStorage.getItem("Produkte");  //Local Storage auslesen
        var produkte = JSON.parse(JSONString);  //In Json parsen
        for(let i=0; i<produkte.length; i++)    //Alle mengen die im Warenkorb sind von bestandsmengen abziehen
        {
            document.getElementById("bestandsmenge" + produkte[i].id).value = document.getElementById("bestandsmenge" + produkte[i].id).value - produkte[i].menge;
        }
    } 
    catch (error) 
    {
    console.error(error);
    } 
});


function generateAccordion(data) 
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
                                                'Verfügbare Menge:'+
                                                '<input type="number" id="bestandsmenge" name="menge" value="1" min="1" class="output" readonly>' +
                                                '<div id="einheitBestand" class="unitText"></div>' +
                                                'Zu Reservierende Menge:' +
                                                '<label class="labelInput"></label>' +
                                                '<input type="number" id="menge" name="menge" value="1" min="1" class="input">' +
                                                '<div id="einheitReservierung"></div>' +
                                            '</div>' +
                                        '<button id="button" type="submit" class="addButton">Hinzufügen</button>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>'

    let accordion = document.getElementById("main");

    for (let i = 0; i < data.length; i++) //Alle Produkte des JSON durchgehen
    {
        let product = data[i];
		let accordionElement = document.createElement('div');
        accordionElement.innerHTML = elementAccordion;
        accordion.appendChild(accordionElement);

        //Id`s des Akkordions mit der jeweiligen Produkt id versehen
        document.getElementById("id").id = product.produkt_id;
        document.getElementById("flush-collapse").id = "flush-collapse" + product.produkt_id;
        document.getElementById(product.produkt_id).setAttribute("data-bs-target", ("#flush-collapse" + product.produkt_id));
        document.getElementById("productPic").id = "productPic" + product.produkt_id;
        document.getElementById("info").id = "info" + product.produkt_id;
        document.getElementById("einheitBestand").id = "einheitBestand" + product.produkt_id;
        document.getElementById("einheitReservierung").id = "einheitReservierung" + product.produkt_id;
        document.getElementById("bestandsmenge").id = "bestandsmenge" + product.produkt_id;
        document.getElementById("menge").id = "menge" + product.produkt_id;
        document.getElementById("button").id = "button" + product.produkt_id;
        document.getElementById("button" + product.produkt_id).setAttribute("onclick", ("addProduct('" + product.produkt_id +"', 'menge" + product.produkt_id + "')"));

        //Befüllen der Akkordions mit Name, Beschreibung, Bild und Menge
        let element = document.getElementById(product.produkt_id);
        element.innerHTML = product.name;
        element = document.getElementById("productPic" + product.produkt_id);
        element.src = "../Bilder/" + product.bild;
        element = document.getElementById("info" + product.produkt_id);
        element.innerHTML = product.beschreibung;
        element = document.getElementById("bestandsmenge" + product.produkt_id);
        element.setAttribute("value", product.lagermenge);
        element = document.getElementById("einheitBestand" + product.produkt_id);
        element.innerHTML = product.einheit;
        element = document.getElementById("einheitReservierung" + product.produkt_id);
        element.innerHTML = product.einheit;
    }
}