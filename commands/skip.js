module.exports = {
  names: ['تخطي', 'ت'],
  async execute(message, args, client) {
    const queue = client.distube.getQueue(message.guild.id);
    if (!queue) return message.reply('⚠️ ما في أغاني شغالة حالياً.');

    try {
      if (queue.songs.length <= 1) {
        message.channel.send('⏭️ هاي آخر أغنية بالقائمة، رح أوقف التشغيل.');
        await queue.stop();
      } else {
        const song = await queue.skip();
        message.channel.send(`⏭️ تم التخطي، تشغيل الآن: **${song.name}**`);
      }
    } catch (err) {
      console.error(err);
      message.reply('❌ ما قدرت أتخطى الأغنية.');
    }
  },
};
