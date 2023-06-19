document.addEventListener("DOMContentLoaded", async() =>
{
    try 
    {
        const response = await fetch("/api/v1/reservierungen/alle");
        const data = await response.json();
        console.log(data);
        generateAccordion(data);
    } 
    catch (ex) 
    {
        console.error(ex);
    }
});

function generateAccordion(data) 
{
    let elementAccordion = '<div class="accordion accordion-flush" id="accordionFlushExample">' +
                            '<div class="accordion-item">' +
                                '<h2 class="accordion-header">' +
                                    '<button id="button" class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse" aria-expanded="false" aria-controls="flush-collapseOne">' +
                                        '<p id="reservation"></p><br>' +
                                        '<p id="number"></p><br>' +
                                        '<p id="customer">Kunde:</p>' +
                                    '</button>' +
                                '</h2>' +
                                '<div id="flush-collapse" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">' +
                                    '<div class="akordionInhalt">' +
                                        '<ul class="reservierungsListe">' +
                                            '<li id="reservationList"></li>' +
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
        accordionElement.setAttribute("id", reservation.reservierung_id);
        accordionElement.innerHTML = elementAccordion;
        accordion.appendChild(accordionElement);

        document.getElementById("button").id = "button" + reservation.reservierung_id;
        document.getElementById("flush-collapse").id = "flush-collapse" + reservation.reservierung_id;
        document.getElementById("button" + reservation.reservierung_id).setAttribute("data-bs-target", ("#flush-collapse" + reservation.reservierung_id));
        document.getElementById("reservationList").id = "reservationList" + reservation.reservierung_id;
        document.getElementById("accept").id = "accept" + reservation.reservierung_id;
        document.getElementById("cancel").id = "cancel" + reservation.reservierung_id;
        document.getElementById("accept" + reservation.reservierung_id).setAttribute("onclick", ("acceptReservation('" + reservation.reservierung_id + "','" + reservation.mail + "')"));
        document.getElementById("cancel" + reservation.reservierung_id).setAttribute("onclick", ("cancelReservation('" + reservation.reservierung_id + "','" + reservation.mail + "')"));

        let element = document.getElementById("button" + reservation.reservierung_id);
        element.innerHTML = "ID der Reservierung: " + reservation.reservierung_id + "<br>E-Mail: " + reservation.mail + "<br>Anzahl der reservierten Produkte: " + reservation.produkte.length;

        let list = document.getElementById("reservationList"  + reservation.reservierung_id);

        //Liste der Bestellten Produkte innerhalb des Akkordions
        for (let j = 0; j < reservation.produkte.length; j++)
        {
            let listElement = document.createElement('li');
            listElement.innerHTML = reservation.produkte[j].menge + " " + reservation.produkte[j].einheit + " " + reservation.produkte[j].name;
            list.appendChild(listElement);
        }
    }
}

async function acceptReservation(id, mail)
{
    try
    {
        console.log('Reservierung löschen' + id);
        const response = await fetch(`/api/v1/reservierungen/akzeptieren/${id}/${mail}`,
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

async function cancelReservation(id, mail)
{
    try
    {
        console.log('Reservierung löschen');
        const response = await fetch(`/api/v1/reservierungen/ablehnen/${id}/${mail}`,
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