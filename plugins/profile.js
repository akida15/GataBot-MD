import { createHash } from 'crypto'
import { canLevelUp, xpRange } from '../lib/levelling.js'
import { levelup } from '../lib/canvas.js'
import PhoneNumber from 'awesome-phonenumber'
import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix }) => {
//let pp = 'https://i.imgur.com/EXTbyyn.jpg'
const pp = await conn.profilePictureUrl(conn.user.jid).catch(_ => './src/avatar_contact.png')
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
try {
pp = await conn.getProfilePicture(who)         //pp = await conn.getProfilePicture(who)
} catch (e) {

} finally {
let { name, limit, lastclaim, registered, regTime, age } = global.db.data.users[who]
let user = global.db.data.users[who]
let { min, xp, max } = xpRange(user.level, global.multiplier)
let username = conn.getName(who)
let sn = createHash('md5').update(who).digest('hex')
let str =
`┃ *الاسم :* ${name}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ *الرقم :* ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ *الرابط :* wa.me/${who.split`@`[0]}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ *اللقب:* ${user.role}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ *المستوى:* *${user.level}*
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ مسجل؟ : ${registered ? 'نعم': 'لا'}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ *اكس بي:* *${user.exp - min}/${xp}*
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ *الايدي :*
┃ *${sn}*`
conn.sendButton(m.chat, str, wm, await(await fetch(pp)).buffer(), [['𝙑𝙚𝙧𝙞𝙛𝙞𝙘𝙖𝙧 | 𝙑𝙚𝙧𝙞𝙛𝙮', '/verificar ✅'], ['𝙌𝙪𝙚 𝙚𝙢𝙥𝙞𝙚𝙘𝙚 𝙡𝙖 𝙖𝙫𝙚𝙣𝙩𝙪𝙧𝙖!! 😎', '/menu']], m)
}}
handler.help = ['profile [@user]']
handler.tags = ['xp']
handler.command = /^perfil|profile?$/i
export default handler
