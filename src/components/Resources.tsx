import { useState } from 'react';
import { BookOpen, ExternalLink, Search, Star, Download, Video } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  subject: string;
  type: 'documentation' | 'video' | 'tutorial' | 'tool';
  description: string;
  url: string;
  rating: number;
}

export function Resources() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const subjects = [
    { id: 'all', name: 'Все предметы', icon: '📚' },
    { id: 'math', name: 'Математика', icon: '🔢' },
    { id: 'physics', name: 'Физика', icon: '⚡' },
    { id: 'chemistry', name: 'Химия', icon: '🧪' },
    { id: 'biology', name: 'Биология', icon: '🧬' },
    { id: 'cs', name: 'Информатика', icon: '💻' },
    { id: 'languages', name: 'Языки', icon: '🌍' },
    { id: 'history', name: 'История', icon: '📜' },
    { id: 'literature', name: 'Литература', icon: '📖' },
  ];

  const resources: Resource[] = [
    {
      id: '1',
      title: 'Khan Academy - Математика',
      subject: 'math',
      type: 'video',
      description: 'Бесплатные видеоуроки по всем разделам математики от базового до продвинутого уровня.',
      url: 'https://www.khanacademy.org/math',
      rating: 5,
    },
    {
      id: '2',
      title: 'MDN Web Docs',
      subject: 'cs',
      type: 'documentation',
      description: 'Полная документация по веб-разработке, HTML, CSS, JavaScript и другим технологиям.',
      url: 'https://developer.mozilla.org/',
      rating: 5,
    },
    {
      id: '3',
      title: 'PhET Interactive Simulations',
      subject: 'physics',
      type: 'tool',
      description: 'Интерактивные симуляции по физике, химии и математике для лучшего понимания концепций.',
      url: 'https://phet.colorado.edu/',
      rating: 5,
    },
    {
      id: '4',
      title: 'Duolingo',
      subject: 'languages',
      type: 'tool',
      description: 'Интерактивное изучение иностранных языков через игровой подход.',
      url: 'https://www.duolingo.com/',
      rating: 4,
    },
    {
      id: '5',
      title: 'Crash Course',
      subject: 'all',
      type: 'video',
      description: 'Быстрые и увлекательные видеокурсы по всем школьным предметам.',
      url: 'https://www.youtube.com/user/crashcourse',
      rating: 5,
    },
    {
      id: '6',
      title: 'Periodic Table - PubChem',
      subject: 'chemistry',
      type: 'documentation',
      description: 'Интерактивная таблица Менделеева с подробной информацией о каждом элементе.',
      url: 'https://pubchem.ncbi.nlm.nih.gov/periodic-table/',
      rating: 5,
    },
    {
      id: '7',
      title: 'Codecademy',
      subject: 'cs',
      type: 'tutorial',
      description: 'Интерактивные курсы программирования для начинающих и продвинутых.',
      url: 'https://www.codecademy.com/',
      rating: 4,
    },
    {
      id: '8',
      title: 'Wolfram Alpha',
      subject: 'math',
      type: 'tool',
      description: 'Вычислительный движок для решения математических задач и получения пошаговых решений.',
      url: 'https://www.wolframalpha.com/',
      rating: 5,
    },
    {
      id: '9',
      title: 'Biology Online',
      subject: 'biology',
      type: 'documentation',
      description: 'Обширная база знаний по биологии с понятными объяснениями.',
      url: 'https://www.biologyonline.com/',
      rating: 4,
    },
    {
      id: '10',
      title: 'SparkNotes Literature',
      subject: 'literature',
      type: 'documentation',
      description: 'Подробные анализы и краткие содержания классических литературных произведений.',
      url: 'https://www.sparknotes.com/lit/',
      rating: 4,
    },
    {
      id: '11',
      title: 'History.com',
      subject: 'history',
      type: 'documentation',
      description: 'Статьи, видео и интерактивные материалы по мировой истории.',
      url: 'https://www.history.com/',
      rating: 4,
    },
    {
      id: '12',
      title: 'Brilliant.org',
      subject: 'all',
      type: 'tutorial',
      description: 'Интерактивные задачи и курсы по математике, науке и компьютерным наукам.',
      url: 'https://brilliant.org/',
      rating: 5,
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'documentation':
        return <BookOpen className="w-4 h-4" />;
      case 'tutorial':
        return <Star className="w-4 h-4" />;
      case 'tool':
        return <Download className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'video':
        return 'Видео';
      case 'documentation':
        return 'Документация';
      case 'tutorial':
        return 'Обучение';
      case 'tool':
        return 'Инструмент';
      default:
        return type;
    }
  };

  const filteredResources = resources.filter((resource) => {
    const matchesSubject =
      selectedSubject === 'all' || resource.subject === selectedSubject || resource.subject === 'all';
    const matchesSearch =
      searchQuery === '' ||
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-gray-900">Образовательные ресурсы</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Полезные ссылки на документацию, обучающие материалы и инструменты по всем предметам
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск ресурсов..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Subject Filter */}
      <div className="flex flex-wrap gap-2">
        {subjects.map((subject) => (
          <button
            key={subject.id}
            onClick={() => setSelectedSubject(subject.id)}
            className={`px-4 py-2 rounded-full transition-all ${
              selectedSubject === subject.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
            }`}
          >
            <span className="mr-2">{subject.icon}</span>
            {subject.name}
          </button>
        ))}
      </div>

      {/* Resources Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <a
            key={resource.id}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                {getTypeIcon(resource.type)}
                {getTypeName(resource.type)}
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>

            <h3 className="text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {resource.title}
            </h3>

            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {resource.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-md text-xs">
                  {subjects.find((s) => s.id === resource.subject)?.icon}{' '}
                  {subjects.find((s) => s.id === resource.subject)?.name}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: resource.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Ресурсы не найдены. Попробуйте изменить фильтры.</p>
        </div>
      )}

      {/* Tips Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
          <h3 className="text-gray-900 mb-3">💡 Как эффективно использовать ресурсы</h3>
          <ul className="text-gray-700 space-y-2 text-sm">
            <li>• Начинай с документации для понимания основ</li>
            <li>• Смотри видеоуроки для визуального восприятия</li>
            <li>• Практикуйся с интерактивными инструментами</li>
            <li>• Проходи туториалы для закрепления знаний</li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
          <h3 className="text-gray-900 mb-3">⭐ Популярные категории</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="text-2xl mb-1">🔢</div>
              <div className="text-gray-700 text-sm">Математика</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="text-2xl mb-1">💻</div>
              <div className="text-gray-700 text-sm">Программирование</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="text-2xl mb-1">⚡</div>
              <div className="text-gray-700 text-sm">Физика</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="text-2xl mb-1">🌍</div>
              <div className="text-gray-700 text-sm">Языки</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
