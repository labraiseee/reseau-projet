let display = document.getElementById("display");

function append(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = "";
}

function calculate() {
  try {
    display.value = eval(display.value);
  } catch (e) {
    display.value = "Erreur";
  }
}
const bonnesReponses = { q1: "b", q2: "b", q3: "b" };
let currentStep = 1;
const totalSteps = Object.keys(bonnesReponses).length;

const updateStep = () => {
  document.querySelectorAll(".step").forEach((el) => {
    el.classList.add("hidden");
  });
  const active = document.querySelector(`[data-step="${currentStep}"]`);
  if (active) active.classList.remove("hidden");

  document.getElementById("prevBtn").disabled = currentStep === 1;
  document.getElementById("nextBtn").textContent = currentStep === totalSteps ? "Valider" : "Suivant";
};

document.getElementById("nextBtn").addEventListener("click", () => {
  if (currentStep < totalSteps) {
    currentStep++;
    updateStep();
  } else {
    // Validation
    let concat = "";
    let score = 0;
    for (let key in bonnesReponses) {
      const answer = document.querySelector(`input[name="${key}"]:checked`);
      if (answer && answer.value === bonnesReponses[key]) {
        concat += answer.value;
        score++;
      } else {
        concat += "_";
      }
    }

    const resDiv = document.getElementById("resultat");
    resDiv.textContent = `Score : ${score}/${totalSteps} — Code : ${concat}`;
    resDiv.classList.remove("hidden");
    resDiv.classList.add(score === totalSteps ? "text-green-600" : "text-red-500");

    // Bloque navigation
    document.getElementById("nextBtn").disabled = true;
    document.getElementById("prevBtn").disabled = true;
  }
});

document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentStep > 1) {
    currentStep--;
    updateStep();
  }
});

updateStep();