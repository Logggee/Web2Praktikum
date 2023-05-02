document.addEventListener("DOMContentLoaded", async() => 
{
    try 
    {
        const response = await fetch("/api/v1/produkte/alle");
        const data = await response.json();
        console.log(data);
        generateAccordion(data);
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
                                        '<img class="bilderAkordion" src="../Bilder/apfel.jpg" alt="Ei">' +
                                        '<a id="info">Frische Äpfel von den eigenen Obstwiesen</a>' +
                                            '<div class="inputDiv">' +
                                                '<label id="einheit" class="labelInput"></label>' +
                                                '<input type="number" id="menge" name="menge" value="1" min="1" class="input">' +
                                            '</div>' +
                                        '<button id="button" type="submit" class="addButton">Hinzufügen</button>' +
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
        document.getElementById("button").id = "button" + product.produkt_id;
        document.getElementById("button" + product.produkt_id).setAttribute("onclick", ("addProduct('" + product.produkt_id +"', 'menge" + product.produkt_id + "')"));

        let element = document.getElementById(product.produkt_id);
        element.innerHTML = product.name;
        element = document.getElementById("info" + product.produkt_id);
        element.innerHTML = product.beschreibung;
    }
}