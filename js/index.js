import adatok from './adatok.json' assert {type:'json'};

let lefoglaltak = [];

function $(id)
{
    return document.getElementById(id);
}

function Search(values)
{
    $("card_div").innerHTML = "";
    let sorted = [];
    //let searchquerys = document.getElementsByClassName("search");
    for (let adat of adatok)
    {
        let pushable = true;
        if(!adat.model.toLowerCase().includes(values[0].toLowerCase()) || !adat.marka.toLowerCase().includes(values[1].toLowerCase()) || (adat.szin != values[4].toLowerCase() && values[4] != "0"))
        {
            console.log("asd");
            pushable = false;
        }
        if(values[2] != "")
        {
            if(adat.ferohely < parseInt(values[2]))
            {
                pushable = false;
            }
        }
        if(values[3] != "")
        {
            if(adat.fogyasztas > parseInt(values[3]))
            {
                pushable = false;
            }
        }
        if(values[5] != "")
        {
            if(adat.ar > parseInt(values[5]))
            {
                pushable = false;
            }
        }
        if(pushable)
        {
            sorted.push(adat);
        }
    }

    return sorted;
}

//Kártyák legenerálása
function GenerateCard(sorted)
{
    if(sorted.length == 0)
    {
        console.log("k");
        $("card_div").innerHTML = "<h1>Nincs találat</h1>";
    }

    else{
        for (let car of sorted)
        {
            let cardarea = $("card_div");
            let card = document.createElement("div");
            card.classList.add("card", "col-lg-4", "col-md-4", "col-sm-12", "p-0");
            cardarea.appendChild(card);
    
            let img = document.createElement("img");
            img.src = car.img;
            img.classList.add("card-img-top", "img-fluid" ,"card-kep");
            card.appendChild(img);

            let card_body = document.createElement("div");
            card_body.classList.add("card-body");
            card.appendChild(card_body);

            let card_title = document.createElement("h5");
            card_title.classList.add("card-title");
            card_body.appendChild(card_title);

            let card_text = document.createElement("p");
            card_text.innerHTML = car.marka + " " + car.model;
            card_body.appendChild(card_text);
            let id = document.createElement("p");
            id.setAttribute("hidden", true);
            id.classList.add("id");
            id.innerHTML= car.id;
            card_body.appendChild(id);

            let card_button = document.createElement("button");
            card_button.type = "button";
            card_button.classList.add("btn", "btn-primary", "infoGomb");
            card_button.innerText = "További információk";
            card_button.setAttribute("data-bs-toggle", "modal");
            card_button.setAttribute("data-bs-target", "#info");
            card_button.addEventListener("click", ()=>{modalChange(card_button)});
            card_body.appendChild(card_button);
        }
    }
}

function getInput()
{
    let searchquerys = document.getElementsByClassName("search");
    let values = [];
    for (let query of searchquerys)
    {
        values.push(query.value);
    }
    return values;
}

function modalChange(button)
{
    let body = button.parentElement;
    let searchId;
    for(let child of body.childNodes)
    {
        if(child.classList.contains("id"))
        {
            searchId = parseInt(child.innerHTML);
        }
    }

    let auto;
    for(let a of adatok)
    {
        if(a.id == searchId)
        {
            auto = a;
        }
    }

    let modalBody = document.getElementById("mBody");
    let modalTitle = document.getElementById("mTitle");
    modalTitle.innerHTML = auto.marka + " " + auto.model;

    modalBody.innerHTML ="";
    
    let ul = document.createElement("ul");
    let ar = document.createElement("li");
    let ferohely = document.createElement("li");
    let fogyasztas = document.createElement("li");
    let kor = document.createElement("li");
    let img = document.createElement("img");
    let id = document.createElement("p");
    id.setAttribute("hidden", true);
    id.classList.add("id");
    id.innerHTML= auto.id;

    ar.innerHTML = auto.ar + "Ft / óra";
    ferohely.innerHTML = auto.ferohely + "ülés";
    fogyasztas.innerHTML = auto.fogyasztas + "l/100km";
    kor.innerHTML = auto.kor +"év";
    img.setAttribute("src", auto.img);
    img.setAttribute("style", "width: 400px");

    modalBody.appendChild(img);
    modalBody.appendChild(id);
    ul.appendChild(ar);
    ul.appendChild(ferohely);
    ul.appendChild(fogyasztas);
    ul.appendChild(kor);
    modalBody.appendChild(ul);
}

function foglalas(button)
{
    let body = document.getElementById("mBody");
    let searchId;
    for(let child of body.childNodes)
    {
        if(child.classList.contains("id"))
        {
            searchId = parseInt(child.innerHTML);
        }
    }

    let auto;
    for(let a of adatok)
    {
        if(a.id == searchId)
        {
            auto = a;
        }
    }

    lefoglaltak.push(auto);

    alert("Sikeres Foglalás!");
    console.log(body);
    console.log(auto);
    console.log(lefoglaltak);
}

$("kölcsönzes").addEventListener("click", ()=>{
    foglalas($("kölcsönzes"));
})

//sorted = adatok
window.addEventListener("load", function(){
    GenerateCard(adatok);
});

$("foglalasok").addEventListener("click", ()=>{
    $("card_div").innerHTML = "";
    GenerateCard(lefoglaltak);
})

$("yes").addEventListener("click", function(){
    let sortedvalues = Search(getInput());
    GenerateCard(sortedvalues);
});
$("keres").addEventListener("click", function(){
    let sortedvalues = Search(getInput());
    GenerateCard(sortedvalues);
});

export default {Search};