const questionElement = document.getElementById('question');
const timeElement = document.getElementById('time');
const trueButton = document.getElementById('trueButton');
const falseButton = document.getElementById('falseButton');
const quizContainer = document.querySelector('.quiz-container');
const questionImageElement = document.getElementById('questionImage');
const divTimer = document.getElementById('timer');
const sable = document.querySelector('.timerColor');
const rejouer = document.getElementById('rejouerbtn');

//une bonne réponse = un point
let score = document.getElementById('score');
let scoreIn = 0;

let questionIndex = 0;

let timerInterval; // stocke l'ID de l'intervalle du minuteur

//ici, on mettra les 30 questions dans un tab :
const questions = [
    { question: "L'HTML est un langage de programmation utilisé pour la création de sites web ?", answer: false },
    { question: "Les boucles permettent d'exécuter une série d'instructions plusieurs fois ?", answer: true },
    { question: "Javascript est un langage front uniquement ?", answer: false },
    { question: "Programmer une boucle infinie est une bonne pratique ?", answer: false },
    { question: "Python est un langage de haut niveau ?", answer: true },
    { question: "Les fonctions en programmation permettent de regrouper des instructions réutilisables ?", answer: true },
    { question: "Le programme rentre dans un If quand la condition du if est vraie ?", answer: true },
    { question: "Le code ci-dessus va s'exécuter sans erreur ?", answer: false, image: "./assets/images/image1.png" },
    { question: "Le code ci-dessus va s'exécuter sans erreur ?", answer: false, image: "./assets/images/image2.png" },
    { question: "Cette syntaxe est correcte.", answer: false, image: "./assets/images/image_qu38.jpg" },
    //{ question: "Le langage de programmation C++ est une extension du langage C ?", answer: true },
    //{ question: "Le code ci-dessus va s'exécuter sans erreur ?", answer: false, image: "./assets/images/image3.png" },
    //{ question: "Le langage de programmation JavaScript est identique à Java ?", answer: false },
    //{ question: "Est-ce que le langage de programmation Python tire son nom du serpent reptile ?", answer: false },
    // { question: "Le code ci-dessus va s'exécuter sans erreur ?", answer: false, image: "./assets/images/image4.png" },
    //{ question: "Un algorithme est une séquence d'instructions qui décrit comment effectuer une tâche ?", answer: true },
    //{ question: "Le code ci-dessus va s'exécuter sans erreur ?", answer: false, image: "./assets/images/image5.png" },
    //{ question: "Le programme qui rectifie les erreurs commises par le programmeur est le compilateur ?", answer: true },
    // { question: "Est-ce du Python ?", answer: true, image: "./assets/images/image8.png" },
    //{ question: "L'assembleur est langage de bas niveau ?", answer: true },
    // { question: "Est-ce du PHP ?", answer: true, image: "./assets/images/image9.png" },
    //{ question: "Les variables en programmation sont des conteneurs qui stockent des valeurs ?", answer: true },
    //{ question: "Les indices d'une séquence de 5 éléments sont : '1 2 3 4 5' ?", answer: false },
    // { question: "La syntaxe de cette ligne est correcte.", answer: true, image: "./assets/images/image_qu39.jpg" },
    // { question: "La syntaxe de cette ligne est correcte.", answer: false, image: "./assets/images/image_qu40.jpg" },
    // { question: "Ceci est du c#", answer: false, image: "./assets/images/image_qu41.jpg" },
    // { question: "La variable m vaudra -15 à la fin de ce programme.", answer: true, image: "./assets/images/image_qu42.jpg" },
    // { question: "Ceci est du Javascript.", answer: false, image: "./assets/images/image_qu43.jpg" },
    // { question: "Voici un tableau. On accède au 1ier élément du tableau, chien, comme ceci: $tableau=[1]", answer: false, image: "./assets/images/image_qu44.jpg" },
    // { question: "La boucle ci-dessous sera exécutée 4 fois", answer: true, image: "./assets/images/image_qu45.jpg" },
    // { question: "La dernière valeur affichée par ce programme est 20.", answer: false, image: "./assets/images/image_qu46.jpg" },
];


//fonction du timer
function startTimer() {
    let timeLeft = 10;
    timeElement.style.color = "green";
    sable.style.backgroundColor = "green";
    timeElement.textContent = timeLeft;
    timerInterval = setInterval(function () {
        sable.classList.add("timerEnd");
        timeLeft--;
        if (timeLeft <= 3) {
            timeElement.style.color = "red";
            sable.style.backgroundColor = "red";
        }
        else if (timeLeft <= 5) {
            timeElement.style.color = "orange";
            sable.style.backgroundColor = "orange";
        }
        else {
            timeElement.style.color = "green";
            sable.style.backgroundColor = "green";
        }
        timeElement.textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            sable.classList.remove("timerEnd");
            showCorrectAnswer(); //Montrera la bonne réponse
            questionIndex++;
            setTimeout(showQuestion, 2000);
        }
    }, 1000);
}

//afficher le bonne réponse
function showCorrectAnswer() {
    const reponseQuest = questions[questionIndex].answer;
    if (reponseQuest) {
        trueButton.classList.add('correct');
        falseButton.classList.add('incorrect');
    } else {
        falseButton.classList.add('correct');
        trueButton.classList.add('incorrect');
    }
}

//showQuestion = montrera les questions (sans random - c'est en ordre)
function showQuestion() {
    isAnswered = false; //Réinitialisera isAnswered
    resetButtonColors(); //Réinitialisera les couleurs des boutons
    sable.classList.remove("timerEnd");
    clearInterval(timerInterval);

    startTimer();

    if (questionIndex < questions.length) {
        questionElement.textContent = `Question ${questionIndex + 1}/10 : ${questions[questionIndex].question}`;
        //Question avec image
        const currentQuestion = questions[questionIndex];
        // questionElement.innerHTML = currentQuestion.question;
        if (currentQuestion.image) {
            // S'il y a une image associée à la question, l'ajouter
            questionImageElement.src = currentQuestion.image;
            questionImageElement.style.display = "block"; // Pour afficher l'image
        } else {
            // S'il n'y a pas d'image associée, cacher l'élément image
            questionImageElement.style.display = "none";
        }



    } else {
        questionElement.textContent = "TERMINÉ";
        questionElement.style.fontFamily = "ocr";
        questionElement.style.fontSize = "2rem";
        questionElement.style.marginTop = "1rem";
        questionElement.style.color = "#1d1736";

        rejouer.style.display = 'flex';
        trueButton.style.display = 'none'; //masque le bouton Vrai
        falseButton.style.display = 'none'; //masque le bouton Faux
        divTimer.style.display = 'none'; //masque le timer
        questionImageElement.style.display = "none"; //masquer dernière image si la question comporte une image
    }
}

function resetButtonColors() {
    trueButton.classList.remove('correct');
    trueButton.classList.remove('incorrect');
    falseButton.classList.remove('correct');
    falseButton.classList.remove('incorrect');
}

let isAnswered = false;

trueButton.addEventListener('click', function () {
    if (!isAnswered && questionIndex < questions.length) {
        isAnswered = true;
        if (questions[questionIndex].answer) {
            trueButton.classList.add('correct');
            scoreIn++; // Augmentera le score en cas de bonne réponse
            score.textContent = scoreIn; // MAJ le score affiché
        } else {
            trueButton.classList.add('incorrect');
            setTimeout(function () {
                falseButton.classList.add('correct'); // Mettra en vert le bouton avec la bonne réponse
            }, 1000);
        }
        questionIndex++;
        setTimeout(showQuestion, 2000);
    }
});

falseButton.addEventListener('click', function () {
    if (!isAnswered && questionIndex < questions.length) {
        isAnswered = true;
        if (!questions[questionIndex].answer) {
            falseButton.classList.add('correct');
            scoreIn++; //Augmentera le score en cas de bonne réponse
            score.textContent = scoreIn; //MAJ le score affiché
        } else {
            falseButton.classList.add('incorrect');
            setTimeout(function () {
                trueButton.classList.add('correct'); // Mettre en vert le bouton avec la bonne réponse
            }, 1000);
        }
        questionIndex++;
        setTimeout(showQuestion, 2000); //temps pour que l'user voir la couleur des boutons
    }
});

showQuestion();





