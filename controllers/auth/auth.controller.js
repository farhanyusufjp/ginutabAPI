const core = require('../../config/core.config')
const models = core.models();
const customErrorMiddleware = require('../../middleware/middleware.result');
const { Op, Sequelize, where, DATE } = require('sequelize');
const { mode } = require('crypto-js');
const e = require('express');
const CryptoJS = core.CryptoJS
const axios = require('axios')


exports.loginAdmin = async (req, res) => {



    try {

        const user = await models.auth.findOne(
            {
                where: {
                    username: req.body.username,
                    password: CryptoJS.MD5(req.body.password).toString()
                },

            }
        )

        if (user) {
            let payload = {
                id: user.id_auth,
                username: user.username,
                role: user.role

            };
            const token = core.jwt.sign(payload, core.env.TOKEN_KEY, { expiresIn: "7d", })
            if (token) {
                output = {
                    status: {
                        code: 200,
                        message: 'Login success'
                    },
                    data: {
                        token: 'Bearer ' + token,
                        username: user.username,
                        role: user.role,



                        // result:result
                    }
                }
            }
        }
        else {
            output = {
                status: {
                    code: 402,
                    message: 'username atau password salah'
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

