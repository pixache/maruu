const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async(client, message, args) => {
    let spinning = await message.channel.send({
        embed: {
          color: '000000',
          description: `${message.author.tag} bir çark çeviriyor...`,
          image: {
            url: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a36e39ed-2182-4fa3-af43-299e3d89d2de/db8jbxg-51f41c0c-b7ed-48f6-9128-3e5e701bfd88.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2EzNmUzOWVkLTIxODItNGZhMy1hZjQzLTI5OWUzZDg5ZDJkZVwvZGI4amJ4Zy01MWY0MWMwYy1iN2VkLTQ4ZjYtOTEyOC0zZTVlNzAxYmZkODguZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.XDGFAM5d5ZD20e_6JEQQrAkqOFwIwIhaTsxn4Uymnxk'
          }
        }
      });
    
      let timeout = (Math.random() * (60 - 5 + 1)) + 5;
      setTimeout(() => {
        spinning.edit({
          embed: {
            color: '000000',
            description: `${message.author.tag}, tam ${timeout.toFixed(2)} saniye çark çevirdi!`
          }
        }).catch(e => {
          console.error(e);
        });
      }, timeout * 1000);
}

module.exports.help = {
    name: 'çark'
}