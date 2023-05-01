document.addEventListener("DOMContentLoaded", async() =>
{
    try 
    {
        const response = await fetch("/api/v1/reservierungen");
        const data = await response.text();
        console.log(data);
    } 
    catch (error) 
    {
    console.error(error);
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