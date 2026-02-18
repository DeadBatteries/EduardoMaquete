document.addEventListener("DOMContentLoaded", () => {

carregarProjetos();


});

let Cotas = [


];

const unidadeDeMedida = document.querySelector("input[name='unidades']:checked");

const containerCotas = document.querySelector(".containerCotas");

const valordometro = document.getElementById("valordometro");

const cotaBase = document.getElementById("cotaBase");

const novaCota = document.getElementById("novasCotas");

const calcularbutton = document.getElementById("calcularbutton");

const botaoManual = document.getElementById("show-valor-do-metro");

const divValorMetro = document.getElementById("valor-do-metro-div");

const radioEscala = document.querySelectorAll("input[name='radio']:checked");
console.log(radioEscala);


calcularbutton.addEventListener("click", () => {

    calcularMetragem();

});

botaoManual.addEventListener("click", () => {


    radioEscala.forEach(r => {

        r.checked = false;

    });

    divValorMetro.hidden = false;





});



function renderizarCotas() {

    containerCotas.innerHTML = "";

    Cotas.forEach(c => {

        let divcota = document.createElement("div");
        divcota.classList.add("div-cotas");

        let cotarender = document.createElement("ul");
        cotarender.classList.add("cota-bloco");

        let cotaAtualrender = document.createElement("li");
        cotaAtualrender.id = "cota-atual";
        cotaAtualrender .textContent = "Cota atual: " + c.novacota;
       
        let cotabaserender = document.createElement("li");
        cotabaserender.id = "valor-do-metro";
        cotabaserender.textContent = "Cota base: " + c.cotabase;

        let alturacotarender = document.createElement("li");
        alturacotarender.id = "resultado-cota";
        alturacotarender.textContent = `Altura final: ${c.alturacota.toFixed(2)} mm`;

        let diferencarender = document.createElement("li");
        diferencarender.id = "diferenca-cota";
        diferencarender.textContent = "Diferença: " + c.diferenca.toFixed(2);

        let removercotabutton = document.createElement("button");
        removercotabutton.id = "remover-cota-button";
        removercotabutton.textContent = "Remover";


        cotarender.appendChild(cotabaserender);
        cotarender.appendChild(cotaAtualrender);
        cotarender.appendChild(alturacotarender);
        cotarender.appendChild(diferencarender);


        divcota.appendChild(removercotabutton);
        divcota.appendChild(cotarender);

        containerCotas.appendChild(divcota);

        removercotabutton.addEventListener("click", () => {

            removerCota(c.id);


        });

    });



};

function removerCota(id) {

    Cotas = Cotas.filter(c => c.id !== id);

    setEstado();


}

function gerarId() {


    let prefixo = "COT=" + Date.now();

    return prefixo


}


function calcularMetragem() {
    
    let metro;
    let escalaSelecionada = pegarEscala();
    let cotabase = replaceVirgula(cotaBase.value);
    let valormt = replaceVirgula(valordometro.value);
    let cota = replaceVirgula(novaCota.value);

    console.log("cotabase = " + cotabase);
    console.log("escalaselecionada =" + escalaSelecionada);
    console.log("valor do metro selecionado = " + valormt);
    console.log("nova cota atual = " + cota);


    if (isNaN(cotabase) || isNaN(cota)){

        alert("Digite cotas válidas");
        return;

    };

    if (!isNaN(valormt)) {

    metro = valormt;
    console.log("valordometro passou");

    }else if(escalaSelecionada){

    metro = escalaSelecionada;
    console.log("escala selecionada passou");

    };
    
    if(metro === null || metro === undefined){

        alert("Selecione uma escala ou digite o valor do metro")
        return;

    }

    let diferencadascotas = cota - cotabase;
    
    if(diferencadascotas < 0){

        alert("A NOVA COTA não deve ser menor que a COTA BASE")
        return;

    }
    let alturacota = diferencadascotas * metro;

    let novaCotaFinal = {

        id:gerarId(),
        cotabase: cotabase,
        novacota: cota,
        diferenca: diferencadascotas,
        alturacota: alturacota

    };

    Cotas.push(novaCotaFinal);

    novaCota.value = "";


    setEstado();

};

function carregarProjetos() {

    const  dadosSalvos = localStorage.getItem("CotasSalvas");

    if(!dadosSalvos) return;

    Cotas = JSON.parse(dadosSalvos);

    renderizarCotas();




}

function salvarProjetos() {

    localStorage.setItem("CotasSalvas", JSON.stringify(Cotas));

}

function setEstado() {


    salvarProjetos();

    renderizarCotas();


}


function pegarEscala() {

    const selecionado = document.querySelector("input[name='escalas']:checked");

    if(!selecionado) return null;

    const valor = parseFloat(selecionado.value);

    if(isNaN(valor)) return null;

    return valor;


};

function replaceVirgula(valor) {

    if(!valor) return NaN;

    return parseFloat(valor.replace(",", "."));


}