import TrainingLog from "../models/TrainingLog";
import connectDB from ".."; 

export default async function updateTrainingLog(data) {
    try {
        await connectDB();
        const { id } = data;
        const newTrainingLog = TrainingLog.findByIdAndUpdate(id, {
            _id: data._id,
            user: data.user,
            animal: data.animal,
            title: data.title,
            date: data.date,
            description: data.description, 
            hours: data.hours

        });
        if (!newTrainingLog) {
            throw new Error("Error");
        }
    } catch(e) {
        throw new Error("Error");
    }

}
