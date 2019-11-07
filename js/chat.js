clock = ''

var chatMessages = [{
  name: "ms1",
  msg: "Hey Manu !",
  delay: 1000,
  align: "right",
  showTime: false,
  time: clock
},
{
  name: "ms2",
  msg: "Hello Maxime ! What would you like to eat today ?",
  delay: 2000,
  align: "left",
  showTime: false,
  time: clock
},
{
  name: "ms3",
  msg: "Hum... let's go for a chinese !",
  delay: 2000,
  align: "right",
  showTime: true,
  time: clock
},
{
  name: "ms4",
  msg: "Alright ! A chinese ! In which neightborhood ?",
  delay: 1500,
  align: "left",
  showTime: true,
  time: clock
},
{
  name: "ms5",
  msg: "I'm near metro Chatelet !",
  delay: 1500,
  align: "right",
  showTime: true,
  time: clock
},
{
  name: "ms6",
  msg: "Great ! One last question : what's your budget ?",
  delay: 1700,
  align: "left",
  showTime: true,
  time: clock
},
{
  name: "ms7",
  msg: "Hum, I'd like something pretty affordable",
  delay: 1800,
  align: "right",
  showTime: true,
  time: clock
},
{
  name: "ms8",
  msg: "Perfect ! My favorite restaurant matching your criterias is the New Shanghai, 135 Rue Saint Denis... Bon appetit !!",
  delay: 3000,
  align: "left",
  showTime: true,
  time: clock
}
];

var chatDelay = 0;

function onRowAdded() {
  $('.chat-container').animate({
    scrollTop: $('.chat-container').prop('scrollHeight')
  });
};
var manu_done = false;
$("#manu-icon").click(function(){
  $("#manu-window").show();
  if(manu_done === false){
    $.each(chatMessages, function(index, obj) {
      chatDelay = chatDelay + 1000;
      chatDelay2 = chatDelay + obj.delay;
      chatDelay3 = chatDelay2 + 10;
      scrollDelay = chatDelay;
      chatTimeString = " ";
      msgname = "." + obj.name;
      msginner = ".messageinner-" + obj.name;
      spinner = ".sp-" + obj.name;
      if (obj.showTime == true) {
        chatTimeString = "<span class='message-time'>" + obj.time + "</span>";
      }
      $(".chat-message-list").append("<li class='message-" + obj.align + " " + obj.name + "' hidden><div class='sp-" + obj.name + "'><span class='spinme-" + obj.align + "'><div class='spinner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div></span></div><div class='messageinner-" + obj.name + "' hidden><span class='message-text'>" + obj.msg + "</span>" + chatTimeString + "</div></li>");
      $(msgname).delay(chatDelay).fadeIn();
      $(spinner).delay(chatDelay2).hide(1);
      $(msginner).delay(chatDelay3).fadeIn();
      setTimeout(onRowAdded, chatDelay);
      setTimeout(onRowAdded, chatDelay3);
      chatDelay = chatDelay3;
    });
    manu_done = true;
  }
})