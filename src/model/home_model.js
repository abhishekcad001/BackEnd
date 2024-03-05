const { Schema, model } = require("mongoose");
const cloudinary = require("../utils/cloudinary");

const homeSchema = new Schema(
    {
        photos: {
            type: [
                {
                    url: { type: String },
                    publicId: { type: String },
                },
            ],
            default: [],
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            require: true,
        },
        price_After_Tax: {
            type: Number,
            // require:true,
        },

        address: {
            type: String,
            required: true,
        },
        //      address: {
        //       type: {
        //           home_no: {
        //               type: Number,
        //               required: true,
        //           },
        //           street_name: {
        //               type: String,
        //               required: true,
        //           },
        //       },
        //       unique: true,
        //   },
        country: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        zip: {
            type: Number,
            required: true,
        },
        letitude: {
            type: Number,
        },
        logitude: {
            type: Number,
        },
        size: {
            type: Number,
            required: true,
        },
        rooms: {
            type: Number,
            required: true,
        },
        badrooms: {
            type: Number,
            required: true,
        },
        bathrooms: {
            type: Number,
            required: true,
        },
        garages: {
            type: String,
            required: true,
        },
        garage_size: {
            type: String,
            required: true,
        },
        basement: {
            type: String,
            required: true,
        },
        roofing: {
            type: String,
            required: true,
        },
        floor_no: {
            type: Number,
            required: true,
        },
        available_from: {
            type: Date,
            default: Date.now(),
        },
        interior_details: {
            type: Array,
            required: true,
        },
        outdoor_details: {
            type: Array,
            required: true,
        },
        utilities: {
            type: Array,
            required: true,
        },
        other_features: {
            type: Array,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: false,
        },
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
    },
);
homeSchema.pre("findOneAndUpdate", async function (next) {
    const update = this._update;
    if (update.$set.publicId) {
        const previousDocument = await this.model.findOne(this.getQuery());
        await cloudinary.uploader.destroy(previousDocument.publicId);
    }
    next();
});

const HomeModel = new model("home", homeSchema);

module.exports = HomeModel;
