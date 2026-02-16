document.addEventListener("DOMContentLoaded", () => {

    // 1️⃣ Seleciona o botão
    const btnDaltonismo = document.getElementById("toggleDaltonismo");

    // 2️⃣ Estado salvo no localStorage
    let modoDaltonismo = localStorage.getItem('modoDaltonismo') === 'true';
    if(modoDaltonismo){
        document.body.classList.add('daltonismo');
        aplicarCharmezinho();
    }

    // 3️⃣ Função que aplica o charmezinho
    function aplicarCharmezinho() {
        const ligado = document.body.classList.contains('daltonismo');

        // Painel e tabela
        document.getElementById("app").style.backgroundColor = ligado ? "#f5f5f5" : "#ffffff";
        document.querySelector(".tabela").style.backgroundColor = ligado ? "#f5f5f5" : "#ffffff";
        document.getElementById("tabelaMaquetes").style.backgroundColor = ligado ? "#f5f5f5" : "#ffffff";

        // Badges de status
        document.querySelectorAll(".badge").forEach(b => {
            if(ligado){
                const statusClasse = b.className.split(' ').find(c => c.startsWith('status-'));
                switch(statusClasse){
                    case 'status-em-revisao': b.style.backgroundColor = "#ffcc00"; break;
                    case 'status-a-fazer': b.style.backgroundColor = "#0099cc"; break;
                    case 'status-em-producao': b.style.backgroundColor = "#3366cc"; break;
                    case 'status-finalizada': b.style.backgroundColor = "#33cc33"; break;
                    case 'status-entregue': b.style.backgroundColor = "#666666"; break;
                }
                b.style.color = "#fff";
            } else {
                b.style.backgroundColor = "";
                b.style.color = "";
            }
        });

        // Cards de dúvidas
        document.querySelectorAll(".card-duvida").forEach(c => {
            c.style.backgroundColor = ligado ? "#eeeeee" : "";
            c.style.color = ligado ? "#333" : "";
        });
    }

    // 4️⃣ Toggle do botão
    btnDaltonismo.addEventListener("click", () => {
        document.body.classList.toggle("daltonismo");
        localStorage.setItem('modoDaltonismo', document.body.classList.contains('daltonismo'));
        aplicarCharmezinho();
    });

    // 5️⃣ Função pública para reaplicar quando recriar elementos
    window.aplicarCharmezinho = aplicarCharmezinho;

});
