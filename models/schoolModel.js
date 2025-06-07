import  mongoose from 'mongoose';
var Schema = mongoose.Schema;
var schools = new Schema({
    email: {
        type: String,
        required: true
    },
    inn: { type: Number, required: true },
    title: { type: String, required: true },
    teachers: [{ type: Schema.Types.ObjectId, required: true }],
    groups: [{ type: Schema.Types.ObjectId, required: true }]
});

const School = mongoose.model("School", schools)
export default School;