
const STATUS = [

"Em revisão",
"A fazer",
"Em produção",
"Finalizada",
"Entregue"


];



const tabelamaquetes = document.getElementById("tabelaMaquetes");

projetos.forEach(projeto => {
    
    let row = document.createElement("tr");

    let tdId = document.createElement("td");
    tdId.textContent = projeto.id;

    row.appendChild(tdId);

    let tdName = document.createElement("td");
    tdName.textContent = projeto.empreendimento

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
    badge.dataset.id = projeto.id

    const statusClasse = projeto.status
    .toLowerCase()
    .replace(" ", "-");

    badge.classList.add(`status-${statusClasse}`);

    badge.style.cursor = "pointer";

    badge.addEventListener("click", () => {

        avancarStatus(projeto, badge);

    });

    tdStatus.appendChild(badge);
    row.appendChild(tdStatus);

    let tdStart = document.createElement("td");
    tdStart.textContent = projeto.inicio;

    row.appendChild(tdStart);

    let tdEnd = document.createElement("td");
    tdEnd.textContent = projeto.entrega;

    row.appendChild(tdEnd);

    tabelamaquetes.appendChild(row);

});


 

function avancarStatus(projeto, badge) {


     let indiceatual = STATUS.indexOf(projeto.status);
     console.log(indiceatual);

    if (indiceatual === -1){
        console.log("deu ruim");
        return;
    }
    if(indiceatual === STATUS.length-1){
        console.log("deu ruim 2");
        return;
    }

    proximoStatus = STATUS[indiceatual + 1];
    
    projeto.status = proximoStatus;

    badge.textContent = proximoStatus;

    badge.className = "badge";

    const statusClasse = proximoStatus
    .toLowerCase()
    .replace(/\s+/g, "-")

    badge.classList.add(statusClasse);

};
