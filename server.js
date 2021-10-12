require("dotenv").config({ path: "./config.env" });
const express = require("express");
const path = require('path');
const connectDB = require("./config/db");
const postRoutes = require("./routes/postRoutes");
const PORT = process.env.PORT || 5000
const enforce = require("express-sslify")

connectDB();

const app = express();

app.use(enforce.HTTPS({trustProtoHeader: true}));

app.use(express.json());

app.use("/api/v1/posts", postRoutes);

if (process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, '/client/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
     })
}else{
    app.get('/home',(req, res) => {
        res.send("API running")
    })
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
