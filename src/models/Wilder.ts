import mongoose from "mongoose";

interface IWilder{
    name: string;
    city: string;
    description: string;
    skills: {title: string, votes: number}[];
}

const Schema = mongoose.Schema;

const WilderSchema = new Schema<IWilder>({
  name: { type: String, unique: true },
  city: String,
  description: String,
  skills: [{ title: String, votes: Number }],
});

export default mongoose.model("wilder", WilderSchema);