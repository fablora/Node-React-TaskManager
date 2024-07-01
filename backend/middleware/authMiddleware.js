const requireAuth = (req, res, next) => {

    const { authorization } = req.headers

    if(!authorization) {
        return res.status(401).send()
    }
}