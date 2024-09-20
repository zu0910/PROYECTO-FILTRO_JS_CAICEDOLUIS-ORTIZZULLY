
let cohete=0;
let len_data;
function cambiar(){
    let numeros = document.querySelectorAll('#numero');
    numeros.forEach(e=>{
        e.addEventListener('click',()=>{
            cohete=e.getAttribute('data-id')-1;
            capsule();
        });
    });
}
function next(){
    let numeros = document.querySelectorAll('#numero');
    let contador = Number(numeros[0].getAttribute('data-id'));
    let max = Number(numeros[3].getAttribute('data-id'));
    if (max<len_data) { 
        for (let a=0; a<4; a++){
            contador+=1;
            numeros[a].setAttribute('data-id',contador);
            numeros[a].innerHTML=contador;
        }
    }
}
function prew(){
    let numeros = document.querySelectorAll('#numero');
    let contador = Number(numeros[0].getAttribute('data-id'));
    let max = Number(numeros[3].getAttribute('data-id'));
    if (contador>1) {
        for (let a=3; a>=0; a--){
            max-=1;
            numeros[a].setAttribute('data-id',max);
            numeros[a].innerHTML=max;
        }
    }
}

function capsule(){
    fetch("https://api.spacexdata.com/v4/capsules")
    .then( res => res.json())
    .then(cap => {
        len_data=cap.length;
    })
}

capsule()