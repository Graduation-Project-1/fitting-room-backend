const {uploadFile, deleteFile} = require("../../helpers/s3");
const Avatar = require("../../model/avatar/avatar.model");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const addAvatar = async (req, res) => {
    try{
        const bodyType = req.params.bodyType;
        let avatar = new Avatar({avatarBodyType : bodyType});
        let result = await uploadFile(req.file);
        await unlinkFile(req.file.path);
        avatar.avatarModel = result.Key;
        avatar.save();
        res.status(201).json({ message: "Avatar uploaded successfully" });
    } catch{
        res.status(501).json({ message: "Something went wrong" });
    }
}

const editAvatar = async (req, res) =>{
    try{
        let id = req.params.id;
        let { bodyType } = req.query;
        let avatar = await Avatar.findOne({_id : id});
        if(avatar){
            if(req.file){
                let modelUri = avatar.avatarModel;
                if(modelUri != undefined){
                    const remove = await deleteFile(modelUri);
                }
                let result = await uploadFile(req.file);
                await unlinkFile(req.file.path);
                avatar.avatarModel = result.Key;
            }
            if(bodyType){
                avatar.avatarBodyType = bodyType;
            }
            avatar.save();
            res.status(201).json({ message: "Avatar updated successfully" });
        }
        else{
            res.status(401).json({ message: "avatar not found" });
        }
    }catch{
        res.status(501).json({ message: "Something went wrong" });
    }
}

const deleteAvatar = async (req, res) => {
    try{
        const id = req.params.id;
        let result = await Avatar.findOneAndDelete({_id : id});
        res.status(201).json({ message: "Avatar deleted successfully" });
    }catch{
        res.status(501).json({ message: "Something went wrong" });
    }
}

const getAvatar = async (req, res) => {
    try{
        const id = req.params.id;
        let data = await Avatar.findOne({_id : id});
        res.status(201).json({ message: "Success", data });
    } catch{
        res.status(501).json({ message: "Something went wrong" });
    }
}


const getAllAvatars = async (req, res) => {
    try{
        let data = await Avatar.find({});
        res.status(201).json({ message: "Success", data });
    } catch{
        res.status(501).json({ message: "Something went wrong" });
    }
}

module.exports = {
    addAvatar,
    editAvatar,
    deleteAvatar,
    getAvatar,
    getAllAvatars
}