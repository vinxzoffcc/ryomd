const { Telegraf } = require('telegraf');
const fs = require('fs');
const path = require('path');
const config = require('./config');

const bot = new Telegraf(config.botToken);
bot.context.plugins = [];

const logCommand = (ctx, cmdName) => {
    const time = new Date().toLocaleTimeString();
    const user = ctx.from.username ? `@${ctx.from.username}` : 'No Username';
    const fullName = ctx.from.first_name + (ctx.from.last_name ? ' ' + ctx.from.last_name : '');
    const chatId = ctx.chat.id;

    console.log(`\x1b[34m┌──────────────────────────────────────────┐\x1b[0m`);
    console.log(`\x1b[34m│\x1b[0m \x1b[1m\x1b[33mCOMMAND USERS\x1b[0m`);
    console.log(`\x1b[34m├──────────────────────────────────────────┤\x1b[0m`);
    console.log(`\x1b[34m│\x1b[0m \x1b[32mTIME     :\x1b[0m ${time}`);
    console.log(`\x1b[34m│\x1b[0m \x1b[32mCOMMAND  :\x1b[0m /${cmdName}`);
    console.log(`\x1b[34m│\x1b[0m \x1b[32mUSER     :\x1b[0m ${fullName} (${user})`);
    console.log(`\x1b[34m│\x1b[0m \x1b[32mID       :\x1b[0m ${chatId}`);
    console.log(`\x1b[34m└──────────────────────────────────────────┘\x1b[0m`);
};

const pluginPath = path.join(__dirname, 'plugin');
const pluginFiles = fs.readdirSync(pluginPath).filter(file => file.endsWith('.js'));

console.log(`\n\x1b[35m╔════════════════════════════════════╗\n║       RYO MD PLUGIN LOADER         ║\n╚════════════════════════════════════╝\x1b[0m`);

for (const file of pluginFiles) {
    const plugin = require(path.join(pluginPath, file));
    if (Array.isArray(plugin)) {
        plugin.forEach(p => {
            bot.command(p.cmd, (ctx) => {
                logCommand(ctx, p.cmd);
                return p.run(ctx);
            });
            bot.context.plugins.push({ cmd: p.cmd, category: p.category || 'OTHER' });
            console.log(` \x1b[32m•\x1b[0m Loaded: /${p.cmd}`);
        });
    } else if (plugin.cmd && plugin.run) {
        bot.command(plugin.cmd, (ctx) => {
            logCommand(ctx, plugin.cmd);
            return plugin.run(ctx);
        });
        bot.context.plugins.push({ cmd: plugin.cmd, category: plugin.category || 'OTHER' });
        console.log(` \x1b[32m•\x1b[0m Loaded: /${plugin.cmd}`);
    }
}

bot.action(/view_cat_(.+)/, async (ctx) => {
    const category = ctx.match[1];
    const cmds = ctx.plugins.filter(p => p.category === category).map(p => p.cmd);
    
    let text = `<blockquote>`;
    text += `╔═══━━━━━━─── • ───━━━━━━═══╗\n`;
    text += `        📂 ${category.toUpperCase()} MODULE \n`;
    text += `╚═══━━━━━━─── • ───━━━━━━═══╝\n\n`;
    cmds.forEach(cmd => {
        text += `⬡. /${cmd}\n`;
    });
    text += `\n<i>© RYO-MD</i>`;
    text += `</blockquote>`;

    try {
        await ctx.editMessageCaption(text, {
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: [[{ text: "🔙 ʙᴀᴄᴋ ᴛᴏ ᴍᴇɴᴜ", callback_data: "go_home" }]]
            }
        });
    } catch (e) {}
});

bot.action("go_home", async (ctx) => {
    const menuPlugin = require('./plugin/menu');
    const { caption, buttons } = menuPlugin.render(ctx);
    try {
        await ctx.editMessageCaption(caption, {
            parse_mode: 'HTML',
            reply_markup: { inline_keyboard: buttons }
        });
    } catch (e) {}
});

bot.launch().then(() => {
    console.log(`\n\x1b[42m SUCCESS \x1b[0m ${config.botName} is Online!`);
});
