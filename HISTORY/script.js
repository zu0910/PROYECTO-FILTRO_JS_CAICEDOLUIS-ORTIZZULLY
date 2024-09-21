let historia=0;
let len_data;
function pag_actual(){
    let numeros = document.querySelectorAll('.numero');
    numeros.forEach(e=>{
        if (e.getAttribute('data-id')-1==historia) {
            e.setAttribute('id','pag');
        }
        else{
            e.removeAttribute('id');
        }
    });
}
function cambiar(){
    let numeros = document.querySelectorAll('.numero');
    numeros.forEach(e=>{
        e.addEventListener('click',()=>{
            historia=e.getAttribute('data-id')-1;
            roket();
        });
    });
}
function next(){
    let numeros = document.querySelectorAll('.numero');
    let contador = Number(numeros[0].getAttribute('data-id'));
    let max = Number(numeros[2].getAttribute('data-id'));
    if (max<len_data) { 
        for (let a=0; a<3; a++){
            contador+=1;
            numeros[a].setAttribute('data-id',contador);
            numeros[a].innerHTML=contador;
        }
    }
    pag_actual();
}
function prew(){
    let numeros = document.querySelectorAll('.numero');
    let contador = Number(numeros[0].getAttribute('data-id'));
    let max = Number(numeros[2].getAttribute('data-id'));
    if (contador>1) {
        for (let a=2; a>=0; a--){
            max-=1;
            numeros[a].setAttribute('data-id',max);
            numeros[a].innerHTML=max;
        }
    }
    pag_actual();
}
function roket(){
    fetch('https://api.spacexdata.com/v4/history')
    .then(res => res.json())
    .then(info=>{
        len_data=info.length;
        pag_actual();
        document.querySelector('.titulo').innerHTML=`<h1>${info[historia].title}</h1>`;
        document.querySelector('.details').innerHTML=`<h2>Event Details</h2><p class="p">${info[historia].details}</p>`;
        document.querySelector('.events1').innerHTML=`<h2>Event Date (UTC)</h2><p class="p">${info[historia].event_date_utc}</p>`;
        document.querySelector('.events2').innerHTML=`<h2>Event Date (UNIX)</h2><p class="p">${info[historia].event_date_unix}</p>`;
        document.querySelector('.article').innerHTML=`<button class="btn"><a href="${info[historia].links.article}">ARTICLE</a></button>`;
    });
};
roket();