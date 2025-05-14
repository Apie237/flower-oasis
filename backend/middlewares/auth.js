const authUser = async(req, res, next) => {
   console.log('👮 Auth middleware triggered');
   console.log('🔑 Headers received:', req.headers);
   
   const token = req.headers.token || req.headers.authorization?.split(' ')[1];
   
   if(!token){
     console.log('❌ No token provided in request');
     return res.status(401).json({success: false, message: "Not Authorized. Login Again"});
   }
   
   try {
     console.log('🔐 Verifying token:', token.substring(0, 10) + '...');
     const token_decode = jwt.verify(token, process.env.JWT_SECRET);
     console.log('✅ Token verified successfully. User ID:', token_decode.id);
     
     req.body.userId = token_decode.id;
     next();
   } catch (error) {
     console.log('❌ Token verification failed:', error);
     res.status(401).json({success: false, message: "Invalid or expired token. Please login again."});
   }
 }
 
 export default authUser;