 /* مصفوفة  */
window.onload = () => {
  username = localStorage.getItem("currentPlayer") || "playername";
  loadQuestion();  
};

 const questions = [
      {
        question: "what is tag for used image in html ",/* السوئال */
        options: ["<image>", "<alt> ", "<title>", "<img>"], /* الخيارات */
        correct: "<img>", /* الاجابة الصحيحة */
      },

      {
        question: " what method is used to send data to the server in HTML forms?",
        options: ["GET", "POST", "PUT", "DELETE"],
        correct: "POST", /* الاجابة الصحيحة */
      },
    

      {
        question: "what would be the correct way to link an external CSS file in HTML?",
        options: ["<style>", "<link rel='stylesheet'>", "<css>", "<script>"],
        correct: "<link rel='stylesheet'>",

      },

      {
        question: " to create a hyperlink in HTML, which tag is used?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        correct: "<a>", 

      
      },
      {
        question: " css selector is used to select all elements of a specific type?",
        options: ["*", "class", "id", "type"],
        correct: "*", 
      
      },
     

    ];

    let currentQuestion = 0;    /* حفظ رقم السؤال الحالي (يبدأ من السؤال الأول */

    let score = 0;    /* حفظ نتيجة اللاعب */

    let selectedAnswer = null; /* حفظ الخيار الذي اختاره المستخدم */

    

    /*idباستخدام  HTMLعناصر من الـ     */
    const questionText = document.getElementById("question-text");
    const optionsDiv = document.getElementById("options");
    const form = document.getElementById("quiz-form");
    const completionMessage = document.getElementById("completion-message");
    const newPlayerBtn = document.getElementById("new-player-btn");

    /* لتحميل السؤال الحالي على الصفحة. */
    function loadQuestion() {

      const q = questions[currentQuestion]; /* ستخراج السؤال الحالي من المصفوفة */

      selectedAnswer = null; /* عادة تعيين الإجابة المحددة حتى لا تُحتسب الإجابة السابقة */

      questionText.textContent = q.question; /* عرض نص السؤال في العنصر المخصص له على الصفحة*/
      
      optionsDiv.innerHTML = ""; /* تفريغ الخيارات القديمة من الواجهة قبل عرض الخيارات الجديدة*/

      q.options.forEach((opt) => { /* تكرار على كل خيار في السؤال الحالي */

        const div = document.createElement("div"); /* انشاء عناصر*/

        div.className = "option"; /*  div صنف option إعطاء العنصر */

        div.textContent = opt; /*  بين الاجوبة جوا البوكسات تبعها وقت تتهير   */

        /* وقت  تكبس  عالخيار 

بينشال التحديد على كل الخيارات التانية

selectedAnswerحفظ هذا الخيار في  */
        div.onclick = () => {
          document.querySelectorAll(".option").forEach((el) => el.classList.remove("selected"));
          div.classList.add("selected");
          selectedAnswer = opt;
        };

        optionsDiv.appendChild(div); /*  div ضافة العنصر لل*/
      });
    }
/* وقت ترسل النموذج   ما بتنعاد تتحمل الصفحة)*/
    form.onsubmit = (e) => {
      e.preventDefault();
/* إذا ما اختار المستخدم إجابة     مابروح عالسئال البعدو. */
      if (!selectedAnswer) return;

      if (selectedAnswer === questions[currentQuestion].correct) {
        score =score+1;
      }
/*   السؤال البعدو */
      currentQuestion++;

      /* إذا في  سؤال تاني  حمله */
      if (currentQuestion < questions.length) {
        loadQuestion();
      }
      /* عند انتهاء جميع الأسئلة:
localStorageيتم جلب النتائج القديمة من بنضيف نتيجة اللاعب الحالي إلى النتائج
نحفظ النتائج في 
 عرض رسالة الانتهاء*/
       else {
        let results = JSON.parse(localStorage.getItem("quizResults") || "[]");
        results.push({ name: username, score : score, time: Date.now() - localStorage.getItem("startTime") });
        results.sort((a, b) => b.score - a.score || a.time - b.time); /* ترتيب النتائج حسب النقاط ثم الوقت */
        if (results.length > 10) results = results.slice(0, 10); /* الاحتفاظ بأفضل 10 نتائج فقط */
        localStorage.setItem("currentPlayer", ""); /* مسح اسم اللاعب الحالي */
        localStorage.setItem("startTime", ""); /* مسح وقت بدء اللعبة */
        localStorage.setItem("currentQuestion", 0); /* إعادة تعيين السؤال الحالي */
        localStorage.setItem("score", 0); /* إعادة تعيين النتيجة */
        localStorage.setItem("currentPlayer", username); /* حفظ اسم اللاعب الحالي */
     
        localStorage.setItem("quizResults", JSON.stringify(results));
           
        form.style.display = "none";
        completionMessage.style.display = "block";
         
      }
   
    };
/* لاعب جديد */
    newPlayerBtn.onclick = () => {
      window.location.href = "index.html";
    };
/*  تحميل أول سؤال مباشرة عند فتح الصفحة */
    loadQuestion();

       function startGame(event) {
  event.preventDefault(); 

  const playerNameInput = document.getElementById("playername");
  const playerName = playerNameInput.value.trim();

  if (playerName) {
    localStorage.setItem("currentPlayer", playerName); 
     localStorage.setItem("startTime", Date.now());
    
        
    window.location.href = "questions.html"; 
  }
}
