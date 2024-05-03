const core = require('../../config/core.config')
const models = core.models()
const { check } = require('express-validator')

exports.validate = (method) => {

    switch (method) {
        case 'updateProduct': {
            return [
                check('id_history')
                    .not().isEmpty()
                    .withMessage(`id_history can't be empty`),

            ]
        }
        case 'masaAktif': {
            return [
                check('value')
                    .not().isEmpty()
                    .withMessage(`value can't be empty`),
                check('description')
                    .not().isEmpty()
                    .withMessage(`description can't be empty`),
                check('status')
                    .not().isEmpty()
                    .withMessage(`status can't be empty`),

            ]
        }
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

        //validasi penulis
        case 'setPenulis': {
            return [
                check('nama_author')
                    .not().isEmpty()
                    .withMessage(`nama_author can't be empty`),

            ]
        }
    }
}