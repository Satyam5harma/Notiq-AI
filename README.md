# Notiq-AI

**Notiq-AI** is an intelligent voice note application that records, transcribes, summarizes, and tags your thoughts using AI. Built with React, TypeScript, and the Google Gemini API, it offers a seamless experience for capturing and organizing your ideas on the fly.

## ✨ Features

-   🎤 **One-Click Recording:** Start recording your voice notes instantly with a simple, intuitive interface.
-   ✍️ **Live Transcription:** See your speech converted to text in real-time using the browser's native Web Speech API.
-   🧠 **AI-Powered Summarization:** Get a concise, AI-generated summary of your long notes, powered by Google's Gemini model.
-   🏷️ **Automatic Tagging:** Gemini automatically analyzes the content and suggests relevant tags to keep your notes organized and searchable.
-   💾 **Offline Storage:** All your notes are saved securely in your browser's local storage, ensuring your data is private and accessible even offline.
-   🎨 **Clean & Responsive UI:** A modern, dark-themed interface built with Tailwind CSS that works beautifully on desktop and mobile devices.
-   🚫 **No Backend Needed:** The entire application runs in the browser, making it easy to deploy and host on any static site platform.

## 🛠️ Tech Stack

-   **Frontend:** React, TypeScript, Tailwind CSS
-   **AI Model:** Google Gemini API (`gemini-2.5-flash`)
-   **Speech Recognition:** Web Speech API (supported in Chrome, Edge, etc.)
-   **Tooling:** Uses modern ES Modules with `importmap` for a build-free development experience.

## 🚀 Getting Started

### Prerequisites

1.  A modern web browser that supports the [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) (e.g., Google Chrome, Microsoft Edge).
2.  A **Google Gemini API Key**. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Installation & Setup

This project is designed to run directly in the browser without a complex build step.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/notiq-ai.git
    cd notiq
    ```

2.  **Set up your API Key:**
    This application requires the Gemini API key to be available as an environment variable named `API_KEY`. How you set this will depend on your hosting environment. Most modern static hosting platforms (like Vercel, Netlify, or Cloudflare Pages) provide an easy way to set environment variables.

3.  **Run the application:**
    Since this is a static application, you just need to serve the files with a simple web server. For example, using Python:
    ```bash
    # If you have Python 3
    python -m http.server
    ```
    Or with Node.js and `live-server`:
    ```bash
    npm install -g live-server
    live-server .
    ```
    Then, open your browser and navigate to the provided local address (e.g., `http://localhost:8000`).

## 📖 How to Use

1.  **Create a New Note:** Click the `+` button in the sidebar to open the recording screen.
2.  **Start Recording:** Click the large microphone icon. The app will request microphone permission if it hasn't been granted already.
3.  **Speak Your Mind:** As you speak, you'll see a live transcript appear at the bottom of the screen.
4.  **Stop Recording:** Click the stop button when you're finished.
5.  **AI Processing:** The app will send the transcript to the Gemini API to generate a title, a short summary, and a list of relevant tags.
6.  **Note Saved:** Your new, processed note will be saved and automatically selected in the note list. You can now view the full details.
7.  **Manage Notes:** Click any note in the list to view its details, or use the trash icon to delete it.
