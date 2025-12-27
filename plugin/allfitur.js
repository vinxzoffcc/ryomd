const axios = require('axios');
const fetch = require('node-fetch');
const fs = require('fs');
const os = require('os');
const moment = require('moment');
const FormData = require('form-data');
const config = require('../config');

module.exports = [
    {
        cmd: ['ping', 'speed'],
        category: 'INFO',
        run: async (ctx) => {
            const wait = await ctx.reply("<blockquote>ᴘʀᴏsᴇss....</blockquote>", { parse_mode: 'HTML' });
            const start = performance.now();
            const uptime = moment.duration(process.uptime(), "seconds");
            const speed = (performance.now() - start).toFixed(2);
            let info = `<blockquote>🚀 <b>ᴘɪɴɢ ʙᴏᴛ</b>\n\n◽ sᴘᴇᴇᴅ: ${speed} ms\n◽ ᴜᴘᴛɪᴍᴇ: ${uptime.hours()}h ${uptime.minutes()}m ${uptime.seconds()}s</blockquote>`;
            await ctx.telegram.editMessageText(ctx.chat.id, wait.message_id, null, info, { parse_mode: 'HTML' });
        }
    },
    {
        cmd: 'totalfitur',
        category: 'INFO',
        run: async (ctx) => {
            const total = ctx.plugins.length;
            await ctx.reply(`<blockquote>📊 <b>sᴛᴀᴛɪsᴛɪᴋ ғɪᴛᴜʀ</b>\n\nᴛᴏᴛᴀʟ ғɪᴛᴜʀ ʏᴀɴɢ ᴛᴇʀsᴇᴅɪᴀ: <b>${total}</b></blockquote>`, { parse_mode: 'HTML' });
        }
    },
    {
        cmd: 'anime',
        category: 'ANIME',
        run: async (ctx) => {
            try {
                const { data } = await axios.get("https://api.waifu.pics/sfw/waifu");
                await ctx.replyWithPhoto(data.url, {
                    caption: "<blockquote>⛩️ <b>ᴀɴɪᴍᴇ sғᴡ</b></blockquote>",
                    parse_mode: 'HTML'
                });
            } catch {
                ctx.reply("<blockquote>❌ ɢᴀɢᴀʟ ᴍᴇɴɢᴀᴍʙɪʟ ɢᴀᴍʙᴀʀ ᴀɴɪᴍᴇ</blockquote>", { parse_mode: 'HTML' });
            }
        }
    },
    {
        cmd: 'softanime',
        category: 'ANIME',
        run: async (ctx) => {
            try {
                const cats = ["neko", "shinobu", "megumin"];
                const cat = cats[Math.floor(Math.random() * cats.length)];
                const { data } = await axios.get(`https://api.waifu.pics/sfw/${cat}`);
                await ctx.replyWithPhoto(data.url, {
                    caption: `<blockquote>🐱 <b>${cat.toUpperCase()} (sғᴡ)</b></blockquote>`,
                    parse_mode: 'HTML'
                });
            } catch {
                ctx.reply("<blockquote>❌ ɢᴀɢᴀʟ ᴍᴇɴɢᴀᴍʙɪʟ sᴏғᴛᴀɴɪᴍᴇ</blockquote>", { parse_mode: 'HTML' });
            }
        }
    },
    {
        cmd: 'waifu',
        category: 'ANIME',
        run: async (ctx) => {
            try {
                const { data } = await axios.get("https://api.waifu.pics/sfw/waifu");
                await ctx.replyWithPhoto(data.url, {
                    caption: "<blockquote>🌸 <b>ᴡᴀɪғᴜ (sғᴡ)</b></blockquote>",
                    parse_mode: 'HTML'
                });
            } catch {
                ctx.reply("<blockquote>❌ ɢᴀɢᴀʟ ᴍᴇɴɢᴀᴍʙɪʟ ᴡᴀɪғᴜ</blockquote>", { parse_mode: 'HTML' });
            }
        }
    },
    {
        cmd: 'fixcode',
        category: 'TOOLS',
        run: async (ctx) => {
            const replyMsg = ctx.message.reply_to_message;
            let code = null;
            if (replyMsg?.text) {
                code = replyMsg.text;
            } else if (replyMsg?.document) {
                const doc = replyMsg.document;
                if (doc.mime_type === "application/javascript" || doc.file_name.endsWith(".js")) {
                    const file = await ctx.telegram.getFile(doc.file_id);
                    const fileUrl = `https://api.telegram.org/file/bot${config.botToken}/${file.file_path}`;
                    const res = await fetch(fileUrl);
                    code = await res.text();
                }
            }
            if (!code) return ctx.reply("<blockquote>❌ ʙᴀʟᴀs ᴘᴇsᴀɴ ᴛᴇᴋs ᴀᴛᴀᴜ ғɪʟᴇ .ᴊs ᴅᴜʟᴜ!</blockquote>", { parse_mode: 'HTML' });
            const wait = await ctx.reply("<blockquote>🧠 ᴏᴛᴡ ʙᴇɴᴇʀɪɴ ᴋᴏᴅᴇɴʏᴀ...</blockquote>", { parse_mode: 'HTML' });
            try {
                const prompt = "kamu adalah ai yang bisa perbaiki code yang error";
                const content = `Perbaiki kode ini tanpa penjelasan tambahan. Langsung kirim kodenya saja dalam format markdown code block:\n\n${code}`;
                const apiUrl = `https://api.siputzx.my.id/api/ai/gpt3?prompt=${encodeURIComponent(prompt)}&content=${encodeURIComponent(content)}`;
                const response = await fetch(apiUrl);
                const data = await response.json();
                if (data?.result) {
                    let reply = data.result.trim();
                    if (!reply.includes("```")) reply = `\`\`\`javascript\n${reply}\n\`\`\``;
                    await ctx.reply(reply, { parse_mode: "Markdown" });
                    await ctx.deleteMessage(wait.message_id);
                } else {
                    throw new Error();
                }
            } catch {
                ctx.telegram.editMessageText(ctx.chat.id, wait.message_id, null, "<blockquote>❌ ɢᴀɢᴀʟ ᴍᴇᴍᴘᴇʀʙᴀɪᴋɪ ᴋᴏᴅᴇ</blockquote>", { parse_mode: 'HTML' });
            }
        }
    },
    {
        cmd: 'play',
        category: 'DOWNLOADER',
        run: async (ctx) => {
            const q = ctx.message.text.split(' ').slice(1).join(' ');
            if (!q) return ctx.reply("<blockquote>Mau cari lagu apa?</blockquote>", { parse_mode: "HTML" });
            const wait = await ctx.reply("<blockquote>ᴘʀᴏsᴇss....</blockquote>", { parse_mode: 'HTML' });
            try {
                const search = await axios.get(`https://piereeapi.vercel.app/search/spotify?q=${encodeURIComponent(q)}`);
                const track = search.data.results[0];
                const dl = await axios.get(`https://api.nekolabs.web.id/downloader/spotify/play/v1?q=${encodeURIComponent(track.url || q)}`);
                const result = dl.data.result;
                await ctx.replyWithAudio({ url: result.url }, {
                    caption: `<blockquote>🎼 ${track.title}\n👤 ${track.artist}</blockquote>`,
                    parse_mode: "HTML",
                    title: track.title,
                    performer: track.artist,
                    thumb: { url: track.thumbnail }
                });
                await ctx.deleteMessage(wait.message_id);
            } catch {
                ctx.telegram.editMessageText(ctx.chat.id, wait.message_id, null, "<blockquote>❌ ɢᴀɢᴀʟ</blockquote>", { parse_mode: 'HTML' });
            }
        }
    },
    {
        cmd: 'ttsearch',
        category: 'SEARCH',
        run: async (ctx) => {
            const q = ctx.message.text.split(' ').slice(1).join(' ');
            if (!q) return ctx.reply("<blockquote>Usage: /ttsearch [query]</blockquote>", { parse_mode: 'HTML' });
            const wait = await ctx.reply("<blockquote>ᴘʀᴏsᴇss....</blockquote>", { parse_mode: 'HTML' });
            try {
                const res = await axios.get(`${config.apiUrl}/search/tiktok?q=${encodeURIComponent(q)}`);
                await ctx.replyWithVideo({ url: res.data.result[0].play }, { 
                    caption: `<blockquote>🎬 <b>TIKTOK SEARCH</b></blockquote>`, 
                    parse_mode: 'HTML' 
                });
                await ctx.deleteMessage(wait.message_id);
            } catch {
                ctx.telegram.editMessageText(ctx.chat.id, wait.message_id, null, "<blockquote>❌ ɴᴏᴛ ғᴏᴜɴᴅ</blockquote>", { parse_mode: 'HTML' });
            }
        }
    },
    {
        cmd: 'aigroq',
        category: 'AI',
        run: async (ctx) => {
            const args = ctx.message.text.split(' ').slice(1).join(' ').trim();
            if (!args) return ctx.reply("<blockquote>❌ ᴍᴀsᴜᴋᴋᴀɴ ᴘᴇʀᴛᴀɴʏᴀᴀɴ!</blockquote>", { parse_mode: "HTML" });
            const wait = await ctx.reply("<blockquote>ᴘʀᴏsᴇss....</blockquote>", { parse_mode: "HTML" });
            try {
                const { data } = await axios.get(`https://piereeapi.vercel.app/ai/groq?text=${encodeURIComponent(args)}`);
                await ctx.telegram.editMessageText(ctx.chat.id, wait.message_id, null, `<blockquote>${data.result}</blockquote>`, { parse_mode: "HTML" });
            } catch { ctx.telegram.editMessageText(ctx.chat.id, wait.message_id, null, "<blockquote>❌ ᴇʀʀᴏʀ</blockquote>", { parse_mode: "HTML" }); }
        }
    },
    {
        cmd: 'aideepsek',
        category: 'AI',
        run: async (ctx) => {
            const text = ctx.message.text.split(" ").slice(1).join(" ");
            if (!text) return ctx.reply("<blockquote>ᴋᴇᴛɪᴋ ᴛᴇᴋs ʏᴀɴɢ ɪɴɢɪɴ ᴅɪᴛᴀɴʏᴀᴋᴀɴ</blockquote>", { parse_mode: "HTML" });
            const wait = await ctx.reply("<blockquote>ᴘʀᴏsᴇss....</blockquote>", { parse_mode: "HTML" });
            try {
                const res = await fetch(`https://piereeapi.vercel.app/ai/deepseek?text=${encodeURIComponent(text)}`);
                const data = await res.json();
                await ctx.telegram.editMessageText(ctx.chat.id, wait.message_id, null, `<blockquote>${data.result.data.response}</blockquote>`, { parse_mode: "HTML" });
            } catch { ctx.telegram.editMessageText(ctx.chat.id, wait.message_id, null, "<blockquote>❌ ᴇʀʀᴏʀ</blockquote>", { parse_mode: "HTML" }); }
        }
    },
    {
        cmd: 'aigpt4',
        category: 'AI',
        run: async (ctx) => {
            const q = ctx.message.text.split(" ").slice(1).join(" ");
            if (!q) return ctx.reply("<blockquote>⚠️ ᴛᴜʟɪs ᴘᴇsᴀɴɴʏᴀ</blockquote>", { parse_mode: "HTML" });
            const wait = await ctx.reply("<blockquote>ᴘʀᴏsᴇss....</blockquote>", { parse_mode: "HTML" });
            try {
                const res = await fetch(`https://piereeapi.vercel.app/ai/gpt4o?prompt=${encodeURIComponent(q)}`);
                const data = await res.json();
                await ctx.telegram.editMessageText(ctx.chat.id, wait.message_id, null, `<blockquote>${data.message}</blockquote>`, { parse_mode: "HTML" });
            } catch { ctx.telegram.editMessageText(ctx.chat.id, wait.message_id, null, "<blockquote>❌ ᴇʀʀᴏʀ</blockquote>", { parse_mode: "HTML" }); }
        }
    },
    {
        cmd: 'ustad',
        category: 'ISLAMIC',
        run: async (ctx) => {
            const args = ctx.message.text.split(' ').slice(1).join(' ').trim();
            if (!args) return ctx.reply("<blockquote>❌ ᴍᴀsᴜᴋᴋᴀɴ ᴘᴇʀᴛᴀɴʏᴀᴀɴ!</blockquote>", { parse_mode: 'HTML' });
            const wait = await ctx.reply("<blockquote>ᴘʀᴏsᴇss....</blockquote>", { parse_mode: 'HTML' });
            try {
                const { data } = await axios.get(`https://api.taka.my.id/tanya-ustad?quest=${encodeURIComponent(args)}`, { responseType: 'arraybuffer' });
                await ctx.replyWithPhoto({ source: Buffer.from(data) }, { caption: `<blockquote>🕌 <b>ᴛᴀɴʏᴀ ᴜsᴛᴀᴅ</b>\n\n❓ ${args}</blockquote>`, parse_mode: 'HTML' });
                await ctx.deleteMessage(wait.message_id);
            } catch { ctx.telegram.editMessageText(ctx.chat.id, wait.message_id, null, "<blockquote>❌ ɢᴀɢᴀʟ</blockquote>", { parse_mode: 'HTML' }); }
        }
    },
    {
        cmd: 'tiktok',
        category: 'DOWNLOADER',
        run: async (ctx) => {
            const args = ctx.message.text.split(' ').slice(1).join(' ').trim();
            if (!args) return ctx.reply("<blockquote>❌ ᴍᴀsᴜᴋᴋᴀɴ ʟɪɴᴋ!</blockquote>", { parse_mode: 'HTML' });
            const wait = await ctx.reply("<blockquote>ᴘʀᴏsᴇss....</blockquote>", { parse_mode: 'HTML' });
            try {
                const { data } = await axios.get(`https://piereeapi.vercel.app/download/tiktok?url=${encodeURIComponent(args)}`);
                const result = data.result;
                let cap = `<blockquote>📱 ᴛɪᴋᴛᴏᴋ\n👤 @${result.author.username}</blockquote>`;
                if (result.media.images?.length > 0) {
                    const mg = result.media.images.slice(0, 10).map((img, i) => ({ type: 'photo', media: img, caption: i === 0 ? cap : '', parse_mode: 'HTML' }));
                    await ctx.replyWithMediaGroup(mg);
                } else {
                    await ctx.replyWithVideo({ url: result.download_links.hd_quality || result.download_links.no_watermark }, { caption: cap, parse_mode: 'HTML' });
                }
                await ctx.deleteMessage(wait.message_id);
            } catch { ctx.telegram.editMessageText(ctx.chat.id, wait.message_id, null, "<blockquote>❌ ᴇʀʀᴏʀ</blockquote>", { parse_mode: 'HTML' }); }
        }
    },
    {
        cmd: 'spotify',
        category: 'DOWNLOADER',
        run: async (ctx) => {
            const q = ctx.message.text.split(' ').slice(1).join(' ');
            if (!q) return ctx.reply("<blockquote>Usage: /spotify [query]</blockquote>", { parse_mode: 'HTML' });
            const wait = await ctx.reply("<blockquote>ᴘʀᴏsᴇss....</blockquote>", { parse_mode: 'HTML' });
            try {
                const res = await axios.get(`https://api.nekolabs.web.id/downloader/spotify/play/v1?q=${encodeURIComponent(q)}`);
                const result = res.data.result;
                await ctx.replyWithAudio({ url: result.url }, {
                    caption: `<blockquote>🎵 ${result.title}</blockquote>`, parse_mode: 'HTML', title: result.title, performer: result.artist, thumb: { url: result.thumbnail }
                });
                await ctx.deleteMessage(wait.message_id);
            } catch { ctx.telegram.editMessageText(ctx.chat.id, wait.message_id, null, "<blockquote>❌ ᴇʀʀᴏʀ</blockquote>", { parse_mode: 'HTML' }); }
        }
    },
    {
        cmd: 'pinterest',
        category: 'DOWNLOADER',
        run: async (ctx) => {
            const url = ctx.message.text.split(' ')[1];
            if (!url) return ctx.reply("<blockquote>Usage: /pinterest [url]</blockquote>", { parse_mode: 'HTML' });
            const wait = await ctx.reply("<blockquote>ᴘʀᴏsᴇss....</blockquote>", { parse_mode: 'HTML' });
            try {
                const res = await axios.get(`${config.apiUrl}/download/pinterest?url=${url}`);
                const result = res.data.result;
                if (typeof result === 'string' && (result.includes('.mp4') || result.includes('m3u8'))) {
                    await ctx.replyWithVideo(result, { caption: "<blockquote>✅ sᴜᴄᴄᴇss</blockquote>", parse_mode: 'HTML' });
                } else {
                    await ctx.replyWithPhoto(result, { caption: "<blockquote>✅ sᴜᴄᴄᴇss</blockquote>", parse_mode: 'HTML' });
                }
                await ctx.deleteMessage(wait.message_id);
            } catch { ctx.telegram.editMessageText(ctx.chat.id, wait.message_id, null, "<blockquote>❌ ᴇʀʀᴏʀ</blockquote>", { parse_mode: 'HTML' }); }
        }
    },
    {
        cmd: 'mediafire',
        category: 'DOWNLOADER',
        run: async (ctx) => {
            const url = ctx.message.text.split(' ')[1];
            if (!url) return ctx.reply("<blockquote>Usage: /mediafire [url]</blockquote>", { parse_mode: 'HTML' });
            const wait = await ctx.reply("<blockquote>ᴘʀᴏsᴇss....</blockquote>", { parse_mode: 'HTML' });
            try {
                const res = await axios.get(`${config.apiUrl}/download/mediafire?url=${url}`);
                const { fileName, link } = res.data.result;
                await ctx.replyWithDocument({ url: link, filename: fileName }, { caption: `<blockquote>📂 ${fileName}</blockquote>`, parse_mode: 'HTML' });
                await ctx.deleteMessage(wait.message_id);
            } catch { ctx.telegram.editMessageText(ctx.chat.id, wait.message_id, null, "<blockquote>❌ ᴇʀʀᴏʀ</blockquote>", { parse_mode: 'HTML' }); }
        }
    },
    {
        cmd: 'sticker',
        category: 'STICKER',
        run: async (ctx) => {
            const replyMsg = ctx.message.reply_to_message;
            if (!replyMsg || !replyMsg.photo) {
                return ctx.reply("<blockquote>❌ ʙᴀʟᴀs ɢᴀᴍʙᴀʀ ʏᴀɴɢ ɪɴɢɪɴ ᴅɪᴊᴀᴅɪᴋᴀɴ sᴛɪᴋᴇʀ!</blockquote>", { parse_mode: 'HTML' });
            }
            const wait = await ctx.reply("<blockquote>ᴘʀᴏsᴇss....</blockquote>", { parse_mode: 'HTML' });
            try {
                const fileId = replyMsg.photo[replyMsg.photo.length - 1].file_id;
                const fileLink = await ctx.telegram.getFileLink(fileId);
                await ctx.replyWithSticker({ url: fileLink.href });
                await ctx.deleteMessage(wait.message_id);
            } catch (err) {
                console.error(err);
                await ctx.telegram.editMessageText(ctx.chat.id, wait.message_id, null, "<blockquote>❌ ɢᴀɢᴀʟ ᴍᴇᴍʙᴜᴀᴛ sᴛɪᴋᴇʀ</blockquote>", { parse_mode: 'HTML' });
            }
        }
    },
    {
        cmd: 'qc',
        category: 'STICKER',
        run: async (ctx) => {
            const replyMsg = ctx.message.reply_to_message;
            if (!replyMsg || (!replyMsg.text && !replyMsg.caption)) return ctx.reply("<blockquote>❌ ʀᴇᴘʟʏ ᴛᴇᴋs!</blockquote>", { parse_mode: 'HTML' });
            const wait = await ctx.reply("<blockquote>ᴘʀᴏsᴇss....</blockquote>", { parse_mode: 'HTML' });
            try {
                const obj = {
                    type: "quote", format: "png", backgroundColor: "#000000", width: 512, height: 768, scale: 2,
                    messages: [{ entities: [], avatar: true, from: { id: 1, name: replyMsg.from.first_name, photo: { url: `https://t.me/i/userpic/320/${replyMsg.from.username || 'user'}.jpg` } }, text: replyMsg.text || replyMsg.caption, replyMessage: {} }]
                };
                const res = await axios.post("[https://bot.lyo.su/quote/generate](https://bot.lyo.su/quote/generate)", obj);
                await ctx.replyWithSticker({ source: Buffer.from(res.data.result.image, "base64") });
                await ctx.deleteMessage(wait.message_id);
            } catch { ctx.telegram.editMessageText(ctx.chat.id, wait.message_id, null, "<blockquote>❌ ɢᴀɢᴀʟ</blockquote>", { parse_mode: 'HTML' }); }
        }
    },
    {
        cmd: 'brat',
        category: 'STICKER',
        run: async (ctx) => {
            const text = ctx.message.text.split(' ').slice(1).join(' ');
            if (!text) return ctx.reply("<blockquote>Usage: /brat [text]</blockquote>", { parse_mode: 'HTML' });
            const wait = await ctx.reply("<blockquote>ᴘʀᴏsᴇss....</blockquote>", { parse_mode: 'HTML' });
            try {
                const stickerUrl = `${config.apiUrl}/imagecreator/brat?text=${encodeURIComponent(text)}`;
                await ctx.replyWithSticker({ url: stickerUrl });
                await ctx.deleteMessage(wait.message_id);
            } catch { ctx.telegram.editMessageText(ctx.chat.id, wait.message_id, null, "<blockquote>❌ ᴇʀʀᴏʀ</blockquote>", { parse_mode: 'HTML' }); }
        }
    },
    {
        cmd: 'tourl',
        category: 'TOOLS',
        run: async (ctx) => {
            const replyMsg = ctx.message.reply_to_message;
            if (!replyMsg || (!replyMsg.photo && !replyMsg.video && !replyMsg.document)) return ctx.reply("<blockquote>❌ ʀᴇᴘʟʏ ᴍᴇᴅɪᴀ!</blockquote>", { parse_mode: 'HTML' });
            const wait = await ctx.reply("<blockquote>ᴘʀᴏsᴇss....</blockquote>", { parse_mode: 'HTML' });
            try {
                let fileId = replyMsg.photo ? replyMsg.photo[replyMsg.photo.length - 1].file_id : (replyMsg.video ? replyMsg.video.file_id : replyMsg.document.file_id);
                const file = await ctx.telegram.getFile(fileId);
                const response = await axios.get(`https://api.telegram.org/file/bot${config.botToken}/${file.file_path}`, { responseType: 'stream' });
                const form = new FormData();
                form.append('reqtype', 'fileupload');
                form.append('fileToUpload', response.data, { filename: 'file' });
                const { data: url } = await axios.post('[https://catbox.moe/user/api.php](https://catbox.moe/user/api.php)', form, { headers: form.getHeaders() });
                await ctx.telegram.editMessageText(ctx.chat.id, wait.message_id, null, `<blockquote>✅ ${url}</blockquote>`, { parse_mode: 'HTML' });
            } catch { ctx.telegram.editMessageText(ctx.chat.id, wait.message_id, null, "<blockquote>❌ ɢᴀɢᴀʟ</blockquote>", { parse_mode: 'HTML' }); }
        }
    }
];
