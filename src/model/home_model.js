const { Schema, model } = require("mongoose");

const homeSchema = new Schema(
  {
    
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret, _option) => {
        delete ret._id;
        delete ret.password;
      },
      virtuals: true,
      versionKey: false,
    },
  }
);

const HomeModel = new model("home", homeSchema);

module.exports = HomeModel;
