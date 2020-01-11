$(document).ready(function(){
  
    $("#remaining-time").hide();
  
  var questions = 
     [{
      question: '1. Who directed A ClockWork Orange?',
      options: ['John Ford','Steven Spielberg','Stanley Kubrick', 'Frances Ford Copella'],
      answer: 'Stanley Kubrick',
     },
     {
      question: '2. Who directed Psycho?',
      options: ['George Lucas', 'Alfred Hitchcock', 'Orson Wells', 'Stanley Kubrick'],
      answer: 'Alfred Hitchcock',
     },
     {
      question: '3. Who directed Inception?',
      options: ['Quinten Tarantino', 'JJ Abrams', 'Christopher Nolan', 'Steven Spielberg'],
      answer: 'Christopher Nolan',
    },
    {
      question: '4. Who directed Pulp Fiction?',
      options: ['Christopher Nolan', 'Frances Ford Copella', 'Quinten Tarantino', 'Akira Kurosawa'],
      answer: 'Quinten Tarantino',
    },
    {
      question: "5. Who directed Citizen Kane?",
      options: ['Orson Wells','Akira Kurosawa', 'Alfred Hitchcock','George Lucas'],
      answer: 'Orson Wells',
    },
    {
      question: '6. Who directed The Matrix?',
      options: ['The Wachoskis','The Coens','The Russos','Lord and Miller'],
      answer: 'The Wachoskis',
    },
    {
      question: "7. Who directed Fargo?",
      options: ['The Wachoskis', 'The Coens', 'The Russos','Lord and Miller'],
      answer: 'The Coens',
    },
    {
      question: "8. Who directed Seven Samurai?",
      options: ['John Ford', 'Orson Wells', 'Akira Kurosawa', 'Stanley Kubrick'],
      answer: 'Akira Kurosawa',
    },
    {
      question: "9. Who Directed Star Wars?",
      options: ['Steven Spielberg', 'George Lucas', 'Christopher Nolan', 'Stanley Kubrick' ],
      answer: 'George Lucas',
    },
    {
      question: "10. Who Directed Jaws?",
      options: ['Stanley Kubrick', 'Quinten Tarantino', 'George Lucas', 'Steven Spielberg'],
      answer: 'Steven Spielberg',
    }]

    var trivia = {

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
      
      var questionContent = Object.values(questions.question)[questions.currentSet];
      $('#question').text(questionContent);
      
      var questionOptions = Object.values(questions.options)[questions.currentSet];
      
      $.each(questionOptions, function(key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
      
    },
    
    timerRunning : function(){
      if(trivia.timer > -1 && questions.currentSet < Object.keys(questions.question).length){
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
      
      else if(questions.currentSet === Object.keys(questions.question).length){
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
      var currentAnswer = Object.values(questions.answer)[questions.currentSet];
      if($(this).text() === currentAnswer){
        $(this).addClass('btn-success').removeClass('btn-info');
        questions.correct++;
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
  $("#start").on('click', trivia.startGame);
  $(document).on('click' , '.option', tirvia.guessChecker);
})