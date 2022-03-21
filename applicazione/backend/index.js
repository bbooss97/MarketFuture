function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send(  );
    return xmlHttp.responseText;
}

data=httpGet("http://localhost:3000/getNews")
data=JSON.parse(data)
console.log(data)

inserimento=document.getElementById("news")

for (var i=0; i<data.length;i++) {
    titolo=data[i]["title"]
    descrizione=data[i]["description"]
    immagine=data[i]["image"]
    link=data[i]["url"]
    elemento=`<div class="col-md-6">
            <div class="card flex-md-row mb-4 box-shadow h-md-250">
            <div class="card-body d-flex flex-column align-items-start">
                <h3 class="mb-0">
                <a class="text-dark" href="#">`+titolo+`</a>
                </h3>
                <div class="mb-1 text-muted">Nov 11</div>
                <p class="card-text mb-auto">`+descrizione+`</p>
                <a href="`+link+`">Continue reading</a>
            </div>
            <img class="card-img-right flex-auto d-none d-md-block" src="`+immagine+`" width="200" height="250" alt="Card image cap">
            </div>
            </div>`
    console.log(elemento)
    telement=document.createElement("div")
    telement.innerHTML=elemento
    inserimento.appendChild(telement.firstChild)
}
