module.exports = {
  names: ['اطلع', 'خروج'],
  async execute(message, args, client) {
    const queue = client.distube.getQueue(message.guild.id);
    if (!queue) return message.reply('⚠️ ما في أغاني شغالة حالياً.');

    await queue.stop();
    message.channel.send('👋 طلعت من الروم الصوتي.');
  },
};
