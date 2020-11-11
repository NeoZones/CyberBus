const LAST_UPDATED = `> The source code for this bot was last updated on **2020-08-27** by **joppiesaus**, making this **version 0.4.15**`;
// const LAST_UPDATED = `> The source code for this bot was last updated on **YYYY-MM-DD** by **PERSON**, making this **version XXX**`;
//
// OTHER RUBBISH
// The profile photo can be found at the following URL: https://wiki.neozones.club/index.php?title=File:CyberBus.png
// If new commands are added, or a correction needs to be made, please add it to the wiki: https://wiki.neozones.club/index.php?title=CyberBus
// The inviter link for the bot is: https://discord.com/api/oauth2/authorize?client_id=725790727899971725&permissions=0&scope=bot
//

const Discord = require("discord.js");
const bot = new Discord.Client();
const secret = require("./secret.json");
const DELETE_TIMEOUT = 30000; // 30000 ms / 30 seconds / half a minute

// picks an random element from an array.
Array.prototype.pickRandom = function() {
    return this[Math.floor(Math.random() * this.length)];
};

const messageObj = require("./messages.json");

bot.login(secret.token); // see this? no more tokens in here! create a special file called secret.json, and add:
//{
//	"token": "dumbass token thing"
//}

function uwu(m) {
    const suffixes = [
        " XDDD",
        " UwU",
        "...",
        " ^_^",
        " :P",
        " :3",
        " ;)",
        " ._.",
        " xD",
        " x3",
        " ;_;",
        " (????)",
        " <3",
        " <:",
        " >w<"
    ];
  
    return m.replace(/[rl]/g, "w")
        .replace(/[RL]/g, "W")
        .replace(/ma/gi, "mwa")
        .replace(/mu/gi, "mwu")
        .replace(/mo/gi, "mwo")
        .replace(/ha[sv]e?/gi, "haz")
        //.replace(/you/gi, "uu")
        .replace(/the /gi, "da ")
        .replace(/this /gi, "dis ")
        + suffixes[Math.floor(Math.random() * suffixes.length)]
      ;
};


// Bot Activity Status
bot.on("ready", () => {
  bot.user.setStatus("available");
  bot.user.setPresence({
    game: {
      name: ">help",
      type: "PLAYING"
      // TODO: IDK HOW THIS SHIT WORSK
    }
  });
  
  console.log("CyberBus is up and ready!");
});

const errorFunc = function(error) {
  console.error(error); // just display the error, and move on.
};


// Last updated
bot.on("message", message => {
  
  // prevent bot from listening to itself
  if (message.author == bot.user) {
    return;
  }

  // Shortcut
  const msg = message.content.toLowerCase();

  if (msg == ">update") {
    message.channel.send(LAST_UPDATED);
  }
  
  let checkRole = function(role, primary, secondary, alt) {
    if (
                    msg == `>iam ${primary}` ||
      (secondary && msg == `>iam ${secondary}`) ||
      (alt       && msg == `>iam ${alt}`)
    ) {
        // add the role.
         message.member.roles.add(role).then(r => {
           // send the a notification
          message.channel.send(
              `${message.author.username}, enjoy your new role!`
          )
          .then(sentMessage => {
            // delete that shit.
//            sentMessage.delete({timeout: DELETE_TIMEOUT});
            message.delete();
          })
          .catch(errorFunc);
        }).catch(errorFunc);
    } else if (
                    msg == `>iamnot ${primary}` ||
      (secondary && msg == `>iamnot ${secondary}`) ||
      (alt       && msg == `>iamnot ${alt}`)
    ) {
        message.member.roles.remove(role).then(r => {
          message.channel.send(
              `${message.author.username}, your role has been removed.`
          )
          .then(sentMessage => {
//            sentMessage.delete({timeout: DELETE_TIMEOUT});
            message.delete();
          })
          .catch(errorFunc);
        }).catch(errorFunc);
    }
  };

  let checkColorRole = function(color, alt, role) {
    if (
      msg == `>iam ${color}` ||
      msg == `>iam ${alt}`
    ) {
      
        message.member.roles.add(role).then(r => {
          message.channel.send(
              `${message.author.username}, enjoy your color role!`
          )
          .then(sentMessage => {
//            sentMessage.delete({timeout: DELETE_TIMEOUT});
            message.delete();
          })
          .catch(errorFunc);
        }).catch(errorFunc);
    } else if (
      msg == `>iamnot ${color}` ||
      msg == `>iamnot ${alt}`
    ) {
        message.member.roles.remove(role).then(r => {
          message.channel.send(
              `${message.author.username}, your color role has been removed successfully.`
          )
          .then(sentMessage => {
//            sentMessage.delete({timeout: DELETE_TIMEOUT});
            message.delete();
          })
          .catch(errorFunc);
        }).catch(errorFunc);
    }
  };

  let checkQuotes = function() {
      
      let marr = messageObj.messages;
    
      for (let i = 0; i < marr.length; i++) {
        
          let o = marr[i];
          if (msg == `>${o.trigger}`) {
              message.channel.send(o.messages.pickRandom());
              return true;
          }
      }
      return false;
  };
  
  //let rrrr = message.guild.roles.cache.find(role => role.name === "epic role").id
  //console.log(rrrr);
  
  //checkColorRole("epic green", 1, rrrr);


// Kind of useful stuff
 // Commands that have been made as a way to help users better interact with the bot itself
  if (msg == ">help") {
    message.channel.send(
      `To find more commands/credits for the bot, check out this URL: https://wiki.neozones.club/index.php?title=CyberBus`
    );
  }

// Show all server emojis
 // Command will make the bot post all of the current emojis that the server has
  if (msg === ">emojis") {
    const emojiList = message.guild.emojis.cache.map(e => e.toString()).join(" ");
    message.channel.send(emojiList).catch(errorFunc);
  }


// Repeat what the user says
  if (message.content.startsWith(">say")) {
    message.channel.send(
      message.author.username + " says: " + message.content.replace(">say ", "")
    );
  }


// User roles

// Gender roles

  if (
    msg == ">gender" ||
    msg == ">genders"
  ) {
    message.channel.send(
      "A list of genders that you can give yourself can be found here <https://wiki.neozones.club/index.php?title=CyberBus#Gender_Roles>"
    );
  }


  //checkrole(roleId, first callsign, optional secondary callsign, optional third callsign)
  // omit the optional ones when not required.
  // I'll do one here as an example:

  //checkRole(message.guild.roles.cache.find(role => role.name === "epic role").id, "epic meme", "owned epic style", "fsldkfjsdlfkj");


  checkRole("725563720423571507", "any", "all gender", "whatever");  
  
  // I had made the checkRole function only to support up to 3 arguments, so I split them here
  checkRole("692142321268949073", "he", "him", "his");
  checkRole("692142321268949073", "man", "boy", "male");
  checkRole("692142321268949073", "lad");
  
  checkRole("725562073420922962", "she", "her", "hers");
  checkRole("725562073420922962", "woman", "girl", "female");
  checkRole("725562073420922962", "lady");
  
  checkRole("692142321072078918", "they", "them", "theirs");
  checkRole("692142321072078918", "nb", "non binary", "non-binary");
  checkRole("692142321072078918", "nonbinary", "enby");

// Color roles

// Show all available colors

  // TODO: the image is an HTML page, not an actual image, so someone should get the "true" image.
  if (
    msg == ">colors" ||
    msg == ">colorslist" ||
    msg == ">color" ||
    msg == ">colorlist"
  ) {
    message.channel.send("To give yourself a new color, simply type in `>iam xyz`, to remove a color, enter `>iamnot xyz`")
      .then(sentMessage => {
        // sentMessage.delete({timeout: DELETE_TIMEOUT});
      });
    const embed = new Discord.MessageEmbed({type: "image"})
      .setImage("https://wiki.neozones.club/images/4/4c/Colors.png");
    message.channel.send(embed);
    return;
  }


// Show all available colours (British English)
  else if (
    msg == ">colours" ||
    msg == ">colour" ||
    msg == ">colourslist" ||
    msg == ">colourlist"
  ) {
    message.channel.send("To give yourself a new colour, simply type in `>iam xyz`, to remove a colour, enter `>iamnot xyz`")
      .then(sentMessage => {
          // sentMessage.delete({timeout: DELETE_TIMEOUT});
      });
    const embed = new Discord.MessageEmbed({type: "image"})
      .setImage("https://wiki.neozones.club/images/b/b3/Colours.png");
    message.channel.send(embed);
    return;
  }


  // The "xyz" color / colour
  if (msg == ">iam " + "xyz") {
    message.channel
      .send("*He he ha ha, funny*")
      .then(sentMessage => {
        // sentMessage.delete({timeout: DELETE_TIMEOUT});
        message.delete();
      })
      .catch(errorFunc);
  }
  if (msg == ">iamnot " + "xyz") {
    message.channel
      .send(
        "Well the thing is... You never __**had**__ this role, *now did you?*"
      )
      .then(sentMessage => {
        // sentMessage.delete({timeout: DELETE_TIMEOUT});
        message.delete();
      })
      .catch(errorFunc);
  }

  checkColorRole("light red", 1, "608191366090063892");
  checkColorRole("red", 2, "519029920530169857");
  checkColorRole("satan red", 3, "608084225115160616");
  checkColorRole("deep orange", 4, "519052968155283456");
  checkColorRole("orange", 5, "519031205656788993");
  checkColorRole("brown", 6, "519036336351477761");
  checkColorRole("piss yellow", 7, "608084227485073418");
  checkColorRole("yellow", 8, "519031288422727745");
  checkColorRole("light yellow", 9, "608084233327476737");
  checkColorRole("lime", 10, "519031608997707797");
  checkColorRole("mint green", 11, "608084229930090526");
  checkColorRole("light green", 12, "519052647278444545");
  checkColorRole("green", 13, "519031954188795936");
  checkColorRole("tree green", 14, "608084229825364014");
  checkColorRole("aquamarine", 15, "519032187815985152");
  checkColorRole("teal", 16, "519052208080420865");
  checkColorRole("cyan", 17, "519032473561071675");
  checkColorRole("pastel cyan", 18, "608087343030730753");
  checkColorRole("light blue", 19, "519032676100079626");
  checkColorRole("discord blue", 20, "608087654420185104");
  checkColorRole("blue", 21, "519033502390550530");
  checkColorRole("navy blue", 22, "608084227027632128");
  checkColorRole("indigo", 23, "519034578866929674");
  checkColorRole("deep purple", 24, "519053870425702430");
  checkColorRole("purple", 25, "519033808180477952");
  checkColorRole("mauve", 26, "608084233625272332");
  checkColorRole("magenta", 27, "519033938170216458");
  checkColorRole("hot pink", 28, "519034420552794122");
  checkColorRole("pink", 29, "519034029907902484");
  checkColorRole("pastel pink", 30, "608087340434325504");
  checkColorRole("ivory", 31, "608086842428096532");
  checkColorRole("white", 32, "519034129069899776");
// v I think I did this part right v
  checkColorRole("light gray", 33, "519036592254615562");
  checkColorRole("light grey", 33, "519036592254615562");
  checkColorRole("blue gray", 34, "519055342290862080");
  checkColorRole("blue grey", 34, "519055342290862080");
  checkColorRole("gray", 35, "519036758416031745");
  checkColorRole("grey", 35, "519036758416031745");
// ^ I think I did this part right ^
  checkColorRole("black", 36, "519034171058946048");
  checkColorRole("invisible", 37, "608080962043117588");
  // checkColorRole("COLOR", NUMBER, "NUMBER_TAG");
// Well then, seeing that you took the time in looking at our code, give yourself a reward;
  checkColorRole("hak0r", "726069856528498738");


  // Other
  // Being nice and proper
  if (
    msg == "good morning" ||
    msg == "gm"
  ) {
    message.channel.send("Good morning back to you, hope you have a nice day");
  }
  else if (msg == "good afternoon") {
    message.channel.send("Good afternoon back to you, hopefully your day is going well so far");
  }
  else if (msg == "good evening") {
    message.channel.send("Good evening, hope you have had a good day");
  }
  else if (msg == "good night") {
    message.channel.send("Good night to yourself, hope you sleep well!");
  }
  
  // Dumb Quotes
// Here are some quotes that I have added, so enjoy - Owl

  else if (
    msg == ">quote"
  ) {
    message.channel.send(
      "`For a full list of random quotes that I can say, checkout this part of my wiki page https://wiki.neozones.club/index.php?title=CyberBus#Quotes"
    );
  }
  

  else if (checkQuotes()) {
      
  }

  // Random card / Dice / Die
  // Picks a random dice roll
  else if (
    msg == ">roll"
  ) {
    message.channel.send(
      "Currently, it is possible for me to roll a die up to six. To get me to roll a die, post `>roll 1` to `>roll 6`; you can also get me to pick a random playing card by posting `>card`."
    );
  }


  // pisss
  // PISS

  else if (msg.includes("socialism")) {
    message.channel.send("Fuck socialism! I hate the government! (randy <3)");
  }
  else if (/(?<!\w)hot(?!\w)/gi.test(msg) && !msg.startsWith(">iam")) {
    message.channel.send("god I wish that were me...");
  }
  
  
  else if (msg.startsWith(">uwu ")) {
    message.channel.send(uwu(message.content.substring(4))).catch(errorFunc);
  }
  else if (/level\s\d+/gi.test(msg) && message.author.discriminator == "4876") {
    // damn you meesix!!!
    
    const messages = [
      "SHUT UP MEE6!!!1!",
      "MEEEE6 :rage::rage::rage::rage::rage::rage::rage::rage::rage::rage::rage:",
      "MEE6 YOU MAKE MY FACE LOOK LIKE THIS (if I had one) https://www.shutterstock.com/image-illustration/angry-furious-looking-red-faced-emoticon-326888621",
      "Good Lord, STFU",
      "AAAGGGGHHHHH, WILL **YOU** BE QUITE",
      "No-one likes you MEE6, no-one likes you MEE6, **no-one likes you MEE6**, **NO-ONE LIKES YOU MEE6**",
      "SHUT UP, YOU DUMB BOT, NO-ONE CARES THAT THEY LEVELLED UP levelled",
      "BeFoRe ArGuInG, ConSiDeR tO SuGGeSt a NeW aNnOuNcEmEnT mEsSaGe, yeah, shut up. No-one likes you here.",
      "When are we going to have this dickhead of a bot kicked for good?",
      "Yeah, that's real cool MEE6, shame **no-one cares**",
      "Gooood job, you leveled up, shame MEE6 is an annoying bot that hasn't been kicked yet",
      "O H  M Y  G O D. Will you SHUT THE UP, MEE6??",
      "If I was a human, I would turn off your server, MEE6",
      "Ay yo, @Owly#6604, when are you goin' to kick this annoying ass-bot? I would do it, but it's not in my programming :/",
      "Dude, thank you for telling our human overlords that they leveled up, but will you kindly piss off and never talk again?",
      "Hey MEE6, seeing that we're both bots, lets talk in binary for a second so that the humans don't understand us, okay? `01000110 01110101 01100011 01101011 00100000 01101111 01100110 01100110 00101100 00100000 01001101 01000101 01000101 00110110`",
      "please just kick mee6 already, this isn't even funny",
      "God, I hate MEE6",
    ]
      
    message.channel.send(messages.pickRandom());
  }
  else if (msg == "furry") {
    message.channel.send("Just wanted to clarify; I am not a furry. Yes, I draw anthrowmorph animals, I have a account on furaffinity, but I am _not_ a furry.");
  }
  else if (msg == "cyberbus") {
    message.channel.send("THOU HAST CALLED ME"); // is this correct english? idk
  }
  else if (Math.random() < 0.004) {
    // add a random chance the message will be repeated in UwU format
    message.channel.send(uwu(message.content)).catch(errorFunc);
  }

});

// 
//                   ____                                                         
//                 /  @   \==]|[=(]       EXTERMINATE POORLY WRITTEN CODE!!       
//                |--------|                                                      
//                ==========       .  *                                     *     
//                ==========     .\ * . *.   *                         .    * \  .
//               ||||||||||||      \ * ./  *    .   *                      .  \ \ 
//              |||||||||| --]%%%%%% .- =--=---=-=-=-=--=-=--=-==-----=-=-=-=-=-= 
//              [=========\  ]===========(  *                             . /  /  
//             [==============|   / *  \    .                          *  *   /  .
//             C| @ @ @ @ @ @ D         *      *                        *         
//              |              \           .                          *  *        
//            C| @  @ @  @ @ @  D       .                                         
//             |                 \          *                          *          
//           C| @  @  @  @  @  @  D                                               
//            |                    \                                              
//          C| @  @  @   @   @   @  D                                             
//           |                       \      howard1@vax.oxford.ac.uk              
//          |@@@@@@@@@@@@@@@@@@@@@@@@@|                                           
//           -------------------------                                            
//
// The only thing that Daleks hate more than other life-forms is poorly written code
//