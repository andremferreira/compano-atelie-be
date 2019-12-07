// ----------------------------------- DEFAULT USER FOR TEST ---------
function User(){
    const user = { id: 1,
        name: 'SysAdm',
        hash: '$2b$10$epyzfhKPHwRZIC0KtFNt2eCV5wcIFXFXk1EtR3lacWuxGwm5fL3uq',
        lastname: 'SYSTEM ADMINISTRATOR',
        email: 'sysadm@email.com',
        profile: 1 }
    return user
}
module.exports = { User }