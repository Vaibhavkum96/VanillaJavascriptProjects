const quoteText = document.querySelector(".quote")
let quoteButton = document.querySelector("button")
let authorName = document.querySelector(".name")
let speechButton = document.querySelector(".speech")
let copyButton = document.querySelector(".copy")
let twitterButton = document.querySelector(".twitter")
let synth = speechSynthesis;
//console.log(twitterButton)

function randomQuoteGenerator(){
    quoteButton.classList.add("loading")
    quoteButton.innerText = "Loading Quote...."
    fetch("http://api.quotable.io/random").then((response)=> response.json()).then((result)=> {
        quoteText.innerHTML = result.content // We can change the property of const variable
        authorName.innerHTML = result.author 
        quoteButton.classList.remove("loading")
        quoteButton.innerHTML = "New Quote"
    })
}

quoteButton.addEventListener("click", randomQuoteGenerator)

copyButton.addEventListener("click", ()=> {
    navigator.clipboard.writeText(quoteText.innerText)
})

twitterButton.addEventListener("click", ()=> {
    let tweet = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`
    window.open(tweet)
})

speechButton.addEventListener("click", ()=> {
   let utterence = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`)
   synth.speak(utterence)
   setInterval(()=> {
    !synth.speaking ? speechButton.classList.remove("active") : speechButton.classList.add("active")
   },10)

})