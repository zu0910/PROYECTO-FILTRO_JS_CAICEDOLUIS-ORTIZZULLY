class principal extends HTMLElement{
    constructor(){
        super();
        this.innerHTML=`
        <div class="principal">
            <div class="nombre">
            </div>
            <div class="tres">
                <div class="info1">
                    
                </div>
                <div class="info2">
                    
                </div>
                <div class="info3">
                    
                </div>
            </div>
        </div>
        `;
    }
}
class paginacion extends HTMLElement{
    constructor(){
        super();
        this.innerHTML=`
        <div class="paginacion">
            <button id="prew" onclick="prew()"><</button>
            <button class="numero" onmouseover="cambiar()" data-id="1">1</button>
            <button class="numero" onmouseover="cambiar()" data-id="2">2</button>
            <button class="numero" onmouseover="cambiar()" data-id="3">3</button>
            <button id="next" onclick="next()">></button>
        </div>
        `;
    }
}
class footer extends HTMLElement{
    constructor(){
        super();
        this.innerHTML=`
        <div class="botones">
            <button class="icons actual">
                <img src="../icons/rocket.svg" alt="">
                <p>Rockets</p>
            </button>
            <button class="icons">
                <a href="../CAPSULES/inde.html">
                    <img src="../icons/capsule.svg" alt="">
                    <p>Capsules</p>
                </a>
            </button>
            <button class="icons">
                <a href="../COMPANY/index.html">
                    <img src="../icons/mech.svg" alt="">
                    <p>Conpany</p>
                </a>
            </button>
            <button class="icons">
                <a href="../HISTORY/index.html">
                    <img src="../icons/prop.svg" alt="">
                    <p>History</p>
                </a>
            </button>
        </div>
        `;
    }
}
customElements.define('footer-nav',footer);
customElements.define('cont-paginacion',paginacion);
customElements.define('cont-principal',principal);
let cohete=0;
let len_data;
function pag_actual(){
    let numeros = document.querySelectorAll('.numero');
    numeros.forEach(e=>{
        if (e.getAttribute('data-id')-1==cohete) {
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
            cohete=e.getAttribute('data-id')-1;
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
    fetch('https://api.spacexdata.com/v4/rockets')
    .then(res => res.json())
    .then(info=>{
        len_data=info.length;
        pag_actual();
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
                <h2>Success rate pct</h2>
                <p>${info[cohete].success_rate_pct}</p>
            </div>
        </div>
        <div class="seccion">
            <img src="../icons/mech.svg" alt="">
            <div class="texto">
                <h2>Read more about the coete</h2>
                <a href="${info[cohete].wikipedia}" style="color:white">Wikipedia</a>
            </div>
        </div>
        `;
        let aceleracion_atmosferica = parseInt((info[cohete].engines.thrust_sea_level.kN/1780)*100);
        let color1;
        if (aceleracion_atmosferica<32) {
            color1='red'
        }
        else if (aceleracion_atmosferica>=33 && aceleracion_atmosferica<65) {
            color1='#ffd733'
        }
        else if (aceleracion_atmosferica>=66) {
            color1='#00ff15'
        }
        document.querySelector(".info2").innerHTML=`
        <div class="parte1">
            <div class="item__progress__bar"
                style="background: radial-gradient(closest-side, #1d1f38 85%, transparent 85% 100%), conic-gradient(${color1} ${aceleracion_atmosferica}%, transparent 0);">
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
            <div class="info_rocket">
                <h3>FIRST STAGE</h3>
                <div>
                    <p>Reusable</p>
                    <span>${info[cohete].first_stage.reusable}</span>
                </div>
                <div>
                    <p>Engines
                    </p>
                    <span>${info[cohete].first_stage.engines}</span>
                </div>
                <div>
                    <p>Fuel Amount Tons</p>
                    <span>${info[cohete].first_stage.fuel_amount_tons}</span>
                </div>
                <div>
                    <p>Burn Time Sec</p>
                    <span>${info[cohete].first_stage.burn_time_sec}</span>
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
        let color2;
        if (Speed_space<32) {
            color2='red'
        }
        else if (Speed_space>=33 && Speed_space<65) {
            color2='#ffd733'
        }
        else if (Speed_space>=66) {
            color2='#00ff15'
        }
        document.querySelector('.parte3').innerHTML=`
        <div class="item__progress__bar"
            style="background: radial-gradient(closest-side, #1d1f38 85%, transparent 85% 100%), conic-gradient(${color2} ${Speed_space}%, transparent 0);">
            <div class="progress__value"><strong>Speed in space</strong><small>${Speed_space}
                    %</small><small>${info[cohete].engines.thrust_vacuum.kN} kN <br> ${info[cohete].engines.thrust_vacuum.lbf} Lbf</small></div>
        </div>
        <div class="info_rocket">
            <h3>ENGINE INFORMATION</h3>
            <div>
                <p>Type</p>
                <span>${info[cohete].engines.type}-${info[cohete].engines.version}</span>
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
        <div class="info_rocket">
            <h3>SECOND STAGE</h3>
            <div>
                <p>Thurst kn</p>
                <span>${info[cohete].second_stage.thrust.kN}</span>
            </div>
            <div>
                <p>Thurst lbf</p>
                <span>${info[cohete].second_stage.thrust.lbf}</span>
            </div>
            <div>
                <p>option_1</p>
                <span>${info[cohete].second_stage.payloads.option_1}</span>
            </div>
        </div>
        `;
        document.querySelector('.info3').innerHTML=`
        <div class="information__container">
            <div>
                <h3>Rocket weight :</h3>
            </div>
            <div class="valores">
                <progress max="1420788" value="${info[cohete].mass.kg}">1420788%</progress>
                <span>${info[cohete].mass.kg} kg <br> ${info[cohete].mass.lb} lb</span>
            </div>
        </div>
        <div class="information__container">
            <div>
                <h3>Low Earth Orbit :</h3>
            </div>
            <div class="valores">
                <progress max="150000" value="${info[cohete].payload_weights[0].kg}">1420788%</progress>
                <span>${info[cohete].payload_weights[0].kg} kg <br> ${info[cohete].payload_weights[0].lb} lb</span>
            </div>
        </div>
        <div class="information__container">
            <div>
                <h3>Rocket Height :</h3>
            </div>
            <div class="valores">
                <progress max="118" value="${info[cohete].height.meters}">1420788%</progress>
                <span>${info[cohete].height.meters} M <br> ${info[cohete].height.feet} F</span>
            </div>
        </div>
        <div class="information__container">
            <div>
                <h3>Rocket diameter :</h3>
            </div>
            <div class="valores">
                <progress max="12.2" value="${info[cohete].diameter.meters}">1420788%</progress>
                <span>${info[cohete].diameter.meters} kg <br> ${info[cohete].diameter.feet} lb</span>
            </div>
        </div>
        <div class="information__container">
            <div>
                <h3>Diameter rocket shield :</h3>
            </div>
            <div class="valores">
                <progress max="5.2" value="${info[cohete].diameter.meters}">1420788%</progress>
                <span>${info[cohete].diameter.meters} kg <br> ${info[cohete].diameter.feet} lb</span>
            </div>
        </div>
        <div class="information__container">
            <div>
                <h3>Height rocket shield :</h3>
            </div>
            <div class="valores">
                <progress max="13.1" value="${info[cohete].second_stage.payloads.composite_fairing.diameter.meters}">1420788%</progress>
                <span>${info[cohete].second_stage.payloads.composite_fairing.diameter.meters} M <br> ${info[cohete].second_stage.payloads.composite_fairing.diameter.feet} F</span>
            </div>
        </div>
        `
    });
}
roket()