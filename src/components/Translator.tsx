import { useState } from 'react';
import { ArrowLeftRight, Copy, Volume2, BookOpen } from 'lucide-react';

interface Translation {
  text: string;
  from: string;
  to: string;
}

export function Translator() {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('ru');
  const [history, setHistory] = useState<Translation[]>([]);

  const languages = [
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  ];

  const commonPhrases = [
    { en: 'Hello', ru: 'Привет' },
    { en: 'Thank you', ru: 'Спасибо' },
    { en: 'How are you?', ru: 'Как дела?' },
    { en: 'Good morning', ru: 'Доброе утро' },
    { en: 'Goodbye', ru: 'До свидания' },
  ];

  // Mock translation function (in real app, you would use an API)
  const mockTranslations: Record<string, Record<string, string>> = {
    'hello': { ru: 'привет', es: 'hola', fr: 'bonjour', de: 'hallo' },
    'thank you': { ru: 'спасибо', es: 'gracias', fr: 'merci', de: 'danke' },
    'how are you': { ru: 'как дела', es: '¿cómo estás?', fr: 'comment allez-vous', de: 'wie geht es dir' },
    'good morning': { ru: 'доброе утро', es: 'buenos días', fr: 'bonjour', de: 'guten morgen' },
    'goodbye': { ru: 'до свидания', es: 'adiós', fr: 'au revoir', de: 'auf wiedersehen' },
    'привет': { en: 'hello', es: 'hola', fr: 'bonjour', de: 'hallo' },
    'спасибо': { en: 'thank you', es: 'gracias', fr: 'merci', de: 'danke' },
  };

  const handleTranslate = () => {
    if (!sourceText.trim()) {
      setTranslatedText('');
      return;
    }

    // Mock translation
    const lowerText = sourceText.toLowerCase().trim();
    let translation = '';

    if (mockTranslations[lowerText] && mockTranslations[lowerText][targetLang]) {
      translation = mockTranslations[lowerText][targetLang];
    } else {
      // Simulate translation for demo purposes
      translation = `[Перевод на ${languages.find(l => l.code === targetLang)?.name}]: ${sourceText}`;
    }

    setTranslatedText(translation);

    // Add to history
    const newTranslation: Translation = {
      text: sourceText,
      from: sourceLang,
      to: targetLang,
    };
    setHistory((prev) => [newTranslation, ...prev].slice(0, 10));
  };

  const swapLanguages = () => {
    const tempLang = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(tempLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const speak = (text: string, lang: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-gray-900">Переводчик</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Переводи тексты на разные языки быстро и легко для выполнения домашних заданий
        </p>
      </div>

      {/* Main Translator */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Language Selector */}
        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
          <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>

          <button
            onClick={swapLanguages}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            title="Поменять языки местами"
          >
            <ArrowLeftRight className="w-5 h-5 text-gray-600" />
          </button>

          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* Translation Areas */}
        <div className="grid md:grid-cols-2">
          {/* Source Text */}
          <div className="p-6 border-r">
            <div className="flex items-center justify-between mb-3">
              <label className="text-gray-700">Исходный текст</label>
              <button
                onClick={() => speak(sourceText, sourceLang)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Прослушать"
              >
                <Volume2 className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <textarea
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder="Введите текст для перевода..."
              className="w-full h-48 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="mt-3 text-right text-gray-500 text-sm">
              {sourceText.length} символов
            </div>
          </div>

          {/* Translated Text */}
          <div className="p-6 bg-gray-50">
            <div className="flex items-center justify-between mb-3">
              <label className="text-gray-700">Перевод</label>
              <div className="flex gap-2">
                <button
                  onClick={() => speak(translatedText, targetLang)}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  title="Прослушать"
                >
                  <Volume2 className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={() => copyToClipboard(translatedText)}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  title="Скопировать"
                >
                  <Copy className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
            <div className="w-full h-48 p-4 bg-white border border-gray-300 rounded-lg overflow-y-auto">
              {translatedText || (
                <span className="text-gray-400">Перевод появится здесь...</span>
              )}
            </div>
          </div>
        </div>

        {/* Translate Button */}
        <div className="p-4 border-t bg-gray-50">
          <button
            onClick={handleTranslate}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Перевести
          </button>
        </div>
      </div>

      {/* Common Phrases */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-gray-900 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          Часто используемые фразы
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {commonPhrases.map((phrase, index) => (
            <button
              key={index}
              onClick={() => {
                setSourceText(phrase.en);
                setSourceLang('en');
                setTargetLang('ru');
              }}
              className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all text-left"
            >
              <div className="text-gray-900">{phrase.en}</div>
              <div className="text-gray-600 text-sm">{phrase.ru}</div>
            </button>
          ))}
        </div>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-gray-900 mb-4">История переводов</h3>
          <div className="space-y-3">
            {history.map((item, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
                  <span>
                    {languages.find((l) => l.code === item.from)?.flag}{' '}
                    {languages.find((l) => l.code === item.from)?.name}
                  </span>
                  <ArrowLeftRight className="w-3 h-3" />
                  <span>
                    {languages.find((l) => l.code === item.to)?.flag}{' '}
                    {languages.find((l) => l.code === item.to)?.name}
                  </span>
                </div>
                <p className="text-gray-800">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200">
        <h4 className="text-gray-900 mb-3">💡 Полезные советы:</h4>
        <ul className="text-gray-700 space-y-2">
          <li>• Используй переводчик для проверки текстов на иностранных языках</li>
          <li>• Сохраняй важные переводы для быстрого доступа</li>
          <li>
            • Проверяй перевод сложных предложений в нескольких источниках для точности
          </li>
          <li>• Используй функцию прослушивания для улучшения произношения</li>
        </ul>
      </div>
    </div>
  );
}
