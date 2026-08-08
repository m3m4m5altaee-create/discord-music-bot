module.exports = {
  names: ['كمل', 'استمرار'],
  async execute(message, args, client) {
    const queue = client.distube.getQueue(message.guild.id);
    if (!queue) return message.reply('⚠️ ما في أغاني شغالة حالياً.');

    queue.resume();
    message.channel.send('▶️ رجعنا نشغل الأغنية.');
  },
};
