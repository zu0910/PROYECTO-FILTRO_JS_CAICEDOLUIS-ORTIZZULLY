let cohete=0;
let len_data;
function cambiar(){
    let numeros = document.querySelectorAll('#numero');
    numeros.forEach(e=>{
        e.addEventListener('click',()=>{
            cohete=e.getAttribute('data-id')-1;
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
    fetch('https://api.spacexdata.com/v4/rockets')
    .then(res => res.json())
    .then(info=>{
        len_data=info.length;
        document.querySelector('.nombre').innerHTML=`<h1>${info[cohete].name}</h1>`
        document.querySelector(".info1").innerHTML=`
        <div class="seccion">
            <img src="../icons/mech.svg" alt="">
            <div class="texto">
                <h2>${info[cohete].country}</h2>
                <p>${info[cohete].description}</p>
            </div>
        </div>
        <div class="seccion">
            <img src="../icons/mech.svg" alt="">
            <div class="texto">
                <h2>The estimated cost per rocket launch</h2>
                <p>${info[cohete].cost_per_launch}</p>
            </div>
        </div>
        <div class="seccion">
            <img src="../icons/mech.svg" alt="">
            <div class="texto">
                <h2>The date of the first flight of the rocket</h2>
                <p>${info[cohete].first_flight}</p>
            </div>
        </div>
        <div class="seccion">
            <img src="../icons/mech.svg" alt="">
            <div class="texto">
                <h2>Read more about the coete</h2>
                <p>${info[cohete].first_flight}</p>
            </div>
        </div>
        `;
        let aceleracion_atmosferica = parseInt((info[cohete].engines.thrust_sea_level.kN/1780)*100)
        document.querySelector(".info2").innerHTML=`
        <div class="parte1">
            <div class="item__progress__bar"
                style="background: radial-gradient(closest-side, #1d1f38 85%, transparent 85% 100%), conic-gradient(var(--color--three) ${aceleracion_atmosferica}%, transparent 0);">
                <div class="progress__value"><strong>Atmospheric acceleration</strong><small>${aceleracion_atmosferica}
                        %</small><small>${info[cohete].engines.thrust_sea_level.kN} kN <br> ${info[cohete].engines.thrust_sea_level.lbf} Lbf</small></div>
            </div>
            <div class="info_rocket">
                <h3>INFORMATION ROCKET</h3>
                <div>
                    <p>Type</p>
                    <span>${info[cohete].type}</span>
                </div>
                <div>
                    <p>Rocket in service
                    </p>
                    <span>${info[cohete].active}</span>
                </div>
                <div>
                    <p>Number of stages</p>
                    <span>${info[cohete].stages}</span>
                </div>
                <div>
                    <p>Number of propellants</p>
                    <span>${info[cohete].boosters}</span>
                </div>
                <div>
                    <p>Landing legs</p>
                    <span>${info[cohete].landing_legs.number}</span>
                </div>
                <div>
                    <p>Leg material</p>
                    <span>${info[cohete].landing_legs.material}</span>
                </div>
            </div>
        </div>
        <div class="parte2">
        </div>
        <div class="parte3">
        </div>
        `;
        document.getElementsByName('parte2').innerHTML="";
        info[cohete].flickr_images.forEach(img=>{
            document.querySelector('.parte2').innerHTML+=`
            <div class="carousel__item"><img src="${img}" referrerpolicy="no-referrer"></div>
            `;
        });
        let Speed_space = parseInt((info[cohete].engines.thrust_vacuum.kN/1960)*100);
        document.querySelector('.parte3').innerHTML=`
        <div class="item__progress__bar"
            style="background: radial-gradient(closest-side, #1d1f38 85%, transparent 85% 100%), conic-gradient(var(--color--three) ${Speed_space}%, transparent 0);">
            <div class="progress__value"><strong>Speed in space</strong><small>${Speed_space}
                    %</small><small>${info[cohete].engines.thrust_vacuum.kN} kN <br> ${info[cohete].engines.thrust_vacuum.lbf} Lbf</small></div>
        </div>
        <div class="info_rocket">
            <h3>ENGINE INFORMATION</h3>
            <div>
                <p>Type</p>
                <span>${info[cohete].engines.type}</span>
            </div>
            <div>
                <p>Maximum power loss</p>
                <span>${info[cohete].engines.engine_loss_max}</span>
            </div>
            <div>
                <p>Engine availability</p>
                <span>${info[cohete].engines.layout}</span>
            </div>
            <div>
                <p>Number of engines</p>
                <span>${info[cohete].engines.number}</span>
            </div>
            <div>
                <p>Stage 1 fuel</p>
                <span>${info[cohete].engines.propellant_1}</span>
            </div>
            <div>
                <p>Stage 2 fuel</p>
                <span>${info[cohete].engines.propellant_2}</span>
            </div>
        </div>
        `;
    });
}
roket()