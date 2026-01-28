import jwt from "jsonwebtoken";

const {SECRET_KEY}=process.env;
function verifyToken(req, res, next) {
    // Get token from header
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }
    
    // Extract token (format: "Bearer TOKEN")
    const token = authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'Invalid token format' });
    }
    
    try {
        // Verify and decode token
        const decoded = jwt.verify(token, SECRET_KEY);
        
        // CRITICAL: Add user info to request
        req.user = decoded; // Now req.user has { id, email }
        
        next(); // Continue to route handler
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
}

export default verifyToken;