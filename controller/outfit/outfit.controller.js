const Outfit = require("../../model/outfit/outfit.model");


const createOutfit = async (req, res) => {
    try {
        if (req.user.accountType == "premuim") {
            let outfitData = req.body;
            outfitData.owner = req.user._id;
            let newOutfit = new Outfit(outfitData);
            let queryResult = await newOutfit.save();
            if (queryResult) {
                return res.status(201).json({ message: "Outfit added successfully" });
            }
            else {
                return res.status(401).json({ message: "Couldn't add outfit" });
            }
        }
        else {
            return res.status(401).json({ message: "This feature is avialable for premuim users only" });
        }
    }
    catch (err) {
        return res.status(501).json({ message: "Something went wrong", err });
    }
}


const editOutfit = async (req, res) => {
    try {
        if (req.user.accountType === "premuim") {
            const outfitId = req.params.id;
            const outfit = await Outfit.find({ _id: outfitId });
            if (req.user._id == outfit[0].owner) {
                let queryResult = await Outfit.findByIdAndUpdate({ _id: outfitId }, req.body);
                if (queryResult) {
                    return res.status(201).json({ message: "Outfit updated successfully" });
                }
                else {
                    return res.status(401).json({ message: "Couldn't update outfit" });
                }
            }
            else {
                return res.status(401).json({ message: "Sorry you are not the owner of this outfit" });
            }
        }
        else {
            return res.status(401).json({ message: "This feature is avialable for premuim users only" });
        }
    } catch {
        return res.status(501).json({ message: "Something went wrong" });
    }
}


const getAllOutfits = async (req, res) => {
    try {
        let data = await Outfit.find({ Policy: "public" }).populate(["socks", "shoes", "trousers", "shirt", "jacket", "accessories"]);
        return res.status(201).json({ data });
    } catch {
        return res.status(501).json({ message: "Something went wrong" });
    }
}


const getCurrentCustomerOutfits = async (req, res) => {
    try {
        let data = await Outfit.find({ owner: req.user._id }).populate(["socks", "shoes", "trousers", "shirt", "jacket", "accessories"]);
        res.status(201).json({ data });
    } catch {
        res.status(501).json({ message: "Something went wrong" });
    }
}


const searchOutfit = async (req, res) => {
    try {
        let { search } = req.query;
        let data = await Outfit.find({ outfitName: { $regex: search, $options: 'i' }, Policy: "public" });
        return res.status(201).json({ data });

    } catch {
        return res.status(501).json({ message: "Something went wrong" });
    }
}


module.exports = {
    createOutfit,
    editOutfit,
    getAllOutfits,
    getCurrentCustomerOutfits,
    searchOutfit
}