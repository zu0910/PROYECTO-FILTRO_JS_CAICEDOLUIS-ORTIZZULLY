function roket(){
    fetch('https://api.spacexdata.com/v4/rockets')
    .then(res => res.json())
    .then(info=>{
        document.querySelector('.nombre').innerHTML=`<h1>${info[0].name}</h1>`
        document.querySelector(".info1").innerHTML=`
        <div class="seccion">
            <img src="../icons/mech.svg" alt="">
            <div class="texto">
                <h2>${info[0].country}</h2>
                <p>${info[0].description}</p>
            </div>
        </div>
        <div class="seccion">
            <img src="../icons/mech.svg" alt="">
            <div class="texto">
                <h2>The estimated cost per rocket launch</h2>
                <p>${info[0].cost_per_launch}</p>
            </div>
        </div>
        <div class="seccion">
            <img src="../icons/mech.svg" alt="">
            <div class="texto">
                <h2>The date of the first flight of the rocket</h2>
                <p>${info[0].first_flight}</p>
            </div>
        </div>
        <div class="seccion">
            <img src="../icons/mech.svg" alt="">
            <div class="texto">
                <h2>Read more about the coete</h2>
                <p>${info[0].first_flight}</p>
            </div>
        </div>
        `
    });
}