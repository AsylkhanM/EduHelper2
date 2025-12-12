import { Brain, Calculator, Newspaper, Languages, BookOpen, Sparkles, TrendingUp, Award, Calendar, FileText, GraduationCap, Zap, Users, Star, Trophy, Target } from 'lucide-react';

type Page = 'home' | 'ai' | 'calculator' | 'news' | 'translator' | 'resources' | 'notes' | 'schedule' | 'achievements' | 'dictionary' | 'quiz';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const features = [
    {
      id: 'ai' as Page,
      title: 'ИИ Помощник',
      description: 'Организуй свои задачи и планируй учёбу эффективно',
      icon: Brain,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      id: 'calculator' as Page,
      title: 'Умный Калькулятор',
      description: 'Решай задачи по математике, физике, информатике и географии',
      icon: Calculator,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'notes' as Page,
      title: 'Заметки и Конспекты',
      description: 'Создавай и организуй свои учебные материалы',
      icon: FileText,
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      id: 'schedule' as Page,
      title: 'Расписание',
      description: 'Планируй занятия и следи за своим временем',
      icon: Calendar,
      gradient: 'from-teal-500 to-green-500',
    },
    {
      id: 'quiz' as Page,
      title: 'Тесты и Квизы',
      description: 'Проверь свои знания интерактивными тестами',
      icon: GraduationCap,
      gradient: 'from-rose-500 to-red-500',
    },
    {
      id: 'news' as Page,
      title: 'Научные Новости',
      description: 'Следи за последними открытиями и технологиями',
      icon: Newspaper,
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      id: 'translator' as Page,
      title: 'Переводчик',
      description: 'Переводи тексты на разные языки быстро и легко',
      icon: Languages,
      gradient: 'from-orange-500 to-red-500',
    },
    {
      id: 'dictionary' as Page,
      title: 'Словарь терминов',
      description: 'Изучай термины и определения по всем предметам',
      icon: BookOpen,
      gradient: 'from-violet-500 to-purple-500',
    },
    {
      id: 'achievements' as Page,
      title: 'Достижения',
      description: 'Отслеживай прогресс и получай награды',
      icon: Trophy,
      gradient: 'from-yellow-500 to-amber-500',
    },
    {
      id: 'resources' as Page,
      title: 'Ресурсы',
      description: 'Полезные ссылки и материалы по всем предметам',
      icon: Target,
      gradient: 'from-indigo-500 to-blue-500',
    },
  ];

  const quickStats = [
    { icon: Zap, value: '10+', label: 'Инструментов', color: 'text-yellow-600' },
    { icon: Users, value: '1000+', label: 'Активных учеников', color: 'text-blue-600' },
    { icon: Star, value: '5/5', label: 'Рейтинг', color: 'text-purple-600' },
    { icon: Trophy, value: '50+', label: 'Достижений', color: 'text-green-600' },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-8 py-12 relative">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg mb-6 animate-bounce-slow">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            <span className="text-gray-700">Твой личный помощник в учёбе 🚀</span>
          </div>
          
          <h1 className="text-gray-900 max-w-4xl mx-auto bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Делай домашние задания легко и увлекательно
          </h1>
          
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            EduHelper — это комплексное приложение для студентов и школьников с инструментами, 
            которые помогут тебе учиться эффективнее и интереснее
          </p>

          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <button 
              onClick={() => onNavigate('ai')}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Начать обучение
            </button>
            <button 
              onClick={() => onNavigate('quiz')}
              className="px-8 py-4 bg-white text-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 border-2 border-gray-200"
            >
              Пройти тест
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all hover:-translate-y-1">
              <Icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
              <div className="text-gray-900 mb-1">{stat.value}</div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Features Grid */}
      <div>
        <div className="text-center mb-10">
          <h2 className="text-gray-900 mb-3">Все инструменты в одном месте</h2>
          <p className="text-gray-600">Выбери нужный инструмент и начни работать прямо сейчас</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <button
                key={feature.id}
                onClick={() => onNavigate(feature.id)}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-left relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
                
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
                
                <div className="mt-4 inline-flex items-center text-sm text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text group-hover:translate-x-2 transition-transform">
                  Перейти →
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-5"></div>
        <div className="relative z-10">
          <h2 className="text-center mb-12">Почему выбирают EduHelper?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="mb-2">Быстро и эффективно</h3>
              <p className="text-blue-100">Все инструменты работают мгновенно и помогают экономить время</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="mb-2">Геймификация</h3>
              <p className="text-purple-100">Зарабатывай достижения и соревнуйся с друзьями</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="mb-2">Отслеживай прогресс</h3>
              <p className="text-pink-100">Смотри свою статистику и улучшай результаты</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div>
        <h2 className="text-center text-gray-900 mb-10">Что говорят пользователи</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: 'Алексей', grade: '10 класс', text: 'EduHelper помог мне организовать учёбу и повысить оценки! Теперь делаю ДЗ в 2 раза быстрее.' },
            { name: 'Мария', grade: '1 курс', text: 'Калькулятор с формулами по физике просто спасение! Больше не нужно искать формулы в учебнике.' },
            { name: 'Дмитрий', grade: '9 класс', text: 'Тесты и достижения делают учёбу увлекательной. Соревнуюсь с друзьями, кто больше заработает баллов!' },
          ].map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
              <div>
                <div className="text-gray-900">{testimonial.name}</div>
                <div className="text-gray-500 text-sm">{testimonial.grade}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-white rounded-3xl p-12 shadow-2xl">
        <h2 className="text-gray-900 mb-4">Готов начать?</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Присоединяйся к тысячам учеников, которые уже улучшили свои оценки с EduHelper
        </p>
        <button 
          onClick={() => onNavigate('ai')}
          className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 text-lg"
        >
          Начать прямо сейчас 🚀
        </button>
      </div>
    </div>
  );
}