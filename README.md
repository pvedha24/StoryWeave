📚 StoryWeave
Collaborative Branching Narrative Platform
StoryWeave is an interactive storytelling platform where multiple creators can collaborate to build branching narratives — much like a choose-your-own-adventure book, but online and dynamic.

```
Environment Variables (Production)
Create a .env file (for local development) or add these in your hosting platform:
envMONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-production-nextauth-secret
```
---

## 💻 Local Development Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/storyweave.git
   cd storyweave
   ```
2. **Install dependencies**

   ```bash
   npm install
   ```
3. **Set up environment variables** in `.env.local` (same keys as above).
4. **Run the development server**

   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🤝 Contributing

We welcome contributions!

1. **Fork** the repository.
2. Create a feature branch:

   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes:

   ```bash
   git commit -m "Add amazing feature"
   ```
4. Push to your branch:

   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**.

---

## 🛠 Troubleshooting

### **MongoDB Connection Issues**

```bash
# Check if MongoDB is running
brew services list | grep mongodb

# Restart MongoDB
brew services restart mongodb-community

# Check MongoDB logs
tail -f /opt/homebrew/var/log/mongodb/mongo.log
```

---

### **Common Issues**

* **Port 3000 in use** →

  ```bash
  npm run dev -- -p 3001
  ```
* **MongoDB connection refused** → Make sure MongoDB is running and the port is correct.
* **Environment variables not loading** → Restart the development server after making changes.

---

