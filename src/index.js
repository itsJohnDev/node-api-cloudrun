const express = require("express");
const multer = require("multer");
const { Storage } = require("@google-cloud/storage");

const app = express();
const PORT = process.env.PORT || 8080;

// GCS CONFIG
const storage = new Storage();
const bucketName = process.env.BUCKET_NAME;
const bucket = storage.bucket(bucketName);

// Multer (memory upload, NOT disk)
const upload = multer({
  storage: multer.memoryStorage(),
});

// middleware
app.use(express.json());
app.use(require("cors")());
app.use(require("helmet")());

// HOME
app.get("/", (req, res) => {
  res.send("Cloud Run API with GCS upload");
});

// HEALTH
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
  });
});

// UPLOAD TO GCS
app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const blob = bucket.file(Date.now() + "-" + req.file.originalname);

    const blobStream = blob.createWriteStream({
      resumable: false,
      contentType: req.file.mimetype,
    });

    blobStream.on("error", (err) => {
      return res.status(500).json({ error: err.message });
    });

    blobStream.on("finish", async () => {
      const publicUrl = `https://storage.googleapis.com/${bucketName}/${blob.name}`;

      res.json({
        message: "Uploaded to GCS",
        fileName: blob.name,
        url: publicUrl,
      });
    });

    blobStream.end(req.file.buffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
