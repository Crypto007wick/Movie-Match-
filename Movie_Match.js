 const startBtn = document.getElementById("start-btn");
        const startBox = document.getElementById("start-box");
        const quizBox = document.getElementById("quiz-box");
        const resultBox = document.getElementById("result-box");
        const questionEl = document.getElementById("question");
        const optionsEl = document.getElementById("options");
        const nextBtn = document.getElementById("next-btn");
        const restartBtn = document.getElementById("restart-btn");
        const quitBtn = document.getElementById("quit-btn");
        const questionImage = document.getElementById("question-image");

        let currentQuestionIndex = 0;
        let score = 0;

        const questions = [
            {
                question: "What is the name of the toy cowboy in 'Toy Story'?",
                options: ["Woody", "Buzz Lightyear", "Mr. Potato Head", "Slinky Dog"],
                answer: "Woody",
                image: "https://via.placeholder.com/600x400/ff4081/FFFFFF?text=Toy+Story"
            },
            {
                question: "Who is the villain in 'The Lion King'?",
                options: ["Scar", "Ursula", "Jafar", "Hades"],
                answer: "Scar",
                image: "https://via.placeholder.com/600x400/ff4081/FFFFFF?text=The+Lion+King"
            },
            {
                question: "In 'Avengers: Endgame', who wields Thor's hammer?",
                options: ["Iron Man", "Captain America", "Hulk", "Thor"],
                answer: "Captain America",
                image: "https://via.placeholder.com/600x400/ff4081/FFFFFF?text=Avengers%3A+Endgame"
            },
            {
                question: "What is the name of Elsa's sister in 'Frozen'?",
                options: ["Ariel", "Anna", "Rapunzel", "Moana"],
                answer: "Anna",
                image: "https://via.placeholder.com/600x400/ff4081/FFFFFF?text=Frozen"
            },
            {
                question: "What is Spider-Man's real name?",
                options: ["Peter Parker", "Bruce Wayne", "Clark Kent", "Tony Stark"],
                answer: "Peter Parker",
                image: "https://via.placeholder.com/600x400/ff4081/FFFFFF?text=Spider-Man"
            }
        ];

        // Start quiz
        startBtn.addEventListener('click', function() {
            startBox.style.display = 'none';
            quizBox.style.display = 'block';
            loadQuestion();
        });

        // Load the current question
        function loadQuestion() {
            const currentQuestion = questions[currentQuestionIndex];
            questionEl.textContent = currentQuestion.question;
            questionImage.src = currentQuestion.image;
            optionsEl.innerHTML = '';
            currentQuestion.options.forEach(option => {
                const optionEl = document.createElement('li');
                optionEl.textContent = option;
                optionEl.addEventListener('click', selectOption);
                optionsEl.appendChild(optionEl);
            });
            nextBtn.style.display = 'none';
        }

        // Select an option
        function selectOption(e) {
            const selectedOption = e.target;
            const currentQuestion = questions[currentQuestionIndex];
            if (selectedOption.textContent === currentQuestion.answer) {
                score++;
                selectedOption.classList.add('selected');
            } else {
                selectedOption.classList.add('incorrect');
                const options = optionsEl.querySelectorAll('li');
                options.forEach(option => {
                    if (option.textContent === currentQuestion.answer) {
                        option.classList.add('selected');
                    }
                });
            }
            nextBtn.style.display = 'block';
            optionsEl.querySelectorAll('li').forEach(option => option.classList.add('disabled'));
        }

        // Next question or show results
        nextBtn.addEventListener('click', function() {
            if (currentQuestionIndex < questions.length - 1) {
                currentQuestionIndex++;
                loadQuestion();
            } else {
                showResults();
            }
        });

        // Show results
        function showResults() {
            quizBox.style.display = 'none';
            resultBox.style.display = 'block';
            document.querySelector('.score').textContent = `You scored ${score} out of ${questions.length}`;
        }

        // Restart quiz
        restartBtn.addEventListener('click', function() {
            score = 0;
            currentQuestionIndex = 0;
            resultBox.style.display = 'none';
            startBox.style.display = 'block';
        });

        // Quit quiz
        quitBtn.addEventListener('click', function() {
            resultBox.style.display = 'none';
            startBox.style.display = 'block';
        });