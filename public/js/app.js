//Client Side Javascript

//Fetch API - Browser Based API not accessible in Node 


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1') //Query Selector matches first one so we should assign unique ID 
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e)=>{
    url = "http://localhost:3000/weather?address=" + search.value;

    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""

    e.preventDefault();

 fetch(url).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = ""
            messageTwo.textContent = data.error

        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })

})
})



