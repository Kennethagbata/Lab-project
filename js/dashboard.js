document.addEventListener("DOMContentLoaded", function () {
  const quizListContainer = document.getElementById("quiz-list");
  const noQuizzesMessage = document.getElementById("no-quizzes");
  const createQuizButton = document.getElementById("create-quiz-btn");
  const logOutButton = document.getElementById("btn-logout");

  // Fetch user info from sessionStorage
  const user = JSON.parse(sessionStorage.getItem("user"));
  const token = sessionStorage.getItem("token");

  if (!user || !token) {
    alert("Unauthorized access! Please sign in.");
    window.location.href = "signin.html";
    return;
  }

  // Show "Create Quiz" button if user is a Creator
  if (user.role === "creator") {
    createQuizButton.style.display = "block";
  }

  // Fetch quizzes from API
  function fetchQuizzes() {
    fetch("https://quiz-app-pg8t.onrender.com/quiz", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch quizzes.");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        quizListContainer.innerHTML = "";

        if (!Array.isArray(data) || data.length === 0) {
          console.log("no quiz data found");
          noQuizzesMessage.innerText = "No quizzes available at this time.";
          noQuizzesMessage.style.display = "block";
          return;
        }

        //noQuizzesMessage.style.display = "none"; // Hide message if quizzes exist

        data.forEach((quiz) => {
          const quizItem = document.createElement("div");
          quizItem.classList.add("quiz-item");
          quizItem.innerHTML = `<strong>${quiz.title}</strong> - ${quiz.description}`;
          quizItem.addEventListener("click", () => takeQuiz(quiz.id));
          quizListContainer.appendChild(quizItem);
        });
      })
      .catch((error) => {
        console.error("Error fetching quizzes:", error);
        noQuizzesMessage.innerText = "Failed to load quizzes.";
        noQuizzesMessage.style.display = "block";
      });
  }

  function takeQuiz(quizId) {
    window.location.href = `take-quiz.html?quizId=${quizId}`;
  }

  function goToCreateQuiz() {
    window.location.href = "pageOne.html";
  }

  function logout() {
    sessionStorage.clear();
    alert("Logged out successfully.");
    window.location.href = "signin.html";
  }

  createQuizButton.addEventListener("click", goToCreateQuiz);
  logOutButton.addEventListener("click", logout);

  fetchQuizzes();
});
