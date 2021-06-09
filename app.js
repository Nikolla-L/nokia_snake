document.addEventListener('DOMContentLoaded', ()=>{
    const grid = document.querySelector('.grid');
    const squares = document.querySelectorAll('.grid div');
    const scoreDisplay = document.querySelector('span');
    const startBtn = document.querySelector('.start');
    const eatAutio = document.querySelector('.eat');
    const loseAutio = document.querySelector('.lose');
    const bgAudio = document.querySelector('.bg-audio');


    const width = 10;
    let currentIndex = 0;
    let appleIndex = 0;
    let currentSnake = [2, 1, 0];
    let direction = 1;
    let speed = 0.8;
    let score = 0;
    let intervalTime = 0;
    let interval = 0;

    let btc = document.createElement('img');
    btc.src = 'images/btc.png';
    function appleImg(){
        document.querySelector('.apple').appendChild(btc);
    }
    let musk = document.createElement('img');
    musk.src = 'images/musk.png';
    function appendMusk(x){
        x.appendChild(musk);
    }
    function startGame() {
        document.querySelector('body').style.background = "var(--clr-bg)";
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple');
        clearInterval(interval);
        score = 0;
        randomApple();
        direction = 1;
        scoreDisplay.innerText = score;
        intervalTime = 800;
        currentSnake = [2, 1, 0];
        currentIndex = 0;
        currentSnake.forEach(index => {
                squares[index].classList.add('snake');
            }
        );
        grid.style.animation = "none";
        interval = setInterval(moveOutcomes, intervalTime);
        bgAudio.play();
        bgAudio.volume = .1;
        bgAudio.loop = true;
    }

    function moveOutcomes() {
        if(
            (currentSnake[0] + width >= (width*width) && direction === width) || //თუ გველი ურტყამს ზემოთ
            (currentSnake[0] % width === width - 1 && direction === 1) || //თუ მარჯვნივ ეხეთქება
            (currentSnake[0] % width === 0 && direction === -1) || //თუ მარცხნივ ასხამს
            (currentSnake[0] - width < 0 && direction === -width) || //თუ დაბლა ურტყამს 
            squares[currentSnake[0] + direction].classList.contains('snake') //თუ თავის თავს ეტენება
        ) {
            bgAudio.pause();
            loseAutio.play();
            grid.style.animation ="hit 1s infinite linear";
            return clearInterval(interval);
        }
        const tail = currentSnake.pop();
        squares[tail].classList.remove('snake');
        currentSnake.unshift(currentSnake[0] + direction); 

        if(squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple');
            squares[tail].classList.add('snake');
            eatAutio.play();
            currentSnake.push(tail);
            randomApple();
            score++;
            if(bgAudio.volume >=1){
                bgAudio = 3;
            }else{
                bgAudio.volume += .05;
            }
            scoreDisplay.textContent = " " + score;
            clearInterval(interval);
            intervalTime = intervalTime*speed;
            interval = setInterval(moveOutcomes, intervalTime);
        }
        squares[currentSnake[0]].classList.add('snake');
        appendMusk(squares[currentSnake[0]]);
    }

    function randomApple() {
        do{
            appleIndex = Math.floor(Math.random() * squares.length);
        } while(squares[appleIndex].classList.contains('snake'));
        squares[appleIndex].classList.add('apple');
        appleImg();
    }

    function control(e) {
        squares[currentIndex].classList.remove('snake');

        if (e.keyCode === 39) {
            direction = 1;
        } else if (e.keyCode === 38) {
            direction = -width;
        } else if (e.keyCode === 37) {
            direction = -1;
        } else if (e.keyCode === 40) {
            direction = +width;
        }
    }
    document.addEventListener('keyup', control);
    startBtn.addEventListener('click', startGame);
})
