$(document).ready(function(){
  

    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
    
  })
  
  var trivia = {

    questions: {
      q1: '1. Who directed A ClockWork Orange?',
      q2: '2. Who directed Psycho?',
      q3: '3. Who directed Inception?',
      q4: '4. Who directed Pulp Fiction?',
      q5: "5. Who directed Citizen Kane?",
      q6: '6. Who directed The Matrix?',
      q7: "7. Who directed Fargo?",
      q8: "8. Who directed Seven Samurai?",
      q9: "9. Who Directed Star Wars?",
      q10: "10. Who Directed Jaws?",

    },
    options: {
      q1: ['John Ford','Steven Spielberg','Stanley Kubrick', 'Frances Ford Copella'],
      q2: ['George Lucas', 'Alfred Hitchcock', 'Orson Wells', 'Stanley Kubrick'],
      q3: ['Quinten Tarantino', 'JJ Abrams', 'Christopher Nolan', 'Steven Spielberg'],
      q4: ['Christopher Nolan', 'Frances Ford Copella', 'Quinten Tarantino', 'Akira Kurosawa'],
      q5: ['Orson Wells','Akira Kurosawa', 'Alfred Hitchcock','George Lucas'],
      q6: ['The Wachoskis','The Coens','The Russos','Lord and Miller'],
      q7: ['The Wachoskis', 'The Coens', 'The Russos','Lord and Miller'],
      q8: ['John Ford', 'Orson Wells', 'Akira Kurosawa', 'Stanley Kubrick'],
      q9: ['Steven Spielberg', 'George Lucas', 'Christopher Nolan', 'Stanley Kubrick' ],
      q10: ['Stanley Kubrick', 'Quinten Tarantino', 'George Lucas', 'Steven Spielberg'],
    },
    answers: {
      q1: 'Stanley Kubrick',
      q2: 'Alfred Hitchcock',
      q3: 'Christopher Nolan',
      q4: 'Quinten Tarantino',
      q5: 'Orson Wells',
      q6: 'The Wachoskis',
      q7: 'The Coens',
      q8: 'Akira Kurosawa',
      q9: 'George Lucas',
      q10: 'Steven Spielberg',
    },


    startGame: function(){
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      
      $('#game').show();
      
      $('#results').html('');
      
      $('#timer').text(trivia.timer);
      
      $('#start').hide();
  
      $('#remaining-time').show();
      
      trivia.nextQuestion();
      
    },
    
    nextQuestion : function(){
      
      trivia.timer = 10;
      $('#timer').text(trivia.timer);
      
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
      
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
      
      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
      
    },
    
    timerRunning : function(){
      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
      }
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Out of time! Next Question!</h3>');
      }
      
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        $('#results')
          .html('<h3>Thanks for playing!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>'+
          '<p>Try Again!</p>');

        $('#game').hide();
    
        $('#start').show();
      }
      
    },
    
    guessChecker : function() {
      var resultId;
      var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
      if($(this).text() === currentAnswer){
        $(this).addClass('btn-success').removeClass('btn-info');
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Correct!</h3>');
      }
      else{
        $(this).addClass('btn-danger').removeClass('btn-info');
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Wrong One! Better Luck Next Time!</h3>');
      }
      
    },
    guessResult : function(){
      trivia.currentSet++;
      $('.option').remove();
      $('#results h3').remove();
      trivia.nextQuestion();
    }
  
  }