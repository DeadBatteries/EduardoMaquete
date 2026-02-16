document.addEventListener("DOMContentLoaded", ()=> {


// A ordem da exeucação importa, sempre carregar/salvar antes de renderizar

 carregarProjetos();

 
    let testemenuduvidas = document.getElementById("divduvidas");

    let menuDuvidas = renderMenuDuvida();
    
    testemenuduvidas.appendChild(menuDuvidas);


 renderizarTabela();

});

const tabelamaquetes = document.getElementById("tabelaMaquetes");

const tipo = ["tipo_duvida", "tipo_projeto"];

let projetoAtivoID;
let historico = [];

let menuaberto = false;


const STATUS = [

"Em revisão",
"A fazer",
"Em produção",
"Finalizada",
"Entregue"


];




function renderizarTabela() {





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

        buttonDuvidas.classList.add("btn", "btn-primary");;


        

        buttonDuvidas.addEventListener("click", () => {

         console.log("ANTES:", projetoAtivoID?.id);

        projetoAtivoID = projeto.id;
       
        const projetoAtual = projetos.find(p => p.id === projetoAtivoID);
        renderDuvida(projetoAtual);

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
            //projeto.status = novoStatus;

            //atualizarProjetos();

           // renderizarStatus(badge, novoStatus);

            const novoEstado = projetos.map(p =>
            p.id === projeto.id
            ? { ...p, status: novoStatus }
            : p
            );

            setProjetos(novoEstado);

        });



    });

console.log("renderizartabela rodou");
  
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

function renderMenuDuvida(){
   

    let menuDuvidas = document.createElement("div");
    menuDuvidas.classList.add("containerduvidas");

    let painel = document.createElement("div");
    painel.classList.add("painel");

    let fecharbutton = document.createElement("button");
    fecharbutton.textContent = "x";
    fecharbutton.id = "fecharmenu";
    fecharbutton.classList.add("btn", "fechar");;

    const colunaForm = document.createElement("div");
    colunaForm.classList.add("coluna", "form");
    colunaForm.textContent = "Formulario"
    
    const colunaAbertas = document.createElement("div");
    colunaAbertas.classList.add("coluna", "abertas");
    
    const tituloAbertas = document.createElement("h3");
    tituloAbertas.textContent = "Em aberto";

    const listaAbertas = document.createElement("div");
    listaAbertas.classList.add("lista-abertas");

    const colunaResolvidas = document.createElement("div");
    colunaResolvidas.classList.add("coluna", "resolvidas");

     const tituloResolvidas = document.createElement("h3");
    tituloResolvidas.textContent = "Resolvidas";

    const listaResolvidas = document.createElement("div");
    listaResolvidas.classList.add("lista-resolvidas");


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
       enviar.classList.add("btn", "btn-primary");
      
     
    colunaAbertas.appendChild(tituloAbertas);
    colunaAbertas.appendChild(listaAbertas);

    colunaResolvidas.appendChild(tituloResolvidas);
    colunaResolvidas.appendChild(listaResolvidas);

   
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

    console.log(duvida);

    let autor = autorinput.value;

    console.log(autor);

    let tipoAtual = "tipo_duvida";

    let duvidacriada = criarDuvida(autor, duvida , tipoAtual);

    if(duvidacriada === null){
        alert("Os dados não foram inseridos corretamente");
    }

    autorinput.value = "";
    textoinput.value = "";

    renderDuvida();
    console.log(projetoAtivoID);
 

    })

    fecharbutton.addEventListener("click", () => {

        projetoAtivoID = null;
        Duvida();
      

        


    });

    
    return menuDuvidas;
    
};



function criarDuvida (autor,texto, tipoatual) {

    const projetoAtual = projetos.find(p => p.id === projetoAtivoId);

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

    if(projetoAtual === undefined){
        return null;
    }
    


    let duvida = {id:gerarId(tipoatual), autor:autor, texto:texto, respondida:false, respostas: []};


    const novoEstado = projetos.map(p =>
    p.id === projetoAtivoID
        ? { ...p, duvidas: [...p.duvidas, duvida] }
        : p
);

    setProjetos(novoEstado);

    return duvida;

};





function renderDuvida() {

    const projetoAtual = projetos.find(p => p.id === projetoAtivoID);

    if(!projetoAtual){
        return;
    }

    let listaAbertas = document.querySelector(".lista-abertas");
    let listaResolvidas = document.querySelector(".lista-resolvidas");

    listaAbertas.innerHTML = "";
    listaResolvidas.innerHTML = "";

    projetoAtual.duvidas.forEach(duvida => {

    
    if(duvida.respondida === false){

        let card = document.createElement("div")
        card.classList.add("card-duvida");
        card.dataset.id = duvida.id;

        let titulo = document.createElement("h4");
        titulo.textContent = duvida.autor;

        let texto = document.createElement("p");
        texto.textContent = duvida.texto;

        let responder = document.createElement("button");
        responder.classList.add("btn", "btn-primary");;
        responder.textContent = "Responder";

        let remover = document.createElement("button");
        remover.classList.add("btn", "btn-danger");
        remover.textContent = "Remover";

        card.appendChild(titulo);
        card.appendChild(texto);
        card.appendChild(responder);
        card.appendChild(remover);

        listaAbertas.appendChild(card);

        responder.addEventListener("click", ()=> {

            let autorResposta = prompt("Autor: ");
            let resposta = prompt("Digite: ");

            if(!autorResposta){
                alert("Digite o autor");
                return;
            }

            if(!resposta){
                alert("Digite uma resposta");
                return;
            }

            let respostapronta = {id: "RESP-"+Date.now(),autor: autorResposta, texto: resposta};

            const novoEstado = projetos.map(p => {

            if(p.id !== projetoAtivoID) return p;

             return {
                ...p,
                 duvidas: p.duvidas.map(d =>
                 d.id === duvida.id
                 ? {
                    ...d,
                    respondida: true,
                    respostas: [...d.respostas, respostapronta]
                  }
                : d
                )
             };
            });

            setProjetos(novoEstado);

        });

        remover.addEventListener("click", () => {

            

           const novoEstado = projetos.map(p =>
           p.id === projetoAtivoID
           ? {
                 ...p,
                 duvidas: p.duvidas.filter(d => d.id !== duvida.id)
            }
            : p
            );

           setProjetos(novoEstado);



        });


    }else if(duvida.respondida === true){

        let card = document.createElement("div")
        card.classList.add("card-duvida");
        card.dataset.id = duvida.id;

        let titulo = document.createElement("h4");
        titulo.textContent = duvida.autor;

        let texto = document.createElement("p");
        texto.textContent = duvida.texto;

        let responder = document.createElement("button");
        responder.classList.add("btn", "btn-primary");;
        responder.textContent = "Responder";

        let remover = document.createElement("button");
        remover.classList.add("btn", "btn-danger");
        remover.textContent = "Remover";

        let containerrespostas = document.createElement("div");
        containerrespostas.classList.add("container-respostas");

        duvida.respostas.forEach(resposta =>{

            let removerresposta = document.createElement("button");
            removerresposta.classList.add("btn", "btn-danger");
            removerresposta.textContent = "Remover";

            let cardresposta = document.createElement("div");
            cardresposta.classList.add("card-resposta");
             

            let autorresposta = document.createElement("h5");
            autorresposta.textContent = resposta.autor;

            let textoresposta = document.createElement("p");
            textoresposta.classList.add("textoresposta");
            textoresposta.textContent = resposta.texto;


            removerresposta.addEventListener("click", ()=>{

                const novoEstado = projetos.map(p => {

                    if (p.id !== projetoAtivoID) return p;

                     return {
                     ...p,
                    duvidas: p.duvidas.map(d => {
                        if (d.id !== duvida.id) return d;

                         return {
                     ...d,
                    respostas: d.respostas.filter(r => r.id !== resposta.id)
                    };

                    })

                    };
            });

            console.log(JSON.stringify(projetos, null, 2));

             setProjetos(novoEstado);

            });


            cardresposta.appendChild(autorresposta);
            cardresposta.appendChild(textoresposta);
            cardresposta.appendChild(removerresposta);

            containerrespostas.appendChild(cardresposta);

        });

       
        card.appendChild(titulo);
        card.appendChild(texto);
        card.appendChild(responder);
        card.appendChild(remover);
        card.appendChild(containerrespostas);
       

        listaResolvidas.appendChild(card);

        responder.addEventListener("click", ()=> {

            let autorResposta = prompt("Autor: ");
            let resposta = prompt("Digite: ");

            if(!autorResposta){
                alert("Digite o autor");
                return;
            }


            if(!resposta){
                alert("Digite uma resposta");
                return;
            };

             let novoEstado = projetos.map(p => {

                if (p.id === projetoAtivoID) {

                    return {    

                    ...p,
                     duvidas: p.duvidas.map(d => {

                        if (d.id === duvida.id) {
                        return {
                            ...d,
                            respostas: [...d.respostas, { autor: autorResposta, texto: resposta }]

                             }

                        }

                return d;

                })

                    }
                }
                return p;

             });
                
            setProjetos(novoEstado);

        });

        remover.addEventListener("click", () => {

           let novoEstado = projetos.map(p => {

            if(p.id === projetoAtivoID){

                return{

                    ...p, duvidas: p.duvidas.filter(d => d.id !== duvida.id)

                };

                
            }
            return p;

           });

           

           setProjetos(novoEstado); 
    });


};




});

};

function gerarId(tipoValido) {

    let prefixo;

   if(tipoValido === "tipo_duvida"){
    
    prefixo = "DUV-";

    let idPronto = prefixo + Date.now();

    return idPronto;
   }

  




};

function salvarProjetos(){

//chave dos projetos: ProjetosSalvos
localStorage.setItem("ProjetosSalvos", JSON.stringify(projetos));

};  

function carregarProjetos() {

//chave dos projetos: ProjetosSalvos

const dadosSalvos = localStorage.getItem("ProjetosSalvos");

if(dadosSalvos !== null) {

    projetos = JSON.parse(dadosSalvos);

}

console.log("carregar projeto rodou");

};



function setProjetos(novoEstado) {

    historico.push(JSON.parse(JSON.stringify(projetos)));

    projetos = novoEstado;
    
    salvarProjetos();
    renderizarTabela();
    if(projetoAtivoID) renderDuvida();

};