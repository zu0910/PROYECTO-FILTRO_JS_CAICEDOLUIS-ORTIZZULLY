
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
        
        document.querySelector(".contenido").innerHTML=`
            <div id="info" class="reuse"><p class="conte">${cap[cohete].reuse_count}</p><h3>Reuse Count</h3></div>
            <div id="info" class="water"><p class="conte">${cap[cohete].water_landings}</p><h3>Water Landings</h3></div>
            <div id="info" class="land"><p class="conte">${cap[cohete].land_landings}</p><h3>Land Landings</h3></div>
            <div id="info" class="serial"><p class="conte">${cap[cohete].serial}</p><h3>Serial</h3></div>
            <div id="info" class="status"><p class="conte">${cap[cohete].status}</p><h3>Status</h3></div>
            <div id="info" class="type"><p class="conte">${cap[cohete].type}</p><h3>Type</h3></div>
        `
       
       
        
        document.querySelector(".last_up").innerHTML=`
        <h4>Last Update :</h4>
        <p>${cap[cohete].last_update}</p>

        `
        let numero = 0;
        let des=0;
        document.getElementById("left").innerHTML=""
        
        for (const id of cap[cohete].launches){
            let id_des = "details"+des;
            let id_img = "imagenes"+numero;
            fetch("https://api.spacexdata.com/v4/launches/"+id)
            .then( res => res.json())
            .then( lanza => {
                console.log(id);
                
                console.log(lanza);
                document.getElementById("left").innerHTML+=`
                
                <div id="lanzamientos">
                    <div id="logo_name">
                        <div id="logo"><img src="${lanza.links.patch.small}"></div>
                        <div id="name">${lanza.name}</div>
                    </div>
                    <div id="pictures">
                        <div id="${id_img}" class="imagenes"></div>
                    </div>
                    <div id="${id_des}" class="details"></div>
                </div>
                `
                if (lanza.links.flickr.original=="") {
                    fetch('https://66e45b7dd2405277ed1408c9.mockapi.io/spacex/1')
                    .then( res => res.json())
                    .then(api=>{
                        
                        let max=api.imagenes.length-1;
                        
                        for ( let i=0; i<5; i++){
                            let imagen=Math.floor(Math.random()*max);
                            
                            document.getElementById(id_img).innerHTML+=`
                            <div class="carousel__item"><img src="${api.imagenes[imagen]}" referrerpolicy="no-referrer"></div>

                            `
                        }
                    });
                }
                else{
                    for (const img of lanza.links.flickr.original){
                        document.getElementById(id_img).innerHTML+=`
                        <div class="carousel__item"><img src="${img}" referrerpolicy="no-referrer"></div>
                        `
                    }
                }
                if(lanza.details==null){
                    fetch('https://66e45b7dd2405277ed1408c9.mockapi.io/spacex/1')
                    .then( res => res.json())
                    .then(api=>{
                        let min=api.descripcion.length-1;
                        let descrip = Math.floor(Math.random()*min);
                        document.getElementById(id_des).innerHTML=`
                        <p>${api.descripcion[descrip]}</p>
                        `
                    })
                }
                else{
                    document.getElementById(id_des).innerHTML=`
                    <p>${lanza.details}</p>
                    `
                }
            })
            numero+=1;
            des+=1;
        }
    })

}
capsule()
