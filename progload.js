import data from './programs.json' assert { type: 'json' };


var val;

for(val in data)
{
    if(!data[val].private){
        var box = document.createElement("span");
        box.className = "dark-container";
        document.getElementById('maincon').appendChild(box);

        var element = document.createElement("h4");
        element.appendChild(document.createTextNode(data[val].name));
        box.appendChild(element);

        var element2 = document.createElement("h5");
        element2.appendChild(document.createTextNode(data[val].description));
        box.appendChild(element2);

        var a = document.createElement("a");
        //<a href="portfolio.html" target="_blank">See my portfolio</a>
        a.href = data[val].link;
        a.innerHTML = "download";
        box.appendChild(a);
    }
}

//btnSearch

function err(text){
    const box = document.createElement("div");
    box.className = "alert";
    box.innerHTML = 'Error : ' + text;
    document.body.appendChild(box);



    const close = document.createElement("span");
    close.className = "closebtn";
    close.onclick = function(){this.parentElement.style.display='none';}
    close.innerHTML = "&times;";
    box.appendChild(close);
}

function download(text,text2,link){
    var Elem = document.getElementById('popup');
    if (Elem != null) Elem.remove(); 

    const box = document.createElement("div");
    box.className = "container";
    box.id = "popup";
    document.body.appendChild(box);

    const cur = document.createElement("p");
    cur.innerHTML = text;
    box.appendChild(cur);

    const cur2 = document.createElement("p");
    cur2.innerHTML = text2;
    box.appendChild(cur2);


    const close = document.createElement("span");
    close.className = "savebtn";
    close.onclick = function(){window.open(link, '_blank').focus(); this.parentElement.style.display='none';}
    close.innerHTML = "download";
    box.appendChild(close);
}


function FindData(code) {
    for (var i in data){
        // look for the entry with a matching `code` value
        if (data[i].id == code){
           return data[i]
        }
      }
}

document.getElementById("btnSearch").onclick = function() {find()};

function find() {
    const id = document.getElementById("search").value.replace(/ /g,'');

    if(id == "")
    {
        err("Id cannot be null");
    }
    else 
    {
        var exists = false;
        for(var val in data)
        {
            if(exists) break;
            
            if(data[val].id == id) exists = true;
        }

        if(exists)
            download("Name : " + FindData(id).name,"Description : " + FindData(id).description, FindData(id).link);
        else
            err("unable to find item by id "+id + ".");
    }
}
