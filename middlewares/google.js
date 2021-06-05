const axios = require('axios');
const jwt = require('jsonwebtoken');
const querystring = require('querystring');

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const root_url = process.env.ROOT_URL;

const getTokens = (code) => {
    const url = 'https://oauth2.googleapis.com/token';
    const values = {
        code,
        client_id,
        client_secret,
        redirect_uri: `${root_url}/auth/google`,
        grant_type: 'authorization_code',
    };
    return axios
        .post(url, querystring.stringify(values), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
        .then((res) => res.data)
        .catch((error) => {
            console.error(`Failed to fetch auth tokens`);
            throw new Error(error.message);
        });
}

const googleAuth = async (req, res, next) => {
    const code = req.query.code;
    const { id_token, access_token } = await getTokens(code);
    const user = await axios
        .get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
            {
                headers: {
                    Authorization: `Bearer ${id_token}`,
                },
            }
        )
        .then((res_) => res_.data)
        .catch((error) => {
            console.error(`Failed to fetch user`);
            throw new Error(error.message);
        });

    if (user.email == 'coding.ayush@gmail.com') {
        user.isAdmin = true;
    }

    /* 
        Sample response: 
        {
            id: '109440430898308780646',
            email: 'coding.ayush@gmail.com',
            verified_email: true,
            name: 'Ayush Singh',
            given_name: 'Ayush',
            family_name: 'Singh',
            picture: 'https://lh3.googleusercontent.com/a-/AOh14GgKBfrbozqd_X_kA3GRmPdbXadJ9WEyYJhTil-Y9w=s96-c',
            locale: 'en'
         }
    */

    req.body.user = user;

    next();
}

module.exports = googleAuth;