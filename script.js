const fromLang = document.getElementById("from-lang");
const toLang = document.getElementById("to-lang");
const btnTranslate = document.getElementById("btnTranslate");
const fromText = document.getElementById("from-text");
const toText = document.getElementById("to-text");
const exchange = document.querySelector(".exchange");
const icons = document.querySelectorAll(".icons");

let option;
for(let lang in languages){
    option = `<option value="${lang}">${languages[lang]}</option>`

    fromLang.insertAdjacentHTML("beforeend", option);
    toLang.insertAdjacentHTML("beforeend", option);

    fromLang.value = "tr-TR";
    toLang.value = "en-GB";
}

btnTranslate.addEventListener("click", () => {
    let text = fromText.value;
    let from = fromLang.value;
    let to = toLang.value;
    const url =`https://api.mymemory.translated.net/get?q=${text}&langpair=${from}|${to}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            toText.value = data.responseData.translatedText;
        });
});

exchange.addEventListener("click", ()=> {
    let changetext = fromText.value;
    fromText.value = toText.value;
    toText.value = changetext;

    let changelang = fromLang.value;
    fromLang.value = toLang.value;
    toLang.value = changelang;
});


for(let icon of icons){
    icon.addEventListener("click", (e) => {
        if(e.target.classList.contains("fa-copy")){
            if(e.target.id=="from"){
                navigator.clipboard.writeText(fromText.value);
            }
            else {
                navigator.clipboard.writeText(toText.value);
            }
            
        }
        else{
            let utterance;
            if(e.target.id=="from"){
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = fromLang.value;
            }
            else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = toLang.value;
            }
            speechSynthesis.speak(utterance);
        }
    })
}