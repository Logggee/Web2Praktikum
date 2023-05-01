const fetchDaten = async () => 
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
};
  
document.addEventListener("DOMContentLoaded", () => 
{
console.log("Test1");
fetchDaten();
});
  