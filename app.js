console.log("主逻辑脚本开始执行");

let currentExam = {
  grade: null,
  questions: [],
  currentIndex: 0,
  score: 0,
};

// 初始化事件监听
function initEventListeners() {
  console.log("尝试绑定事件监听器...");
  const buttons = document.querySelectorAll(".grade-btn");
  console.log(`找到 ${buttons.length} 个按钮`);

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log(`点击等级按钮: ${btn.dataset.grade}`);
      initializeExam(btn.dataset.grade);
    });
  });
}

// 考试初始化
function initializeExam(grade) {
  console.log(`正在初始化等级 ${grade} 的考试...`);
  console.log("当前题库结构:", termLibraries);

  if (!termLibraries[grade]) {
    alert("题库不存在！请等待题库更新");
    console.error(`未找到等级 ${grade} 的题库`);
    return;
  }

  currentExam = {
    grade,
    questions: generateQuestions(grade),
    currentIndex: 0,
    score: 0,
  };

  console.log(`生成题目数量: ${currentExam.questions.length}`);

  document.querySelector(".start-screen").classList.remove("active");
  document.querySelector(".exam-screen").classList.add("active");
  document.getElementById("current-grade").textContent = `Grade ${grade} 考试`;
  showNextQuestion();
}

// 生成题目
function generateQuestions(grade) {
    const library = termLibraries[grade];
    const questions = [];
  
    // 获取文字题和图片题的数量
    const textTerms = library.textTerms || [];
    const imageTerms = library.imageTerms || [];
    const hasEnoughTextTerms = textTerms.length >= 4;
    const hasEnoughImageTerms = imageTerms.length >= 4;
  
    // 动态调整题目生成策略
    if (!hasEnoughTextTerms && !hasEnoughImageTerms) {
      console.error(`等级 ${grade} 的题库数据不足，无法生成题目`);
      return questions;
    }
  
    // 生成固定数量的题目（10 道）
    for (let i = 0; i < 10; i++) {
      let isImageQuestion;
  
      // 如果两种题型都足够，随机选择一种
      if (hasEnoughTextTerms && hasEnoughImageTerms) {
        isImageQuestion = Math.random() > 0.5;
      }
      // 如果只有一种题型足够，强制使用该题型
      else if (hasEnoughTextTerms) {
        isImageQuestion = false;
      } else {
        isImageQuestion = true;
      }
  
      const termCategory = isImageQuestion ? "imageTerms" : "textTerms";
      const terms = library[termCategory];
  
      // 随机选择一个正确答案
      const correctTerm = terms[Math.floor(Math.random() * terms.length)];
  
      // 生成选项（确保不重复）
      const options = generateOptions(correctTerm, terms);
  
      // 添加到题目列表
      questions.push({
        type: isImageQuestion ? "image" : "text",
        content: isImageQuestion
          ? { image: correctTerm.image }
          : { text: `“${correctTerm.term}”` },
        options: shuffleArray(options),
        correctAnswer: correctTerm.definition,
      });
    }
  
    return questions;
  }

// 显示题目
function showNextQuestion() {
  const question = currentExam.questions[currentExam.currentIndex];
  const container = document.getElementById("question-container");

  let contentHTML = question.type === "image"
    ? `<img src="${question.content.image}" alt="题目图片">`
    : `<p>${question.content.text}</p>`;

  const optionsHTML = question.options
    .map((opt) => `<button class="option-btn" onclick="checkAnswer('${opt}')">${opt}</button>`)
    .join("");

  container.innerHTML = `
    <div class="question">
      ${contentHTML}
      <div class="options">${optionsHTML}</div>
    </div>
  `;
}

// 检查答案
function checkAnswer(selected) {
    // 禁用所有选项按钮
    const optionButtons = document.querySelectorAll(".option-btn");
    optionButtons.forEach((button) => {
      button.disabled = true; // 禁用按钮
      button.style.opacity = "0.6"; // 降低按钮透明度
      button.style.cursor = "not-allowed"; // 更改鼠标样式
    });
  
    const question = currentExam.questions[currentExam.currentIndex];
    const isCorrect = selected === question.correctAnswer;
  
    if (isCorrect) currentExam.score++;
  
    RightOrFalse = showFeedback(isCorrect, question.correctAnswer);
    delay_time = 1000;

    if (RightOrFalse == false) {
        delay_time = 3000;
    }

    setTimeout(() => {
      currentExam.currentIndex++;
      if (currentExam.currentIndex < currentExam.questions.length) {
        showNextQuestion();
      } else {
        showFinalResult();
      }
    }, delay_time);
  }

// 显示反馈
function showFeedback(isCorrect, correctAnswer) {
  const feedback = document.createElement("div");
  feedback.className = `answer-feedback ${isCorrect ? "correct" : "incorrect"}`;
  feedback.innerHTML = isCorrect
    ? "🎉 回答正确！"
    : `❌ 回答错误！正确答案：${correctAnswer}`;

  document.getElementById("question-container").appendChild(feedback);
  return isCorrect
}

// 显示最终结果
function showFinalResult() {
  document.querySelector(".exam-screen").classList.remove("active");
  document.querySelector(".result-screen").classList.add("active");
  document.getElementById("result").textContent = `得分：${currentExam.score}/${currentExam.questions.length}`;
}

// 重新开始
function restart() {
    console.log("重新开始考试...");
  
    // 隐藏结果界面
    document.querySelector(".result-screen").classList.remove("active");
  
    // 显示初始界面
    document.querySelector(".start-screen").classList.add("active");
  
    // 重置考试状态
    currentExam = {
      grade: null,
      questions: [],
      currentIndex: 0,
      score: 0,
    };
  
    // 清空题目容器
    const questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = "";
  
    // 清空结果容器
    const resultContainer = document.getElementById("result");
    resultContainer.textContent = "";
  
    console.log("考试状态已重置，返回初始界面");
}

// 工具函数
function generateOptions(correctTerm, termPool) {
    const options = new Set([correctTerm.definition]); // 确保正确答案在选项中
  
    // 添加干扰项
    while (options.size < 4) {
      const randomTerm = termPool[Math.floor(Math.random() * termPool.length)];
      if (randomTerm.definition !== correctTerm.definition) {
        options.add(randomTerm.definition);
      }
    }
  
    return [...options];
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
// 初始化
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM加载完成");
  initEventListeners();
});