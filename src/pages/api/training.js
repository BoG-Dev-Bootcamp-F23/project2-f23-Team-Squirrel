import createTraining from "../../../server/mongodb/actions/createTraining.js";
import updateTraining from "../../../server/mongodb/actions/updateTraining.js";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            await createTraining(req.body);
            return res.status(200).send("Success");
        } catch (e) {
            return res.status(500).send("Error");
        }
    }  else if (req.method === "PATCH") {
        try {
            const newTrainingLog = await updateTraining(req.body);
            return res.status(200).send(newTrainingLog);
        } catch (e) {
            return res.status(500).send("Error");
        }
    } 
}
