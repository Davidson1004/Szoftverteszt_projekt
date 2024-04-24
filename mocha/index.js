import adatok from './adatok.json' assert {type:'json'};

function Search(values)
{
    //$("card_div").innerHTML = "";
    let sorted = [];
    //let searchquerys = document.getElementsByClassName("search");
    for (let adat of adatok)
    {
        let pushable = true;
        if(!adat.model.includes(values[0]) || !adat.marka.includes(values[1]) || (adat.szin != values[4].toLowerCase() && values[4] != "0"))
        {
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

export default {Search};