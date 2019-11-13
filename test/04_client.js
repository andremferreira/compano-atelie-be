// ----------------------------------- INITIAL MOCHA WITH SUPERTEST ----------------------
const request = require('supertest')
// ----------------------------------- CONSOLE.LOG COLOR HELPER --------------------------
const color = require('../server/util/consoleLogColor')
// ----------------------------------- MSG FACTORY SEND REPORT ---------------------------
const msgF = require('../server/factory/msgFactory')
// ----------------------------------- DEFAULT TEST USER AUTH TOKEN ----------------------
const auth = require('../auth/userAuth')
const userTest = require('../server/factory/userTest').user
const devToken = auth.createIdToken(userTest, true)
// ----------------------------------- TEST CLIENT ---------------------------------------
describe(color('f-yellow', '► ') + msgF('tst-0007').title, function () {
    let msgS
    let server
    beforeEach(function () {
        server = require('../bin/www');
    });
    afterEach(function () {
        server.close()
    });
    // ----------------------------------- LIST CLIENT ---------------------------------------
    it(color('f-yellow', '├') + color('f-hidden', msgF('tst-0008').info), function listClient(done) {
        request(server)
            .get('/api/clients')
            .set('access-token', devToken)
            .expect(200, done)
    });
    // ----------------------------------- COUNT CLIENT ---------------------------------------
    it(color('f-yellow', '├') + color('f-hidden', msgF('tst-0009').info), function countClient(done) {
        request(server)
            .get('/api/clients/count')
            .set('access-token', devToken)
            .expect(200, done)
    });
    // ----------------------------------- ADD CLIENT ---------------------------------------
    it(color('f-yellow', '├') + color('f-hidden', msgF('tst-0010').info), function addNewClient(done) {
        client = {
            vc_name: 'NOME-TESTE-2',
            vc_lastname: 'SOBRENOME-TESTE-2',
            nu_code_area: 99,
            nu_mobile: 988888888,
            vc_contact: 'CONTATO-TESTE-2',
            vc_email: 'EMAIL@TESTE-2.COM',
            nu_social_security_code: 94818843335,
            nu_zip_code: 60170201,
            vc_city: 'FORTALEZA',
            vc_state: 'CEARA',
            vc_district: 'DIONISIO TORRES',
            vc_address: 'RUA LEONEL DE BORBA',
            vc_address_number: '1748',
            vc_address_complement: 'CASA 2',
            vc_birthday: '07/09'
        }
        request(server)
            .post('/api/client')
            .set('access-token', devToken)
            .send(client)
            .expect(201)
            .end(function (err, res) {
                if (err) throw err;
                done()
            })
    });
    // ----------------------------------- UPDATE CLIENT BY EMAIL ---------------------------
    it(color('f-yellow', '├') + color('f-hidden', msgF('tst-0027').info), function updateClientByEmail(done) {
        client = {
            vc_name: 'NOME-TESTE-2-UPD',
            vc_lastname: 'SOBRENOME-TESTE-2-UPD',
            nu_code_area: 95,
            nu_mobile: 988788888,
            vc_contact: 'CONTATO-TESTE-2-UPD',
            vc_email: 'EMAIL@TESTE-2.COM.UPD',
            nu_social_security_code: 84818843335,
            nu_zip_code: 60170301,
            vc_city: 'FORTALEZA-UPD',
            vc_state: 'CEARA-UPD',
            vc_district: 'DIONISIO TORRES - UPD',
            vc_address: 'RUA LEONEL DE BORBA - UPD',
            vc_address_number: '1748',
            vc_address_complement: 'CASA 2 - UPD',
            vc_birthday: '06/09'
        }
        request(server)
            .put('/api/client/email/EMAIL@TESTE-2.COM')
            .set('access-token', devToken)
            .send(client)
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                done()
            })
    });
    // ----------------------------------- UPDATE CLIENT BY WITHOUT RESULT-------------------
    msgS = msgF('tst-0028', '', [color('f-red-i',''), color('f-hidden-i','')]).info
    it(color('f-yellow', '├') + color('f-hidden', msgS), function updateClientByEmailNeg(done) {
        client = {
            vc_name: 'NOME-TESTE-2-UPD',
            vc_lastname: 'SOBRENOME-TESTE-2-UPD',
            nu_code_area: 95,
            nu_mobile: 988788888,
            vc_contact: 'CONTATO-TESTE-2-UPD',
            vc_email: 'EMAIL@TESTE-2.COM.UPD',
            nu_social_security_code: 84818843335,
            nu_zip_code: 60170301,
            vc_city: 'FORTALEZA-UPD',
            vc_state: 'CEARA-UPD',
            vc_district: 'DIONISIO TORRES - UPD',
            vc_address: 'RUA LEONEL DE BORBA - UPD',
            vc_address_number: '1748',
            vc_address_complement: 'CASA 2 - UPD',
            vc_birthday: '06/09'
        }
        request(server)
            .put('/api/client/email/WHOUTEMAIL@TESTE-2.COM')
            .set('access-token', devToken)
            .send(client)
            .expect(function (res) {
                JSON.parse(res.text)
            }).expect(404, msgF('err-0002'), done)
    });
    // ----------------------------------- REMOVE CLIENT BY EMAIL ---------------------------
    it(color('f-yellow', '├') + color('f-hidden', msgF('tst-0013').info), function delClientByEmail(done) {
        request(server)
            .delete('/api/client/email/EMAIL@TESTE-2.COM.UPD')
            .set('access-token', devToken)
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                done()
            })
    });
    // ----------------------------------- REMOVE CLIENT BY EMAIL WITHOUT RESULT ------------
    msgS = msgF('tst-0014', '', [color('f-red-i',''), color('f-hidden-i','')]).info
    msgS = msgS.replace('%1', color('f-red-i', ''))
    msgS = msgS.replace('%2', color('f-hidden-i', ''))
    it(color('f-yellow', '├') + color('f-hidden', msgS), function getClientByEmailNeg(done) {
        request(server)
            .delete('/api/client/email/WOUTEMAIL@TESTE-2.COM')
            .set('access-token', devToken)
            .expect(function (res) {
                JSON.parse(res.text)
            }).expect(404, msgF('err-0002'), done)
    });
    // ----------------------------------- GET CLIENT BY EMAIL -----------------------------
    it(color('f-yellow', '├') + color('f-hidden', msgF('tst-0015').info), function getClientByEmail(done) {
        request(server)
            .get('/api/client/email/EMAIL@TESTE-1.COM')
            .set('access-token', devToken)
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                done()
            })
    });
    // ----------------------------------- GET CLIENT BY EMAIL WITHOUT RESULT -------------
    msgS = msgF('tst-0016', '', [color('f-red-i',''), color('f-hidden-i','')]).info
    it(color('f-yellow', '├') + color('f-hidden', msgS), function getClientByEmailNeg(done) {
        request(server)
            .get('/api/client/email/WOUTEMAIL@TESTE.COM')
            .set('access-token', devToken)
            .expect(function (res) {
                JSON.parse(res.text)
            }).expect(404, msgF('err-0002'), done)
    });
    // ----------------------------------- ADD CLIENT BY ID ------------------------------
    it(color('f-yellow', '├') + color('f-hidden', msgF('tst-0031').info), function addClientById(done) {
        var client = {
            id_client: 999,
            vc_name: 'NAME-TESTE-DEL',
            vc_lastname: 'LASTNAME-TESTE-DEL',
            nu_code_area: 99,
            nu_mobile: 598756456,
            vc_contact: 'CONTATO-TESTE-DEL',
            vc_email: 'DELETE@TEST.COM',
            nu_social_security_code: 3215648975,
            nu_zip_code: 65478951,
            vc_city: 'DELETE',
            vc_state: 'DELETE',
            vc_district: 'TEST DELETE',
            vc_address: 'DELETE',
            vc_address_number: '9999',
            vc_address_complement: 'DELETE',
            vc_birthday: '09/09',
        }
        request(server)
            .post('/api/client/id/999')
            .set('access-token', devToken)
            .send(client)
            .expect(201, done)
    });
    // ----------------------------------- ADD CLIENT BY ID NEG --------------------------
    msgS = msgF('tst-0032', '', [color('f-red-i',''), color('f-hidden-i','')]).info
    it(color('f-yellow', '├') + color('f-hidden', msgS), function addClientById(done) {
        var client = {
            id_client: 999,
            vc_name: 'NAME-TESTE-DEL',
            vc_lastname: 'LASTNAME-TESTE-DEL',
            nu_code_area: 99,
            nu_mobile: 598756456,
            vc_contact: 'CONTATO-TESTE-DEL',
            vc_email: 'DELETE@TEST.COM',
            nu_social_security_code: 3215648975,
            nu_zip_code: 65478951,
            vc_city: 'DELETE',
            vc_state: 'DELETE',
            vc_district: 'TEST DELETE',
            vc_address: 'DELETE',
            vc_address_number: '9999',
            vc_address_complement: 'DELETE',
            vc_birthday: '09/09',
        }
        request(server)
            .post('/api/client/id/999')
            .set('access-token', devToken)
            .send(client)
            .expect(400)
            .end(function (err, res) {
                if (err) throw err;
                done()
            })
    });
    // ----------------------------------- GET CLIENT BY ID ---------------------------------
    it(color('f-yellow', '├') + color('f-hidden', msgF('tst-0011').info), function getClientById(done) {
        request(server)
            .get('/api/client/id/999')
            .set('access-token', devToken)
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                done()
            })
    });
    // ----------------------------------- GET CLIENT BY ID WITHOUT RESULT ------------------
    msgS = msgF('tst-0012', '', [color('f-red-i',''), color('f-hidden-i','')]).info
    it(color('f-yellow', '├') + color('f-hidden', msgS), function getClientByIdNeg(done) {
        request(server)
            .get('/api/client/id/99999')
            .set('access-token', devToken)
            .expect(function (res) {
                JSON.parse(res.text)
            }).expect(404, msgF('err-0002'), done)
    });
    // ----------------------------------- UPDATE CLIENT BY ID ---------------------------
    it(color('f-yellow', '├') + color('f-hidden', msgF('tst-0029').info), function updateClientById(done) {
        client = {
            vc_name: 'TEST-UPD_ID-999'
        }
        request(server)
            .put('/api/client/id/999')
            .set('access-token', devToken)
            .send(client)
            .expect(200, done)
    });
    // ----------------------------------- UPDATE CLIENT BY ID NEG ------------------------
    msgS = msgF('tst-0030', '', [color('f-red-i',''), color('f-hidden-i','')]).info
    it(color('f-yellow', '├') + color('f-hidden', msgS), function updateClientById(done) {
        client = {
            vc_name: 'TEST-UPD_ID-999'
        }
        request(server)
            .put('/api/client/id/99999')
            .set('access-token', devToken)
            .send(client)
            .expect(404, done)
    });
    // ----------------------------------- DELETE CLIENT BY ID -----------------------------
    it(color('f-yellow', '├') + color('f-hidden', msgF('tst-0017').info), function delClientById(done) {
        request(server)
            .delete('/api/client/id/999')
            .set('access-token', devToken)
            .expect(200, done)
    });
    // ----------------------------------- DELETE CLIENT BY ID WITHOUT RESULT --------------
    msgS = msgF('tst-0018', '', [color('f-red-i',''), color('f-hidden-i','')]).info
    it(color('f-yellow', '└') + color('f-hidden', msgS), function delClientByIdNeg(done) {
        request(server)
            .delete('/api/client/id/999')
            .set('access-token', devToken)
            .expect(function (res) {
                JSON.parse(res.text)
            }).expect(404, msgF('err-0002'), done)
    });
});