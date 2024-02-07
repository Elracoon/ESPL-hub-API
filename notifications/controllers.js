import { ObjectId } from 'mongodb';
import Notification from './models.js';
import { postNotificationSchema } from './validation.js';


export async function getAllNotification(req, res) {
    const userId = req.user.userId;
    try {
        const allNotifications = await Notification.find({ user: userId });
        res.status(200).json(allNotifications);
    } catch {
        res.status(500).send('Internal Server Error');
    }
}

export async function getOneNotification(req, res) {
    try {
        const notificationId = req.params.id;
        const notification = await Notification.findOne({ _id: new ObjectId(notificationId) });
        if ( !notification ) {
            res.status(404).send('Notification Not Found');
            return;
        }
        res.status(200).json(notification);
    } catch ( error ) {
        res.status(500).send('Internal Server Error');
    }
}

export async function addNewNotification(req, res) {
    const userId = req.user.userId;
    try {
        const object = req.body;
        const { error } = postNotificationSchema.validate(object);
        if ( error ) {
            return res.status(400).json({ error: error.details.map((d) => d.message ) });
        }
        object.user = userId;
        object.createdAt = new Date();
        const notification = new Notification(object);
        const notificationData = await notification.save();
        res.status(201).send(notificationData);
    } catch ( error ) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}

export async function deleteNotification(req, res) {
    try {
        const notificationId = req.params.id;
        const deleteNotification = await Notification.findOneAndDelete({ _id: new ObjectId(notificationId) });
        if (deleteNotification) {
            res.status(200).send('Notification Deleted');
        } else {
            res.status(404).send('Notification Not Found');
        }
    } catch ( error ) {
        res.status(500).send('Internal Server Error');
    }
}

export async function changesReadStatusNotification(req, res) {
    try {
        const notificationId = await Notification.findOne({ _id: new ObjectId(req.params.id) });  
        const readStatus = notificationId.read;
        
        if ( readStatus === false ) {
            await Notification.findOneAndUpdate({ _id: new ObjectId(notificationId) }, { read: true });
        } else {
            await Notification.findOneAndUpdate({ _id: new ObjectId(notificationId) }, { read: false });
        }
        console.log({ readStatus });
        res.status(201).send('Notification Read Status Updated');
            
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}

export async function getNoReadNotification(req, res) {
    const userId = req.user.userId;
    try {
        const allNotifications = await Notification.find({ read: false, user: userId });
        res.status(200).json(allNotifications);
    } catch(error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}