const core = require('../../config/core.config')
const models = core.models();
const customErrorMiddleware = require('../../middleware/middleware.result');
const { Op, Sequelize, where, DATE } = require('sequelize');
const e = require('express');
const axios = require('axios')


exports.addArticle = async (req, res) => {
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
                const uploadArticle = await models.article.create(
                    {
                        title: req.body.title,
                        sub_title: req.body.sub_title,
                        content: req.body.content,
                        status: 1,
                        foto: req.file.filename
                    }
                )
                if (uploadArticle) {
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
exports.getArticle = async (req, res) => {
    try {

        const { limit, offset } = core.getPagination(Number(req.query.limit), Number(req.query.page));

        const getArticle = await models.article.findAndCountAll(
            {
                where: {
                    status: 1
                },
                limit: limit,
                offset: offset,
                order: [['created_at', 'desc']]
            }
        )
        if (getArticle.rows) {

            const currentPage = Number(req.query.page) || 1; // Halaman saat ini
            const itemsPerPage = Number(req.query.limit) || 10; // Jumlah item per halaman
            const startIndex = (currentPage - 1) * itemsPerPage + 1;

            const result = await getArticle.rows.map((i, index) => {
                return {
                    no: startIndex + index,
                    title: i.title,
                    sub_title: i.sub_title,
                    content: i.content,
                    foto: "http://localhost:2021/article/" + i.foto,
                    tanggalBuat: i.created_at,
                }
            })
            output = {
                status: {
                    code: 200,
                    message: "Succes Get Article"
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
exports.articleDetail = async (req, res) => {
    try {
        const getUser = await models.auth.findOne(
            {
                where: {
                    id_auth: req.user.id
                }
            }
        )
        if (getUser) {
            const getArticle = await models.article.findOne(
                {
                    where: {
                        id_article: req.query.id_article
                    }
                }
            )
            if (getArticle) {
                output = {
                    status: {
                        code: 200,
                        message: "sukes get detail"
                    },
                    data: getArticle
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
exports.editArtcile = async (req, res) => {
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
                const uploadArticle = await models.article.update(
                    {
                        title: req.body.title,
                        sub_title: req.body.sub_title,
                        content: req.body.content,
                        status: 1,
                        foto: req.file.filename
                    },
                    {
                        where: {
                            id_article: req.body.id_article
                        }
                    }
                )
                if (uploadArticle) {
                    output = {
                        status: {
                            code: 200,
                            message: 'Article berhasil di update'
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
exports.deleteArticle = async (req, res) => {
    try {
        const getUser = await models.auth.findOne(
            {
                where: {
                    id_auth: req.user.id
                }
            }
        )
        if (getUser) {
            const delData = await models.article.update(
                {
                    status: 0
                },
                {
                    where: {
                        id_article: req.body.id_article
                    }
                }
            )
            if (delData) {
                output = {
                    status: {
                        code: 200,
                        message: "Sukses Delete article"
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





