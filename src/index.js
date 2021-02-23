const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config({path:"variables.env"});

mongoose
	.connect(process.env.DB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then((res) => console.log("DB is connected"))
	.catch((err) => console.log(err));

const app = express();

// ? settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("port",process.env.PORT || 5000);
app.set("host",process.env.HOST || "0.0.0.0");

const whiteList = [process.env.FRONTEND_URL]
const corsOptions = {
	origin: (origin,callback) => {
		const existe = whiteList.some(dominio === origin);
		if(existe){
			calback(null,true)
		} else {
			callback(new Error("No Permitido por CORS"))
		}
	}
}

app.use(cors(corsOptions));

// ? static files
app.use(express.static(path.join(__dirname, "public")));

// ? rutas
app.use(require("./routes/index.routes"));

app.listen(app.get("port"), app.get("host"),function () {
	console.log("Server",app.get("port"));
});
