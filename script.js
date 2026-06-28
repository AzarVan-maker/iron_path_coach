const burgerBtn = document.getElementById("burgerBtn");
const mobileMenu = document.getElementById("mobileMenu");

const goalTabs = document.querySelectorAll(".goal-tab");
const goalInfo = document.getElementById("goalInfo");

const programButtons = document.querySelectorAll(".program-btn");
const bookingModal = document.getElementById("bookingModal");
const modalClose = document.getElementById("modalClose");
const modalProgramName = document.getElementById("modalProgramName");
const modalProgramPrice = document.getElementById("modalProgramPrice");
const modalTelegramLink = document.getElementById("modalTelegramLink");

const calculateBtn = document.getElementById("calculateBtn");
const calculatorResult = document.getElementById("calculatorResult");

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

const telegramBotUrl = "https://t.me/hotelsupport01_bot";

const goalData = {
  fat: {
    title: "Похудение без срывов",
    text: "Фокус на дефиците калорий, силовых тренировках, шаговой активности и контроле привычек. Без экстремальных диет и резких ограничений.",
    points: ["Силовые 3–4 раза", "Кардио по уровню", "Контроль питания"]
  },

  muscle: {
    title: "Набор мышечной массы",
    text: "Фокус на прогрессии нагрузки, технике базовых упражнений, восстановлении и достаточном питании.",
    points: ["Прогрессия весов", "Питание в плюс", "Контроль восстановления"]
  },

  strength: {
    title: "Рост силы",
    text: "Фокус на базовых движениях, технике, периодизации нагрузки и постепенном увеличении рабочих весов.",
    points: ["База", "Техника", "План нагрузки"]
  },

  shape: {
    title: "Общая форма и тонус",
    text: "Фокус на регулярности, умеренной нагрузке, мобильности, осанке и энергии в повседневной жизни.",
    points: ["Регулярность", "Тонус", "Самочувствие"]
  }
};

burgerBtn.addEventListener("click", function () {
  mobileMenu.classList.toggle("active");
});

mobileMenu.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    mobileMenu.classList.remove("active");
  });
});

goalTabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    goalTabs.forEach(function (item) {
      item.classList.remove("active");
    });

    tab.classList.add("active");

    const goal = tab.dataset.goal;
    const data = goalData[goal];

    goalInfo.innerHTML = `
      <p class="goal-kicker">Цель</p>
      <h3>${data.title}</h3>
      <p>${data.text}</p>

      <div class="goal-points">
        ${data.points.map(function (point) {
          return `<span>${point}</span>`;
        }).join("")}
      </div>
    `;
  });
});

programButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const programName = button.dataset.program;
    const programPrice = button.dataset.price;

    modalProgramName.textContent = programName;
    modalProgramPrice.textContent = `от ${formatPrice(programPrice)} ₽`;

    const startParam = `fitness_${programName.toLowerCase().replaceAll(" ", "_")}`;
    modalTelegramLink.href = `${telegramBotUrl}?start=${encodeURIComponent(startParam)}`;

    bookingModal.classList.add("active");
  });
});

modalClose.addEventListener("click", function () {
  bookingModal.classList.remove("active");
});

bookingModal.addEventListener("click", function (event) {
  if (event.target === bookingModal) {
    bookingModal.classList.remove("active");
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    bookingModal.classList.remove("active");
  }
});

calculateBtn.addEventListener("click", function () {
  const height = Number(document.getElementById("height").value);
  const weight = Number(document.getElementById("weight").value);
  const workouts = Number(document.getElementById("workouts").value);
  const goal = document.getElementById("fitnessGoal").value;

  if (!height || !weight || !workouts || !goal) {
    calculatorResult.innerHTML = `
      <h3>Заполните все поля</h3>
      <p>Нужно указать рост, вес, количество тренировок и цель.</p>
    `;
    return;
  }

  const heightMeters = height / 100;
  const bmi = weight / (heightMeters * heightMeters);
  const roundedBmi = bmi.toFixed(1);

  let bmiText = "";

  if (bmi < 18.5) {
    bmiText = "вес ниже среднего диапазона";
  } else if (bmi < 25) {
    bmiText = "вес в среднем диапазоне";
  } else if (bmi < 30) {
    bmiText = "есть запас для снижения веса";
  } else {
    bmiText = "лучше начинать аккуратно и постепенно";
  }

  let focusText = "";

  if (goal === "fat") {
    focusText = "Начните с силовых тренировок 3 раза в неделю, шаговой активности и мягкого контроля питания.";
  }

  if (goal === "muscle") {
    focusText = "Сделайте фокус на прогрессии нагрузки, технике упражнений и достаточном питании.";
  }

  if (goal === "strength") {
    focusText = "Начните с базовых движений, техники и постепенного увеличения рабочих весов.";
  }

  if (goal === "shape") {
    focusText = "Оптимальный старт — регулярные тренировки, мобилити, базовая силовая нагрузка и режим.";
  }

  let workoutText = "";

  if (workouts <= 2) {
    workoutText = "Для старта подойдёт мягкий режим, но прогресс может идти медленнее.";
  } else if (workouts <= 4) {
    workoutText = "Хорошая частота для стабильного прогресса.";
  } else {
    workoutText = "Высокая частота. Важно следить за восстановлением.";
  }

  calculatorResult.innerHTML = `
    <h3>Ваш стартовый ориентир</h3>
    <p>Индекс массы тела:</p>
    <p class="highlight">${roundedBmi}</p>
    <p>${bmiText}.</p>
    <p>${workoutText}</p>
    <p>${focusText}</p>
  `;
});

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("clientName").value.trim();
  const phone = document.getElementById("clientPhone").value.trim();
  const goal = document.getElementById("clientGoal").value;

  if (!name || !phone || !goal) {
    formMessage.textContent = "Заполните имя, телефон и цель.";
    return;
  }

  formMessage.textContent = "Заявка подготовлена. Для реального сайта можно подключить отправку в Telegram.";

  contactForm.reset();
});

function formatPrice(price) {
  return new Intl.NumberFormat("ru-RU").format(Number(price));
}
