const core = require('../../config/core.config')
const models = core.models()
const { check } = require('express-validator')

exports.validate = (method) => {

    switch (method) {
        case 'setPrice': {
            return [
                check('product_id')
                    .not().isEmpty()
                    .withMessage(`product_id can't be empty`),
                check('id_masa_aktif')
                    .not().isEmpty()
                    .withMessage(`id_masa_aktif can't be empty`),
                check('harga')
                    .not().isEmpty()
                    .withMessage(`harga can't be empty`),
                check('eksemplar')
                    .not().isEmpty()
                    .withMessage(`eksemplar can't be empty`),
                check('status')
                    .not().isEmpty()
                    .withMessage(`status can't be empty`),

            ]
        }
    }
}