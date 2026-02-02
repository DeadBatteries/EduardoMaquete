window.addEventListener("load", () => {
  const loading = document.getElementById("loading");
  const app = document.getElementById("app");

  // tempo do vídeo (em ms)
  const tempoLoading = 8000;

  setTimeout(() => {
    loading.classList.add("hide");

    setTimeout(() => {
      loading.style.display = "none";
      app.classList.add("show");
    }, 800);
  }, tempoLoading);
});

const video = document.getElementById("introvideo");

document.addEventListener("click", () => {
  video.muted = false;
}, { once: true });