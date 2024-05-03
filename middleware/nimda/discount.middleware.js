const core = require('../../config/core.config')
const models = core.models()
const { check } = require('express-validator')

exports.validate = (method) => {

    switch (method) {
        case 'setDiscount': {
            return [
                check('productId')
                    .not().isEmpty()
                    .withMessage(`product_id can't be empty`),
                check('id_variasi')
                    .not().isEmpty()
                    .withMessage(`id_variasi can't be empty`),
                check('discount')
                    .not().isEmpty()
                    .withMessage(`discount_percent can't be empty`),

            ]
        }
    }
}