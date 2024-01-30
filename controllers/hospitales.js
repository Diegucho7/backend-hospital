const {response} = require('express');
const  bcrypt  = require ('bcryptjs');
const {generarJwt} = require('../helpers/jwt')

const Hospital = require('../models/hospital');


const getHospitales =  async (req, res) =>{
    const hospitales = await Hospital.find()
                                    .populate('usuario','nombre ')
    res.json({
        ok: true,
        hospitales
    })
}


const creartHospitales = async(req, res) =>{

    const uid =  req.uid;
    const hospital = new Hospital({
        usuario:uid,
        ...req.body
    });
    

    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }

   
}


const actualizarHospitales = async(req, res) =>{

    

    res.json({
        ok: true,
        msg: 'Hable con el administrador'
    })
}


const borrarHospitales = (req, res) =>{
    res.json({
        ok: true,
        msg: 'borrarHospitales'
    })
}




module.exports = {
    getHospitales,
    creartHospitales,
    actualizarHospitales,
    borrarHospitales
}