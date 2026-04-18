import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Use the user's provided Gemini Google API Key statically for this demo implementation
const genAI = new GoogleGenerativeAI("AIzaSyB3WPuWeE8eFH43c32-GgceAjm8YkfGtww");

export async function POST(req: NextRequest) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // We ask Gemini to estimate the current market value of milheiro (1k miles) for Latam, Smiles and Azul
    // as it would be sold to a platform like MaxMilhas/HotMilhas.
    const prompt = `Atue como um especialista e pesquisador do mercado financeiro e de milhas aéreas brasileiro.
Qual é o valor aproximado **atualizado** de mercado (em Reais R$) que plataformas consolidadas compradoras de milhas (como MaxMilhas ou HotMilhas) pagariam hoje por 1.000 (um milheiro) de milhas dos seguintes programas?
1. Latam Pass
2. Smiles (Gol)
3. TudoAzul (Voe Azul)

Apenas me retorne ABSOLUTAMENTE um JSON válido e nada mais, com chaves em minúsculo: "latam", "smiles", "azul", contendo apenas o NÚMERO em float (ex: 22.50).
Se você não tiver acesso à cotação idêntica de hoje, me dê a estimativa do valor de balcão mais realista do mercado atual. Retorne exatamente este formato:
{
  "latam": 23.50,
  "smiles": 15.00,
  "azul": 20.00
}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Clean up potential markdown formatting from Gemini response
    const jsonString = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
    
    let quotes;
    try {
      quotes = JSON.parse(jsonString);
    } catch (err) {
      console.error("Failed to parse AI JSON:", responseText);
      return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
    }

    return NextResponse.json(quotes);

  } catch (error: any) {
    console.error("AI Route Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
