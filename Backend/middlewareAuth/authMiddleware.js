const jwt = require("jsonwebtoken");

function authorizeUser(req, res, next) {
 
  try { 
      const cookies = req.headers.cookie
    console.log('cookie',cookies)
    let token = cookies.split('=')[1]
    console.log('token',token)
//     //1.Check if the user has a token (in the header)
//     let token = req.header("Authorization");
//     console.log(token);
    if (!token) {
      res.status(404).json({ message: "No token Provided" });
    }
    //token -> "Bearer 090jlsdk89398jflgjdfg9839579352" -remove Bearer
    token = token.replace("Bearer ", "");

    //2.Check the token if its valid and not expired
   const payload = jwt.verify(token, process.env.JWT_SECRET)
   if (payload.error) {
    throw new Error(payload.error)
}

// 3. Attach the payload from the token to the request object

req.userId = payload.id
req.user = payload.user

    // 4. Move on to the requested route (next)
      next()
  } catch (e) {
    res.status(403).json({ error: e.message });
  }
}

module.exports = { authorizeUser };
