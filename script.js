document.querySelectorAll("input[type=checkbox]").forEach((element) => {
  element.checked = false;
});
//-------------Functin Defination------------//

// steps show
const pageVisible = (pageNumber) => {
  const subContainers = document.querySelectorAll(".sub-container");
  const sidebarButton = document.querySelectorAll(".button-logo");
  const forwardButton = document.querySelector("#forward");
  const backwardButton = document.querySelector("#backward");

  subContainers.forEach((subContainer, index) => {
    // hidder other page then needed one
    subContainer.hidden = true;
    if (index == pageNumber) {
      subContainer.hidden = false;
    }

    // active step button on sidebar
    if (index != 4) {
      index == pageNumber
        ? sidebarButton[index].classList.add("button-active")
        : sidebarButton[index].classList.remove("button-active");
    }

    // backword and forward button visibility
    backwardButton.style.visibility = "visible";
    forwardButton.style.visibility = "visible";

    if (pageNumber == 0) {
      backwardButton.style.visibility = "hidden";
    } else if (pageNumber == 3) {
      forwardButton.innerText = "Confirm";
      forwardButton.classList.add("confirm");
    } else if (pageNumber == 4) {
      backwardButton.style.visibility = "hidden";
      forwardButton.style.visibility = "hidden";
      document.querySelector(".button-section").style.visibility = "hidden";
    } else {
      forwardButton.innerText = "Next Step";
      forwardButton.classList.remove("confirm");
    }
  });
};

// Current step
const currentStep = () => {
  const subContainers = document.querySelectorAll(".sub-container");
  for (let i = 0; i < subContainers.length; i++) {
    if (!subContainers[i].hidden) {
      return i;
    }
  }
};

// Validation
const Validation = () => {
  const name = document.querySelector("#name");
  const email = document.querySelector("#email");
  const phone = document.querySelector("#phone");
  const nameError = document.querySelector("#name-error");
  const emailError = document.querySelector("#email-error");
  const phoneError = document.querySelector("#phone-error");

  const pattern = {
    email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
  };
  let flag = true;

  name.classList.remove("error-input");
  nameError.innerText = "";
  emailError.innerText = "";
  email.classList.remove("error-input");
  phoneError.innerText = "";
  phone.classList.remove("error-input");

  if (name.value == "") {
    nameError.innerText = "*This Field is required";
    name.classList.add("error-input");
    flag = false;
  }
  if (email.value === "") {
    emailError.innerText = "*This Field is required";
    email.classList.add("error-input");
    flag = false;
  } else if (email.value.match(pattern.email) == null) {
    emailError.innerText = "*Invalid";
    email.classList.add("error-input");
    flag = false;
  }
  if (phone.value === "") {
    phoneError.innerText = "*This Field is required";
    phone.classList.add("error-input");
    flag = false;
  } else if (phone.value.match(pattern.phone) == null) {
    phoneError.innerText = "*Invalid";
    phone.classList.add("error-input");
    flag = false;
  }
  return flag;
};
// step up price accourding to the durations
const planPrice = () => {
  const input = document.querySelector(".switch input");
  const planDurations = document.querySelectorAll(".plan-duration");
  const cardPrices = document.querySelectorAll(".plan-rate");
  const addOnPrices = document.querySelectorAll(".add-on-rate");
  const planOffers = document.querySelectorAll(".plan-offer");
  const timeSelect = document.querySelectorAll(".time");
  const summaryDuration = document.querySelector(".duration-summary");
  const summaryDurationTotal = document.querySelector(
    ".duration-summary-total"
  );

  const cardPriceArray = [9, 12, 15];
  const addOnPriceArray = [1, 2, 2];

  planDurations.forEach((element) => {
    element.innerText = input.checked ? "yr" : "mo";
  });

  cardPrices.forEach((element, index) => {
    element.innerText = input.checked
      ? cardPriceArray[index] * 10
      : cardPriceArray[index];
  });

  addOnPrices.forEach((element, index) => {
    element.innerText = input.checked
      ? addOnPriceArray[index] * 10
      : addOnPriceArray[index];
  });

  planOffers.forEach((element) => {
    element.hidden = input.checked ? false : true;
  });

  if (input.checked) {
    timeSelect[0].classList.remove("time-active");
    timeSelect[1].classList.add("time-active");
  } else {
    timeSelect[1].classList.remove("time-active");
    timeSelect[0].classList.add("time-active");
  }
  summaryDuration.innerText = input.checked ? "Yearly" : "Monthly";
  summaryDurationTotal.innerText = input.checked ? "year" : "month";
};

const createAddOnSummaryChild = (name, rate) => {
  const div = document.createElement("div");
  div.classList.add("service-summary");
  const serviceName = document.createElement("div");
  serviceName.classList.add("service-summary-name");
  serviceName.innerText = name;
  div.appendChild(serviceName);
  const serviceRate = document.createElement("div");
  serviceRate.classList.add("service-summary-price");
  serviceRate.innerHTML = `+${rate}/<span class="plan-duration"></span>`;
  div.appendChild(serviceRate);
  return div;
};

// insert values on Summary page
const summary = () => {
  const summaryPlanName = document.querySelector(".summary-card-name");
  const summaryPlanRate = document.querySelector(".plan-summary-rate");
  const addOnSummary = document.querySelector(".add-on-summary");
  const totalRate = document.querySelector(".total-rate");
  const activeCard = document.querySelector(".plan-card-active");
  const actveAddOn = document.querySelectorAll(".add-on-active");

  let totalSum = 0;

  summaryPlanName.innerText = activeCard.querySelector(".plan-name").innerText;
  summaryPlanRate.innerText = activeCard.querySelector(".plan-rate").innerText;

  totalSum += Number(summaryPlanRate.innerText);

  if (actveAddOn.length === 0) {
    addOnSummary.hidden = true;
  } else {
    addOnSummary.hidden = false;
    addOnSummary.replaceChildren();
    const hr = document.createElement("hr");
    addOnSummary.appendChild(hr);

    actveAddOn.forEach((element) => {
      const addOnName = element.querySelector(".add-on-name").innerText;
      const addOnRate = element.querySelector(".add-on-rate").innerText;
      const addon = createAddOnSummaryChild(addOnName, addOnRate);
      addOnSummary.appendChild(addon);
      totalSum += Number(addOnRate);
    });
  }
  totalRate.innerText = totalSum;
};

// -----------------inital setup---------------//
pageVisible(0);

// -------------------Add Events------------------//

document.querySelector(".button-section").addEventListener("click", (e) => {
  const stepNumber = currentStep();
  if (e.target.id === "forward") {
    if (stepNumber === 0 && Validation()) {
      planPrice();
      pageVisible(stepNumber + 1);
    } else if (stepNumber === 1) {
      if (document.querySelector(".plan-card-active")) {
        pageVisible(stepNumber + 1);
      }
    } else if (stepNumber === 2) {
      summary();
      planPrice();
      pageVisible(stepNumber + 1);
    } else if (stepNumber === 3) {
      pageVisible(stepNumber + 1);
    }
  } else if (e.target.id === "backward") {
    if (stepNumber === 1) {
      pageVisible(stepNumber - 1);
    } else if (stepNumber === 2) {
      pageVisible(stepNumber - 1);
    } else if (stepNumber === 3) {
      pageVisible(stepNumber - 1);
    }
  }
});

document.querySelector(".main-container").addEventListener("click", (e) => {
  if (e.target.closest(".plan-card")) {
    document.querySelectorAll(".plan-card").forEach((element) => {
      element.classList.remove("plan-card-active");
    });
    e.target.closest(".plan-card").classList.add("plan-card-active");
  } else if (e.target.parentElement.classList.contains("switch")) {
    planPrice();
  } else if (e.target.classList.contains("add-on-checkbox")) {
    if (e.target.checked) {
      e.target.parentElement.classList.add("add-on-active");
    } else {
      e.target.parentElement.classList.remove("add-on-active");
    }
  } else if (e.target.classList.contains("change")) {
    pageVisible(1);
  }
});
