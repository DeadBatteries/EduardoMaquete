
let Cotas = [


];

const unidadeDeMedida = document.querySelector("input[name='unidades']:checked");

const containerCotas = document.querySelector(".containerCotas");

const valordometro = document.getElementById("valordometro");

const cotaBase = document.getElementById("cotaBase");

const novaCota = document.getElementById("novasCotas");

const calcularbutton = document.getElementById("calcularbutton");




calcularbutton.addEventListener("click", () => {

    calcularMetragem();

});


function renderizarCotas() {

    containerCotas.innerHTML = "";

    Cotas.forEach(c => {

        let divcota = document.createElement("div");
        divcota.classList.add("div-cotas");

        let cotarender = document.createElement("ul");
        cotarender.classList.add("cota-bloco");

        let originalrender = document.createElement("li");
        originalrender.id = "original-cota";
        originalrender.textContent = c.original;
        console.log(c.original);

        let cotabaserender = document.createElement("li");
        cotabaserender.id = "valor-do-metro";
        cotabaserender.textContent = c.cotabase;

        let resultadorender = document.createElement("li");
        resultadorender.id = "resultado-cota";
        resultadorender.textContent = c.resultado;

        let unidadeDeMedida = document.createElement("li");
        unidadeDeMedida.id = "unidade-de-medida";
        unidadeDeMedida.textContent = c.unidade;

        let removercotabutton = document.createElement("button");
        removercotabutton.id = "remover-cota-button";
        removercotabutton.textContent = "Remover";


       
        cotarender.appendChild(cotabaserender);
        cotarender.appendChild(originalrender);
        cotarender.appendChild(unidadeDeMedida);
        cotarender.appendChild(resultadorender);

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
    
    let fator;
    let escalaSelecionada = pegarEscala();
    let baseReal = parseFloat(cotaBase.value);
    let baseMedida = parseFloat(valordometro.value);

    if(escalaSelecionada){

        fator = escalaSelecionada;

    }else{

     if(isNaN(!baseReal) || isNaN(!baseMedida)) {

        alert("Defina corretamente as Cotas");
        return;

     }   

    fator = baseReal / baseMedida;

    };

    let valorDigitado = parseFloat(novaCota.value);

    if(isNaN(!valorDigitado)){

        alert("Digite uma cota válida");
        return;

    }

    let unidadeSelecionada = document.querySelector("input[name='unidades']:checked").value;

    if(!unidadeSelecionada) {

        alert("Selecione a Unidade");
        return;
    
    }

    let valorEmMM;

    if(unidadeSelecionada === "mm"){

        valorEmMM = valorDigitado;
        
    }else if(unidadeSelecionada === "cm"){

        valorEmMM = valorDigitado * 10;

    }else if(unidadeSelecionada === "m"){

        valorEmMM = valorDigitado * 1000;

    }

    let resultadoReal = valorEmMM / fator;

    let novaCotaFinal = {

        id:gerarId(),
        cotabase: baseReal,
        original: valorDigitado,
        unidade: unidadeSelecionada,
        fator: fator,
        resultado: resultadoReal.toFixed(2) + "mm"

    }

    Cotas.push(novaCotaFinal);

    setEstado();

};

function salvarProjetos() {

    localStorage.setItem("CotasSalvas", JSON.stringify(Cotas));

}

function setEstado() {


    salvarProjetos();

    renderizarCotas();


}


function pegarEscala() {

    const selecionado = document.querySelector("input[name='escala']:checked");

    return selecionado ? parseFloat(selecionado.value) : null;



};