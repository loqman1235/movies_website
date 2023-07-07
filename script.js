// Filters Container
const filtersList = document.querySelector(".filters");
const filtersBtnNext = document.querySelector(".arrow_next i");
const filtersBtnPrev = document.querySelector(".arrow_prev i");

if (
  filtersList !== null &&
  filtersBtnNext !== null &&
  filtersBtnPrev !== null
) {
  const displayFilterArrow = () => {
    if (filtersList.scrollLeft >= 5) {
      filtersBtnPrev.parentElement.classList.add("active");
    } else {
      filtersBtnPrev.parentElement.classList.remove("active");
    }

    if (
      filtersList.scrollLeft ===
      filtersList.scrollWidth - filtersList.clientWidth
    ) {
      filtersBtnNext.parentElement.classList.remove("active");
    } else {
      filtersBtnNext.parentElement.classList.add("active");
    }

    console.log(filtersList.scrollLeft);
  };

  filtersBtnNext.addEventListener("click", () => {
    filtersList.scrollLeft += 100;
    displayFilterArrow();
  });

  filtersBtnPrev.addEventListener("click", () => {
    filtersList.scrollLeft -= 100;
    displayFilterArrow();
  });

  // Filtering Movies
  const filters = document.querySelectorAll(".filter");
  const movies = document.querySelectorAll(".movie");

  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      movies.forEach((movie) => {
        const genreArr = movie.dataset.genre.replace(/\s+/g, "").split(",");
        if (filter.dataset.filter === "all") {
          filters.forEach((filter) => filter.classList.remove("active"));
          filter.classList.add("active");
          movie.style.display = "block";
          movie.classList.add("show");
          movie.classList.add("popup");
        } else if (genreArr.includes(filter.dataset.filter)) {
          filters.forEach((filter) => filter.classList.remove("active"));
          filter.classList.add("active");
          movie.style.display = "block";
          movie.classList.add("show");
          movie.classList.add("popup");
        } else {
          movie.classList.remove("show");
          movie.classList.remove("popup");
        }
      });
    });
  });

  movies.forEach((movie) => {
    movie.addEventListener("transitionend", () => {
      if (!movie.classList.contains("show")) {
        movie.style.display = "none";
      }
    });
  });
}

// Slider

const heroSlider = document.querySelector(".heroSlider"),
  heroSliderInner = document.querySelector(".heroSliderInner"),
  heroSliderItems = document.querySelectorAll(".heroSliderItem");

let slideTime = 8000;
let currSlide = 0;

if (heroSlider !== null) {
  // slider inner width
  heroSliderInner.style.width = `${100 * heroSliderItems.length}%`;

  // Indictors
  heroSliderItems.forEach((item, itemIndex) => {
    let indicator = document.createElement("span");
    indicator.classList.add("indicator");
    indicator.dataset.slide = itemIndex;

    heroSlider.lastElementChild.appendChild(indicator);
    indicator.addEventListener("click", () => {
      currSlide = itemIndex;
      document
        .querySelectorAll(".indicator")
        .forEach((indicator) => indicator.classList.remove("active"));
      indicator.classList.add("active");
      heroSliderInner.style.left = `-${100 * itemIndex}%`;
    });
  });

  // Set default active indicator
  heroSlider.lastElementChild.firstChild.classList.add("active");

  // Slider move every 5 seconds
  function autoSlide() {
    setInterval(() => {
      if (currSlide > heroSliderItems.length - 1) {
        currSlide = 0;
      }

      document
        .querySelectorAll(".indicator")
        .forEach((indicator) => indicator.classList.remove("active"));
      heroSlider.lastElementChild.children[currSlide].classList.add("active");
      heroSliderInner.style.left = `-${100 * currSlide}%`;
      currSlide++;
    }, slideTime);
  }

  autoSlide();
}

// Toggle Sidebar
const toggleSidebarBtn = document.getElementById("toggleSidebarBtn");
const sidebar = document.querySelector(".sidebar_nav");

const toggleSidebar = () => {
  sidebar.classList.toggle("active");
};

toggleSidebarBtn.addEventListener("click", toggleSidebar);

// Toggle Profile Dropdown

const toggleProfileDropdownBtn = document.getElementById(
  "toggleProfileDropdownBtn"
);

const toggleDropdown = () => {
  toggleProfileDropdownBtn.parentElement.nextElementSibling.classList.toggle(
    "active"
  );
};

toggleProfileDropdownBtn.addEventListener("click", toggleDropdown);
