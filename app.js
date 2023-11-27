const accountDropdownElem = document.getElementById("accountDropdownElem");
const notificationDropdownElem = document.getElementById("notificationDropdownElem");
const toastElem = document.getElementById("toastElem");
const toastMobileCloseElem = document.getElementById("toastMobileCloseElem");
const toastDesktopCloseElem = document.getElementById("toastDesktopCloseElem");
const setupGuideTogglerElem = document.getElementById("setupGuideTogglerElem");
const setupAccordionContent = document.getElementById("setupAccordionContent");
const setupGuideChevronElem = document.getElementById("setupGuideChevronElem");
const notificationElem = document.getElementById("notificationElem");
const accountElem = document.getElementById("accountElem");
const progressCountElem = document.getElementById("progressCountElem");
const progressElem = document.getElementById("progressElem");
const inputCheckElems = document.querySelectorAll(".input-check");
const setupAccordionTriggers = document.querySelectorAll("[data-accordion-button]");

// Function to Get total number of Completed Setup
const getCompletedGuides = () => {
  let completedGuides = 0;
  inputCheckElems.forEach((element) => {
    if (element.checked) completedGuides += 1;
  });

  return completedGuides;
};

// Get the Total Progress
const getProgress = () => {
  progressCountElem.innerText = `${getCompletedGuides()}/${inputCheckElems.length} completed`;

  const percentage = Math.round(
    (getCompletedGuides() / inputCheckElems.length) * 100,
  );

  progressElem.setAttribute("value", `${percentage}`);

  progressElem.innerText = `${percentage}%`;
};

// handle Toast Dialog Closing
const handleCloseToast = () => {
  toastElem.style.display = "none";
};

// Event Listener for User Account Dropdown
accountElem.addEventListener("click", (e) => {
  e.stopPropagation();

  const accountDropdown = window.getComputedStyle(accountDropdownElem).display;

  notificationDropdownElem.style.display = "none";

  if (accountDropdown === "none") {
    accountDropdownElem.style.display = "flex";
  } else {
    accountDropdownElem.style.display = "none";
  }
});

// Event Listener for Notification
notificationElem.addEventListener("click", (e) => {
  e.stopPropagation();

  const notificationDropdown = window.getComputedStyle(notificationDropdownElem).display;

  accountDropdownElem.style.display = "none";

  if (notificationDropdown === "none") {
    notificationDropdownElem.style.display = "flex";
  } else {
    notificationDropdownElem.style.display = "none";
  }

});


// Event Listener for Alert Dialog
toastMobileCloseElem.addEventListener("click", handleCloseToast);
toastDesktopCloseElem.addEventListener("click", handleCloseToast);


// Event Listener to Listen for Clicks outside Dropdown
document.addEventListener("click", (e) => {

  if (window.getComputedStyle(accountDropdownElem).display !== "none") {
    accountDropdownElem.style.display = "none";
  }

  if (window.getComputedStyle(notificationDropdownElem).display !== "none") {
    notificationDropdownElem.style.display = "none";
  }
});



// Toggle Setup Guide Container
setupGuideChevronElem.addEventListener("click", () => {
  setupAccordionContent.classList.toggle("shown");
  setupGuideChevronElem.classList.toggle("shown");
});


//get clicked checkbox, update progress and show the next uncompleted step 
inputCheckElems.forEach((inp, index) => inp.addEventListener("change", (e) => {
  let next_trigger = setupAccordionTriggers[index + 1]
  const default_trigger = setupAccordionTriggers[index]

  if (e.target.checked) {

    for (let a = 0; a < inputCheckElems.length; a++) {
      if (!inputCheckElems[a].checked) {
        next_trigger = setupAccordionTriggers[a]
        next_trigger.click();
        break;
      }
    }


  }
  else {
    default_trigger.click()
  }

  getProgress();

}));



document.addEventListener("click", e => {
  const isAccordionButton = e.target.matches("[data-accordion-button]")
  if (!isAccordionButton && e.target.closest("[data-accordion]") != null) return

  if (!isAccordionButton) return

  let currentAccordion
  if (isAccordionButton) {
    currentAccordion = e.target.closest("[data-accordion]")
  }
  if (currentAccordion.classList.contains("active")) return
  currentAccordion.classList.toggle("active")

  document.querySelectorAll("[data-accordion].active").forEach(accordion => {
    if (accordion === currentAccordion) return
    accordion.classList.remove("active")
  })
})





getProgress();
