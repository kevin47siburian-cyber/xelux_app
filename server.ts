import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for parsing JSON bodies
  app.use(express.json());

  // API endpoint for AI chat
  app.post('/api/chat', async (req, res) => {
    try {
      const { prompt } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      const systemInstruction = "Anda adalah AI Assistant cerdas di website portofolio Kevin Creig N.S. Kevin adalah siswa SMK Bhakti Mulia Pare, jurusan Rekayasa Perangkat Lunak (RPL). Anda dapat menjawab pertanyaan apa pun dari pengguna. Gunakan bahasa Indonesia yang ramah, profesional, dan sedikit santai.";

      const envKey = process.env.GEMINI_API_KEY;
      const isValidEnv = envKey && envKey !== 'MY_GEMINI_API_KEY';

      // Fallback ke Gemini API jika API Key ada di environment variables (misal di setting Vercel)
      if (isValidEnv) {
        // Dynamic import to avoid errors if not installed properly, though it is in package.json
        const { GoogleGenAI } = await import('@google/genai');
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
        // Menggunakan API gratis dari Pollinations AI jika belum ada API Key di environment
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
      res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
