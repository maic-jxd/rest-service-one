import ModelPost from '../models/post.model.js'

import { imagekit } from '../config/imagekit.js';

export const getPosts = async (req, res) => {
    try {
        const data = await ModelPost.find({ user_id: req.userId })
        return res.status(200).json(data)

    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

export const addPost = async (req, res) => {
    try {
        const { ...data } = req.body

        if (!req.file) //|| !req.file.mimetype.startsWith('image/')
            return res.status(400).json({ msg: 'POR FAVOR SELECCIONE UN FILE VALIDO.' });

        const result = await imagekit.upload({
            file: req.file.buffer, fileName: Date.now(), folder: 'express',
        })

        const post = new ModelPost({
            ...data, user_id: req.userId,
            mimetype: req.file.mimetype, fileId: result.fileId, url: result.url
        });

        await post.save()

        return res.status(201).json({ msg: 'Post added successfully', post })
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

export const getPost = async (req, res) => {
    try {
        const { id } = req.params
        const post = await ModelPost.findById(id)

        if (!post) return res.status(404).json({ msg: 'Post not found' })

        return res.status(200).json(post)
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params; const { ...data } = req.body

        const post = await ModelPost.findById(id);
        if (!post) return res.status(404).json({ msg: 'Post not found' });

        let updatedData = { ...data };

        if (req.file) {
            if (post.fileId) await imagekit.deleteFile(post.fileId);

            const result = await imagekit.upload({
                file: req.file.buffer, fileName: Date.now(), folder: 'express',
            });

            updatedData.url = result.url;
            updatedData.fileId = result.fileId;
            updatedData.mimetype = req.file.mimetype;
        }

        await ModelPost.findByIdAndUpdate(id, updatedData, { new: true })
        return res.status(200).json({ msg: `Post updated successfully` })

    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params
        const post = await ModelPost.findById(id)

        if (!post) return res.status(404).json({ msg: 'Post not found' })

        if (post.fileId) await imagekit.deleteFile(post.fileId);

        await ModelPost.findByIdAndDelete(id);

        return res.status(200).json({ msg: 'Post deleted successfully' })
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

export const posts = async (req, res) => {
    try {
        const data = await ModelPost.find()
        return res.status(200).json(data)
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}