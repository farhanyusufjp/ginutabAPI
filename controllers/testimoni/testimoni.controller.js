const core = require('../../config/core.config')
const models = core.models();
const customErrorMiddleware = require('../../middleware/middleware.result');
const { Op, Sequelize, where, DATE } = require('sequelize');
const e = require('express');
const axios = require('axios')


exports.addTestimoni = async (req, res) => {
    try {
        const getUser = await models.auth.findOne(
            {
                where: {
                    id_auth: req.user.id
                }
            }
        )
        if (getUser) {
            if (!req.file) {
                output = {
                    status: {
                        code: 402,
                        message: 'foto tidak boleh kosong'
                    },
                }
            }
            else {
                const uploadTestimoni = await models.testimoni.create(
                    {
                        name: req.body.name,
                        testimoni: req.body.testimoni,
                        star: req.body.star,
                        age: req.body.age,
                        status: 1,
                        foto: req.file.filename
                    }
                )
                if (uploadTestimoni) {
                    output = {
                        status: {
                            code: 200,
                            message: 'Testimoni berhasil di upload'
                        },
                    }
                }

            }
        }

    } catch (error) {
        output = {
            status: {
                code: 500,
                message: error.message
            }
        }
    }
    const errorsFromMiddleware = await customErrorMiddleware(req)

    if (!errorsFromMiddleware) {
        res.status(output.status.code).send(output)
    } else {
        res.status(errorsFromMiddleware.status.code).send(errorsFromMiddleware)
    }
}
exports.getTestimoni = async (req, res) => {
    try {

        const { limit, offset } = core.getPagination(Number(req.query.limit), Number(req.query.page));

        const getTestimoni = await models.testimoni.findAndCountAll(
            {
                where: {
                    status: 1
                },
                limit: limit,
                offset: offset,
                order: [['created_at', 'desc']]
            }
        )
        if (getTestimoni.rows) {

            const currentPage = Number(req.query.page) || 1; // Halaman saat ini
            const itemsPerPage = Number(req.query.limit) || 10; // Jumlah item per halaman
            const startIndex = (currentPage - 1) * itemsPerPage + 1;

            const result = await getTestimoni.rows.map((i, index) => {
                return {
                    no: startIndex + index,
                    name: i.name,
                    testimoni: i.testimoni,
                    star: i.star,
                    age: i.age,
                    foto: "http://localhost:2021/testimoni/" + i.foto,
                    tanggalBuat: i.created_at,
                }
            })
            output = {
                status: {
                    code: 200,
                    message: "Succes Get Testimoni"
                },
                data: result
            }
        }
    } catch (error) {
        output = {
            status: {
                code: 500,
                message: error.message
            }
        }
    }
    const errorsFromMiddleware = await customErrorMiddleware(req)

    if (!errorsFromMiddleware) {
        res.status(output.status.code).send(output)
    } else {
        res.status(errorsFromMiddleware.status.code).send(errorsFromMiddleware)
    }
}
exports.TestimoniDetail = async (req, res) => {
    try {
        const getUser = await models.auth.findOne(
            {
                where: {
                    id_auth: req.user.id
                }
            }
        )
        if (getUser) {
            const getTestimoni = await models.testimoni.findOne(
                {
                    where: {
                        id_testimoni: req.query.id_testimoni
                    }
                }
            )
            if (getTestimoni) {
                output = {
                    status: {
                        code: 200,
                        message: "sukes get detail"
                    },
                    data: getTestimoni
                }
            }
        }
    } catch (error) {
        output = {
            status: {
                code: 500,
                message: error.message
            }
        }
    }
    const errorsFromMiddleware = await customErrorMiddleware(req)

    if (!errorsFromMiddleware) {
        res.status(output.status.code).send(output)
    } else {
        res.status(errorsFromMiddleware.status.code).send(errorsFromMiddleware)
    }
}
exports.editTestimoni = async (req, res) => {
    try {
        const getUser = await models.auth.findOne(
            {
                where: {
                    id_auth: req.user.id
                }
            }
        )
        if (getUser) {
            if (!req.file) {
                output = {
                    status: {
                        code: 402,
                        message: 'foto tidak boleh kosong'
                    },
                }
            }
            else {
                const uploadTestimoni = await models.testimoni.update(
                    {
                        name: req.body.name,
                        testimoni: req.body.testimoni,
                        star: req.body.star,
                        age: req.body.age,
                        status: 1,
                        foto: req.file.filename
                    },
                    {
                        where: {
                            id_testimoni: req.body.id_testimoni
                        }
                    }
                )
                if (uploadTestimoni) {
                    output = {
                        status: {
                            code: 200,
                            message: 'Testimoni berhasil di update'
                        },
                    }
                }

            }
        }

    } catch (error) {
        output = {
            status: {
                code: 500,
                message: error.message
            }
        }
    }
    const errorsFromMiddleware = await customErrorMiddleware(req)

    if (!errorsFromMiddleware) {
        res.status(output.status.code).send(output)
    } else {
        res.status(errorsFromMiddleware.status.code).send(errorsFromMiddleware)
    }
}

exports.deleteTestimoni = async (req, res) => {
    try {
        const getUser = await models.auth.findOne(
            {
                where: {
                    id_auth: req.user.id
                }
            }
        )
        if (getUser) {
            const delData = await models.testimoni.update(
                {
                    status: 0
                },
                {
                    where: {
                        id_testimoni: req.body.id_testimoni
                    }
                }
            )
            if (delData) {
                output = {
                    status: {
                        code: 200,
                        message: "Sukses Delete Testimoni"
                    }
                }

            }
        }
    } catch (error) {
        output = {
            status: {
                code: 500,
                message: error.message
            }
        }
    }
    const errorsFromMiddleware = await customErrorMiddleware(req)

    if (!errorsFromMiddleware) {
        res.status(output.status.code).send(output)
    } else {
        res.status(errorsFromMiddleware.status.code).send(errorsFromMiddleware)
    }
}






