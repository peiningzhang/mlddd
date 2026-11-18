const filters = document.querySelector(".publication-filters");
const filterButtons = [...filters.querySelectorAll("button")];
const papers = [...document.querySelectorAll(".paper")];
const status = document.querySelector("#publication-status");

function showPapers(topic) {
  for (const button of filterButtons) {
    button.setAttribute("aria-pressed", String(button.dataset.filter === topic));
  }

  let visible = 0;
  for (const paper of papers) {
    paper.hidden = topic !== "all" && paper.dataset.topic !== topic;
    if (!paper.hidden) visible++;
  }
  status.textContent = visible === 1 ? "Showing 1 publication." : `Showing ${visible} publications.`;
}

function revealLinkedPaper(hash) {
  const paper = papers.find((item) => `#${item.id}` === hash);
  if (paper?.hidden) showPapers("all");
}

for (const button of filterButtons) {
  button.addEventListener("click", () => showPapers(button.dataset.filter));
}
for (const link of document.querySelectorAll('#research a[href^="#"]')) {
  link.addEventListener("click", () => revealLinkedPaper(link.hash));
}
window.addEventListener("hashchange", () => {
  revealLinkedPaper(window.location.hash);
  if (papers.some((paper) => `#${paper.id}` === window.location.hash)) {
    document.getElementById(window.location.hash.slice(1)).scrollIntoView();
  }
});
filters.hidden = false;
