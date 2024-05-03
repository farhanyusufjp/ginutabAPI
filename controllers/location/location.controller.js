const core = require('../../config/core.config')
const models = core.models();
const customErrorMiddleware = require('../../middleware/middleware.result');
const { Op, Sequelize, where, DATE } = require('sequelize');
const { mode } = require('crypto-js');
const e = require('express');
const axios = require('axios');
const { getTestimoni } = require('../testimoni/testimoni.controller');


exports.getSelect = async (req, res) => {
    try {
        const provinsi = await models.provinsi.findAll({
            //implementasiin join
        })
        const kota = await models.kota.findAll({
            where: {
                ...req.query.id_provinsi ? {
                    id_provinsi: req.query.id_provinsi
                } : {}
            }
            //implementasiin join
        })
        const kecamatan = await models.kecamatan.findAll({
            where: {
                ...req.query.id_kota ? {
                    id_kota: req.query.id_kota
                } : {}
            }
            //implementasiin join
        })

        if (provinsi && kota && kecamatan) {
            output = {
                status: {
                    code: 200,
                    message: 'Success Get Data'
                },
                provinsi: provinsi.map((i) => {
                    return {
                        id_provinsi: i.id_provinsi,
                        provinsi: i.nama_provinsi
                    }
                }),
                kota: req.query.id_provinsi ? kota.map((i) => {
                    return {
                        id_kota: i.id_kota,
                        kota: i.nama_kota
                    }
                }) : {},
                kecamatan: req.query.id_kota ? kecamatan.map((i) => {
                    return {
                        id: i.id_kecamatan,
                        kecamatan: i.nama_kecamatan
                    }
                }) : {}

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

exports.addLocation = async (req, res) => {
    try {
        const getUser = await models.auth.findOne(
            {
                where: {
                    id_auth: req.user.id
                }
            }
        )
        if (getUser) {
            const getLoctFirst = await models.location.findOne(
                {
                    where: {
                        nama_mitra: req.body.nama_mitra,
                        id_provinsi: req.body.id_provinsi,
                        id_kecamatan: req.body.id_kecamatan,
                        id_kota: req.body.id_kota,
                        location: req.body.location,
                        link: req.body.link,
                    }
                }
            )
            if (!getLoctFirst) {
                const addLoc = await models.location.create(
                    {
                        nama_mitra: req.body.nama_mitra,
                        id_provinsi: req.body.id_provinsi,
                        id_kecamatan: req.body.id_kecamatan,
                        id_kota: req.body.id_kota,
                        location: req.body.location,
                        link: req.body.link,
                    }
                )
                if (addLoc) {
                    output = {
                        status: {
                            code: 200,
                            message: "berhasil menambahkan location"
                        }
                    }
                }

            }
            else {
                output = {
                    status: {
                        code: 402,
                        message: "location suda ada"
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

exports.getLocation = async (req, res) => {
    try {
        models.location.belongsTo(models.provinsi, { targetKey: 'id_provinsi', foreignKey: 'id_provinsi' });
        models.location.belongsTo(models.kota, { targetKey: 'id_kota', foreignKey: 'id_kota' });
        models.location.belongsTo(models.kecamatan, { targetKey: 'id_kecamatan', foreignKey: 'id_kecamatan' });

        const { limit, offset } = core.getPagination(Number(req.query.limit), Number(req.query.page));


        const getLocation = await models.location.findAndCountAll(
            {
                where: {
                    ...req.query.id_provinsi ? {
                        id_provinsi: req.query.id_provinsi
                    } : {},
                    ...req.query.id_kota ? {
                        id_provinsi: req.query.id_kota
                    } : {}
                },
                include: [
                    {
                        model: models.provinsi
                    },
                    {
                        model: models.kota
                    },
                    {
                        model: models.kecamatan
                    },
                ],
                order: [['created_at', 'desc']]


            }
        )
        if (getLocation) {
            const currentPage = Number(req.query.page) || 1; // Halaman saat ini
            const itemsPerPage = Number(req.query.limit) || 10; // Jumlah item per halaman
            const startIndex = (currentPage - 1) * itemsPerPage + 1;

            const result = await getLocation.rows.map((i, index) => {
                return {
                    no: startIndex + index,
                    nama_mitra: i.nama_mitra,
                    id_provinsi: i.id_provinsi,
                    provinsi: i.provinsi.nama_provinsi,
                    id_kota: i.id_kota,
                    kota: i.kotum.nama_kota,
                    id_kecamatan: i.id_kecamatan,
                    kecamatan: i.kecamatan.nama_kecamatan,
                    location: i.location,
                    link: i.link,
                    created_at: i.created_at

                }
            })
            output = {
                status: {
                    code: 200,
                    message: "Sukses Get Location"
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

exports.uploadBannerHome = async (req, res) => {
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
                        message: 'Banner tidak boleh kosong'
                    },
                }
            }
            else {
                const uploadBanner = await models.banner.create(
                    {
                        id_banner_type: 1,
                        status: 1,
                        foto: req.file.filename
                    }
                )
                if (uploadBanner) {
                    output = {
                        status: {
                            code: 200,
                            message: 'Banner berhasil di upload'
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



