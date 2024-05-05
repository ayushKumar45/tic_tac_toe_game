const gameinfo = document.querySelector('.game_info');
const boxes = document.querySelectorAll('.box');
const newbtn = document.querySelector('.btn');

// decide the current player
let curplayer;

// All possible combinations to win
const winningpositions = [
    // horizontal
    [ 0, 1, 2 ],
    [ 3, 4, 5 ],
    [ 6, 7, 8 ],
    // vertical
    [ 0, 3, 6 ],
    [ 1, 4, 7 ],
    [ 2, 5, 8 ],
    // diagonal
    [ 0, 4, 8 ],
    [ 2, 4, 6 ]
]

    let gamegrid;
function initgame()
{
    curplayer = 'x';
    gamegrid = [ "", "", "", "", "", "", "", "", "" ];

    boxes.forEach((box, index) => {
        box.innerText = "";
        box.style.pointerEvents = "all";
        // box.classList = `box box-${index + 1}`;
        box.classList.remove("win");
    });

    gameinfo.innerText = `Current Player - ${ curplayer.toUpperCase() }`;
    
    newbtn.classList.remove("active");
}

initgame();
boxes.forEach((box, index) => {
    box.addEventListener(
        'click', () => {
            handleclick(index);
        });
});
function handleclick(index)
{
    if (gamegrid[index] === "")
    {
        boxes[index].innerText = curplayer.toUpperCase();
        boxes[index].style.pointerEvents = "none";
        gamegrid[index] = curplayer;
        // swapping player's turn
        swapturn();
        // checking game is over or not
        checkgameover();
    }
}
// swap player turns
function swapturn()
{
    curplayer = curplayer === 'x' ? 'o' : 'x';
    gameinfo.innerText = `Current Player - ${ curplayer.toUpperCase() }`;
}

function checkgameover()
{
    let winner = "";
    // checking if any player matches the winning combinations
    winningpositions.forEach((position) => {
        if (gamegrid[position[0]] != "" &&
                gamegrid[position[1]] != "" &&
                gamegrid[position[2]] != "" &&
                gamegrid[position[0]] === gamegrid[position[1]] &&
                                           gamegrid[position[1]] === gamegrid[position[2]])
        {
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });

            winner = gamegrid[position[0]] === 'x' ? 'x' : 'o';
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    // checks if we get the winner
    if (winner != "")
    {
        gameinfo.innerText = `Winner - ${ winner.toUpperCase() }`;
        newbtn.classList.add("active");
        return;
    }

    // checks if its a draw
    let allboxesfilled = true;
    gamegrid.forEach((box) => {
        if (box === "")
        {
            allboxesfilled = false;
        }
    });

    if (allboxesfilled)
    {
        gameinfo.innerText = `It's a Draw`; newbtn.classList.add("active");
    }
}

newbtn.addEventListener('click', initgame);