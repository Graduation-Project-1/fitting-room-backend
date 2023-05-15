const { uploadFile, deleteFile } = require("../../helpers/s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const Item = require("../../model/item/item.model");


const uploadItemModel = async (req, res) => {
    try {
        const id = req.params.id;
        const size = req.params.size;
        let item = await Item.findOne({ _id: id });
        if (item) {
            if (size === 'small') {
                let modelUri = item.model.small;
                if (modelUri != undefined) {
                    await deleteFile(modelUri);
                }
                let result = await uploadFile(req.file);
                await unlinkFile(req.file.path);
                item.model.small = result.Key;
                await item.save();
                return res.status(201).json({ message: "Model uploaded successfully" });
            }
            else if (size === 'meduim') {
                let modelUri = item.model.meduim;
                if (modelUri != undefined) {
                    await deleteFile(modelUri);
                }
                let result = await uploadFile(req.file);
                await unlinkFile(req.file.path);
                item.model.meduim = result.Key;
                item.save();
                return res.status(201).json({ message: "Model uploaded successfully" });
            }
            else if (size === 'large') {
                let modelUri = item.model.large;
                if (modelUri != undefined) {
                    await deleteFile(modelUri);
                }
                let result = await uploadFile(req.file);
                await unlinkFile(req.file.path);
                item.model.large = result.Key;
                item.save();
                return res.status(201).json({ message: "Model uploaded successfully" });
            }
            else {
                return res.status(401).json({ message: "Please enter a valid size" });
            }
        }
        else {
            return res.status(401).json({ message: "Item not found" });
        }
    } catch {
        return res.status(501).json({ message: "Something went wrong" });
    }
}


const deleteItemModel = async (req, res) => {
    try {
        const id = req.params.id;
        const size = req.params.size;
        let item = await Item.findOne({ _id: id });
        if (item) {
            if (size === 'small') {
                if (item.model.small) {
                    await deleteFile(item.model.small);
                    item.model.small = null;
                    item.save();
                    return res.status(201).json({ message: "Model deleted successfully" });
                }
                else {
                    return res.status(201).json({ message: "Model is already deleted" });
                }
            }
            else if (size == 'meduim') {
                if (item.model.meduim) {
                    await deleteFile(item.model.meduim);
                    item.model.meduim = null;
                    item.save();
                    return res.status(201).json({ message: "Model deleted successfully" });
                }
                else {
                    return res.status(201).json({ message: "Model is already deleted" });
                }
            }
            else if (size == 'large') {
                if (item.model.large) {
                    await deleteFile(item.model.large);
                    item.model.large = null;
                    item.save();
                    return res.status(201).json({ message: "Model deleted successfully" });
                }
                else {
                    return res.status(201).json({ message: "Model is already deleted" });
                }
            }
            else {
                return res.status(401).json({ message: "Please enter a valid size" });
            }
        } else {
            return res.status(401).json({ message: "Item not found" });
        }
    } catch {
        return res.status(501).json({ message: "Something went wrong" });
    }
}


const getItem = async (req, res) => {
    try {
        const id = req.params.id;
        let item = await Item.findOne({ _id: id });
        if (item) {
            return res.status(201).json({ message: "Success", data: item });
        }
        else {
            return res.status(401).json({ message: "Item not found" });
        }
    } catch {
        return res.status(501).json({ message: "Something went wrong" });
    }
}


const getAllItems = async (req, res) => {
    try {
        let items = await Item.find({});
        return res.status(201).json({ message: "Success", data: items });
    } catch {
        return res.status(501).json({ message: "Something went wrong" });
    }
}


const editItemType = async (req, res) => {
    try {
        const id = req.params.id;
        const itemType = req.body.itemType;
        let item = await Item.findOne({ _id: id });
        let regex = /^(shirt|trousers|shoes|socks|jacket|accessories)$/;
        if (itemType.match(regex)) {
            item.itemType = itemType;
            item.save();
            return res.status(201).json({ message: "Success" });
        }
        else {
            return res.status(401).json({ message: "Please enter a valid item type" });
        }

    } catch {
        return res.status(501).json({ message: "Something went wrong" });
    }
}


module.exports = {
    uploadItemModel,
    deleteItemModel,
    getItem,
    getAllItems,
    editItemType
}