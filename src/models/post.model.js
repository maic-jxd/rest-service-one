import { Schema, model } from 'mongoose'

const schemaPost = new Schema(
    {
        description: { type: String, trim: true, default: 'Post of user' },

        mimetype: { type: String, trim: true },

        fileId: { type: String, trim: true },

        url: { type: String, trim: true },

        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'collectionUser'
        }
    },
    {
        versionKey: false
    }
)

export default model('collectionPost', schemaPost)