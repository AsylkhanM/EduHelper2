import { useState } from 'react';
import { GraduationCap, Trophy, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  subject: string;
}

export function QuizPage() {
  const [selectedSubject, setSelectedSubject] = useState('Математика');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);

  const quizzes: Record<string, Question[]> = {
    'Математика': [
      {
        id: '1',
        question: 'Чему равна сумма углов в треугольнике?',
        options: ['90°', '180°', '270°', '360°'],
        correctAnswer: 1,
        subject: 'Математика',
      },
      {
        id: '2',
        question: 'Что такое гипотенуза?',
        options: [
          'Сторона квадрата',
          'Самая длинная сторона прямоугольного треугольника',
          'Радиус окружности',
          'Диагональ квадрата',
        ],
        correctAnswer: 1,
        subject: 'Математика',
      },
      {
        id: '3',
        question: 'Чему равно число π (пи) приблизительно?',
        options: ['2.71', '3.14', '1.41', '2.54'],
        correctAnswer: 1,
        subject: 'Математика',
      },
    ],
    'Физика': [
      {
        id: '4',
        question: 'Какая формула описывает второй закон Ньютона?',
        options: ['E = mc²', 'F = ma', 'PV = nRT', 'v = s/t'],
        correctAnswer: 1,
        subject: 'Физика',
      },
      {
        id: '5',
        question: 'Что измеряется в Ньютонах?',
        options: ['Масса', 'Сила', 'Скорость', 'Энергия'],
        correctAnswer: 1,
        subject: 'Физика',
      },
    ],
    'Информатика': [
      {
        id: '6',
        question: 'Что такое алгоритм?',
        options: [
          'Программа на компьютере',
          'Последовательность действий для решения задачи',
          'Язык программирования',
          'База данных',
        ],
        correctAnswer: 1,
        subject: 'Информатика',
      },
      {
        id: '7',
        question: 'Сколько бит в одном байте?',
        options: ['4', '8', '16', '32'],
        correctAnswer: 1,
        subject: 'Информатика',
      },
    ],
  };

  const subjects = Object.keys(quizzes);
  const currentQuiz = quizzes[selectedSubject] || [];

  const handleAnswerClick = (answerIndex: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);
    const newAnswered = [...answeredQuestions];
    newAnswered[currentQuestion] = true;
    setAnsweredQuestions(newAnswered);

    if (answerIndex === currentQuiz[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < currentQuiz.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setAnsweredQuestions([]);
  };

  const changeSubject = (subject: string) => {
    setSelectedSubject(subject);
    restartQuiz();
  };

  const getButtonClass = (index: number) => {
    if (selectedAnswer === null) {
      return 'bg-white hover:bg-blue-50 text-gray-800 border-2 border-gray-200 hover:border-blue-400';
    }
    if (index === currentQuiz[currentQuestion].correctAnswer) {
      return 'bg-green-500 text-white border-2 border-green-600';
    }
    if (index === selectedAnswer) {
      return 'bg-red-500 text-white border-2 border-red-600';
    }
    return 'bg-gray-100 text-gray-600 border-2 border-gray-200';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-gray-900 mb-2">Тесты и Квизы</h1>
        <p className="text-gray-600">Проверь свои знания интерактивными тестами</p>
      </div>

      {/* Subject Selector */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-gray-900 mb-4">Выбери предмет:</h3>
        <div className="flex flex-wrap gap-3">
          {subjects.map((subject) => (
            <button
              key={subject}
              onClick={() => changeSubject(subject)}
              className={`px-6 py-3 rounded-xl transition-all ${
                selectedSubject === subject
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {subject}
            </button>
          ))}
        </div>
      </div>

      {!showResult ? (
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Вопрос {currentQuestion + 1} из {currentQuiz.length}</span>
              <span>Баллы: {score}/{currentQuiz.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentQuestion + 1) / currentQuiz.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h2 className="text-gray-900 mb-6">{currentQuiz[currentQuestion]?.question}</h2>

            <div className="space-y-3">
              {currentQuiz[currentQuestion]?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-4 rounded-xl transition-all text-left flex items-center gap-3 ${getButtonClass(
                    index
                  )}`}
                >
                  <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0">
                    {selectedAnswer !== null &&
                      index === currentQuiz[currentQuestion].correctAnswer && (
                        <CheckCircle className="w-5 h-5" />
                      )}
                    {selectedAnswer === index &&
                      index !== currentQuiz[currentQuestion].correctAnswer && (
                        <XCircle className="w-5 h-5" />
                      )}
                    {selectedAnswer === null && <span>{String.fromCharCode(65 + index)}</span>}
                  </div>
                  <span>{option}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="mb-6">
            {score === currentQuiz.length ? (
              <Trophy className="w-24 h-24 text-yellow-500 mx-auto mb-4" />
            ) : score >= currentQuiz.length * 0.7 ? (
              <GraduationCap className="w-24 h-24 text-blue-500 mx-auto mb-4" />
            ) : (
              <RefreshCw className="w-24 h-24 text-gray-400 mx-auto mb-4" />
            )}

            <h2 className="text-gray-900 mb-2">Тест завершён!</h2>
            <p className="text-gray-600">Твой результат:</p>
          </div>

          <div className="mb-8">
            <div className="text-gray-900 mb-2">
              {score} из {currentQuiz.length} правильных ответов
            </div>
            <div className="text-gray-600">
              {Math.round((score / currentQuiz.length) * 100)}% правильных ответов
            </div>

            <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
              {score === currentQuiz.length && (
                <p className="text-blue-700">🎉 Отлично! Ты ответил на все вопросы правильно!</p>
              )}
              {score >= currentQuiz.length * 0.7 && score < currentQuiz.length && (
                <p className="text-blue-700">👍 Хороший результат! Продолжай в том же духе!</p>
              )}
              {score < currentQuiz.length * 0.7 && (
                <p className="text-gray-700">
                  💪 Не расстраивайся! Попробуй ещё раз или повтори материал.
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={restartQuiz}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Пройти снова
            </button>
            <button
              onClick={() => {
                const nextSubject = subjects[(subjects.indexOf(selectedSubject) + 1) % subjects.length];
                changeSubject(nextSubject);
              }}
              className="px-8 py-3 bg-white text-gray-700 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all"
            >
              Другой предмет
            </button>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-lg">
          <div className="mb-2">{subjects.length}</div>
          <p className="text-sm text-blue-100">Доступно тестов</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg">
          <div className="mb-2">{currentQuiz.length}</div>
          <p className="text-sm text-purple-100">Вопросов в тесте</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 text-white shadow-lg">
          <div className="mb-2">{showResult ? score : '-'}/{currentQuiz.length}</div>
          <p className="text-sm text-green-100">Твой результат</p>
        </div>
      </div>
    </div>
  );
}
