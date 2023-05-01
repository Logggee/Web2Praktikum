document.addEventListener("DOMContentLoaded", async() =>
{
    try 
    {
        const response = await fetch("/api/v1/produktverwaltung");
        const status = await response.status;
        const statusText = await response.text();
        console.log(status, statusText);
    } 
    catch (error) 
    {
    console.error(error);
    }

    const buttonChange = document.getElementById("change");
    const buttonDelete = document.getElementById("delete");
    const buttonAddProduct = document.getElementById("addNewProduct");

    buttonChange.addEventListener('click', async() => 
    {
        try
        {
            console.log('Produkt ändern');
            const response = await fetch("/api/v1/produktverwaltung/aendern");
            const status = await response.status;
            const statusText = await response.text();
            console.log(status, statusText);
        }

        catch (error)
        {
            console.error(error);
        }
    });

    buttonDelete.addEventListener('click', async() => 
    {
        try
        {
            console.log('Produkt löschen');
            const response = await fetch("/api/v1/produktverwaltung/loeschen");
            const status = await response.status;
            const statusText = await response.text();
            console.log(status, statusText);
        }

        catch (error)
        {
            console.error(error);
        }
    });

    buttonAddProduct.addEventListener('click', async() => 
    {
        try
        {
            console.log('Produkt hinzufügen');
            const response = await fetch("/api/v1/produktverwaltung/hinzufuegen");
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