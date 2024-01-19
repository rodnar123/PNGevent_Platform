import { Document, Schema, model, models } from "mongoose";

export interface IEvent extends Document {
  _id: string;
  title: string;
  description?: string;
  location?: string;
  createdAt: Date;
  imageUrl: string;
  startDataTime: Date;
  endDataTime: Date;
  price?: string;
  isFree?: boolean;
  url?: string;
  category: { id: string; name: string }; // Assuming "Category" is the type for the category field
  organizer: { id: string; fisrtName: string; lastName: string }; // Assuming "User" is the type for the organizer field
}

const EventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String, required: true },
  startDataTime: { type: Date, default: Date.now },
  endDataTime: { type: Date, default: Date.now },
  price: { type: String },
  isFree: { type: Boolean },
  url: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  organizer: { type: Schema.Types.ObjectId, ref: "User" },
});

const Event = models.Event || model("Event", EventSchema);

export default Event;
