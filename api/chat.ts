import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  // Hanya support POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Tolong gunakan POST.' });
  }

  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const systemInstruction = "Anda adalah AI Assistant cerdas di website portofolio Kevin Creig N.S. Kevin adalah siswa SMK Bhakti Mulia Pare, jurusan Rekayasa Perangkat Lunak (RPL). Anda dapat menjawab pertanyaan apa pun dari pengguna. Gunakan bahasa Indonesia yang ramah, profesional, dan sedikit santai.";

    // Di Vercel Serverless Function, process.env akan membaca Environment Variables dari Vercel
    const envKey = process.env.GEMINI_API_KEY;
    const isValidEnv = envKey && envKey !== 'MY_GEMINI_API_KEY';

    const deepseekKey = process.env.DEEPSEEK_API_KEY;
    const isValidDeepseek = deepseekKey && deepseekKey !== 'MY_DEEPSEEK_API_KEY';

    if (isValidDeepseek) {
      const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${deepseekKey}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            { role: 'system', content: systemInstruction },
            { role: 'user', content: prompt }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`DeepSeek API error: ${response.status}`);
      }

      const data = await response.json();
      return res.status(200).json({ text: data.choices[0].message.content });
    } else if (isValidEnv) {
      const ai = new GoogleGenAI({ apiKey: envKey });
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction: systemInstruction,
        }
      });
      
      return res.status(200).json({ text: response.text });
    } else {
      // Fallback ke Pollinations AI
      const response = await fetch('https://text.pollinations.ai/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: systemInstruction },
            { role: 'user', content: prompt }
          ],
          model: 'openai'
        })
      });

      if (!response.ok) {
        throw new Error(`Pollinations API error: ${response.status}`);
      }

      const text = await response.text();
      return res.status(200).json({ text: text });
    }
  } catch (error: any) {
    console.error('Error with AI API:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
