import connectDB from "..";
import TrainingLog from "../models/TrainingLog";

export default async function deleteTraining(data) {
    try {
        await connectDB();
        const { id } = data;
        const res = await TrainingLog.findByIdAndDelete(id).projection(incl);
        if (res == false) throw new Error("Error, no result");
    } catch (e) {
        throw new Error("Error");
    }

}
