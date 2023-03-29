import mongoose, { Schema } from "mongoose";

const airQualitySchema = new mongoose.Schema
    (
        {
            city: {
                type: String
            },
            state: {
                type: String
            },
            country: {
                type: String
            },
            location: {
                type: {
                    type: String,
                    enum: ['Point'],
                  },
                  coordinates: {
                    type: [Number],
                  }
            },
            current: {
                type: Schema.Types.Mixed
            }

        }, { timestamps: true }
    )

const AirQuality = mongoose.model('AirQuality', airQualitySchema);

export default AirQuality;