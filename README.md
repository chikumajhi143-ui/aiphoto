# Odisha Cloud - AI Photo Enhancer 🚀

A premium AI-powered image enhancement ecosystem with a Glassmorphism UI, Node.js backend, and Python AI service.

![Odisha Cloud Banner](https://raw.githubusercontent.com/chikumajhi143-ui/aiphoto/main/web/public/banner-demo.png)

## ✨ Features

- **Face Restoration**: AI-powered facial reconstruction for blurry or old portraits.
- **4K Upscaling**: Upscale low-resolution images to 4K without losing quality.
- **Glassmorphism UI**: A stunning, modern interface built with React and Framer Motion.
- **Decoupled Architecture**: Separate Frontend, Backend, and AI Service for maximum scalability.

---

## 🏗️ Project Structure

- **`web/`**: Frontend built with Vite, React, Tailwind CSS, and Lucide icons.
- **`backend/`**: API layer built with Node.js, Express, and Multer for secure file handling.
- **`ai-service/`**: Python service for AI model inference (GFPGAN, Real-ESRGAN).

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18+)
- **Python** (3.8+)
- **Git**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/chikumajhi143-ui/aiphoto.git
   cd aiphoto
   ```

2. **Setup Frontend:**
   ```bash
   cd web
   npm install
   npm run dev
   ```

3. **Setup Backend:**
   ```bash
   cd ../backend
   npm install
   npm run dev
   ```

4. **Setup AI Service:**
   ```bash
   cd ../ai-service
   pip install -r requirements.txt
   python main.py
   ```

---

## ☁️ Deployment

### Deploying Frontend to Vercel

1. **Push your code to GitHub.**
2. **Log in to [Vercel](https://vercel.com).**
3. **Import the repository.**
4. **Set the Framework Preset to `Vite`.**
5. **Set the Root Directory to `web`.**
6. **Click Deploy!**

---

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, Lucide Icons.
- **Backend**: Node.js, Express, Multer, Helmet, Morgan.
- **AI**: Python, Flask, PyTorch, GFPGAN, Real-ESRGAN.

---

## 📄 License

© 2026 Odisha Cloud. All rights reserved.
