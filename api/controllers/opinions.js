import Opinions from "../models/opinions.js";

export const createOpinion= async (req, res) => {
    const newOpinion = new Opinions(req.body);
    try {
        const savedOpinion = await newOpinion.save();
        res.status(200).json(savedOpinion)
    } catch(err){
        res.status(500).json(err);
    }
}


export const getOpinions = async (req, res) => {
    try {
        const opinions = await Opinions.find(req.query).limit(req.query.limit)
        res.status(200).json(opinions)
    } catch(err){
        res.status(500).json(err);
    }
}


export const updateOpinion = async (req, res) => {
    try {
        const updatedOpinion= await Opinions.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})
        res.status(200).json(updatedOpinion)

    } catch (err) {
        res.status(500).json(err)
    }
}

export const deleteOpinion = async (req, res) => {
    try {
        await Opinions.findByIdAndDelete(req.params.id)
        res.status(200).json("opinion has been deleted")

    } catch (err) {
        res.status(500).json(err)
    }
}