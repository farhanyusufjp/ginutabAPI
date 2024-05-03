const core = require('../../config/core.config')
const models = core.models();
const customErrorMiddleware = require('../../middleware/middleware.result');
const { Op, Sequelize, where, DATE } = require('sequelize');
const { mode } = require('crypto-js');
const e = require('express');
const axios = require('axios')


exports.getBannerHome = async (req, res) => {
    try {
        const banner = await models.banner.findAll({
            //implementasiin join
            where: {
                id_banner_type: 1,
                status: 1
            }

        })

        if (banner) {
            output = {
                status: {
                    code: 200,
                    message: 'Success Get Data'
                },
                data: banner.map((i) => {
                    return {
                        id: i.id_banner,
                        banner: "http://localhost:2021/banner/" + i.foto,
                        createdAt: i.created_at
                    }
                })

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


