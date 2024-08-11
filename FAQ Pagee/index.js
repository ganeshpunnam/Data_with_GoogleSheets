const answers = document.querySelectorAll(".answer1");
const arrowIcons = document.querySelectorAll(".question1 img");
const container = document.querySelector(".container1");

answers.forEach((answer) => (answer.style.display = "none"));

container.addEventListener("click", (e) => {
  arrowIcons.forEach((arrow) => {
    if (e.target === arrow) {
      answers.forEach((answer) => {
        if (answer.parentElement === e.target.parentElement.parentElement) {
          if (answer.style.display === "none") {
            arrow.style.transform = "rotate(180deg)";
            answer.style.display = "block";
            e.target.parentElement.style.color = "crimson";
          } else if (answer.style.display === "block") {
            arrow.style.transform = "rotate(0)";
            answer.style.display = "none";
            e.target.parentElement.style.color = "rgb(90, 90, 90)";
          }
        }
      });
    }
  });
});
