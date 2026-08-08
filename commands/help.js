module.exports = {
  names: ['مساعدة', 'اوامر'],
  async execute(message, args, client) {
    const prefix = process.env.PREFIX || '!';
    const text = [
      `**🎵 أوامر البوت (البادئة: \`${prefix}\`)**`,
      `\`${prefix}شغل [اسم الأغنية / رابط]\` أو \`${prefix}ش\` — تشغيل أغنية`,
      `\`${prefix}تخطي\` أو \`${prefix}ت\` — تخطي الأغنية الحالية`,
      `\`${prefix}وقف\` أو \`${prefix}س\` — إيقاف التشغيل ومسح القائمة`,
      `\`${prefix}وقف_مؤقت\` — إيقاف مؤقت`,
      `\`${prefix}كمل\` — استكمال التشغيل`,
      `\`${prefix}قائمة\` أو \`${prefix}ق\` — عرض قائمة التشغيل`,
      `\`${prefix}اطلع\` — إخراج البوت من الروم الصوتي`,
    ].join('\n');
    message.channel.send(text);
  },
};
