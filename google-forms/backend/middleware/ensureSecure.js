const ensureSecure = (req, res, next) => {
    if (req.secure) {
        return next();
    } else {
        res.status(403).json({ message: 'HTTPS Required' });
    }
};

module.exports = ensureSecure;