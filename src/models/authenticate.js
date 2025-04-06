import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Please provide a valid token' });
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("userId in jwt token >>>>> ",decoded.userId);
            req.userId = decoded.userId;
            next();
        });
    } catch (e) {
        console.log('Error occurred while authenticating');
        console.log(e);
        return res.status(500).json({ message: 'Error occurred while authenticating' });
    }
};