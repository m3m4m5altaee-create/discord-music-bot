module.exports = {
  names: ['ايقاف_مؤقت', 'وقف_مؤقت'],
  async execute(message, args, client) {
    const queue = client.distube.getQueue(message.guild.id);
    if (!queue) return message.reply('⚠️ ما في أغاني شغالة حالياً.');

    queue.pause();
    message.channel.send('⏸️ تم إيقاف الأغنية مؤقتاً.');
  },
};
