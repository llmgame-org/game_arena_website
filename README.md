# Project Initialization and Deployment

Follow these steps to set up, configure, and deploy the project locally and online.

## Step 1: Clone the Repository

1. Open a terminal or command prompt.
2. Clone the repository:
   ```bash
   git clone https://github.com/llmgame-org/llmgame-org.github.io
   ```
3. Navigate into the project directory:
   ```bash
   cd llmgame-org.github.io
   ```

---

## Step 2: Set Up the Front-End

1. Ensure you have **Node.js** and **npm** installed:
   ```bash
   node -v
   npm -v
   ```
   If not installed, download and install them from [Node.js](https://nodejs.org/).

2. Install the front-end dependencies:
   ```bash
   npm install
   ```

3. Start the front-end development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

---

## Step 3: Set Up the Backend Server

1. Ensure **Python** is installed:
   ```bash
   python --version
   ```
   If not installed, download and install it from [python.org](https://www.python.org/).

2. Create a virtual environment:
   ```bash
   python -m venv game_arena_venv
   ```

3. Activate the virtual environment:
   - On Linux/macOS:
     ```bash
     source game_arena_venv/bin/activate
     ```
   - On Windows:
     ```bash
     game_arena_venv\Scripts\activate
     ```

4. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Start the backend server:
   ```bash
   python ./src/backend/app.py
   ```
   The backend will run on port `5000` by default.

---

## Step 4: Set Up `ngrok` for API Access

1. Install **ngrok**:
   - Download it from [ngrok.com](https://ngrok.com/download).
   - Follow the installation instructions for your operating system.

2. Start ngrok to expose the backend API:
   ```bash
   ngrok http 5000
   ```
   Copy the generated `https` URL from the ngrok output (e.g., `https://abc123.ngrok.io`).

3. Update the `base_url.js` for the frontend:
   - Open the file `./src/backend/base_url.js` in a text editor.
   - Replace `http://127.0.0.1:5000` with the ngrok-generated URL.

   Example `base_url.js`:
   ```javascript
   const BASE_URL = "https://abc123.ngrok.io"; // ngrok URL
   export default BASE_URL;
   ```

   **Important:** Adding the `ngrok` link as the `BASE_URL` allows the frontend to access backend data seamlessly.

---

## Step 5: Deploy the Website

1. Ensure all changes are committed and pushed to the repository.
2. Run the following command to deploy the website to GitHub Pages:
   ```bash
   npm run deploy
   ```

3. The website will be deployed and accessible at:
   ```
   https://<username>.github.io/<repository-name>
   ```

Replace `<username>` with your GitHub username and `<repository-name>` with your repository name.

---

## Summary of Commands

### Clone the Repository:
```bash
git clone https://github.com/llmgame-org/llmgame-org.github.io
cd llmgame-org.github.io
```

### Set Up the Front-End:
```bash
npm install
npm start
```

### Set Up the Backend:
```bash
python -m venv game_arena_venv
source game_arena_venv/bin/activate  # or game_arena_venv\Scripts\activate on Windows
pip install -r requirements.txt
python ./src/backend/app.py
```

### Expose Backend with ngrok:
```bash
ngrok http 5000
```

### Update `base_url.js`:
```javascript
const BASE_URL = "https://abc123.ngrok.io"; // Replace with ngrok link
export default BASE_URL;
```

### Deploy the Website:
```bash
npm run deploy
```

---

This README provides all the necessary steps to initialize, configure, and deploy the project.
