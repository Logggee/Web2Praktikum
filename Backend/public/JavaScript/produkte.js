document.addEventListener("DOMContentLoaded", async() => 
{
    try 
    {
        const response = await fetch("/api/v1/produkte/alle");
        const data = await response.json();
        console.log(data);
    } 
    catch (error) 
    {
    console.error(error);
    } 
});