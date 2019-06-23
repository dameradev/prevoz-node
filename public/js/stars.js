document.addEventListener("DOMContentLoaded", () => {
  const docs = document.querySelector(".user-rating");
  let docsNum = docs.getAttribute("data-docs");
  docsNum = +docsNum;
  for (let i = 1; i <= docsNum; i++) {
    const starRating = document.querySelector(`.star-rating-${i}`);
    let stars = starRating.getAttribute("data-stars");
    stars = +stars;

    for (let i = 1; i <= stars; i++) {
      let star = document.createElement("i");
      star.className = "active fa fa-star yellow";
      starRating.appendChild(star);
    }
  }
});
