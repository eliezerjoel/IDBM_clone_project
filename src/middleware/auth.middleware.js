const jwt = require("jsonwebtoken");


const isAdminAuthorized = (req, res, next) => {
    const token = req.headers.authorization.split("").splice(7).join('');
  

    if (!token) {
        return res.send("No token found");
    }

    console.log(token);
    jwt.verify(token, "troy", (err, decoded) =>{
        if (err) {
            console.log(err);
            return null;
        }

        console.log(decoded);

        if (decoded.role == "admin") {
            next();
        }

        if (decoded.role !== "admin") {
            return res.send("User not authorized to add movies..");
        }
})

}


module.exports = isAdminAuthorized;