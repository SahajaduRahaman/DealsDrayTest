const express = require("express")
const env = require("dotenv")
const cors = require("cors")
const ConnectToDatabase = require("./Database")


const app = express()

ConnectToDatabase()

env.config()

const PORT = process.env.PORT || 8080

app.use(cors())
app.use(express.json())
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));

app.use("/admin_register", require("./routes/AdminRegister"))
app.use("/admin_login", require("./routes/AdminLogin"))
app.use("/get_admin", require("./routes/GetAdmin"))
app.use("/add_employee", require("./routes/AddEmployee"))
app.use("/get_employee", require("./routes/GetAllEmployee"))
app.use("/get_single_employee", require("./routes/GetSingleEmployee"))
app.use("/edit_employee", require("./routes/EditEmployee"))
app.use("/delete_employee", require("./routes/DeleteEmployee"))


app.listen(PORT, () => {
    console.log(`Server connected to http://localhost:${PORT}`);
})
