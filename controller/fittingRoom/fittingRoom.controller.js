const fittingRoom = require("../../model/fittingRoom/fittingRoom.model");


const addItemToSelectedItemList = async (req, res) => {
    try {
        const id = req.params.id;
        let fittingRoomData = await fittingRoom.findOne({ customer: req.user._id });
        if (fittingRoomData.selectedItems.includes(id) == true) {
            return res.status(400).json({ message: "This item already in your selected list" });
        }
        else {
            await fittingRoom.findByIdAndUpdate({ _id: fittingRoomData._id }, { $push: { selectedItems: id } });
            return res.status(200).json({ message: "Added item successfully" });
        }
    } catch {
        return res.status(501).json({ message: "Something went wrong" });
    }
}


const removeItemFromSelectedItemList = async (req, res) => {
    try {
        const id = req.params.id;
        let fittingRoomData = await fittingRoom.findOne({ customer: req.user._id });
        if (fittingRoomData.selectedItems.includes(id) == true) {
            await fittingRoom.findByIdAndUpdate({ _id: fittingRoomData._id }, { $pull: { selectedItems: id } });
            return res.status(200).json({ message: "Removed item successfully" });
        }
        else {
            return res.status(400).json({ message: "This item is not in your selected list" });
        }
    } catch {
        return res.status(501).json({ message: "Something went wrong" });
    }
}


const addOutfitToSelectedOutfitList = async (req, res) => {
    try {
        const id = req.params.id;
        let fittingRoomData = await fittingRoom.findOne({ customer: req.user._id });
        if (fittingRoomData.selectedOutfits.includes(id) == true) {
            return res.status(400).json({ message: "This outfit already in your selected list" });
        }
        else {
            await fittingRoom.findByIdAndUpdate({ _id: fittingRoomData._id }, { $push: { selectedOutfits: id } });
            return res.status(200).json({ message: "Added outfit successfully" });
        }
    } catch {
        return res.status(501).json({ message: "Something went wrong" });
    }
}


const removeOutfitFromSelectedOutfitList = async (req, res) => {
    try {
        const id = req.params.id;
        let fittingRoomData = await fittingRoom.findOne({ customer: req.user._id });
        if (fittingRoomData.selectedOutfits.includes(id) == true) {
            await fittingRoom.findByIdAndUpdate({ _id: fittingRoomData._id }, { $pull: { selectedOutfits: id } });
            return res.status(200).json({ message: "Removed outfit successfully" });
        }
        else {
            return res.status(400).json({ message: "This outfit is not in your selected list" });
        }
    } catch {
        return res.status(501).json({ message: "Something went wrong" });
    }
}


const changeAvatarBodyType = async (req, res) => {
    try {
        const id = req.params.id;
        let fittingRoomData = await fittingRoom.findOne({ customer: req.user._id });
        await fittingRoom.findByIdAndUpdate({ _id: fittingRoomData._id }, { avatar: id });
        return res.status(200).json({ message: "Changed avatar body type successfully" });
    } catch {
        return res.status(501).json({ message: "Something went wrong" });
    }
}


const getCurrentCustomerFittingRoom = async (req, res) => {
    try {
        let fittingRoomData = await fittingRoom.findOne({ customer: req.user._id }).populate(["customer", "selectedItems", "selectedOutfits", "avatar"]);
        return res.status(200).json({ message: "Success", data: fittingRoomData });
    } catch {
        return res.status(501).json({ message: "Something went wrong" });
    }

}


module.exports = {
    addItemToSelectedItemList,
    removeItemFromSelectedItemList,
    addOutfitToSelectedOutfitList,
    removeOutfitFromSelectedOutfitList,
    changeAvatarBodyType,
    getCurrentCustomerFittingRoom
}