const core = require('../../config/core.config')
const models = core.models();

exports.getProduct = async (req, res) => {
    try {
        //deklarasiin join
        // models.product.belongsTo(models.category, {
        //     foreignKey:'category_id'
        // })

        const productGet = await models.product.findAll({
            //implementasiin join
            include: [
                {
                    model: models.category,
                    as:'category'
                }
            ]
        })

        if (productGet) {
            output = {
                status: {
                    code: 200,
                    message:'Success Get Data'
                },
                data: productGet
                // data: productGet.map((i) => {
                //     return {
                //         productName: i.product_name,
                //         categoryName: i.category.category_name
                //     }
                // })
            }
        }

    } catch (error) {
        output = {
            status: {
                code: 500,
                message:error.message
            }
        }
    }

    res.status(output.status.code).send(output)
}

exports.addCategory = async (req, res) => {
    try {
        const createCategory = await models.category.create({
            category_name: req.body.categoryName,
            category_code: req.body.categoryCode,
            status: req.body.status,
            created_at:Date.now(),
            updated_at:Date.now(),
        })

        if (createCategory) {
            output = {
                status: {
                    code: 200,
                    message:'Success Create Data'
                },
            }
        }
    } catch (error) {
        output = {
            status: {
                code: 500,
                message:error.message
            }
        }
    }
    
    res.status(output.status.code).send(output)
}

exports.editProduct = async (req, res) => {
    
}

exports.deleteProduct = async (req, res) => {
    
}