const fs = require('fs/promises');
const path = require('path');
const { User } = require('../../models');
const Jimp = require('jimp');


const avatarsDir = path.join(__dirname, '../../', 'public/avatars');

const updAvatar = async (req, res) => {
    const { id } = req.params;
    const { path: tempPath, originalname } = req.file;
    const uploadPath = path.join(avatarsDir, req.params.id, originalname)
    try {
        const file = await Jimp.read(tempPath);
        await file.resize(250, 250).write(tempPath);

        await fs.rename(tempPath, uploadPath);
        const avatarURL = `/avatars/${id}/${originalname}`
        await User.findByIdAndUpdate(id, { avatarURL });
        
        res.json({
            status: 'success',
            code: 200,
            data: {
                avatarURL: avatarURL
            }
        })
    } catch (error) {
        await fs.unlink(tempPath);
        throw (error);
    }
}

module.exports = updAvatar;