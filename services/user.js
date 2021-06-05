const User = require('../models/user');

const Create = async (userBody) => {
    try {
        let user;
        user = await User.findOne({ email: userBody.email });
        if (!user) {
            user = new User({
                name: userBody.name,
                email: userBody.email,
                username: userBody.username || userBody.email.substring(0, userBody.email.indexOf("@")),
                picture: userBody.picture,
                dob: userBody.dob,
                interests: userBody.interests,
                bio: userBody.bio,
                description: userBody.description,
                instagram: userBody.instagram,
                facebook: userBody.facebook,
                twitter: userBody.twitter,
                linkedin: userBody.linkedin
            });
            await user.save();
        } else if (user.status == 'banned') {
            return 'banned';
        }
        return user;
    } catch (error) {
        return error.message;
    }
}

const Edit = async (userBody) => {
    try {
        await User.updateOne({ email: userBody.email }, { userBody });
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

const FetchAllUsers = async () => {
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
    FetchAllUsers,
    FetchUserByEmail,
    FetchUserByUsername,
    Delete,
};