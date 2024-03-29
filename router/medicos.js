/*
Medicos
ruta: '/api/medicos'
*/

const {Router} = require('express');
const {check} = require('express-validator');
const { validarCampos } = require ('../middleware/validar-campos');
const { validarJWT } = require ('../middleware/validar-jwt');

const {
    getMedicos,
    creartMedicos,
    actualizarMedicos,
    borrarMedicos,
    getMedicoById
} = require ('../controllers/medicos')

const router = Router();

router.get( '/',validarJWT ,getMedicos);


router.post( '/', [
    validarJWT,
    check('nombre', 'El nombre del médico es necesario').not().isEmpty(),
    check('apellido', 'El apellido del médico es necesario').not().isEmpty(),
    check('hospital', 'El id del hospital es necesario').not().isEmpty(),
    check('hospital', 'El hospital id, debe de ser válido').isMongoId(),
    validarCampos
] 
,creartMedicos);

router.put( '/:id',
[
    validarJWT
]
,actualizarMedicos);

router.delete( '/:id',
[
validarJWT
],
borrarMedicos);

router.get('/:id',
[
validarJWT
],
getMedicoById
);




module.exports = router;