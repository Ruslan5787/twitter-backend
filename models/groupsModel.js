import mongoose, {Schema} from "mongoose";

const groups = new Schema({
    title: {type: String, required: true},
    schoolId: {type: Schema.Types.ObjectId, required: true},
    events: [{type: Schema.Types.ObjectId}],
    teacherId: {
        type: Schema.Types.ObjectId,
        required: true
    },
});

const Group = mongoose.model('Group', groups);
export default Group;