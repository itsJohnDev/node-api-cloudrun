# Node.js Cloud Run API with GCS Upload

A Node.js REST API deployed on Google Cloud Run with CI/CD using GitHub Actions and Google Cloud Storage integration for file uploads.

---

# 🚀 Architecture

Client → Cloud Run (Node.js API) → Google Cloud Storage (Bucket)

CI/CD:
GitHub → GitHub Actions → Artifact Registry → Cloud Run

---

# ✨ Features

- Node.js + Express API
- File upload using Multer (memory storage)
- Google Cloud Storage integration
- Health check endpoint
- Cloud Run deployment (serverless)
- Docker containerized application
- CI/CD using GitHub Actions
- IAM-secured service account

---

# 📡 API Endpoints

## Home

GET /

Response:
Cloud Run Node API + GCS Upload

---

## Health Check

GET /api/health

Response:
{
"status": "ok",
"uptime": 123.45
}

---

## File Upload

POST /api/upload

Form-data:
file: (binary file)

Response:
{
"message": "Upload successful",
"fileName": "timestamp-filename.png",
"url": "https://storage.googleapis.com/bucket-name/file"
}

---

# 🧱 Tech Stack

- Node.js
- Express
- Multer
- Google Cloud Storage
- Docker
- Google Cloud Run
- Artifact Registry
- GitHub Actions

---

# ☁️ GCP Services Used

- Cloud Run
- Cloud Storage
- Artifact Registry
- IAM (Service Accounts)

---

# 🔐 IAM Roles

Service Account:
cloudrun-sa

Required roles:

- roles/run.admin
- roles/artifactregistry.writer
- roles/storage.admin
- roles/iam.serviceAccountUser

---

# ⚙️ Environment Variables

BUCKET_NAME = GCS bucket name

---

# 🐳 Run Locally

docker build -t node-cloudrun-api .
docker run -p 8080:8080 -e BUCKET_NAME=your-bucket node-cloudrun-api

---

# ☁️ Deploy (Manual)

gcloud run deploy node-cloudrun-gcs-api \
 --source . \
 --region us-central1 \
 --allow-unauthenticated \
 --service-account cloudrun-sa@PROJECT_ID.iam.gserviceaccount.com \
 --set-env-vars BUCKET_NAME=YOUR_BUCKET_NAME

---

# 🔄 CI/CD

On push to main branch:

- Build Docker image
- Push to Artifact Registry
- Deploy to Cloud Run

---

# 📂 Project Structure

node-cloudrun-gcs-api/
├── src/
│ └── index.js
├── Dockerfile
├── package.json
├── .gitignore
└── .github/
└── workflows/
└── deploy.yml

---

# 👨‍💻 Author

Node.js Cloud Run + GCS Upload project demonstrating:

- Serverless deployment
- CI/CD automation
- Cloud storage integration
- IAM-secured architecture
