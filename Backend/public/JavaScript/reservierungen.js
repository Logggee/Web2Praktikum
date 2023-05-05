document.addEventListener("DOMContentLoaded", async() =>
{
    try 
    {
        const response = await fetch("/api/v1/reservierungen/alle");
        const data = await response.json();
        console.log(data);
    } 
    catch (ex) 
    {
        console.error(ex);
    }

    const buttonAccept = document.getElementById("accept");
    const buttonCancel = document.getElementById("cancel");

    buttonAccept.addEventListener('click', async() => 
    {
        try
        {
            console.log('Reservation Accepted!');
            const response = await fetch('/api/v1/reservierungen/akzeptieren');
            const status = await response.status;
            const statusText = await response.text();
            console.log(status, statusText);
        }

        catch (error)
        {
            console.error(error);
        }
    });

    buttonCancel.addEventListener('click', async() => 
    {
        try
        {
            console.log('Reservation denied!');
            const response = await fetch('/api/v1/reservierungen/ablehnen');
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

function generateAccordion(data) 
{
    let elementAccordion = '<div class="accordion accordion-flush" id="accordionFlushExample">' +
                                '<div class="accordion-item">' +
                                    '<h2 class="accordion-header">' +
                                        '<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse" aria-expanded="false" aria-controls="flush-collapseOne">' +
                                            '<div id="reservation"></div><br>' +
                                            '<div id="number"></div><br>' +
                                            '<div id="customer">Kunde:</div>' +
                                        '</button>'
                                    '</h2>' +
                                '<div id="flush-collapse" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">'
                                    '<div class="akordionInhalt">'
                                        '<ul class="reservierungsListe">' +
                                            '<div id="reservationList"></div>' +
                                        '</ul>' +
                                        '<div class="buttonsDiv">' +
                                            '<button type="submit" class="acceptButton" id="accept">Bestätigen</button>' +
                                            '<button type="submit" class="cancelButton" id="cancel">Ablehnen</button>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>';

    let accordion = document.getElementById("main");

    for (let i = 0; i < data.length; i++) 
    {
        let reservation = data[i];
		let accordionElement = document.createElement('div');
        accordionElement.setAttribute("id", reservation.reservierung_id)
        accordionElement.innerHTML = elementAccordion;
        accordion.appendChild(accordionElement);

        document.getElementById("flush-collapse").id = "flush-collapse" + reservation.reservierung_id;
        document.getElementById(product.produkt_id).setAttribute("data-bs-target", ("#flush-collapse" + reservation.reservierung_id));
        document.getElementById("reservation").id = "reservation" + reservation.reservierung_id;
        document.getElementById("number").id = "number" + reservation.reservierung_id;
        document.getElementById("customer").id = "customer" + reservation.reservierung_id;
        document.getElementById("reservationList").id = "reservationList" + reservation.reservierung_id;
        document.getElementById("accept").id = "accept" + reservation.reservierung_id;
        document.getElementById("cancel").id = "cancel" + reservation.reservierung_id;
        //document.getElementById("accept" + reservation.reservierung_id).setAttribute("onclick", ("addProduct('" + product.produkt_id +"', 'menge" + product.produkt_id + "')"));
        //document.getElementById("cancel" + reservation.reservierung_id).setAttribute("onclick", ("addProduct('" + product.produkt_id +"', 'menge" + product.produkt_id + "')"));

        let element = document.getElementById("reservation" + reservation.reservierung_id);
        element.innerHTML = "ID der Reservierung: " + reservation.reservierung_id;
        element = document.getElementById("number" + reservation.reservierung_id);
        element.innerHTML = "Anzahl der reservierten Produkte: " + reservation.reservierung_id;
    }
}