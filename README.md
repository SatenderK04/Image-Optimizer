# Image Optimizer

A full-stack web application that provides three major image processing features: image compression, watermarking with custom text and positioning, and background removal.

## 🚀 Features

1. **Image Compression**
   - Reduces image size while maintaining quality using `sharp`.

2. **Add Watermark**
   - Allows users to manually enter watermark text and choose its position.
   - Customization options like opacity, font size, and font weight.

3. **Remove Image Background**
   - Uses AI-based processing to remove the background from an image.

## 🛠️ Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Image Processing**: `sharp`
- **Storage**: Cloud-based storage (TBD)
- **Deployment**: Render

## 🌐 Live Demo

[Deployed Application](https://image-optimizer-client.onrender.com) ![image](https://github.com/user-attachments/assets/c6623f74-b7f1-4195-b88c-95f7d5fced51)
There might be some issues is deployed project.

## 🏗️ Installation Guide

Follow these steps to set up the project locally:

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/SatenderK04/image-optimizer.git
cd image-optimizer
```

### 2️⃣ Install Dependencies

#### Frontend
```sh
cd client
npm install
npm start
```

#### Backend
```sh
cd server
npm install
npm start
```

### 3️⃣ Environment Variables
Create a `.env` file in the backend folder and add:
```
PORT=5000
CLIENT_URL=https://image-optimizer-client.onrender.com
```

### 4️⃣ Run the Application
- Open `http://localhost:5173` for the frontend.
- Backend runs on `http://localhost:5000`.

## 📜 API Endpoints

| Method | Endpoint             | Description |
|--------|----------------------|-------------|
| POST   | `/image/compress`    | Compress an image |
| POST   | `/image/watermark`   | Add a watermark |
| POST   | `/image/removebg`    | Remove background |

## 🤝 Contributing
Feel free to fork the repository and raise a pull request!

## 📜 License
This project is open-source under the MIT License.
