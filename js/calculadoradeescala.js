
let Cotas = [


];


const containerCotas = document.querySelector(".containerCotas");

const valordometro = document.getElementById("valordometro");

const cotaBase = document.getElementById("cotaBase");

const novaCota = document.getElementById("novasCotas");

const escalaSelecionada = document.querySelector('input[name = "escala"]:checked');

const calcularbutton = document.getElementById("calcularbutton");

calcularbutton.addEventListener("click", () => {

    calcularMetragem()

});


function renderizarCotas() {

    containerCotas.innerHTML = "";
    
    Cotas.forEach(c => {

        let divcota = document.createElement("div");
        divcota.classList.add("div-cotas");

        let cotarender = document.createElement("ul");
        cotarender.classList.add("cota-bloco");

        let valordometrorender = document.createElement("li");
        valordometrorender.id = "valor-do-metro";
        valordometrorender.textContent = c.valormetro;

        let cotabaserender = document.createElement("li");
        cotabaserender.id = "valor-do-metro";
        cotabaserender.textContent = c.base;
        
        let resultadorender = document.createElement("li");
        resultadorender.id = "resultado-cota";
        resultadorender.textContent = c.resultado;

        let removercotabutton = document.createElement("button");
        removercotabutton.id = "remover-cota-button";
        removercotabutton.textContent = "Remover";


        cotarender.appendChild(valordometrorender);
        cotarender.appendChild(cotabaserender);
        cotarender.appendChild(resultadorender);

        divcota.appendChild(removercotabutton);
        divcota.appendChild(cotarender);

        containerCotas.appendChild(divcota);

        removercotabutton.addEventListener("click", ()=> {

            removerCota(c.id);


        });
        
    });
    


};

function removerCota (id) {

  Cotas = Cotas.filter(c => c.id !== id); 

  setEstado();


}

function gerarId(){


   let prefixo = "COT=" + Date.now();
   
   return prefixo


}


function calcularMetragem() {

    let valordomt = parseFloat(valordometro.value);

    let cotabase = parseFloat(cotaBase.value);

    let novacota = parseFloat(novaCota.value);

    let resultado = novacota * valordomt;

    let novaCotafinal = {id:gerarId(),valormetro: valordomt, base: novacota, resultado:resultado};

    Cotas.push(novaCotafinal);
  

    if(cotabase && !Cotas.some(c => c.base === cotabase)){
   

    let cotacalculada = valordomt * cotabase;

    let cotabasefinal = {valormetro: valordomt, base: cotabase, resultado:cotacalculada}

    Cotas.push(cotabasefinal);

    };

    console.log(Cotas);
    console.log(novaCotafinal);

    setEstado();

    
};

function salvarProjetos (){
    
    localStorage.setItem("CotasSalvas", JSON.stringify(Cotas));

}

function setEstado(){


    salvarProjetos();

    renderizarCotas();


}