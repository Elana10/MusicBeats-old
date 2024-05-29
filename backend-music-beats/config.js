
function getDatabaseUri(){
    return (process.env.NODE_ENV === "test")
        ? 'musicbeats_test'
        : 'musicbeats'
}


const BASE_URL = 'https://api.music.apple.com/v1';
const PORT = process.env.PORT || 3001;
const port = process.env.PORT || 3001;

const SECRET_JWT_KEY = "FlamingoParty!"

const BCRYPT_WORK_FACTOR = 12;

module.exports = {PORT, BASE_URL, SECRET_JWT_KEY, BCRYPT_WORK_FACTOR, getDatabaseUri}
