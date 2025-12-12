import { useState } from 'react';
import { Clock, Tag, ExternalLink, TrendingUp } from 'lucide-react';

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
}

export function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Все новости' },
    { id: 'tech', label: 'Технологии' },
    { id: 'science', label: 'Наука' },
    { id: 'ai', label: 'Искусственный интеллект' },
    { id: 'space', label: 'Космос' },
    { id: 'physics', label: 'Физика' },
  ];

  const newsArticles: NewsArticle[] = [
    {
      id: '1',
      title: 'Прорыв в квантовых вычислениях: новый процессор от Google',
      summary: 'Компания Google представила квантовый процессор Willow, который способен решать задачи, недоступные классическим компьютерам. Это открытие может революционизировать области от криптографии до разработки лекарств.',
      category: 'tech',
      date: '2025-12-12',
      readTime: '5 мин',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb',
    },
    {
      id: '2',
      title: 'ИИ научился предсказывать структуру белков с невероятной точностью',
      summary: 'Новая версия AlphaFold от DeepMind достигла беспрецедентной точности в предсказании структуры белков. Это открытие ускорит разработку новых лекарств и понимание биологических процессов.',
      category: 'ai',
      date: '2025-12-11',
      readTime: '7 мин',
      image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31',
    },
    {
      id: '3',
      title: 'Телескоп Webb обнаружил признаки жизни на экзопланете',
      summary: 'Космический телескоп Джеймса Уэбба зафиксировал в атмосфере экзопланеты K2-18b молекулы, которые могут указывать на наличие биологической активности. Это открытие вызвало большой интерес научного сообщества.',
      category: 'space',
      date: '2025-12-10',
      readTime: '6 мин',
      image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9',
    },
    {
      id: '4',
      title: 'Революция в термоядерной энергетике: достигнут энергетический прирост',
      summary: 'Ученые из США впервые получили больше энергии от термоядерной реакции, чем было затрачено на ее запуск. Это историческое достижение приближает человечество к неограниченному источнику чистой энергии.',
      category: 'physics',
      date: '2025-12-09',
      readTime: '8 мин',
      image: 'https://images.unsplash.com/photo-1530981279185-9f5302a0a1f5',
    },
    {
      id: '5',
      title: 'Новый материал может заменить кремний в микрочипах',
      summary: 'Исследователи разработали новый двумерный материал на основе графена, который обладает уникальными электронными свойствами. Он может стать основой для создания более быстрых и энергоэффективных процессоров.',
      category: 'tech',
      date: '2025-12-08',
      readTime: '5 мин',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    },
    {
      id: '6',
      title: 'Открыта новая фундаментальная частица в CERN',
      summary: 'Большой адронный коллайдер зафиксировал сигналы, указывающие на существование новой элементарной частицы. Это открытие может изменить наше понимание Стандартной модели физики.',
      category: 'physics',
      date: '2025-12-07',
      readTime: '9 мин',
      image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa',
    },
  ];

  const filteredNews =
    selectedCategory === 'all'
      ? newsArticles
      : newsArticles.filter((article) => article.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
          <TrendingUp className="w-4 h-4 text-blue-600" />
          <span className="text-gray-700">Актуальные новости науки и технологий</span>
        </div>
        <h1 className="text-gray-900">Научные открытия и технологии</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Следи за последними достижениями в науке, технологиях и исследованиях
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full transition-all ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* News Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredNews.map((article) => (
          <article
            key={article.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
          >
            <div className="aspect-video overflow-hidden bg-gray-200">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  <Tag className="w-3 h-3" />
                  {categories.find((c) => c.id === article.category)?.label}
                </span>
                <span className="inline-flex items-center gap-1 text-gray-500 text-sm">
                  <Clock className="w-3 h-3" />
                  {article.readTime}
                </span>
              </div>

              <h3 className="text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {article.title}
              </h3>

              <p className="text-gray-600 mb-4 line-clamp-3">{article.summary}</p>

              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">
                  {new Date(article.date).toLocaleDateString('ru-RU', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <button className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
                  Читать далее
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Info Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
        <h3 className="mb-3">Хочешь быть в курсе последних открытий?</h3>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Новости обновляются ежедневно, чтобы ты всегда знал о самых важных достижениях 
          в науке и технологиях
        </p>
        <button className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
          Подписаться на обновления
        </button>
      </div>
    </div>
  );
}
