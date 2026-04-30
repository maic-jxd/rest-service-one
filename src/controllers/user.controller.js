import ModelUser from '../models/user.model.js'
import { encrypt } from "../helpers/bcrypt.js";

export const getUsers = async (req, res) => {
    try {
        const data = await ModelUser.find().select('-password')
        return res.status(200).json(data)
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

export const addUser = async (req, res) => {
    try {
        const { ...data } = req.body
        const existe = await ModelUser.findOne({ username: data.username })
        if (existe)
            return res.status(400).json({ msg: `The user ${existe.username} already exists` })

        const user = new ModelUser(data)

        if (!req.userId) user.role = 'user';

        user.password = await encrypt(data.password)
        await user.save()

        return res.status(201).json({ msg: 'User created successfully', user })

    } catch (err) {
        if (err.name === 'ValidationError')
            return res.status(400).json({ msg: 'Some data is required' });

        return res.status(500).json({ msg: err.message });
    }
}

export const getUser = async (req, res) => {
    try {
        const { id } = req.params
        const data = await ModelUser.findById(id, { password: 0 })

        if (!data) return res.status(404).json({ msg: 'User not found' })

        return res.status(200).json(data)
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const { ...data } = req.body
        await ModelUser.findByIdAndUpdate(id, data, { new: true })
        return res.status(200).json({ msg: `User updated successfully` })
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        await ModelUser.findByIdAndDelete(id)
        return res.status(200).json({ msg: 'User deleted successfully' })
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}