const APIKEY = 'b000e1f5d3552332668991c447a06e9f';


const TMDB_ENDPOINT = 'https://api.themoviedb.org/3';

const IMG_PREFIX = 'https://image.tmdb.org/t/p/w500';
let xhr;

function carregaFilmes() {
   xhr = new XMLHttpRequest();

   xhr.open('GET', TMDB_ENDPOINT + '/movie/popular' + '?api_key=' + APIKEY + '&language=pt-BR' , true);
   xhr.onload = exibeFilmes;
   xhr.send();
}

function pesquisaFilmes() {
   xhr = new XMLHttpRequest();

   query = document.getElementById('pesquisa').value;

   xhr.open('GET', TMDB_ENDPOINT + '/search/movie' + '?api_key=' + APIKEY +'&language=pt-BR' + '&query=' + query, true);
   xhr.onload = exibeFilmespesq;
   xhr.send();
}


function exibeFilmes() {

   let data = JSON.parse(xhr.responseText);
   let textoHTML = '';

   for (let i = 0; i < 12; i++) {
      let nomeFilme = data.results[i].title;
      let sinopse = data.results[i].overview;
      let datalan = data.results[i].release_date;
      let informacoes1 = data.results[i].id;
      let imagem = IMG_PREFIX + data.results[i].poster_path;

      textoHTML += `<div class="col-12 col-sm-4 col-md-3 col-lg-2">
            <img src="${imagem}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${nomeFilme}</h5>
                <p class="card-text">${sinopse}</p>
                <p class="datalanc">${datalan}</p><br><br>
                <a href="https://www.themoviedb.org/movie/${informacoes1}-" target="_blank" class="btn btn-primary">MAIS INFORMAÇÕES</a>
                
            </div>
        </div>`
   }

   document.getElementById('tela').innerHTML = textoHTML;
}

function exibeFilmespesq() {

   let data = JSON.parse(xhr.responseText);
   let textoHTML = '';

   for (let i = 0; i < 18; i++) {
      let nomeFilme = data.results[i].title;
      let sinopse = data.results[i].overview;
      let datalan = data.results[i].release_date;
      let informacoes = data.results[i].id;
      let imagem = IMG_PREFIX + data.results[i].poster_path;

      textoHTML += `<div class="card col-12 col-sm-4 col-md-3 col-lg-2">
       <img src="${imagem}" class="card-img-top" alt="...">
       <div class="card-body">
           <h5 class="card-title">${nomeFilme}</h5>
           <p class="card-text">${sinopse}</p>
           <p class="datalanc">${datalan}</p><br><br>
           <a href="https://www.themoviedb.org/movie/${informacoes}-${query}" target="_blank" class="btn btn-primary">MAIS INFORMAÇÕES</a>
           
       </div>
   </div>`
   }

   document.getElementById('tela').innerHTML = textoHTML;
}