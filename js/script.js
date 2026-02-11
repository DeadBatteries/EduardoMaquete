document.addEventListener("DOMContentLoaded", renderizarTabela);


const tabelamaquetes = document.getElementById("tabelaMaquetes");

const tipo = ["tipo_duvida", "tipo_projeto"];

let projetoativo;

//let duvidas = [];

const STATUS = [

"Em revisão",
"A fazer",
"Em produção",
"Finalizada",
"Entregue"


];




function renderizarTabela() {




     let testemenuduvidas = document.getElementById("divduvidas");

    let menuDuvidas = renderDuvida();
    
    testemenuduvidas.appendChild(menuDuvidas);






    tabelamaquetes.textContent = "";

    projetos.forEach(projeto => {
        

        //Render

        let row = document.createElement("tr");

        let tdType = document.createElement("td");
        tdType.textContent = projeto.tipo;

        row.appendChild(tdType);

        let tdId = document.createElement("td");
        tdId.textContent = projeto.id;

        row.appendChild(tdId);

        let tdName = document.createElement("td");
        tdName.textContent = projeto.empreendimento;

        row.appendChild(tdName);

        let tdConstrutora = document.createElement("td");
        tdConstrutora.textContent = projeto.construtora;

        row.appendChild(tdConstrutora);

        let tdScale = document.createElement("td");

        tdScale.textContent = projeto.escala;

        row.appendChild(tdScale);

        let tdWorker = document.createElement("td");
        tdWorker.textContent = projeto.responsaveis;

        row.appendChild(tdWorker);

        let tdStatus = document.createElement("td");

        let badge = document.createElement("span");

        badge.textContent = projeto.status;
        
        badge.classList.add("badge");
        badge.dataset.id = projeto.id;

        const statusClasse = projeto.status
        .toLowerCase()
        .replace(" ", "-");

        badge.classList.add(`status-${statusClasse}`);

        badge.style.cursor = "pointer";

        tdStatus.appendChild(badge);
        row.appendChild(tdStatus);

        let tdStart = document.createElement("td");
        tdStart.textContent = projeto.inicio;

        row.appendChild(tdStart);

        let tdEnd = document.createElement("td");
        tdEnd.textContent = projeto.entrega;

        row.appendChild(tdEnd);

        let tdDuvidas = document.createElement("td")
        tdDuvidas.id = "duvidasrow";

        row.appendChild(tdDuvidas);
       
        let buttonDuvidas = document.createElement("button");

        buttonDuvidas.textContent = "Abrir";

        buttonDuvidas.classList.add("abrirduvidas");


        

        buttonDuvidas.addEventListener("click", () => {

        
        projetoativo = projeto;
        Duvida(); 
       

       // alert("cliquei");

         });


        tdDuvidas.appendChild(buttonDuvidas);
        
    

        tabelamaquetes.appendChild(row);

        

        //Listener


        badge.addEventListener("click", () => {

            const novoStatus = alterarStatus(projeto);
            if(!novoStatus){

                alert("não é possível alterar o status");
                return;

            }
            projeto.status = novoStatus;

            renderizarStatus(badge, novoStatus);

        });



    });


  
};
 







//Funções



function alterarStatus(projeto) {


     let indiceatual = STATUS.indexOf(projeto.status);
     console.log(indiceatual);

    if (indiceatual === -1){
        console.log("deu ruim");
        return null;
    };
    if(indiceatual === STATUS.length-1){
        console.log("deu ruim 2");
        return null;
    };

    return STATUS[indiceatual + 1];

};





function renderizarStatus(badge, status) {

    badge.textContent = "";

    console.log(status);

    badge.textContent = status;

    badge.className = "badge";

    const statusClasse = status
    .toLowerCase()
    .replace(/\s+/g, "-");

    badge.classList.add(`status-${statusClasse}`);

    console.log("funcionou");
};


function Duvida() {


    let menuDuvidas = document.querySelector(".containerduvidas");
    
    menuDuvidas.classList.toggle("aberto");
   

};

function renderDuvida(){
   
  

    let menuDuvidas = document.createElement("div");
    menuDuvidas.classList.add("containerduvidas");

    let painel = document.createElement("div");
    painel.classList.add("painel");

    let fecharbutton = document.createElement("button");
    fecharbutton.textContent = "x";
    fecharbutton.id = "fecharmenu";

    const colunaForm = document.createElement("div");
    colunaForm.classList.add("coluna", "form");
    colunaForm.textContent = "Formulario"
    
    const colunaAbertas = document.createElement("div");
    colunaAbertas.classList.add("coluna", "abertas");
    colunaAbertas.textContent = "Em aberto"

    const colunaResolvidas = document.createElement("div");
    colunaResolvidas.classList.add("coluna", "resolvidas");
    colunaResolvidas.textContent = "Resolvidas";

    let labelautor = document.createElement("label");
     labelautor.textContent = "Autor: ";

    let autorinput = document.createElement("input");
     autorinput.id = "autor";

    labelautor.htmlFor = "autor";

    labelautor.appendChild(autorinput);



    let labeltexto = document.createElement("label");
     labeltexto.textContent = "Digite Aqui: ";

    let textoinput = document.createElement("input");
     textoinput.id = "textoduvida";  

    labeltexto.htmlFor = "textoduvida";

    labeltexto.appendChild(textoinput);



    let enviar = document.createElement("button");

       enviar.textContent = "Enviar";
       enviar.id = "enviar";

        
     


   
    colunaForm.appendChild(labeltexto);
    colunaForm.appendChild(labelautor);
    colunaForm.appendChild(enviar);

    painel.appendChild(colunaForm);
    painel.appendChild(colunaAbertas);
    painel.appendChild(colunaResolvidas);
    painel.appendChild(fecharbutton);

    menuDuvidas.appendChild(painel);


    enviar.addEventListener("click", () => {

    let duvida = textoinput.value;
    let autor = autorinput.value;

    let tipoAtual = "tipo_duvida";

    let duvidacriada = criarDuvida(duvida, autor , tipoAtual);

    if(duvidacriada === null){
        alert("");
    }

    textoinput.value = "";
    autorinput.value = "";

    })

    fecharbutton.addEventListener("click", () => {
        Duvida();
        projetoativo = null;

        


    });

    return menuDuvidas;
    
};

function ativarprojeto (projeto) {

    let projetoativo = projeto;

}

function criarDuvida (autor,texto, tipoatual) {

    if(autor === ""){
        return null;
    }

    if(texto === ""){
        return null;

    }

    if(!tipo.includes(tipoatual) ){

        return null;

    }
    
    if(!tipoatual){
    
    return null;
    
    }

    if(projetoativo === null){
        return null;
    }
    


    let duvida = {id:gerarId(tipoatual), autor:autor, texto:texto, respondida:false};

    projetoativo.duvidas.push(duvida);

};

function gerarId(tipoValido) {

    let prefixo;

   if(tipoValido === "tipo_duvida"){
    
    prefixo = "DUV-";

    let idPronto = prefixo + Date.now();

    return idPronto;
   }

  




};

