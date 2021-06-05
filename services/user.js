const User = require('../models/user');

const Create = async (userBody) => {
    try {
        let user;
        user = await User.findOne({ email: userBody.user.email });
        if (!user) {
            user = new User({
                name: userBody.user.name,
                email: userBody.user.email,
                username: userBody.username || userBody.user.email.substring(0, userBody.user.email.indexOf("@")),
                picture: userBody.user.picture,
                isAdmin: userBody.user.isAdmin,
            });
            await user.save();
        } else if (user.status == 'banned') {
            return 'banned';
        }
        return user;
    } catch (error) {
        console.log(error);
        return error.message;
    }
}

const Edit = async (userBody) => {
    try {
        await User.updateOne({ email: userBody.user.email }, { userBody });
        return 'success';
    } catch (error) {
        return error.message;
    }
};

const Delete = async (user_id) => {
    try {
        await User.updateOne({ _id: user_id }, { status: 'banned' });
        return 'success'
    } catch (error) {
        return error.message;
    }
};

const FetchAll = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        return error.message;
    }
};

const FetchUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        return user;
    } catch (error) {
        return error.message;
    }
};

const FetchUserByUsername = async (username) => {
    try {
        const user = await User.findOne({ username });
        return user;
    } catch (error) {
        return error.message;
    }
};

module.exports = {
    Create,
    Edit,
    FetchAll,
    FetchUserByEmail,
    FetchUserByUsername,
    Delete,
};