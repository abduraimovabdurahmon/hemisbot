const {Scenes: {BaseScene}} = require('telegraf');
const set = new BaseScene('set');
const axios = require('axios');
const HTMLparseToObject = require('../utils/parser');

set.enter(async (ctx) => {
    try {
        ctx.reply("Dars jadvalini kodini fayl qilib(file.txt) yuboring(section.content).")
    } catch (error) {
        console.log(error);
    }
});

    
set.on('document', async (ctx) => {
    const {file_id: fileId} = ctx?.update?.message?.document;
    const fileUrl = await ctx?.telegram?.getFileLink(fileId);
    const response = await axios?.get(fileUrl);

    const data = HTMLparseToObject(response?.data);
    

    // Save to json file
    const fs = require('fs');
    const path = require('path');
    
    // save data.json file
    await fs.writeFileSync(path.join(__dirname, '../data.json'), JSON.stringify(data, null, 2));


    console.log('File saved');

    ctx.reply('Qabul qilindi!');
});

        


module.exports = set;