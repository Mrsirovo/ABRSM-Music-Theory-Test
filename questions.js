const questions = [
    {
      grade: 1,
      type: "multiple_choice",
      question_text: "以下哪个音符是四分音符？",
      question_image: "images/note1.png", // 图片路径
      options: ["A. ♩", "B. ♫", "C. ♬", "D. ♪"],
      correct_answer: "A",
    },
    {
      grade: 1,
      type: "true_false",
      question_text: "高音谱号又称为G谱号。",
      question_image: "images/clef1.png", // 图片路径
      correct_answer: true,
    },
    {
      grade: 2,
      type: "multiple_choice",
      question_text: "以下哪个调式是大调？",
      question_image: "images/scale1.png", // 图片路径
      options: ["A. C大调", "B. A小调", "C. D小调", "D. E小调"],
      correct_answer: "A",
    },
    {
      grade: 2,
      type: "true_false",
      question_text: "钢琴有88个键。",
      question_image: "images/piano1.png", // 图片路径
      correct_answer: true,
    },
    // 添加更多题目...
  ];