(function(){
    function buildquiz()
    {
        const output=[];
        myquestions.forEach(
            (currentquestion,questionnumber) => {
            const answers=[];
            for(letter in currentquestion.answers){
                answers.push(
                    `<label>
                    <input type="radio" name="question${questionnumber}" value="${letter}">
                    ${letter} :
                    ${currentquestion.answers[letter]}
                    </label> `
                );
            
            }
            output.push(
                `<div class="slide">
                <div class="question">${currentquestion.question}</div>
                <div class="answers">${answers.join('')}</div></div>`
            );
        }
     );
     quizcontainer.innerHTML=output.join(''); 
    }
    function showresult()
    {
        const answercontainers=quizcontainer.querySelectorAll('.answers');
        let numcorrect=0;
        myquestions.forEach(
        (currentquestion,questionnumber)=>{
            const answercontainer=answercontainers[questionnumber];
            const selector=`input[name=question${questionnumber}]:checked`;
            const useranswer=(answercontainer.querySelector(selector)||{}).value;
            if(useranswer===currentquestion.correctAnswer)
            {
                numcorrect++;
                answercontainers[questionnumber].style.color="green";

            }
            else{
                answercontainers[questionnumber].style.color="red";
            }
        });
        
        resultcontainer.innerHTML=`${numcorrect} out of ${myquestions.length}`;
        
    }
    function showslide(n){
        slides[currentslide].classList.remove('active-slide');
        slides[n].classList.add('active-slide');
        currentslide=n;
        if(currentslide==0){
            pre.style.display='none';
        }
        else{
            pre.style.display='inline-block';



        }
        if(currentslide===slides.length-1)
        {
            nxt.style.display='none';
            submitbutton.style.display='inline-block';
        }
        else{
            nxt.style.display='inline-block';
            submitbutton.style.display='none';
        }
    }
    function shownextslide(){
        showslide(currentslide + 1);
    }
    function showpreviousslide(){
        showslide(currentslide - 1)
    }
    const quizcontainer=document.getElementById("quiz");
    const resultcontainer=document.getElementById("result");
    const submitbutton=document.getElementById("submit");
    
    const myquestions=[
        {
            question:"who invented javascript ?",
            answers:{
                a:"Douglas crockford",
                b:"Sheryl sandberg",
                c:"Grendan Fich"
            },
            correctAnswer:"c"
        },
        {
            question:"Which one of these is a javascript package manager?",
            answers:{
                a:"Node.js",
                b:"typecsript",
                c:"npm"
            },
            correctAnswer:"c"
        },
        {
            question:"which tool can you use to ensure code quality?",
            answers:{
                a:"angular",
                b:"jquery",
                c:"requirejs",
                d:"eslint"
            },
            correctAnswer:"d"
        }
    ];
    buildquiz();
    const nxt=document.getElementById("next");
    const pre=document.getElementById("previous");
    const slides=document.querySelectorAll(".slide");
    let currentslide=0;
    showslide(currentslide);
    submitbutton.addEventListener('click',showresult);
    pre.addEventListener('click',showpreviousslide);
    nxt.addEventListener('click',shownextslide);

})();