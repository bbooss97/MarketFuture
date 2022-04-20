
// $(function(){
//     var str = '#len'; //increment by 1 up to 1-nelemnts
//     $(document).ready(function(){
//       var i, stop;
//       i = 1;
//       stop = 4; //num elements
//       setInterval(function(){
//         if (i > stop){
//           return;
//         }
//         $('#len'+(i++)).toggleClass('bounce');
//       }, 500)
//     });
//   });

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send(  );
    return xmlHttp.responseText;
}
nomeUtente=httpGet("http://localhost:3001/session");
nomeUtente=JSON.parse(nomeUtente)["name"];
sonoAdmin="admin"==nomeUtente
console.log(sonoAdmin);

defaultImage="https://cdn.images.express.co.uk/img/dynamic/22/590x/crash-865638.jpg"
data=httpGet("http://localhost:3001/getNews")
data=JSON.parse(data)
console.log(data)

bannedNewsList=JSON.parse(httpGet("http://localhost:3001/bannedNews"));
bannedNews=[]
for(var i=0; i<bannedNewsList.length;i++){
    bannedNews.push(bannedNewsList[i]["titolo"])
}
console.log(bannedNews)

inserimento=document.getElementById("mynews")
console.log(inserimento)
j=0
for (var i=0; i<data.length;i++) {
    titolo=data[i]["title"]
    
    titolo=titolo.replaceAll("'",'`')
    titolo=titolo.replaceAll('"','`')

    
    if(j>=8){
        break
    }
    if(bannedNews.includes(titolo)){
        continue
    }
    j++
    descrizione=data[i]["description"]
    immagine=data[i]["image"]
    link=data[i]["url"]
    if(!sonoAdmin){
        elemento=`<div class="col-md-6">
            <div class="card flex-md-row mb-4 box-shadow h-md-250">
            <div class="card-body d-flex flex-column align-items-start">
                <h3 class="mb-0">
                <a class="text-dark" style="text-decoration: none;" >`+titolo+`</a>
                </h3>
                <div class="mb-1 text-muted">Nov 11</div>
                <p class="card-text mb-auto">`+descrizione.slice(0,150)+"..."+`</p>
                <a href="`+link+`">Continue reading</a>
            </div>
            <img class="card-img-right flex-auto d-none d-md-block" src="`
            if (immagine=="null"){
                elemento+=defaultImage+`" width="200" height="250" alt="Card image cap">
                </div>
                </div>`
            }else{
                elemento+=immagine+`" width="200" height="250" alt="Card image cap">
                </div>
                </div>`
            }
    }else{
        elemento=`<div class="col-md-6">
        <form method="POST" name="dati" action="/addBannedNews"  class="row g-3">
            <input type="hidden" name="titolo" value="`+titolo+`">
            <button type="submit" onclick="alert('sicuro??')" class="btn btn-danger">  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </form>
      </svg></button>
            <div class="card flex-md-row mb-4 box-shadow h-md-250">
            <div class="card-body d-flex flex-column align-items-start">

                <h3 class="mb-0">
                <a class="text-dark" style="text-decoration: none;" >`+titolo+`</a>
                </h3>
                <div class="mb-1 text-muted">Nov 11</div>
                
                <a href="`+link+`">Continue reading</a>
            </div>
            <img class="card-img-right flex-auto d-none d-md-block" src="`
            if (immagine=="null"){
                elemento+=defaultImage+`" width="200" height="250" alt="Card image cap">
                </div>
                </div>`
            }else{
                elemento+=immagine+`" width="200" height="250" alt="Card image cap">
                </div>
                </div>`
            }
    }
    
            
    
    telement=document.createElement("div")
    telement.innerHTML=elemento
    inserimento.appendChild(telement.firstChild)
}

if(sonoAdmin){
    console.log("inserisco tasto admmin")
    elementoTemporaneo=document.createElement("div")
    adminButton='<li><a href="/admin" class="nav-item nav-link">Admin</a></li>'
    elementoTemporaneo.innerHTML=adminButton
    document.getElementById("barra").appendChild(elementoTemporaneo.firstChild)
}
