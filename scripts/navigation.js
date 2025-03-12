function filterItems(category) {
  const items = document.querySelectorAll(".item");

  items.forEach((item) => {
    if (category === "all" || item.getAttribute("data-category") === category) {
         item.classList.remove("hidden");
    } else {
      item.classList.add("hidden");
    }
  });
}
