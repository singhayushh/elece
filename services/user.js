const User = require('../models/user');

const Ban = async (user_id) => {
    try {
        await User.updateOne({ _id: user_id }, { status: 'banned' });
        return { message: 'success' };
    } catch (error) {
        return { message: 'error', error: error.message };
    }
};

const Create = async (userBody) => {
    userBody.email = (userBody.email).toLowerCase();
    try {

        let user;
        user = await User.findOne({ email: userBody.user.email });

        if (!user) {
            // If request is directly from google Oauth
            if (!userBody.dob) {
                return { message: 'new' };
            }

            // Else, the request is from create account page
            user = new User({
                name: userBody.name,
                email: userBody.email,
                username: userBody.username || userBody.email.substring(0, userBody.email.indexOf("@")),
                picture: userBody.picture,
                dob: userBody.dob,
                bio: userBody.bio,
                interests: userBody.interests,
                description: userBody.description,
                defaultClass: userBody.defaultClass,
                role: userBody.role
            });
            await user.save();
        } 

        if (user.status != 'verified') {
            return { message: user.status };
        } else {
            return { user, message: success };
        }
    } catch (error) {
        console.log(error);
        return { message: 'error', error: error.message };
    }
}

const Delete = async (user_id) => {
    try {
        await User.deleteOne({ _id: user_id });
        return { message: 'success' };
    } catch (error) {
        return { message: 'error', error: error.message };
    }
};

const Edit = async (userBody) => {
    try {
        await User.updateOne({ email: userBody.user.email }, {
            username: userBody.username,
            dob: userBody.dob,
            interests: userBody.interests,
            bio: userBody.bio,
            description: userBody.description,
            instagram: userBody.instagram,
            facebook: userBody.facebook,
            twitter: userBody.twitter,
            linkedin: userBody.linkedin
        });
        return { message: 'success' };
    } catch (error) {
        return { message: 'error', error: error.message };
    }
};

const Verify = async (user_id) => {
    try {
        await User.updateOne({ _id: user_id }, { status: 'verified' });
        return { message: 'success' };
    } catch (error) {
        return { message: 'error', error: error.message };
    }
};

const FetchAll = async () => {
    try {
        const users = await User.find();
        return { message: 'success', users };
    } catch (error) {
        return { message: 'error', error: error.message };
    }
};

const FetchAllByClass = async (defaultClass) => {
    try {
        const users = await User.find({ defaultClass });
        return { message: 'success', users };
    } catch (error) {
        return { message: 'error', error: error.message };
    }
};

const FetchUserByEmail = async (email) => {
    email = email.toLowerCase();
    try {
        const user = await User.findOne({ email });
        return { message: 'success', user };
    } catch (error) {
        return { message: 'error', error: error.message };
    }
};

const FetchAllByRole = async (role) => {
    role = role.toLowerCase();
    try {
        const users = await User.find({ role });
        return { message: 'success', users };
    } catch (error) {
        return { message: 'error', error: error.message };
    }
};

const FetchUserByUsername = async (username) => {
    try {
        const user = await User.findOne({ username });
        return { message: 'success', user };
    } catch (error) {
        return { message: 'error', error: error.message };
    }
};


module.exports = {
    Ban,
    Create,
    Edit,
    Delete,
    Verify,
    FetchAll,
    FetchAllByClass,
    FetchAllByRole,
    FetchUserByEmail,
    FetchUserByUsername,
};