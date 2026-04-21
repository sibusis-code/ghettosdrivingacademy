const chatToggle = document.getElementById("chatToggle");
const chatPanel = document.getElementById("chatPanel");
const closeChat = document.getElementById("closeChat");
const chatBody = document.getElementById("chatBody");
const chatForm = document.getElementById("chatForm");
const chatMessage = document.getElementById("chatMessage");
const quickButtons = document.querySelectorAll(".quick-btn");

const faq = [
  {
    keywords: ["learner", "learners", "package", "r1999"],
    answer: "The learners package is R1999.00 and includes booking fee, special material, and transportation."
  },
  {
    keywords: ["code 8", "light", "r4999"],
    answer: "Code 8 package is R4999.00. Pay-as-you-train options: 1 lesson R250, 5 lessons R900, 10 lessons R1900, and car hire R700."
  },
  {
    keywords: ["code 10", "truck", "r5499"],
    answer: "Code 10 package is R5499.00. Lessons: 1 lesson R250, 5 lessons R900, 10 lessons R1900, and truck hire R900."
  },
  {
    keywords: ["code 14", "heavy", "r8499"],
    answer: "Code 14 package is R8499.80. Lessons: 1 lesson R350, 5 lessons R1650, 10 lessons R3300, and truck hire R2500."
  },
  {
    keywords: ["contact", "call", "whatsapp", "phone", "number"],
    answer: "You can call or WhatsApp 079 555 4671 for bookings and enquiries."
  },
  {
    keywords: ["location", "where", "gauteng"],
    answer: "Ghettos Driving Academy serves clients in Gauteng Province."
  },
  {
    keywords: ["book", "booking"],
    answer: "Bookings are confirmed after payment. You can start now on WhatsApp: https://wa.me/27795554671"
  }
];

function toggleChat(show) {
  if (show) {
    chatPanel.hidden = false;
    chatToggle.setAttribute("aria-expanded", "true");
    chatMessage.focus();
    return;
  }
  chatPanel.hidden = true;
  chatToggle.setAttribute("aria-expanded", "false");
}

function appendMessage(text, role) {
  const message = document.createElement("div");
  message.className = role === "user" ? "user-msg" : "bot-msg";
  message.textContent = text;
  chatBody.appendChild(message);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function getBotResponse(input) {
  const normalized = input.toLowerCase().trim();

  const match = faq.find((entry) => entry.keywords.some((keyword) => normalized.includes(keyword)));

  if (match) {
    return match.answer;
  }

  return "I can help with package prices, services, and contact details. For detailed assistance, please WhatsApp 079 555 4671.";
}

chatToggle.addEventListener("click", () => {
  toggleChat(chatPanel.hidden);
});

closeChat.addEventListener("click", () => {
  toggleChat(false);
});

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = chatMessage.value.trim();
  if (!text) {
    return;
  }

  appendMessage(text, "user");
  chatMessage.value = "";

  window.setTimeout(() => {
    const answer = getBotResponse(text);
    appendMessage(answer, "bot");
  }, 280);
});

quickButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const question = button.dataset.question || "";
    appendMessage(question, "user");

    window.setTimeout(() => {
      appendMessage(getBotResponse(question), "bot");
    }, 220);
  });
});
