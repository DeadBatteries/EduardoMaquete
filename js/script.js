document.addEventListener("DOMContentLoaded", renderizarTabela);

const STATUS = [

"Em revisão",
"A fazer",
"Em produção",
"Finalizada",
"Entregue"


];



const tabelamaquetes = document.getElementById("tabelaMaquetes");

renderizarTabela;

function renderizarTabela() {

    tabelamaquetes.textContent = "";

    projetos.forEach(projeto => {
        

        //Render


        let row = document.createElement("tr");

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

