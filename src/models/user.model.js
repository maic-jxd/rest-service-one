import { Schema, model } from 'mongoose'

const schemaUser = new Schema(
    {
        fullname: {
            type: String,
            uppercase: true,
            trim: true
        },

        username: {
            type: String,
            trim: true
        },

        password: {
            type: String,
            trim: true
        },

        telefono: {
            type: Number,
            default: 555
        },

        direccion: {
            type: String,
            default: 'Manta'
        },

        role: {
            type: String,
            default: 'user',
            enum: ['admin', 'user'],
            required: true
        }
    },
    {
        versionKey: false
    }
)

export default model('collectionUser', schemaUser)