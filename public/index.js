'use strict';

//list of bars
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const bars = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'freemousse-bar',
  'pricePerHour': 50,
  'pricePerPerson': 20
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'solera',
  'pricePerHour': 100,
  'pricePerPerson': 40
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'la-poudriere',
  'pricePerHour': 250,
  'pricePerPerson': 80
}];

//list of current booking events
//useful for ALL steps
//the time is hour
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful from step 4
const events = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'booker': 'esilv-bde',
  'barId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'time': 4,
  'persons': 8,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'booker': 'societe-generale',
  'barId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'time': 8,
  'persons': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'booker': 'otacos',
  'barId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'time': 5,
  'persons': 80,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'eventId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}];

console.log(bars);
console.log(events);
console.log(actors);


// STEP 1 //

function setBookingPrice(){
  for(let i = 0; i < events.length; i++){
    let bar = bars.find(x => x.id === events[i].barId)
    events[i].price = events[i].persons * bar.pricePerPerson + events[i].time * bar.pricePerHour
  }
}

setBookingPrice()

// STEP 2 //

function decreasePrice(){
  for(let i = 0; i < events.length; i++){
    if(events[i].persons > 10 && events[i].persons <= 20){
      events[i].price -= 10*events[i].price/100
    }
    if(events[i].persons > 20 && events[i].persons <= 60){
      events[i].price -= 30*events[i].price/100
    }
    if(events[i].persons > 60){
      events[i].price -= 50*events[i].price/100
    }
  }
}

decreasePrice()

// STEP 3 //

function setCommission(){
  for(let i = 0; i < events.length; i++){
    events[i].commission.insurance = events[i].price * 30 / 100 / 2
    events[i].commission.treasury = events[i].persons
    events[i].commission.privateaser = events[i].price * 30 / 100 / 2 - events[i].persons
  }
}

setCommission()

// STEP 4 //

function setDeducOpt(){
  for(let i = 0; i < events.length; i++){
    if(events[i].options.deductibleReduction){
      events[i].price += events[i].persons
    }
    
  }
}

setDeducOpt()

// STEP 5 //

function payActors(){
  for(let i = 0; i < actors.length; i++){
    let event = events.find(x => x.id === actors[i].eventId)
    actors[i].payment[0].amount = event.price
    if(events[i].options.deductibleReduction){
      actors[i].payment[1].amount = event.price - event.persons - event.commission.insurance - event.commission.treasury - event.commission.privateaser
    }
    else{
      actors[i].payment[1].amount = event.price - event.commission.insurance - event.commission.treasury - event.commission.privateaser
    }
    actors[i].payment[2].amount = event.commission.insurance
    actors[i].payment[3].amount = event.commission.treasury
    if(events[i].options.deductibleReduction){
      actors[i].payment[4].amount = event.commission.privateaser + event.persons
    }
    else{
      actors[i].payment[4].amount = event.commission.privateaser
    }
  }
}

payActors()

