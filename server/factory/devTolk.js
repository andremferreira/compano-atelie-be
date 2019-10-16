const auth = require('../../auth/userAuth')
// ----------------------------------- TOLKEN FACTORY FOR DEV AND TEST ---------
function getDevToken(user) {
    if (typeof user === 'undefined') {
        let user = [{
            id_usuario: 1,
            vc_email: 'teste@teste.com',
            vc_password: 'TESTE!123@'
        }]
        return auth.createIdToken(user, true)
    } else {
        return auth.createIdToken(user, true)
    }
}
module.exports[getDevToken]