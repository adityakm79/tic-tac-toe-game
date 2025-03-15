let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let msgContainer = document.querySelector(".hide");
let msg = document.querySelector(".msg")

let turnO = true; // playerX and playerO
let count = 0;

const winPatterns = [
   [0, 1, 2],
   [0, 3, 6],
   [0, 4, 8],
   [1, 4, 7],
   [2, 5, 8],
   [2, 4, 6],
   [3, 4, 5],
   [6, 7, 8],
];

// game reset...
const resetGame = () => {
   turnO = true;
   enableBoxes();
   msgContainer.classList.add("hide");
   pageReload();
}
// page refres..
const pageReload = () => {
   location.reload();
}

// when winner any one win then button disabled..
const disableBoxes = () => {
   for (let box of boxes) {
      box.disabled = true;
   }
}

// when reset the game then disabled button enabled and innerText empty..
const enableBoxes = () => {
   for (let box of boxes) {
      box.disabled = false;
      box.innerText = ""
   }
}

// this function works that when i click on button then alternative "O" and "X" write in the box..
boxes.forEach((box) => {
   box.addEventListener("click", () => {
      if (turnO) {
         box.innerText = "O";
         box.style.color = "rgb(233, 95, 15)";
         turnO = false;
      } else {
         box.innerText = "X";
         box.style.color = " #b30f0a"
         turnO = true;
      }
      box.disabled = true;
      checkWinner();
   });
});

// When any one won the game then popup the msg..
const showWinner = (winner) => {
   msg.innerText = `Congratulations, Winner is ${winner}`;
   msgContainer.classList.remove("hide");
   disableBoxes();
}

// when no baody won the game then popup the msg "The Game was draw"..
for (let box of boxes) {
   box.addEventListener("click", function () {
      count++;
      if (count === 9) {
         msg.innerText = "The Game was draw";
         msgContainer.classList.remove("hide");
         disableBoxes();
      }
   });
}

// this function make winpattern how much possibility..
const checkWinner = () => {
   for (let pattern of winPatterns) {
      let pos1Val = boxes[pattern[0]].innerText;
      let pos2Val = boxes[pattern[1]].innerText;
      let pos3Val = boxes[pattern[2]].innerText;

      if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
         if (pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
         }
      }
   }
};
// click event on reset button.. 
resetbtn.addEventListener("click", resetGame);
