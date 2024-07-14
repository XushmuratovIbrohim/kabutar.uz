import jwt, { decode } from 'jsonwebtoken'

export default function checkAuth(req, res, next) {
    const token = req.headers.authorization?.replace(/^Bearer\s/, '')
    if(token) {
        try {
            const decoded = jwt.verify(token, 'nematoda')
            req.id = decoded.id
        } catch (e) {
            return res.status(403).json({msg: 'No access'})
        }
    } else {
        return res.status(401).json({msg: 'Unauthorized'})
    }
    next()
}