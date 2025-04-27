const { AccessToken } = require('livekit-server-sdk');

const apiKey = "devkey";
const apiSecret = "devsecret";
const roomName = "myroom";
const userIdentity = "user123";

async function generateToken() {
    const token = new AccessToken(apiKey, apiSecret, { identity: userIdentity });
    token.addGrant({ roomJoin: true, room: roomName });

    console.log("Generated Token:", await token.toJwt());
}

generateToken();
