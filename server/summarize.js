import { pipeline } from "@xenova/transformers"

import { summaryExample } from "./utils/summary.js"

export async function summarize(text) {
  try {
    //return summaryExample

    console.log("Resumindo o texto. Espere só mais um pouquinho...")

    const generator = await pipeline("summarization", "Xenova/distilbart-cnn-12-6")

    const output = await generator(text)

    console.log("Resumo concluído com sucesso! :D")
    return output[0].summary_text
  } catch (error) {
    console.log("Essa não! Não foi possível realizar o resumo! T.T", error)
    throw new Error(error)
  }
}