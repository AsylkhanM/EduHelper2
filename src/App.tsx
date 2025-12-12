import { useState } from 'react';
import { Home, Brain, Calculator, Newspaper, Languages, BookOpen, FileText, Calendar, Trophy, Book, GraduationCap } from 'lucide-react';
import { HomePage } from './components/HomePage';
import { AIAssistant } from './components/AIAssistant';
import { AdvancedCalculator } from './components/AdvancedCalculator';
import { NewsPage } from './components/NewsPage';
import { Translator } from './components/Translator';
import { Resources } from './components/Resources';
import { NotesPage } from './components/NotesPage';
import { SchedulePage } from './components/SchedulePage';
import { AchievementsPage } from './components/AchievementsPage';
import { DictionaryPage } from './components/DictionaryPage';
import { QuizPage } from './components/QuizPage';

type Page = 'home' | 'ai' | 'calculator' | 'news' | 'translator' | 'resources' | 'notes' | 'schedule' | 'achievements' | 'dictionary' | 'quiz';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigation = [
    { id: 'home' as Page, label: 'Главная', icon: Home },
    { id: 'ai' as Page, label: 'ИИ Помощник', icon: Brain },
    { id: 'notes' as Page, label: 'Заметки', icon: FileText },
    { id: 'calculator' as Page, label: 'Калькулятор', icon: Calculator },
    { id: 'schedule' as Page, label: 'Расписание', icon: Calendar },
    { id: 'quiz' as Page, label: 'Тесты', icon: GraduationCap },
    { id: 'dictionary' as Page, label: 'Словарь', icon: Book },
    { id: 'news' as Page, label: 'Новости', icon: Newspaper },
    { id: 'translator' as Page, label: 'Переводчик', icon: Languages },
    { id: 'achievements' as Page, label: 'Достижения', icon: Trophy },
    { id: 'resources' as Page, label: 'Ресурсы', icon: BookOpen },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'ai':
        return <AIAssistant />;
      case 'calculator':
        return <AdvancedCalculator />;
      case 'news':
        return <NewsPage />;
      case 'translator':
        return <Translator />;
      case 'resources':
        return <Resources />;
      case 'notes':
        return <NotesPage />;
      case 'schedule':
        return <SchedulePage />;
      case 'achievements':
        return <AchievementsPage />;
      case 'dictionary':
        return <DictionaryPage />;
      case 'quiz':
        return <QuizPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={() => setCurrentPage('home')}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-gray-900">EduHelper</span>
            </button>
            
            <div className="hidden lg:flex gap-1">
              {navigation.slice(0, 6).map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                      currentPage === item.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                );
              })}
              
              {/* Dropdown for More */}
              <div className="relative group">
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all">
                  <span className="text-sm">Ещё</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  {navigation.slice(6).map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setCurrentPage(item.id)}
                        className={`w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-50 transition-all first:rounded-t-xl last:rounded-b-xl ${
                          currentPage === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          <div className="lg:hidden flex gap-1 overflow-x-auto pb-2 scrollbar-hide">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all whitespace-nowrap flex-shrink-0 ${
                    currentPage === item.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {renderPage()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p>© 2025 EduHelper. Делай домашние задания легко и увлекательно 🚀</p>
          </div>
        </div>
      </footer>
    </div>
  );
}