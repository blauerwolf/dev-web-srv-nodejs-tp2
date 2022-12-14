const models = require('../database/models/index')
const errors = require('../const/errors')

module.exports = {
    listar: async (req, res) => {
        try {
            const pacientes = await models.paciente.findAll()

            res.json({
                success: true,
                data: {
                    pacientes: pacientes
                }
            })
        } catch (err) {
            return next(err)
            console.log(err)
        }
    },
    listarInfo: async (req, res, next) => {
        try {
            const pacientes = await models.paciente.findOne({
                where: {
                    id: req.params.idPacientes
                },
                include: [{
                    model:models.paciente_medico,
                    include: [{
                        model:models.medico
                    }]
                }]
            })

            res.json({
                success: true,
                data: {
                    paciente: pacientes
                }
            })
        } catch (err) {
            return next(err)
        }
    },
    crear: async (req, res, next) => {
        try {
            const paciente = await models.paciente.create(req.body)
            const relacion = await models.paciente_medico.create({
                pacienteId: paciente.id,
                medicoId: req.body.medicoId
            })

            res.json({
                success: true,
                data: {
                    id: paciente.id
                }
            })
        } catch (err) {
            return next(err)
        }

    }
}