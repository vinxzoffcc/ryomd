const config = require('../config');
const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');

module.exports = {
    cmd: 'backup',
    category: 'OWNER',
    run: async (ctx) => {
        if (ctx.from.id !== config.ownerId) {
            return ctx.reply("<blockquote>❌ ACCESS DENIED\nThis command is for Owner only.</blockquote>", { parse_mode: 'HTML' });
        }

        const wait = await ctx.reply("<blockquote>ᴘʀᴏsᴇss....</blockquote>", { parse_mode: 'HTML' });

        try {
            const zipName = `Backup.zip`;
            const zip = new AdmZip();
            const rootDir = path.join(__dirname, '..');
            const files = fs.readdirSync(rootDir);
            const buffer = zip.toBuffer();

            files.forEach(file => {
                const fullPath = path.join(rootDir, file);
                const stat = fs.statSync(fullPath);
                if (file !== 'node_modules' && file !== '.git' && !file.endsWith('.zip')) {
                    if (stat.isDirectory()) {
                        zip.addLocalFolder(fullPath, file);
                    } else {
                        zip.addLocalFile(fullPath);
                    }
                }
            });

            await ctx.replyWithDocument({ 
                source: buffer, 
                filename: zipName 
            }, { 
                caption: `<blockquote>📦 <b>BACKUP SUCCESSFUL</b>\n\n◽ File: ${zipName}\nStatus: Success\n\n<i>© RYO-MD</i></blockquote>`, 
                parse_mode: 'HTML' 
            });

            await ctx.deleteMessage(wait.message_id);

        } catch (e) {
            console.error(e);
            await ctx.deleteMessage(wait.message_id);
            ctx.reply("<blockquote>❌ SYSTEM_ERROR: BACKUP_FAILED</blockquote>", { parse_mode: 'HTML' });
        }
    }
};
