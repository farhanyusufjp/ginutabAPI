const core = require('./../../config/core.config')
const models = core.models()
const { check } = require('express-validator')
const db = require('../../config/db.config')

const CryptoJS = core.CryptoJS


exports.validate = (method) => {

    switch (method) {
        case 'getLibraryGroups': {
            return [
                check('referralCode')
                    .not().isEmpty()
                    .withMessage(`Refferal Code Tidak Boleh Kosong`).custom(async (ref, { req }) => {
                        const { referralCode } = req.query
                        const getGroup = await models.elib_perpustakaan.findOne({
                            where: {
                                kode_unik: String(referralCode)
                            },
                        });

                        if (!getGroup) {
                            throw new SyntaxError('Perpustakaan Tidak Tersedia')
                        }
                    }),
            ]
        }

        case 'login': {
            return [
                check('email', 'Email Tidak Valid').not().isEmpty()
                    .withMessage(`Email Tidak Boleh Kosong`)
                    .normalizeEmail()
                    .isEmail().withMessage('Format Email Salah'),
                check('password')
                    .not().isEmpty()
                    .withMessage(`Password Tidak Boleh Kosong`).custom(async (pass, { req }) => {
                        const { email, password } = req.body

                        let query = await db.query(`SELECT * FROM db_customer WHERE LOWER(email) = '${email}'  AND password = SHA1(CONCAT(salt, SHA1(CONCAT(salt, SHA1('${password}'))))) AND status in ('1','3','4')`)

                        const validate = Boolean(query.length)

                        if (!validate) {
                            throw new SyntaxError('Email Atau Password Salah')
                        }
                    }),
                check('role')
                    .not().isEmpty()
                    .withMessage(`ROLE AKUN TIDAK BOLEH KOSONG`),
                // check('email').custom(async (email, { req }) => {
                //     const password = req.body.password
                //     const user = await models.db_user.findOne(
                //         {
                //             where: {
                //                 email
                //             }
                //         })

                //     if (!email) {
                //         throw new Error(`Email can't be empty`)
                //     }


                //     if (user) {
                //         if (CryptoJS.MD5(password).toString() !== user.password) {
                //             throw new Error('Incorrect email & password')
                //         }
                //     }

                //     if (!user) {
                //         throw new Error('Incorrect email & password')
                //     }

                // }),
                // check('password').custom(async (password, { req }) => {
                //     const email = req.body.email
                //     const user = await models.db_user.findOne(
                //         {
                //             where: {
                //                 email
                //             }
                //         })

                //     if (!password) {
                //         throw new Error(`Password can't be empty`)
                //     }

                //     if (user) {
                //         if (CryptoJS.MD5(password).toString() !== user.password) {
                //             throw new Error('Incorrect email & password')
                //         }
                //     }

                //     if (!user) {
                //         throw new Error('Incorrect email & password')
                //     }

                // }),
            ]
        }


        case 'loginNimda': {
            return [
                check('email', 'Email Tidak Valid').not().isEmpty()
                    .withMessage(`Email Tidak Boleh Kosong`)
                    .normalizeEmail()
                    .isEmail().withMessage('Format Email Salah'),
                check('password')
                    .not().isEmpty()
                    .withMessage(`Password Tidak Boleh Kosong`).custom(async (pass, { req }) => {
                        const { email, password } = req.body

                        let query = await db.query(`SELECT * FROM elib_nimda WHERE LOWER(email) = '${email}'  AND password = SHA1(CONCAT(salt, SHA1(CONCAT(salt, SHA1('${password}'))))) AND status = '1'`)

                        const validate = Boolean(query.length)

                        if (!validate) {
                            throw new SyntaxError('Email Atau Password Salah')
                        }
                    }),

            ]
        }
        case 'loginPenerbit': {
            return [
                check('email', 'Email Tidak Valid').not().isEmpty()
                    .withMessage(`Email Tidak Boleh Kosong`)
                    .normalizeEmail()
                    .isEmail().withMessage('Format Email Salah'),
                check('password')
                    .not().isEmpty()
                    .withMessage(`Password Tidak Boleh Kosong`).custom(async (pass, { req }) => {
                        const { email, password } = req.body

                        let query = await db.query(`SELECT * FROM elib_penerbit WHERE LOWER(email) = '${email}'  AND password = SHA1(CONCAT(salt, SHA1(CONCAT(salt, SHA1('${password}'))))) AND status = '2'`)

                        const validate = Boolean(query.length)

                        if (!validate) {
                            throw new SyntaxError('Email Atau Password Salah')
                        }
                    }),


            ]
        }


        case 'forgotPassword': {
            return [
                check('email')
                    .not().isEmpty()
                    .withMessage(`Email Tidak Boleh Kosong`),
            ]
        }

        case 'registerCustomer': {
            return [
                check('firstName')
                    .not().isEmpty()
                    .withMessage(`Nama Depan Tidak Boleh Kosong`),
                check('lastName')
                    .isLength({
                        min: 1
                    }).withMessage('Nama Belakang Minimal 1 Karakter'),
                check('email', 'Email Tidak Valid')
                    .normalizeEmail()
                    .isEmail()
                    .custom(async email => {
                        const value = await models.db_customer.findOne({
                            where: {
                                email: email,
                            }
                        })
                        if (value) {
                            throw new SyntaxError('Email Yang Anda Masukkan Telah Di Gunakan');
                        }
                    }),
                check('telephone')
                    .not().isEmpty()
                    .withMessage(`No Telepon Tidak Boleh Kosong`),
                check('password')
                    .not().isEmpty()
                    .withMessage(`Password Tidak Boleh Kosong`),
                check('groupId').if((value, { req }) => req.body.referralCode).not().isEmpty()
                    .withMessage(`Group Tidak Boleh Kosong`),

            ]
        }
        case 'RegisterAdmin': {
            return [
                check('username')
                    .isLength({
                        min: 7,
                        max: 20,
                    }).withMessage('username Minimal 7 Karakter'),
                check('password')
                    .isLength({
                        min: 8,
                    }).withMessage('password Minimal 8 Karakter'),
                check('email', 'Email Tidak Valid')
                    .normalizeEmail()
                    .isEmail()
                    .custom(async email => {
                        const value = await models.elib_nimda.findOne({
                            where: {
                                email: email,
                            }
                        })
                        if (value) {
                            throw new SyntaxError('Email Yang Anda Masukkan Telah Di Gunakan');
                        }
                    }),
                check('phone')
                    .isLength({
                        min: 8,
                        max: 15
                    }).withMessage('Nomor Telephone Minimal 8 Karakter'),
                check('role').not().isEmpty()
                    .withMessage(`role can't be empty`),
            ]
        }


        case 'registerPerpustakaan': {
            return [
                check('name')
                    .not().isEmpty()
                    .withMessage(`Nama Perpustakaan Tidak Boleh Kosong`),
                check('picName')
                    .not().isEmpty()
                    .withMessage(`Nama PIC Tidak Boleh Kosong`),
                check('nip')
                    .not().isEmpty()
                    .withMessage(`NIP PIC Tidak Boleh Kosong`),
                check('level')
                    .not().isEmpty()
                    .withMessage(`Jenjang Perpustakaan Tidak Boleh Kosong`),
                check('phone')
                    .not().isEmpty()
                    .withMessage(`No Telepon PIC Tidak Boleh Kosong`),
            ]
        }
        case 'RegisterPenertbit': {
            return [
                check('username')
                    .isLength({
                        min: 7,
                        max: 20,
                    }).withMessage('username Minimal 7 Karakter'),
                check('password')
                    .isLength({
                        min: 8,
                    }).withMessage('password Minimal 8 Karakter'),
                check('email', 'Email Tidak Valid')
                    .normalizeEmail()
                    .isEmail()
                    .custom(async email => {
                        const value = await models.elib_penerbit.findOne({
                            where: {
                                email: email,
                            }
                        })
                        if (value) {
                            throw new SyntaxError('Email Yang Anda Masukkan Telah Di Gunakan');
                        }
                    }),
                check('phone')
                    .isLength({
                        min: 8,
                        max: 15
                    }).withMessage('Nomor Telephone Minimal 8 Karakter'),
            ]
        }

        case 'checkReferralCode': {
            return [
                check('referralCode')
                    .not().isEmpty()
                    .withMessage(`Kode Refferal Tidak Boleh Kosong`),
            ]
        }

        case 'goLibrary': {
            return [

                check('referralCode')
                    .not().isEmpty()
                    .withMessage(`referralCode can't be empty`),
                check('email', 'Invalid email')
                    .normalizeEmail()
                    .isEmail()
                    .custom(async email => {
                        const value = await models.elib_user.findOne({
                            where: {
                                email: email,
                            }
                        })
                        if (value) {
                            throw new SyntaxError('Email has already been taken.');
                        }
                    }),
                check('groupId')
                    .not().isEmpty()
                    .withMessage(`groupId can't be empty`),

            ]
        }

        // case 'registerUser': {
        //     return [
        //         check('nis')
        //         .not().isEmpty()
        //             .withMessage(`nis can't be empty`),
        //         check('customerId')
        //         .not().isEmpty()
        //             .withMessage(`customerId can't be empty`),
        //         check('username')
        //         .isLength({
        //             min: 5,
        //             max: 100
        //         }).withMessage('Username must be at least 5 chars long'),
        //         check('password')
        //         .not().isEmpty()
        //             .withMessage(`password can't be empty`),
        //         check('email', 'Invalid email')
        //         .normalizeEmail()
        //         .isEmail()
        //         .custom(async email => {
        //             const value = await models.elib_user.findOne({
        //                 where: {
        //                     email: email,
        //                 }   
        //             })
        //             if (value) {
        //                 throw new SyntaxError('Email has already been taken.');
        //             }
        //         }),
        //         check('phone')
        //         .not().isEmpty()
        //             .withMessage(`phone can't be empty`),
        //         check('groupId')
        //         .not().isEmpty()
        //             .withMessage(`groupId can't be empty`),
        //         check('role')
        //         .not().isEmpty()
        //             .withMessage(`role can't be empty`),

        //     ]
        // }

    }
}