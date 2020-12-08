const store = {
    // 5 or more questions are required
    questions: [
      {
        question: 'How many bones are in the human body?',
        answers: [
          '204',
          '205',
          '206',
          '207'
        ],
        correctAnswer: '206'
      },
      {
        question: 'What is inside of bones?',
        answers: [
          'Bone marrow',
          'Petroleum Jelly',
          'Lava',
          'Milk'
        ],
        correctAnswer: 'Bone marrow'
      },
      {
        question: 'What is the most common broken bone?',
        answers: [
          'Clavicle',
          'Foot',
          'Femur',
          'Skull'
        ],
        correctAnswer: 'Clavicle'
      },
      {
        question: 'How many bones are in the hand?',
        answers: [
          '25',
          '26',
          '27',
          '28'
        ],
        correctAnswer: '27'
      },
      {
        question: 'What is the name of the upper arm bone?',
        answers: [
          'Ulna',
          'Radius',
          'Diameter',
          'Humerus'
        ],
        correctAnswer: 'Humerus'
      }
    ],
    quizStarted: false,
    questionNumber: 0,
    score: 0
  };