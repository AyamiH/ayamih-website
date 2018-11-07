
var homeBot = BotUI('home-demo');

homeBot.message.add({
  content: 'Hello there!'
}).then(function () {
  return homeBot.message.add({
    delay: 1500,
    content: "I'm Maya. Whats your name?"
  });
    
  }).then(function () {
    return homeBot.action.text({
      delay: 800,
      action: {
        value: '',
        placeholder: 'Please enter your name'
      }
    });
  }).then(function (res) {
    return homeBot.message.bot({
      delay: 500,
      content: 'Nice name! Ask me anything ' + res.value + ''
    });
}).then(function () {
  return homeBot.action.button({
    delay: 1500,
    action: [{
      text: 'Maya, Whats the sentiment analysis of tweets on Nifty for todays trading? ',
      value: 'sure'
    }]
  });
    
}).then(function (res) {
  ga_record('btn_click', res.value);
  if(res.value == 'sure') {
    tutorial();
  }

});


var tutorial = function () {
  homeBot.message.add({
    delay: 1500,
    content: "Bullish"
  }).then(function () {
    return homeBot.message.add({
      delay: 1500,
      content: 'Anything else I can help you with?'
    });

  }).then(function () {
  return homeBot.action.button({
    delay: 1500,
    action: [{
      text: 'Maya, Whats the best strategy for todays day trading in NSE:TCS?',
      value: 'sure'
    }]
  });
      
}).then(function (res) {
  ga_record('btn_click', res.value);
  if(res.value == 'sure') {
    two();
  }

});
};


var two = function () {
  homeBot.message.add({
    delay: 2500,
    content: "Mean Reversion Strategy for a Risk-Reward of 1:2"
  }).then(function () {
    return homeBot.message.add({
      delay: 1500,
      content: 'Should I place an order for 1247 shares of NSE:TCS?'
    });
   }).then(function () {
  return homeBot.action.button({
    delay: 1500,
    action: [{
      text: 'Sure',
      value: 'sure'
    }, {
      text: 'Nah! Thank You',
      value: 'skip'
    }]
  });   
      
}).then(function (res) {
  ga_record('btn_click', res.value);
  if(res.value == 'sure') {
      return homeBot.message.add({
    delay: 2500,
    content: 'Placed an order for 1247 shares of TCS'
      })
  }
if(res.value == 'skip') {
    end();
  }
  })
};




var end = function () {
  ga_record('message', 'end');
  homeBot.message.add({
    delay: 1000,
    content: 'Good bye! It was nice chatting with you!'
  });
};

var ga_record = function(type, action) {
  if(ga) {
    ga('send', {
      hitType: 'event',
      eventCategory: type,
      eventAction: action
    });
  }
}