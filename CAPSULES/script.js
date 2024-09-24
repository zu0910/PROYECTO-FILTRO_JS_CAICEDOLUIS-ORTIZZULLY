
let cohete=0;
let len_data;
function cambiar(){
    let numeros = document.querySelectorAll('#numero');
    numeros.forEach(e=>{
        e.addEventListener('click',()=>{
            cohete=e.getAttribute('data-id')-1;
        });
    });
    capsule();
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
    fetch("https://api.spacexdata.com/v4/capsules/")
    .then( res => res.json())
    .then(cap => {
        len_data=cap.length;
        

        document.querySelector(".reuse").innerHTML=`
        <img src="../icons/mech.svg" alt="">
        <h4>Reuse Count :</h4>
        <p>${cap[cohete].reuse_count}</p>
        `
        document.querySelector(".water").innerHTML=`
        <img src="../icons/mech.svg" alt="">
        <h4>Water landings :</h4>
        <p>${cap[cohete].water_landings}</p>
        `
        document.querySelector(".land").innerHTML=`
        <img src="../icons/mech.svg" alt="">
        <h4>Land landings :</h4>
        <p>${cap[cohete].land_landings}</p>
        `
        
        document.querySelector(".serial").innerHTML=`
        <img src="../icons/mech.svg" alt="">
        <h4>Serial :</h4>
        <p>${cap[cohete].serial}</p>
        `
        document.querySelector(".status").innerHTML=`
        <img src="../icons/mech.svg" alt="">
        <h4>Status :</h4>
        <p>${cap[cohete].status}</p>
        `
        document.querySelector(".type").innerHTML=`
        <img src="../icons/mech.svg" alt="">
        <h4>Type :</h4>
        <p>${cap[cohete].type}</p>
        `
        document.querySelector(".last_up").innerHTML=`
        <h4>Last Update :</h4>
        <p>${cap[cohete].last_update}</p>

        `
        let numero = 0;
        document.getElementById("left").innerHTML=""
        
        for (const id of cap[cohete].launches){
            
            let id_img = "imagenes"+numero;
            fetch("https://api.spacexdata.com/v4/launches/"+id)
            .then( res => res.json())
            .then( lanza => {
                console.log(lanza);
                document.getElementById("left").innerHTML+=`
                <div id="lanzamientos">
                    <div id="info_lanzamiento">
                        <div id="import">
                            <div id="logo">
                            <img src="${lanza.links.patch.small}">
                            </div>
                            <div id="name">${lanza.name}</div>
                        </div>
                        <div id="details">${lanza.details}</div>
                    </div>
                    <div id="pictures">
                            <div id="${id_img}" class="imagenes"></div>
                        </div>
                    </div>
                </div>
                `
                for (const img of lanza.links.flickr.original){
                    document.getElementById(id_img).innerHTML+=`
                    <div class="carousel__item"><img src="${img}" referrerpolicy="no-referrer"></div>
                    `
                }
            })
            numero+=1;
        }
    })

}
capsule()
