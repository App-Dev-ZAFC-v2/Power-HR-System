import jwt from 'jsonwebtoken';

export const AuthToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

export const AuthAdmin = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        //send status with json
        if(err) return res.status(403).json({message: 'You are not authorized to access this resource'});
        // if(err) return res.sendStatus(403);
        if(user.userType !== 1) return res.status(403).json({message: 'You are not logged in as an admin'});
        req.user = user;
        next();
    });
}

export const AuthEmployee = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        //send status with json
        if(err) return res.status(403).json({message: 'You are not authorized to access this resource'});
        // if(err) return res.sendStatus(403);
        if(user.userType !== 2) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

export const AuthApplicant = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        //send status with json
        if(err) return res.status(403).json({message: 'You are not authorized to access this resource', error: err});
        // if(err) return res.sendStatus(403);
        if(user.userType !== 0) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

export const AuthExecutive = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        //send status with json
        if(err) return res.status(403).json({message: 'You are not authorized to access this resource', error: err});
        // if(err) return res.sendStatus(403);
        if(user.userType !== 3) return res.sendStatus(403);
        req.user = user;
        next();
    });
}
