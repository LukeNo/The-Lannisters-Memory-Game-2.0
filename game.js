
const characters = ["cersei", "cersei", "jaime", "jaime", "joffrey", "joffrey", "myrcella", "myrcella", "tommen", "tommen", "tyrion", "tyrion", "tywin", "tywin"];

/* PART 1 */
//downloading divs
let cards = document.querySelectorAll("div"); //NodeList; method getElementsByTagName creates HTMLCollection
cards = [...cards]; //Making an array of list

/*Other possible notation:
//let cards = [...document.querySelectorAll("div")]
*/

const startTime = new Date().getTime(); //Downloading present date in miliseconds

let activeCard = ""; //card clicked at the moment
const activeCards = []; //array for two cards

//Sum of all card pairs - necessary for ending
const gameLength = cards.length / 2;
//Score info - how many pairs were guessed
let gameResult = 0;
/* End of PART 1 */

/*PART 3 - AFTER THE CARD IS CLICKED - MINI GAME */
const clickCard = function () {

    activeCard = this; //what was clicked
    //console.log(event.target) //checking if event is equal to this

    //checking if the same element was clicked
    if (activeCard == activeCards[0]) return;

    activeCard.classList.remove("hidden"); //hiding clicked card

    //is it first click?, is array length = 0?
    if (activeCards.length === 0) {
        //console.log("1 element");
        activeCards[0] = activeCard; //chosen card position is number 1
        return;

    }
    //is it second click?
    else {
        //console.log("2 element");
        //possibility of clicking removed for a moment 
        cards.forEach(card => card.removeEventListener("click", clickCard))
        //second click set in array in index 1 
        activeCards[1] = activeCard;

        //Half second from revealing the card - decision correct or not
        setTimeout(function () {
            //if cards are equal - win!
            if (activeCards[0].className === activeCards[1].className) {
                //console.log("win")
                activeCards.forEach(card => card.classList.add("off"))
                gameResult++;
                //turn nr displayed in div #score
                $('#score').html('Turn: ' + gameResult);
                cards = cards.filter(card => !card.classList.contains("off"));
                //Checking if the game is ended
                if (gameResult == gameLength) {
                    const endTime = new Date().getTime();
                    const gameTime = (endTime - startTime) / 1000
                    //info about game time, asking if player wanna play again
                    alert(`You win! Your time is: ${gameTime} seconds. Play again?`)
                    //info about turns number
                    $('.container').html('<h1>You win!<br>Done in ' + gameResult + ' turns.</h1>');
                    location.reload();
                }
            }
            //fail, cards hidden again
            else {
                //console.log("fail")
                activeCards.forEach(card => card.classList.add("hidden"))
            }
            //Reset to new game
            activeCard = ""; //active card is empty
            activeCards.length = 0; //array length = 0
            cards.forEach(card => card.addEventListener("click", clickCard))//EventListener restored

        }, 500)
    }
};


//PART 2 - DRAWING, SHOWING AND HIDING, CLICK LISTENER
//Function initialized after start
const init = function () {
    //drawing class for every single one div
    cards.forEach(card => {
        //position from array keeping characters
        const position = Math.floor(Math.random() * characters.length); //1
        //adding class to div
        card.classList.add(characters[position]);
        //removing drawn element from array
        characters.splice(position, 1);
    })
    //After 2 seconds hidden class is added - characters pictures are hidden and click listener is added
    setTimeout(function () {
        cards.forEach(card => {
            card.classList.add("hidden")
            card.addEventListener("click", clickCard)
        })
    }, 2000)
};

init()
