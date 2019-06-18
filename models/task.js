const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['new', 'finished'],
    default: 'new'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'low'
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true
  }
});


module.exports = mongoose.model("Task", taskSchema);



// const Status = Object.freeze({
//   Finished: 'finished',
//   Unfinished: 'unfinished'
// }) 
// enum: Object.values(Status);
// Object.assign(taskSchema.statics, {
//   Status,
// });