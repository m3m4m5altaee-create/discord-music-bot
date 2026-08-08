module.exports = {
  names: ['شغل', 'ش'],
  async execute(message, args, client) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      return message.reply('⚠️ لازم تكون داخل روم صوتي عشان تستخدم هالأمر.');
    }
    if (!args.length) {
      return message.reply('⚠️ اكتب اسم الأغنية أو الرابط بعد الأمر. مثال: `!شغل اسم الأغنية`');
    }

    const query = args.join(' ');
    try {
      await client.distube.play(voiceChannel, query, {
        textChannel: message.channel,
        member: message.member,
      });
    } catch (err) {
      console.error(err);
      message.reply('❌ ما قدرت ألاقي أو أشغل هاي الأغنية.');
    }
  },
};
