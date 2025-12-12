import { useState } from 'react';
import { Search, BookOpen, Filter } from 'lucide-react';

interface Term {
  id: string;
  term: string;
  definition: string;
  subject: string;
  example?: string;
}

export function DictionaryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const terms: Term[] = [
    {
      id: '1',
      term: 'Гипотенуза',
      definition: 'Самая длинная сторона прямоугольного треугольника, противолежащая прямому углу.',
      subject: 'Математика',
      example: 'В треугольнике ABC, где угол C = 90°, сторона AB является гипотенузой.',
    },
    {
      id: '2',
      term: 'Ускорение',
      definition: 'Векторная физическая величина, характеризующая быстроту изменения скорости тела.',
      subject: 'Физика',
      example: 'a = (v - v₀) / t, где v - конечная скорость, v₀ - начальная скорость, t - время.',
    },
    {
      id: '3',
      term: 'Катализатор',
      definition: 'Вещество, ускоряющее химическую реакцию, но само не расходующееся в процессе.',
      subject: 'Химия',
      example: 'Железо является катализатором в синтезе аммиака.',
    },
    {
      id: '4',
      term: 'Фотосинтез',
      definition: 'Процесс образования органических веществ из углекислого газа и воды на свету при участии фотосинтетических пигментов.',
      subject: 'Биология',
      example: '6CO₂ + 6H₂O + свет → C₆H₁₂O₆ + 6O₂',
    },
    {
      id: '5',
      term: 'Алгоритм',
      definition: 'Точное предписание, определяющее вычислительный процесс, ведущий от варьируемых начальных данных к искомому результату.',
      subject: 'Информатика',
      example: 'Алгоритм сортировки пузырьком упорядочивает элементы массива.',
    },
    {
      id: '6',
      term: 'Метафора',
      definition: 'Троп, перенос значения слова или выражения на основе сходства.',
      subject: 'Литература',
      example: '\"Золотая осень\" - метафора, где желтый цвет листьев сравнивается с золотом.',
    },
    {
      id: '7',
      term: 'Революция',
      definition: 'Коренное качественное изменение в развитии каких-либо явлений природы, общества или познания.',
      subject: 'История',
      example: 'Французская революция 1789 года изменила политическое устройство Франции.',
    },
    {
      id: '8',
      term: 'Экватор',
      definition: 'Воображаемая линия на поверхности Земли, проходящая на равном расстоянии от полюсов.',
      subject: 'География',
      example: 'Длина экватора составляет приблизительно 40,075 км.',
    },
  ];

  const subjects = ['all', 'Математика', 'Физика', 'Химия', 'Биология', 'Информатика', 'Литература', 'История', 'География'];

  const filteredTerms = terms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || term.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const subjectColors: Record<string, string> = {
    'Математика': 'bg-blue-100 text-blue-700',
    'Физика': 'bg-purple-100 text-purple-700',
    'Химия': 'bg-pink-100 text-pink-700',
    'Биология': 'bg-green-100 text-green-700',
    'Информатика': 'bg-cyan-100 text-cyan-700',
    'Литература': 'bg-amber-100 text-amber-700',
    'История': 'bg-orange-100 text-orange-700',
    'География': 'bg-teal-100 text-teal-700',
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-gray-900 mb-2">Словарь терминов</h1>
        <p className="text-gray-600">Изучай термины и определения по всем предметам</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск терминов..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-5 h-5 text-gray-500" />
          {subjects.map((subject) => (
            <button
              key={subject}
              onClick={() => setSelectedSubject(subject)}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedSubject === subject
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {subject === 'all' ? 'Все предметы' : subject}
            </button>
          ))}
        </div>
      </div>

      {/* Terms List */}
      {filteredTerms.length === 0 ? (
        <div className="text-center py-16">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Термины не найдены</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTerms.map((term) => (
            <div
              key={term.id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-gray-900">{term.term}</h3>
                <span className={`px-3 py-1 rounded-full text-sm ${subjectColors[term.subject]}`}>
                  {term.subject}
                </span>
              </div>

              <p className="text-gray-700 mb-4">{term.definition}</p>

              {term.example && (
                <div className="p-4 bg-blue-50 rounded-xl border-l-4 border-blue-500">
                  <div className="text-sm text-blue-600 mb-1">Пример:</div>
                  <p className="text-gray-700 text-sm">{term.example}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-lg">
          <div className="mb-2">{terms.length}</div>
          <p className="text-sm text-blue-100">Всего терминов</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg">
          <div className="mb-2">{subjects.length - 1}</div>
          <p className="text-sm text-purple-100">Предметов</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 text-white shadow-lg">
          <div className="mb-2">{filteredTerms.length}</div>
          <p className="text-sm text-green-100">Найдено</p>
        </div>
      </div>
    </div>
  );
}
