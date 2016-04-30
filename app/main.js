var myApp = angular.module('memoryGame', []).controller('memoryGameCtrl', [
  '$scope', 
  '$http',
  '$timeout',
   function($scope, $http, $timeout){

    $scope.cards = [];
    var selectedCard = null;
    var matchedCards = 0;
    $scope.game = {
      state: "Start"
    };

    $scope.startGame = function(difficulty) {
      $scope.game.state = "playing";
      $scope.cards = [];

      $http.get('app/cardInfo.json')
        .then(function(response) {
          var i = 0;

          var gameDifficulty = parseInt(difficulty);
          while(i < gameDifficulty) {
            $scope.cards.push(response.data[i]);
            $scope.cards.push(jQuery.extend(true, {}, response.data[i]));
            i++ ;
          }  

          shuffle($scope.cards);
          
          $scope.cards.forEach(function(element) {
            
            element.flipped = false;
          });
        });
    };

    $scope.flipCard = function (card){
      if(card.flipped) {
        return;
      }
      if(!selectedCard) {
        selectedCard = card;
        card.flipped = true;
        return;

      } 

      card.flipped = true;

      if (selectedCard.id === card.id) {
        selectedCard = null;
        matchedCards++;
        if (matchedCards === parseInt($scope.game.difficulty)) {
          $scope.game.state = 'complete';
        }
        return;
      }

      if(selectedCard.id !== card.id) {
        card.flipped = true;
        $timeout(function() {

          card.flipped = false;
          selectedCard.flipped = false;
          selectedCard = null;
        }, 400)
      }
      // if($scope.selectedCards.length === 0) {
      //   $scope.selectedCards.push(card);
      // }
      
      // $scope.cards.flipped = true;
    }

    var shuffle = function (array) {
      var m = array.length, t, i;

      // While there remain elements to shuffle…
      while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
      }

      return array;
    };
   }])

/*function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}*/



/*1. shuffle cards*/
/*2. make all flipped = false*/
/*3. when clicked flipped = true and display image*/
/*4. push flipped cards into array. max size 2*/
/*5. if names in array match keep them flipped and clear flipped array*//*
if names don't match flipped = false and reset array*/
