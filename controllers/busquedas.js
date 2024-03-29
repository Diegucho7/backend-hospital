// getTodo
const { response } = require ('express');
const Usuario = require('../models/usuario');
const Medicos = require('../models/medico');
const Hospital = require('../models/hospital');

const getTodo = async (req, res = response) =>{
    
    const busqueda = req.params.busqueda;
    const regex = new RegExp (busqueda, 'i');


    const [usuarios, medicos, hospitales] = await Promise.all([
              Usuario.find({nombre: regex }),
             Medicos.find({nombre: regex }),
              Hospital.find({nombre: regex })
])

    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales
    })

}


const getDocumentoColeccion = async (req, res = response) =>{
    
    const busqueda = req.params.busqueda;
    const tabla = req.params.tabla;
    const regex = new RegExp (busqueda, 'i');



    let data = [];

    switch (tabla) {
                case 'medicos':
                Medicos.find({nombre: regex });
                data = await Medicos.find({nombre: regex })
                                    .populate('usuario','nombre img')
                                    .populate('hospital','nombre img')
            
            break;
                case 'hospitales':
                data = await Hospital.find({nombre: regex })
                                    .populate('usuario','nombre img')
                
            
            break;
                case 'usuarios':
                data = await Usuario.find({nombre: regex });
               
                break;
    
        default:
                return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que contener usuarios/medicos/hospitales'
            });

                  }



                  res.json({
                    ok:true,
                    resultados: data
                    })
    

}




module.exports = {
    getTodo,
    getDocumentoColeccion
}