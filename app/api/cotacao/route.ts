import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// API Key loaded from environment variable (configured in Vercel + .env.local)
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY not configured in environment variables");
}
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: NextRequest) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Prompt calibrado com faixas de referência do mercado brasileiro 2026
    // para que o Gemini retorne valores mais próximos da realidade
    const prompt = `Você é um analista do mercado brasileiro de milhas aéreas.

CONTEXTO DE MERCADO (Abril 2026, referência para calibração):
- Latam Pass: o milheiro costuma oscilar entre R$ 20,00 e R$ 30,00
- Smiles (Gol): o milheiro costuma oscilar entre R$ 15,00 e R$ 18,00
- TudoAzul: o milheiro costuma oscilar entre R$ 14,00 e R$ 20,00

Com base no seu conhecimento mais recente do mercado, qual é o valor ATUAL estimado em Reais (R$) 
que plataformas compradoras de milhas (como MaxMilhas, HotMilhas, MilhasPlus) pagariam hoje 
por 1.000 milhas (um milheiro) de cada programa?

REGRAS DE RESPOSTA:
1. Retorne APENAS um JSON válido, sem nenhum texto antes ou depois
2. Use as chaves: "latam", "smiles", "azul"
3. Valores em float com 2 casas decimais (ex: 22.50)
4. Se não tiver dados precisos do dia, use a melhor estimativa dentro das faixas acima

Formato exato:
{"latam": 25.00, "smiles": 16.50, "azul": 18.00}`;

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

    // Adiciona campo de fonte para o frontend saber a origem dos dados
    return NextResponse.json({ ...quotes, source: "gemini_ai" });

  } catch (error: any) {
    console.error("AI Route Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
