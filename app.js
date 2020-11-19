/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'What is skateboarding?',
      answers: [
        'Fun!',
        'Art!',
        'Making authority figures angry!',
        'Everyone has a different answer but basically doing what you want with a board on wheels.'
      ],
      correctAnswer: 'Everyone has a different answer but basically doing what you want with a board on wheels.'
    },
    {
      question: 'When was skateboarding invented?',
      answers: [
        '1980s',
        '1960s',
        'Between the 1940s and 1950s.',
        'When the ollie was invented.'
      ],
      correctAnswer: 'Between the 1940s and 1950s.'
    },

    {
      question: 'Who invented the ollie?',
      answers: [
        'Tony Hawk',
        'Rodney Mullen',
        'Steve Caballero',
        'Alan "Ollie" Gelfand'
      ],
      correctAnswer: 'Alan "Ollie" Gelfand'
    },
    {
      question: 'Who invented the kickflip?',
      answers: [
        'Rodney Mullen',
        'Tony Hawk',
        'Steve Caballero',
        'Danny Way'
      ],
      correctAnswer: 'Rodney Mullen'
    },
    {
      question: 'Who landed the first 900(two and a half rotations) on a skateboard?',
      answers: [
        'Tony Hawk',
        'Danny Way',
        'Lincoln Ueda',
        'Andy McDonald'
      ],
      correctAnswer: 'Danny Way'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
};

function generateMainPage() {
  // show main page with title and button
  return `<div class="mainPage">
  <h2>Skateboarding Trivia:</h2>
  <button id="startQuiz">Let's Go!</button>
  </div>`
}

// start quiz
function startQuiz() {
  $("main").on('click', "#startQuiz", function () {
    store.quizStarted = true;
    render();
  })
}

function generateQuestion() {
  // generate questions
  let question = store.questions[store.questionNumber];
  // map through answers
  let answers = question.answers.map((answer, index) => {
    console.log(answer, index);
    return `<input type="radio" id="answer${index}" name="answer" value="${answer}">
      <label for="answer${index}">${answer}</label><br>`;
  });
  console.log(answers);
  console.log(question);
  console.log("question number", store.questionNumber);
  return `<div class="mainPage">
  <form id="question">
    <h2>${question.question}</h2>
    ${answers.join("")}
    <button type="submit">Submit Choice</button>
    </form>
  </div>`


}

function answerSubmit() {
  // submit choice
  $('main').on('submit', '#question', function (event) {
    event.preventDefault();
    // respond to choice
    let chosenAnswer = $("input[name='answer']:checked").val();
    console.log(chosenAnswer);
// show nope
    {
      if (chosenAnswer === store.answers) {
        return `<h2>Nope</h2>`;
        // show correct
      }
      else (chosenAnswer === store.correctAnswer)
      return `<h2>${store.correctAnswer}</h2>`;

    }

  })
  // go to next question
  store.questionNumber++;
}
// back button
function backButton() {
  return `<div class="back-button">
  <button id="back">Back</button>
  </div>`
}
// next button
function nextButton() {
  return `<div class="next-button">
  <button id="next">Next</button>
  </div>`
}


function generateFinalPage() {
  // show when quiz is done and show reset button
  // show results
  return `<div class="finalPage">
  <h2>Done! How did you do?</h2>  
  <p>Final Score: ${store.score}</p>
  <button id="reset">Reset</button>
  </div>`
}

function render() {
  // render the quiz in DOM
  let html = "";
  console.log(store.questionNumber, store.questions.length);
  if (store.quizStarted) {
    if (store.questionNumber === store.questions.length) {
      html = generateFinalPage();
    } else {
      html = generateQuestion();
    }
  } else {
    html = generateMainPage();

  }
  // show final page
  $('main').html(html);
}

function main() {
  generateFinalPage();
  answerSubmit();
  generateQuestion();
  render();
  startQuiz();

}
$(main);

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

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/

/* These functions handle events like submit and click */