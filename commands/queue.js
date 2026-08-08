module.exports = {
  names: ['قائمة', 'ق'],
  async execute(message, args, client) {
    const queue = client.distube.getQueue(message.guild.id);
    if (!queue) return message.reply('⚠️ ما في أغاني شغالة حالياً.');

    const list = queue.songs
      .map((song, i) => `${i === 0 ? '🎶' : `${i}.`} **${song.name}** - \`${song.formattedDuration}\``)
      .slice(0, 15)
      .join('\n');

    message.channel.send(`📋 **قائمة التشغيل:**\n${list}`);
  },
};
