import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    roomId: {type: mongoose.Schema.Types.ObjectId, ref: 'Room'},
    text: {
        String,
        // maxLength: 50,
    },
    seen: {
        type: Boolean,
        default: false,
    },
    img: {
        type: String,
    },
    senderBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }

}, {
    timestamps: true,
})

const Message = mongoose.model("Message", messageSchema);

export default Message;