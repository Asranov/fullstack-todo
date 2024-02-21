const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      currentTime: () => new Date(Date.now() + 5 * 60 * 60 * 1000),
    },
  }
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
