/**
 * Example store structure
 */


/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates
//this function generates the welcome screen//
function generateInitialHTML(){
  return `<div class="initial-html centered">
  <p>Welcome! This quiz is over the human skeleton. Good Luck!</p>
  <button type="button" id="start" class="centered">Begin Quiz</button>
  </div>`;
};

//this function is html on top of the quiz store, will have the question number and score//
function generateQuizStateHTML(){
  return `<div class="question-score">
    <div>
     Question #${store.questionNumber + 1}
    </div>
    <div>
      Score: ${store.score}/${store.questions.length}
      </div>
  </div>`
};

//this function loads the initial Question html and html form for addition questions//

function generateResultsScreenHTML(){
  return `<div class="results">
  <form id="js-restart-quiz">
    <fieldset>
      <div>
        <legend class="centered">Your score is ${store.score}/${store.questions.length}</legend>
      </div>
        <div>
          <button type="button" id="restart">Restart Quiz</button>
          </div>

    </fieldset>
  </div>`

  
};

function generateQuizQuestionHTML(){
  return `
  
  <form id="question-form" class="question-form">
    <fieldset>
      <div class="quiz-question">
        <p>${store.questions[store.questionNumber].question}</p>
      </div>
      <div class="quiz-answers">
        ${generateQuizAnswerHTML()}
      </div>
      <button type="submit" id="submit-answer" tabindex="5">Submit</button>
      <button type="button" id="next-question" tabindex="6">Next</button>
    </fieldset>
  </form>
  `;
};

function generateQuizAnswerHTML(){
  const answerArray= store.questions[store.questionNumber].answers
  let answerHtml= '';
  let i = 0;

  answerArray.forEach(answer => {
    answerHtml += `
    <div id="answer-container-${i}">
    <input type="radio" name="answers" id="answers${i + 1}" value= "${answer}" tabindex ="${i + 1}" required> 
    <label for="answers${i + 1}">${answer}</label>
  </div>`;
    i++;
  });
  return answerHtml;
  
};

//the html for feedback on answer
function generateGradingHTML(answerStatus) {
  let correctAnswer = store.questions[store.questionNumber].correctAnswer;
  let html = '';
  if (answerStatus === 'correct') {
    html = `
    <div class="right-answer">Correct! Great job!</div>
    `;
  }
  else if (answerStatus === 'incorrect') {
    html = `
      <div class="wrong-answer">Sorry, The answer is ${correctAnswer}.</div>
    `;
  }
  return html;
}
/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store
function renderQuiz(){
  let html='';

  if (store.quizStarted === false) {
    $('main').html(generateInitialHTML());
    return;
  } 
  if (store.questionNumber >= 0 && store.questionNumber < store.questions.length) {
    html = generateQuizStateHTML();
    html += generateQuizQuestionHTML();
    $('main').html(html);
  } else {
    $('main').html(generateResultsScreenHTML())
  }


  console.log('renderQuiz ran');
};



2
/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)


function handleStartQuiz(){
  $('main').on('click', '#start', function(event){
    store.quizStarted = true;
    renderQuiz();
  });
};

function handleNextQuestion(){
  $('main').on('click', '#next-question', function (){
    store.questionNumber+= 1;
    renderQuiz();
  });
  console.log('handleNextQuestion ran');
};

function handleGradeQuestion(){
  $('main').on('submit', '#question-form', function(event){
    //stop default event
    event.preventDefault();
    //stores the current question as a var to reference within function
    const currentQuestion = store.questions[store.questionNumber];
    //stores the answer by reading which radio is checked
    let selectedAnswer = $('input[name=answers]:checked').val();
    //this will put the feedback on right or wrong beneath whatever index the answer is
    let answerContainerId = `#answer-container-${currentQuestion.answers.findIndex(i => i === selectedAnswer)}`;

    //if statement to check the value of the selected option against the correct answer
    if (selectedAnswer === currentQuestion.correctAnswer) {
      store.score ++;
      $(answerContainerId).append(generateGradingHTML('correct'));
    } else {
      $(answerContainerId).append(generateGradingHTML('incorrect'));
    };
    $('#submit-answer').hide();
    // disable all inputs
    $('input[type=radio]').each(() => {
    $('input[type=radio]').attr('disabled', true);
    });
    // show the next button
    $('#next-question').show();

  });
   console.log('handleGradeQuestion ran');
};
function restart() {
  store.quizStarted = false;
  store.questionNumber= 0;
  store.score = 0;
};
function handleRestartQuiz(){
  $('main').on('click', '#restart', function(event){
    restart();
    renderQuiz();
  });
  console.log('handleRestartQuiz ran');
};

function handleBareBonesQuiz() {
 renderQuiz();
 handleStartQuiz();
 handleNextQuestion();
 handleGradeQuestion();
 handleRestartQuiz();
 console.log('handleBareBonesQuiz ran');

};

$(handleBareBonesQuiz);
