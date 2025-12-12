import { useState } from 'react';
import { Plus, Search, FileText, Trash2, Edit2, Save, X, Book, Tag, Star } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  subject: string;
  tags: string[];
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Теорема Пифагора',
      content: 'В прямоугольном треугольнике квадрат гипотенузы равен сумме квадратов катетов. a² + b² = c²',
      subject: 'Математика',
      tags: ['геометрия', 'треугольники'],
      isFavorite: true,
      createdAt: new Date('2025-12-10'),
      updatedAt: new Date('2025-12-10'),
    },
    {
      id: '2',
      title: 'Законы Ньютона',
      content: '1. Закон инерции: Тело сохраняет состояние покоя или равномерного прямолинейного движения.\\n2. F = ma\\n3. Действие равно противодействию',
      subject: 'Физика',
      tags: ['механика', 'законы'],
      isFavorite: false,
      createdAt: new Date('2025-12-09'),
      updatedAt: new Date('2025-12-11'),
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [isCreating, setIsCreating] = useState(false);
  const [editingNote, setEditingNote] = useState<string | null>(null);

  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    subject: 'Математика',
    tags: '',
  });

  const subjects = ['all', 'Математика', 'Физика', 'Химия', 'Биология', 'История', 'Литература', 'Информатика'];

  const createNote = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) return;

    const note: Note = {
      id: Date.now().toString(),
      title: newNote.title,
      content: newNote.content,
      subject: newNote.subject,
      tags: newNote.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      isFavorite: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setNotes([note, ...notes]);
    setNewNote({ title: '', content: '', subject: 'Математика', tags: '' });
    setIsCreating(false);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const toggleFavorite = (id: string) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
    ));
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSubject = selectedSubject === 'all' || note.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-gray-900 mb-2">Заметки и Конспекты</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Создавай и организуй свои учебные материалы для быстрого доступа
        </p>
      </div>

      {/* Search and Controls */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск заметок..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={() => setIsCreating(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Создать заметку
          </button>
        </div>

        {/* Subject Filter */}
        <div className="flex flex-wrap gap-2">
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

      {/* Create Note Modal */}
      {isCreating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-gray-900">Новая заметка</h2>
              <button
                onClick={() => setIsCreating(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Название</label>
                <input
                  type="text"
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  placeholder="Введите название..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Предмет</label>
                <select
                  value={newNote.subject}
                  onChange={(e) => setNewNote({ ...newNote, subject: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {subjects.filter(s => s !== 'all').map((subject) => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Содержание</label>
                <textarea
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  placeholder="Введите текст заметки..."
                  rows={10}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Теги (через запятую)</label>
                <input
                  type="text"
                  value={newNote.tags}
                  onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
                  placeholder="теория, формулы, примеры"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={createNote}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Сохранить
                </button>
                <button
                  onClick={() => setIsCreating(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Отмена
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notes Grid */}
      {filteredNotes.length === 0 ? (
        <div className="text-center py-16">
          <Book className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Заметки не найдены. Создайте свою первую заметку!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 group relative"
            >
              <button
                onClick={() => toggleFavorite(note.id)}
                className="absolute top-4 right-4"
              >
                <Star
                  className={`w-5 h-5 transition-colors ${
                    note.isFavorite
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300 hover:text-yellow-400'
                  }`}
                />
              </button>

              <div className="mb-4">
                <h3 className="text-gray-900 mb-2 pr-8">{note.title}</h3>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {note.subject}
                </span>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-4 whitespace-pre-wrap">
                {note.content}
              </p>

              {note.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {note.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-md text-xs"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t">
                <span className="text-gray-500 text-sm">
                  {note.updatedAt.toLocaleDateString('ru-RU')}
                </span>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Statistics */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
          <FileText className="w-8 h-8 mb-3 opacity-80" />
          <div className="mb-1">{notes.length}</div>
          <p className="text-sm text-blue-100">Всего заметок</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
          <Star className="w-8 h-8 mb-3 opacity-80" />
          <div className="mb-1">{notes.filter(n => n.isFavorite).length}</div>
          <p className="text-sm text-purple-100">Избранные</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 text-white">
          <Book className="w-8 h-8 mb-3 opacity-80" />
          <div className="mb-1">{subjects.filter(s => s !== 'all').length}</div>
          <p className="text-sm text-green-100">Предметов</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 text-white">
          <Tag className="w-8 h-8 mb-3 opacity-80" />
          <div className="mb-1">
            {Array.from(new Set(notes.flatMap(n => n.tags))).length}
          </div>
          <p className="text-sm text-orange-100">Уникальных тегов</p>
        </div>
      </div>
    </div>
  );
}
