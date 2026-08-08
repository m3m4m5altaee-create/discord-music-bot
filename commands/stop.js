module.exports = {
  names: ['وقف', 'س'],
  async execute(message, args, client) {
    const queue = client.distube.getQueue(message.guild.id);
    if (!queue) return message.reply('⚠️ ما في أغاني شغالة حالياً.');

    await queue.stop();
    message.channel.send('⏹️ تم إيقاف التشغيل ومسح القائمة.');
  },
};
