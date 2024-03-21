import adatok from './adatok.json' assert {type:'json'};

let sorted = adatok;

function $(id)
{
    return document.getElementById(id);
}

function Search()
{
    $("card_div").innerHTML = "";
    sorted = [];
    for (let adat of adatok)
    {
        if(adat.marka.includes("Honda") && adat.szin == "piros")
        {
            sorted.push(adat);
        }
    }

    if(sorted.length == 0)
    {
        console.log("k");
        $("card_div").innerHTML = "<h1>Nincs találat</h1>";
    }
    GenerateCard();
}

//Kártyák legenerálása
function GenerateCard()
{
    for (let car of sorted)
    {
        let cardarea = $("card_div");
        let card = document.createElement("div");
        card.classList.add("card", "col-lg-4", "col-md-4", "col-sm-12", "p-0");
        cardarea.appendChild(card);
    
        let img = document.createElement("img");
        img.src = car.img;
        img.classList.add("card-img-top", "img-fluid");
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

        let card_button = document.createElement("button");
        card_button.type = "button";
        card_button.classList.add("btn", "btn-primary");
        card_button.innerText = "További információk";
        card_button.setAttribute("data-bs-toggle", "modal");
        card_button.setAttribute("data-bs-target", "#exampleModal");
        card_body.appendChild(card_button);
    }
}

window.addEventListener("load", GenerateCard);
$("keres").addEventListener("click", Search);