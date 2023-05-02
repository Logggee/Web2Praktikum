document.addEventListener("DOMContentLoaded", async() => 
{
    try 
    {
        const response = await fetch("/api/v1/produkte/alle");
        const data = await response.json();
        console.log(data);
        generateAccordion();
    } 
    catch (error) 
    {
    console.error(error);
    } 
});


function generateAccordion() 
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
                        
    let accordion = document.getElementById("testA");

    for (let i = 0; i < Produkte.length; i++) {
        let product = Produkte[i];
		let accordionElement = document.createElement('div');
        accordionElement.innerHTML = elementAccordion;
        accordion.appendChild(accordionElement);

        document.getElementById("id").id = product.id;
        document.getElementById("flush-collapse").id = "flush-collapse" + product.id;
        document.getElementById(product.id).setAttribute("data-bs-target", ("#flush-collapse" + product.id));
        document.getElementById("info").id = "info" + product.id;
        document.getElementById("einheit").id = "einheit" + product.id;
        document.getElementById("menge").id = "menge" + product.id;
        document.getElementById("button").id = "button" + product.id;
        document.getElementById("button" + product.id).setAttribute("onclick", ("addProduct('" + product.id +"', 'menge" + product.id + "')"));

        let element = document.getElementById(product.id);
        element.innerHTML = product.name;
        element = document.getElementById("info" + product.id);
        element.innerHTML = product.info;
    }
}