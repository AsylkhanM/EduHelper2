import { useState } from 'react';
import { Send, Bot, User, Plus, CheckCircle2, Circle, Trash2, Calendar, Tag } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  subject: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  completed: boolean;
  steps: string[];
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export function AIAssistant() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Решить задачи по алгебре',
      subject: 'Математика',
      priority: 'high',
      dueDate: '2025-12-15',
      completed: false,
      steps: [
        'Открыть учебник на странице 45',
        'Решить задачи №12-18',
        'Проверить ответы в конце учебника',
        'Записать решения в тетрадь',
      ],
    },
    {
      id: '2',
      title: 'Написать эссе по литературе',
      subject: 'Литература',
      priority: 'medium',
      dueDate: '2025-12-18',
      completed: false,
      steps: [
        'Прочитать произведение',
        'Составить план эссе',
        'Написать черновик',
        'Отредактировать и переписать начисто',
      ],
    },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Привет! Я твой ИИ помощник. Помогу тебе организовать задачи и распланировать учёбу. Расскажи, что тебе нужно сделать?',
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskSubject, setNewTaskSubject] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        'Отличная задача! Я могу помочь разбить её на маленькие шаги. Давай начнём с определения главных этапов.',
        'Понял! Рекомендую начать с самого сложного, когда у тебя максимум энергии. Создать задачу?',
        'Хорошо! Это задание займёт примерно 2-3 часа. Предлагаю выделить время завтра после обеда.',
        'Отлично! Давай я помогу тебе составить план выполнения. Какой у тебя дедлайн?',
      ];

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
      };

      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);

    setInputMessage('');
  };

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      subject: newTaskSubject || 'Общее',
      priority: 'medium',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      completed: false,
      steps: [],
    };

    setTasks((prev) => [...prev, newTask]);
    setNewTaskTitle('');
    setNewTaskSubject('');
  };

  const toggleTaskComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* AI Chat Section */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-[calc(100vh-12rem)]">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4 text-white">
          <div className="flex items-center gap-3">
            <Bot className="w-6 h-6" />
            <div>
              <h2>ИИ Помощник</h2>
              <p className="text-purple-100 text-sm">Всегда готов помочь</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.role === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === 'assistant'
                    ? 'bg-purple-100 text-purple-600'
                    : 'bg-blue-100 text-blue-600'
                }`}
              >
                {message.role === 'assistant' ? (
                  <Bot className="w-5 h-5" />
                ) : (
                  <User className="w-5 h-5" />
                )}
              </div>
              <div
                className={`px-4 py-3 rounded-2xl max-w-[80%] ${
                  message.role === 'assistant'
                    ? 'bg-gray-100 text-gray-800'
                    : 'bg-blue-600 text-white'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Напиши своё задание..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleSendMessage}
              className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Task Management Section */}
      <div className="space-y-6">
        {/* Add Task Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-gray-900 mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-blue-600" />
            Добавить новую задачу
          </h3>
          <div className="space-y-3">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Название задачи"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={newTaskSubject}
              onChange={(e) => setNewTaskSubject(e.target.value)}
              placeholder="Предмет"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddTask}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Добавить задачу
            </button>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          <h3 className="text-gray-900">Мои задачи</h3>
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`bg-white rounded-xl shadow-md p-5 transition-all ${
                task.completed ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => toggleTaskComplete(task.id)}
                  className="mt-1 flex-shrink-0"
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-400 hover:text-blue-600" />
                  )}
                </button>

                <div className="flex-1">
                  <h4
                    className={`text-gray-900 mb-2 ${
                      task.completed ? 'line-through' : ''
                    }`}
                  >
                    {task.title}
                  </h4>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-sm">
                      <Tag className="w-3 h-3" />
                      {task.subject}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-md text-sm ${getPriorityColor(
                        task.priority
                      )}`}
                    >
                      {task.priority === 'high'
                        ? 'Высокий приоритет'
                        : task.priority === 'medium'
                        ? 'Средний приоритет'
                        : 'Низкий приоритет'}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-md text-sm">
                      <Calendar className="w-3 h-3" />
                      {new Date(task.dueDate).toLocaleDateString('ru-RU')}
                    </span>
                  </div>

                  {task.steps.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-gray-600 text-sm">Шаги выполнения:</p>
                      <ul className="space-y-1">
                        {task.steps.map((step, index) => (
                          <li
                            key={index}
                            className="text-gray-700 text-sm flex items-start gap-2"
                          >
                            <span className="text-blue-600 mt-0.5">•</span>
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
