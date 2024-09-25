function mostrar(){
    fetch('https://api.spacexdata.com/v4/company')
    .then( res => res.json())
    .then( data => {
        document.querySelector("#info_sede").innerHTML=`
        <div id="addres">
            <img id="iconos" src="../icons/mech.svg" alt="">
            <h4>Adress :</h4>
            <p>${data.headquarters.address}</p>
        </div>
        <div id="city">
            <img id="iconos" src="../icons/mech.svg" alt="">
            <h4>City :</h4>
            <p>${data.headquarters.city}</p>
        </div>
        <div id="states">
            <img id="iconos" src="../icons/mech.svg" alt="">
            <h4>State :</h4>
            <p>${data.headquarters.state}</p>
        </div>
        <div id="employ">
            <img id="iconos" src="../icons/mech.svg" alt="">
            <h4>Employess : </h4>
            <p>${data.employees}</p>
        </div>

        `
        document.querySelector("#resumen").innerHTML=`
        
        <h4>History</h4>
        <p>${data.summary}</p>
        `
        document.querySelector("#parte2").innerHTML=`
        <div id="lista1">
            <div id="list">
                <img id="iconos" src="../icons/mech.svg" alt="">
                <h4>vehicles : </h4>
                <p>${data.vehicles}</p>
            </div>
            <div id="list">
                <img id="iconos" src="../icons/mech.svg" alt="">
                <h4>valuation : </h4>
                <p>${data.valuation}</p>
            </div>
            <div id="list">
                <img id="iconos" src="../icons/mech.svg" alt="">
                <h4>lanch : </h4>
                <p>${data.launch_sites}</p>
            </div>
            <div id="list">
                <img id="iconos" src="../icons/mech.svg" alt="">
                <h4>test : </h4>
                <p>${data.test_sites}</p>
            </div>
        </div>
        <div id="lista2">
            <div id="list">
                <img id="iconos" src="../icons/mech.svg" alt="">
                <h4>ceo : </h4>
                <p>${data.ceo}</p>
            </div>
            <div id="list">
                <img id="iconos" src="../icons/mech.svg" alt="">
                <h4>cto : </h4>
                <p>${data.cto}</p>
            </div>
            <div id="list">
                <img id="iconos" src="../icons/mech.svg" alt="">
                <h4>coo : </h4>
                <p>${data.coo}</p>
            </div>
            <div id="list">
                <img id="iconos" src="../icons/mech.svg" alt="">
                <h4>cto_propulsion : </h4>
                <p>${data.cto_propulsion}</p>
            </div>
        </div>
        `
        document.querySelector("#fundador").innerHTML=`
        <div id="img_funda"><img src="../img/img_fundador.jpg"></div>
        <div id="name_funda">${data.founder}</div>
        <div id="date">${data.founded}</div>
        `
    })
}
mostrar();