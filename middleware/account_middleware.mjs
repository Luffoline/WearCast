// Her legger jeg inn middleware som kontrollerer om forespørsler har gyldig tilgang

export function authAccount(req, res, next) {
    if(!req.session?.user) {
        return res.status(401).json("login required!");
    }
    req.user = req.session.user;
    next();
}