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
                body: JSON.stringify([
                    {
                      produkt: 'Apfel',
                      menge: 10
                    },
                    {
                      produkt: 'Eier',
                      menge: 20
                    }
                  ])
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
