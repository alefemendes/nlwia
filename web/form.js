import { server } from "./server.js"

const form = document.querySelector("#form");
const input = document.querySelector("#url");
const content = document.querySelector("#content");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  content.classList.add("placeholder")

  const videoURL = input.value

  if(!videoURL.includes("shorts")){
    return content.textContent = "Esse vídeo não parece ser um short. D:" 
  }

  const [_, params] = videoURL.split("/shorts/")
  const [videoID] = params.split("?si")
  
  content.textContent = "Obtendo o texto do seu vídeo. Aguarde..."
  
  const transcription = await server.get("/summary/" + videoID)

  content.textContent = "Seu resumo está sendo gerado. Espere só mais um pouquinho..."

  const summary = await server.post("/summary", {
    text: transcription.data.result
  })

  content.textContent = summary.data.result
  content.classList.remove("placeholder")
})