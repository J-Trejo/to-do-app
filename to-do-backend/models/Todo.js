const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//create a schema that describes the structure of the documents in this collection

const TodoSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    completed:{
       type:Boolean,
    } 
});

const TodoModel = mongoose.model('Todo', TodoSchema);

module.exports = TodoModel;