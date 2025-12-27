const config = require('../config');
const os = require('os');

const renderMenu = (ctx) => {
    const categories = [...new Set(ctx.plugins.map(p => p.category))];
    
    const buttons = [];
    for (let i = 0; i < categories.length; i += 2) {
        const row = [];
        row.push({ text: `📂 ${categories[i].toUpperCase()}`, callback_data: `view_cat_${categories[i]}` });
        if (categories[i + 1]) {
            row.push({ text: `📂 ${categories[i + 1].toUpperCase()}`, callback_data: `view_cat_${categories[i + 1]}` });
        }
        buttons.push(row);
    }
    
    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const name = ctx.from.first_name;

    let caption = `<blockquote>`;
    caption += `╔═══━━━━━━─── • ───━━━━━━═══╗\n`;
    caption += `        ✨ ${config.botName.toUpperCase()} ✨\n`;
    caption += `╚═══━━━━━━─── • ───━━━━━━═══╝\n\n`;
    caption += `┌  ✨ USER INFO\n`;
    caption += `│  ⬡ Name: ${name}\n`;
    caption += `│  ⬡ Owner: ${config.owner}\n`;
    caption += `└───────────────┈╼\n\n`;
    caption += `┌  🚀 SYSTEM STATUS\n`;
    caption += `│  ⬡ Uptime: ${hours}h ${minutes}m\n`;
    caption += `│  ⬡ Memory: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB\n`;
    caption += `│  ⬡ Platform: ${os.platform()}\n`;
    caption += `└───────────────┈╼\n\n`;
    caption += `<i>Please select a module category below</i> 🎐`;
    caption += `</blockquote>`;

    return { caption, buttons };
};

module.exports = {
    cmd: 'menu',
    category: 'MAIN',
    render: renderMenu,
    run: async (ctx) => {
        const { caption, buttons } = renderMenu(ctx);
        await ctx.replyWithPhoto(
            { url: 'https://files.catbox.moe/k37jcb.jpg' }, 
            {
                caption: caption,
                parse_mode: 'HTML',
                reply_markup: { inline_keyboard: buttons }
            }
        );
    }
};
