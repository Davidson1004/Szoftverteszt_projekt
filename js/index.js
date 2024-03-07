function $(id)
{
    return document.getElementById(id);
}


//Kártyák legenerálása
function GenerateCard()
{
    for(let i = 0; i<10; i++)
    {
        let cardarea = $("card_div");
        let card = document.createElement("div");
        card.classList.add("card", "col-lg-4", "col-md-4", "col-sm-12", "p-0");
        cardarea.appendChild(card);
    
        let img = document.createElement("img");
        img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS23hEKl3aWmcpLQCxarhwwwKxOPqx4Tlfkcc8it612lg&s";
        img.classList.add("card-img-top", "img-fluid");
        card.appendChild(img);

        let card_body = document.createElement("div");
        card_body.classList.add("card-body");
        card.appendChild(card_body);

        let card_title = document.createElement("h5");
        card_title.classList.add("card-title");
        card_body.appendChild(card_title);

        let card_text = document.createElement("p");
        card_text.innerHTML = "Márka: Porsche<br>Modell: 963";
        card_body.appendChild(card_text);

        let card_button = document.createElement("button");
        card_button.type = "button";
        card_button.classList.add("btn", "btn-primary");
        card_button.innerText = "További információk";
        card_body.appendChild(card_button);
    }
}

window.addEventListener("load", GenerateCard);