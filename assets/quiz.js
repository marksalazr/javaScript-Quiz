var question =document.querySelector('#question');
var choices=Array.from(document.querySelectorAll('.choice-text'));
var ProgressText=document.querySelector("#progressText");
var scoreText=document.querySelector("#score");
var progressBarFull =document.querySelector("#progressBarFull");

let currentQuestion={};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions =[];

let questions =[
{
    question: 'Difference between “ == “ and “ === “ operators',
    choice1: "the == operator does the type conversion of the operands before comparison, whereas the === operator compares the values as well as the data types of the operands",
    choice2: "the == operator does data tye comparasion only",
    choice3: "no difference",
    choice4: "To be or not to be that is the question",
    answer: 1,
},
{
    question: "What color is the ocean?",
    choice1: "blue",
    choice2: "orange",
    choice3: "yellow",
    choice4: "purple",
    answer: 1,
}, 

{
    question: "What color is the ocean?",
    choice1: "question",
    choice2: "blue",
    choice3: "",
    choice4: "love",
    answer: 2,
},

{
    question: "this is a,",
    choice1: "question",
    choice2: "what",
    choice3: "1",
    choice4: "love",
    answer: 1,
}
]

const SCORE_POINTS = 100;
const MAX_QUESTIONS= 4;

startQuiz= ()=> {
    questionCounter = 0;
    score = 0; 
    availableQuestions=[...questions]
    getNewQuestion();
   
}
getNewQuestion= () => {
      if(availableQuestions.length ===0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score )

    //   return window.location.assign must make anoher .html file
      }
      questionCounter++
      ProgressText.innerText =`QUESTION ${questionCounter} of ${MAX_QUESTIONS}`
      progressBarFull.style.width=`${(questionCounter/MAX_QUESTIONS)*100}%`

      var questionIndex = Math.floor(Math.random()* availableQuestions.length);
      currentQuestion = availableQuestions[questionIndex];
      question.innerText = currentQuestion.question;  

      choices.forEach(choice => {
        const number =choice.dataset['number']
        choice.innerText= currentQuestion['choice'+ number]
    }); 

availableQuestions.splice(questionIndex,1);

acceptingAnswers = true; 

}
choices.forEach(choice => {
    choice.addEventListiner('click', e => {
        if(!acceptingAnswers) return 

    acceptingAnswers =false  
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];

    let classToapply = selectedAnswer == currentQuestion.answer ?'.correct':'.wrong';
    if (classToapply==='correct'){
        incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToapply);
    setTimeout(()=> {
            selectedChoice.parentElement.classList.remove(classToapply);
            getNewQuestion();
    }, 1000);
    
    })
})

incrementScore= num =>{
    score =+ num 
    score.innerText=score
}

setInterval(() => {

    
}, 40000);

startQuiz()