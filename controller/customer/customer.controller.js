const Customer = require("../../model/customer/customer.model");
const fittingRoom = require("../../model/fittingRoom/fittingRoom.model");
const Item = require("../../model/item/item.model");
let { generateToken } = require("../../utils/token.utils");


const openFittingRoom = async (req, res) => {
    try {
        let _id = req.params.id;
        let user = await Customer.findById({ _id: _id });
        if (user) {
            const { _id, email, accountType, freeTrial, role } = user;
            const token = await generateToken({ _id, email, accountType, freeTrial, role });
            if (accountType == "premuim") {
                if (!req.session.user) {
                    let month = 30 * 24 * 60 * 60 * 1000;
                    req.session.cookie.expires = new Date(Date.now() + month);
                    req.session.cookie.maxAge = month;
                    req.session.user = user;
                }
                let userFittingRoom = await fittingRoom.find({ customer: _id });
                if (!userFittingRoom[0]) {

                    let data = new fittingRoom({ customer: _id });
                    await data.save();
                }
                return res.status(201).json({ message: "Confirm Access", token, remainingFreeTrial: freeTrial, subscriptionType: accountType });
            }
            else if (accountType == "standard" && freeTrial == undefined) {
                if (!req.session.user) {
                    let threeHours = 3 * 60 * 60 * 1000;
                    req.session.cookie.expires = new Date(Date.now() + threeHours);
                    req.session.cookie.maxAge = threeHours;
                    req.session.user = user;
                    await Customer.findByIdAndUpdate({ _id }, { freeTrial: 2 });
                }
                let userFittingRoom = await fittingRoom.find({ customer: _id });
                if (!userFittingRoom[0]) {
                    let data = new fittingRoom({ customer: _id });
                    await data.save();
                }
                return res.status(201).json({ message: "Confirm Access", token, remainingFreeTrial: freeTrial, subscriptionType: accountType });
            }
            else if (accountType == "standard" && freeTrial >= 1) {
                if (!req.session.user) {
                    let threeHours = 3 * 60 * 60 * 1000;
                    req.session.cookie.expires = new Date(Date.now() + threeHours);
                    req.session.cookie.maxAge = threeHours;
                    req.session.user = user;
                    await Customer.findByIdAndUpdate({ _id }, { freeTrial: freeTrial - 1 });
                }
                let userFittingRoom = await fittingRoom.find({ customer: _id });
                if (!userFittingRoom[0]) {
                    let data = new fittingRoom({ customer: _id });
                    await data.save();
                }
                return res.status(201).json({ message: "Confirm Access", token, remainingFreeTrial: freeTrial, subscriptionType: accountType });
            }
            else {
                return res.status(401).json({ message: "Access Denied" });
            }
        }
        else {
            return res.status(401).json({ message: "User not found" });
        }
    } catch {
        return res.status(501).json({ message: "Something went wrong" });
    }
}

const closeFittingRoom = async (req, res) => {
    try {
        req.session.destroy();
        return res.status(201).json({ message: "Closed fitting room successfully" });
    } catch {
        return res.status(501).json({ message: "Something went wrong" });
    }
}

const toggleLikeItem = async (req, res) => {
    try {
        const id = req.params.id;
        let customerData = await Customer.findOne({ _id: req.user._id });
        if (customerData.likedItems.includes(id) == true) {
            await Customer.findByIdAndUpdate({ _id: customerData._id }, { $pull: { likedItems: id } });
            await Item.findByIdAndUpdate({ _id: id }, { $inc: { 'numberOfLikes': -1 } });
            return res.status(200).json({ message: "Disliked item successfully" });
        }
        else {
            await Customer.findByIdAndUpdate({ _id: customerData._id }, { $push: { likedItems: id } });
            await Item.findByIdAndUpdate({ _id: id }, { $inc: { 'numberOfLikes': 1 } });
            return res.status(200).json({ message: "Liked item successfully" });
        }
    } catch {
        return res.status(501).json({ message: "Something went wrong" });
    }
}


const getCurrentCustomer = async (req, res) => {
    try {
        let dataCustomer = await Customer.findOne({ _id: req.user._id }).populate(["likedItems"]);
        return  res.status(200).json({ message: "Success", data: dataCustomer });
    } catch {
        return res.status(501).json({ message: "Something went wrong" });
    }
}


module.exports = {
    openFittingRoom,
    closeFittingRoom,
    toggleLikeItem,
    getCurrentCustomer
}