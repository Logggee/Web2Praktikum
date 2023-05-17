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
    try 
    {
        const response = await fetch("/api/v1/produkte/id");
        console.log(response);
        const data = await response.json();
        console.log(data);        
    } 
    catch (error) 
    {
    console.error(error);
    } 
    /*
    try 
    {
        const response = await fetch("/api/v1/produkte/create");
        const data = await response.json();
        console.log(data);        
    } 
    catch (error) 
    {
    console.error(error);
    } 
    try 
    {
        const response = await fetch("/api/v1/produkte/update");
        const data = await response.json();
        console.log(data);        
    } 
    catch (error) 
    {
    console.error(error);
    } 
    try 
    {
        const response = await fetch("/api/v1/produkte/delete");
        const data = await response.json();
        console.log(data);        
    } 
    catch (error) 
    {
    console.error(error);
    } 
    */

});
