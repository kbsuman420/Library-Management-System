# Railway Deployment Guide for Backend

This guide outlines the step-by-step process to deploy your Node.js/Express backend application to [Railway](https://railway.app/).

---

## 📋 Prerequisites
1. **GitHub Repository**: Make sure your codebase is pushed to a private or public GitHub repository.
2. **Railway Account**: Sign up or log in at [railway.app](https://railway.app/).
3. **Environment Variables**: Have your API keys and production credentials ready.

---

## 🛠️ Step-by-Step Deployment

### Step 1: Push your Code to GitHub
Ensure all your local changes (including the updated `package.json` with the `"start": "node src/index.js"` script) are committed and pushed to your remote repository:
```bash
git add .
git commit -m "Configure start script for Railway deployment"
git push origin main
```

### Step 2: Create a New Project on Railway
1. Go to your **Railway Dashboard**.
2. Click the **+ New Project** button in the top right corner.
3. Select **Deploy from GitHub repo** from the dropdown menu.
4. If you haven't linked your GitHub account yet, follow the prompts to authorize Railway to access your repositories.
5. Choose your backend repository and select the branch you want to deploy (usually `main` or `master`).

### Step 3: Configure Environment Variables
Before Railway starts building your project, you must set up your environment variables.
1. In the project canvas, click on your newly created service.
2. Navigate to the **Variables** tab.
3. Click **Raw Editor** (in the top right of the Variables section) and paste the variables listed below, or add them one by one.

---

## 🔑 Environment Variables to Configure

| Variable Name | Description / Recommended Value |
| :--- | :--- |
| `PORT` | *(Optional)* Railway automatically injects the `PORT` variable. Your code already handles this dynamically. |
| `MONGODB_URI` | Your MongoDB Atlas connection string. <br> **Example:** `mongodb+srv://<username>:<password>@cluster0.keqrbl3.mongodb.net/?appName=Cluster0` |
| `CORS_ORIGIN` | A comma-separated list of allowed frontend URLs. <br> **Example:** `http://localhost:5173,https://your-frontend-domain.vercel.app` |
| `ACCESS_TOKEN_SECRECT` | A secure, random string used to sign JSON Web Tokens (JWT). <br> **Example:** Run `openssl rand -hex 32` in your terminal to generate one. |
| `ACCESS_TOKEN_EXPIRY` | Token expiration time. <br> **Example:** `1d` (1 day) |
| `REFRESH_TOKEN_SECRECT`| Another secure, random string for JWT Refresh Tokens. |
| `REFRESH_TOKEN_EXPIRY`| Refresh token expiration time. <br> **Example:** `10d` (10 days) |
| `CLOUDINARY_CLOUD_NAME`| Cloud name from your Cloudinary Dashboard. |
| `CLOUDINARY_API_KEY` | API Key from your Cloudinary Dashboard. |
| `CLOUDINARY_SECRECT_KEY`| API Secret Key from your Cloudinary Dashboard. |
| `SMTP_HOST` | Hostname of your email provider. <br> **Example:** `smtp.gmail.com` |
| `SMTP_PORT` | Port of your email provider. <br> **Example:** `587` |
| `SMTP_USER` | Email address/Username used for sending emails. |
| `SMTP_PASS` | Password or App Password for your SMTP service. |
| `SMTP_FROM_NAME` | The sender name displayed in outgoing emails. <br> **Example:** `"MedConnect Verification"` |

---

### Step 4: Verify Deployment and Start command
1. Railway automatically reads the `"start"` script from `package.json` to start your server.
2. In the **Deployments** tab, watch the build logs.
3. Once the build completes, the status will change to **Active**.

### Step 5: Expose your Server to the Public Internet
By default, Railway services are private. To expose your API:
1. Click on your service and go to the **Settings** tab.
2. Under the **Public Networking** section, click **Generate Domain**.
3. Railway will generate a public URL for your API (e.g., `https://backend-production-xxxx.up.railway.app`).
4. **Important**: Copy this URL and update the `BACKEND_URL` (or equivalent variable) in your frontend configuration.

---

## 💡 Troubleshooting
* **DNS Resolution Issues**: Since we added `dns.setServers(["8.8.8.8", "1.1.1.1"])` to `src/loadEnv.js`, your container will bypass any local container network DNS routing issues when resolving MongoDB Atlas SRV records.
* **Build Failures**: Check that you have not committed the `node_modules` or `.env` files to GitHub (they should be in your `.gitignore`).
* **Connection Timeouts**: Make sure your MongoDB Atlas **IP Access List** is configured to allow connections from **anywhere (`0.0.0.0/0`)** since Railway assigns dynamic IP addresses to your backend container.
