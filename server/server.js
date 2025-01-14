const express = require("express");
const app = express();
const morgan = require("morgan");
const { readdirSync } = require("fs");
const cors = require("cors");
// const authRouter = require('./routes/auth')
// const categoryRouter = require('./routes/category')
//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// app.use('/api', authRouter)
// app.use('/api', categoryRouter)
readdirSync("./routes").map((item) =>
  app.use("/api", require("./routes/" + item))
);

app.listen(5000, () => console.log("server running port 5000"));
