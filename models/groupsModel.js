var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var groups = new Schema({
    title: { type: String, required: true },
    schoolId: { type: Schema.Types.ObjectId, required: true },
    events: [{ type: Schema.Types.ObjectId }],
    teacherId: {
        type: Schema.Types.ObjectId,
        required: true
    },
});