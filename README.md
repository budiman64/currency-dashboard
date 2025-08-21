# Secure Currency Exchange Dashboard with Netlify Functions

> A dynamic front-end dashboard that fetches and displays live currency exchange rates. This project uses a serverless Netlify Function as a secure proxy to protect the API key, ensuring that sensitive credentials are never exposed in the client-side code.

---

## 🚀 Live Demo

You can view the live project here: **[your-live-demo-link-here.com]**

_(Remember to replace the link above after you deploy the project to Netlify.)_

---

## ✨ Overview

This project is a web-based dashboard that provides up-to-date currency exchange rates against the US Dollar. The application fetches data from the live ExchangeRate-API and presents it in two ways: a clear, readable list and a simple bar chart for quick visual comparison. The core of this project is its secure architecture, which uses a serverless function to handle all interactions with the external API, a best practice for managing sensitive API keys.

---

## 🔑 Architecture: Secure API Proxy Pattern

To protect the API key, this project implements a server-side proxy using a Netlify Function. The client-side code (running in the browser) never directly communicates with the external API.

**The data flow is as follows:**

1.  The browser's JavaScript makes a `fetch` request to a local endpoint (`/.netlify/functions/get-rates`).
2.  This request triggers the Netlify Function running on Netlify's servers.
3.  The function securely retrieves the API key from the environment variables (which are inaccessible to the browser).
4.  The function then makes a request to the external ExchangeRate-API, including the secret key.
5.  The external API returns the data to the Netlify Function.
6.  The Netlify Function sends the data back to the browser as the final response.

This pattern ensures the API key remains confidential, preventing unauthorized use.

---

## 📋 Key Features

- **Live Data:** Fetches real-time currency exchange rates from an external API.
- **Secure API Key Management:** Uses a Netlify Function as a serverless proxy to hide the API key from the client.
- **Data Visualization:** Displays rates in both a list and a bar chart using Chart.js.
- **Asynchronous JavaScript:** Uses `async/await` for clean and efficient handling of network requests.
- **Error Handling:** Provides user feedback if the API data cannot be fetched.

---

## 💻 Tech Stack

- **HTML5**
- **CSS3**
- **JavaScript (ES6+)** with `async/await` and `fetch`
- **Netlify Functions** (Serverless) for the secure API proxy
- **Chart.js** for data visualization

---

## 🛠️ Local Development Setup

Because this project uses Netlify Functions, you cannot run it by simply opening the `index.html` file. You must use the Netlify CLI to simulate the serverless environment locally.

1.  **Clone the repository:**

    ```sh
    git clone [https://github.com/your-username/currency-dashboard-project.git](https://github.com/your-username/currency-dashboard-project.git)
    cd currency-dashboard-project
    ```

2.  **Install the Netlify CLI:**

    ```sh
    npm install netlify-cli -g
    ```

3.  **Create a local environment file:**
    Create a file named `.env` in the root of your project folder. Add your API key to this file:

    ```
    EXCHANGE_RATE_API_KEY=your_actual_api_key_here
    ```

    _(The `.env` file is typically ignored by Git to prevent you from accidentally committing secrets.)_

4.  **Run the local development server:**
    ```sh
    netlify dev
    ```
    This command will start a local server (usually at `http://localhost:8888`) and make your environment variables and functions available, just like on Netlify's live platform. Your project will now work correctly.
