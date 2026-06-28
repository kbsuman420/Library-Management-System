# Render Deployment Guide for Backend

If you have exceeded your free tier on Railway, [Render](https://render.com/) is an excellent free alternative for hosting Node.js/Express backends.

---

## 📋 Prerequisites
1. **GitHub Repository**: Make sure your codebase is pushed to GitHub.
2. **Render Account**: Sign up or log in at [render.com](https://render.com/) (you can sign in with your GitHub account).

---

## 🛠️ Step-by-Step Deployment on Render

### Step 1: Create a New Web Service
1. Go to your **Render Dashboard**.
2. Click the **New +** button in the top right and select **Web Service**.
3. Under **Connect a repository**, select your GitHub repository.
   * *If your repository is not listed, click "Connect account" or configure GitHub App permissions.*

### Step 2: Configure Service Settings
Fill in the following details in the creation form:
* **Name**: Choose a name for your service (e.g., `library-backend`).
* **Language**: `Node`
* **Branch**: `main`
* **Region**: Choose a region closest to your target audience (e.g., `Singapore` or `Oregon`).
* **Root Directory**: Leave blank (unless your Backend is inside a subdirectory in a monorepo, in which case enter `Backend`).
* **Build Command**: `npm install`
* **Start Command**: `npm start`
* **Instance Type**: Select the **Free** plan.

### Step 3: Add Environment Variables
1. Scroll down to the **Advanced** section or go to the **Environment** tab after creating the service.
2. Click **Add Environment Variable** and enter the variables from your `.env` file:

| Key | Value |
| :--- | :--- |
| `MONGODB_URI` | Your MongoDB Atlas connection string. |
| `CORS_ORIGIN` | `http://localhost:5173` *(and your frontend URL once deployed)* |
| `ACCESS_TOKEN_SECRECT` | Your JWT Secret |
| `ACCESS_TOKEN_EXPIRY` | `1d` |
| `REFRESH_TOKEN_SECRECT`| Your JWT Refresh Secret |
| `REFRESH_TOKEN_EXPIRY`| `10d` |
| `CLOUDINARY_CLOUD_NAME`| Your Cloudinary Name |
| `CLOUDINARY_API_KEY` | Your Cloudinary API Key |
| `CLOUDINARY_SECRECT_KEY`| Your Cloudinary Secret Key |
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | Your email |
| `SMTP_PASS` | Your SMTP password |
| `SMTP_FROM_NAME` | `"MedConnect Verification"` |

3. Render automatically assigns a dynamic port, so you **do not** need to specify a `PORT` variable.

### Step 4: Deploy the Web Service
1. Click **Create Web Service** at the bottom of the page.
2. Render will build and deploy your project automatically.
3. Once completed, your public URL will be visible at the top left of the dashboard page (e.g., `https://library-backend.onrender.com`).
4. Update your frontend API base URL to use this Render URL instead of Railway.

---

## ⚠️ Key Differences/Limitations of Render's Free Plan
* **Spin-down / Inactivity Sleep**: Render's free tier puts your app to sleep after **15 minutes of inactivity**. The next request received after sleep will take **50–60 seconds** to wake up the server.
* **IP Whitelisting**: Like Railway, make sure your MongoDB Atlas Network Access is set to allow connections from **anywhere (`0.0.0.0/0`)** because Render uses dynamic IP addresses.
