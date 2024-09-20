let historia=0;
let len_data;
function cambiar(){
    let numeros = document.querySelectorAll('#numero');
    numeros.forEach(e=>{
        e.addEventListener('click',()=>{
            historia=e.getAttribute('data-id')-1;
            roket();
        });
    });
}
function next(){
    let numeros = document.querySelectorAll('#numero');
    let contador = Number(numeros[0].getAttribute('data-id'));
    let max = Number(numeros[2].getAttribute('data-id'));
    if (max<len_data) { 
        for (let a=0; a<3; a++){
            contador+=1;
            numeros[a].setAttribute('data-id',contador);
            numeros[a].innerHTML=contador;
        }
    }
}
function prew(){
    let numeros = document.querySelectorAll('#numero');
    let contador = Number(numeros[0].getAttribute('data-id'));
    let max = Number(numeros[2].getAttribute('data-id'));
    if (contador>1) {
        for (let a=2; a>=0; a--){
            max-=1;
            numeros[a].setAttribute('data-id',max);
            numeros[a].innerHTML=max;
        }
    }
}
function roket(){
    fetch('https://api.spacexdata.com/v4/history')
    .then(res => res.json())
    .then(info=>{
        len_data=info.length;
        document.querySelector('.titulo').innerHTML=`${info[historia].title}`
    });
};
roket();