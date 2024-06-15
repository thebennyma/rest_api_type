import { Request, Response } from "express"
import Product from "../models/Product.model";

export const getProducts = async (req: Request, res: Response) => {

    try {
        const products = await Product.findAll({
            order: [
                ['availability', 'DESC'],
                ['price', 'ASC']
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
        res.json({ data: products })
    } catch (error) {
        console.log(error);

    }
}

export const getProductsById = async (req: Request, res: Response) => {

    try {
        const { id } = req.params
        const product = await Product.findByPk(id)

        res.json({ data: product })

        if (!product) {
            return res.status(404).json({
                error: 'Producto no encontrado'
            })
        }
    } catch (error) {
        console.log(error);

    }
}

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.create(req.body)
        res.status(201).json({ data: product })
    } catch (error) {
        console.log(error);

    }
}

export const updateProducto = async (req: Request, res: Response) => {

    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }

    //Actualizar
    await product.update(req.body)
    await product.save()

    res.json({ data: product })
}

export const updateAvailability = async (req: Request, res: Response) => {

    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }

    //Actualizar
    product.availability = !product.dataValues.availability
    await product.save()

    res.json({ data: product })
}

export const deleteProduct = async (req: Request, res: Response) => {

    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }

    await product.destroy()
    res.json({ data: 'Producto Eliminado' })
}