import jwt from 'jsonwebtoken';

export const verifyAdmin = (req, res, next) => {
    const token = req.cookies.access_token;
    // console.log('Token:', token);
    if (!token) {
        return res.status(401).send('Invalid token');
    }
    jwt.verify(token, 'jwt-secrets', (err, user) => {
        if (err) {
            // console.error('JWT Verification Error:', err);
            return res.status(401).send('Unauthorized');
        }
        // console.log('Decoded User:', user);
        if (!user.isAdmin) {
            return res.status(401).send('Unauthorized');
        }
        req.user = user;
        next();
    });
};
