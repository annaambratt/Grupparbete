const styles = {
  nordisk: {
    name: "Nordiskt lugn",
    colors: "mjuka naturtoner och rena linjer",
    description: "Ljust, avskalat och enkelt att trivas i. En trygg bas som är lätt att göra personlig.",
  },
  jordnara: {
    name: "Jordnära",
    colors: "varma toner och taktila material",
    description: "Mjuka nyanser och material med känsla. En varm helhet att landa i.",
  },
  kontrast: {
    name: "Mer kontrast",
    colors: "djupare färger och detaljer med karaktär",
    description: "Lite mer färg, lite mer personlighet. En kombination som känns utan att ta över.",
  },
};

const moods = {
  lugn: "En lugn känsla",
  varmt: "En varm känsla",
  energiskt: "En känsla full av liv",
};

const bundles = [
  {
    maxBudget: 1500,
    name: "Börja enkelt",
    price: 1290,
    items: ["2 kuddfodral", "Pläd"],
    description: "Gör soffan mer inbjudande med två kuddar och en pläd som passar ihop.",
  },
  {
    maxBudget: 2500,
    name: "Få ihop helheten",
    price: 2290,
    items: ["2 kuddfodral", "Sängkläder", "Pläd"],
    description: "Matcha soffan och sängen med detaljer som gör att rummet känns genomtänkt.",
  },
  {
    maxBudget: 3500,
    name: "Gör det komplett",
    price: 3290,
    items: ["2 kuddfodral", "Sängkläder", "Pläd", "Gardiner"],
    description: "Från kuddar till gardiner — en tydlig röd tråd genom hela rummet.",
  },
];

const quizForm = document.querySelector("#style-quiz");
const result = document.querySelector("#quiz-result");
const resetButton = document.querySelector("#quiz-reset");

function formatPrice(price) {
  return `${new Intl.NumberFormat("sv-SE").format(price)} kr`;
}

quizForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(quizForm);
  const selectedStyle = styles[formData.get("style")];
  const selectedMood = moods[formData.get("mood")];
  const budget = Number(formData.get("budget"));
  const bundle = bundles.find((option) => option.maxBudget === budget);

  if (!selectedStyle || !selectedMood || !bundle) {
    return;
  }

  document.querySelector("#result-mood").textContent = `${selectedMood} · ${selectedStyle.name}`;
  document.querySelector("#result-title").textContent = bundle.name;
  document.querySelector("#result-description").textContent =
    `${bundle.description} Vi matchar paketet med ${selectedStyle.colors}.`;
  document.querySelector("#result-price").textContent = formatPrice(bundle.price);

  const items = document.querySelector("#result-items");
  items.replaceChildren(...bundle.items.map((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    return listItem;
  }));

  result.hidden = false;
  quizForm.hidden = true;
  result.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

resetButton.addEventListener("click", () => {
  result.hidden = true;
  quizForm.hidden = false;
  quizForm.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

document.querySelectorAll("[data-package]").forEach((link) => {
  link.addEventListener("click", () => {
    const packageMap = { start: "1500", helhet: "2500", komplett: "3500" };
    const budget = document.querySelector("#budget");
    budget.value = packageMap[link.dataset.package];
    if (result.hidden === false) {
      result.hidden = true;
      quizForm.hidden = false;
    }
    document.querySelector("#quiz").scrollIntoView({ behavior: "smooth" });
  });
});
