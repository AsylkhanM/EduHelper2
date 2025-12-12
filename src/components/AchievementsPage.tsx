import { Trophy, Star, Target, Zap, Award, Crown, Medal, Flame } from 'lucide-react';

export function AchievementsPage() {
  const achievements = [
    { id: '1', icon: Trophy, title: 'Первые шаги', description: 'Создана первая заметка', earned: true, color: 'from-yellow-500 to-amber-500' },
    { id: '2', icon: Star, title: 'Звезда математики', description: 'Решено 50 задач по математике', earned: true, color: 'from-blue-500 to-cyan-500' },
    { id: '3', icon: Flame, title: 'Неделя подряд', description: 'Используй приложение 7 дней подряд', earned: true, color: 'from-orange-500 to-red-500' },
    { id: '4', icon: Target, title: 'Меткий стрелок', description: 'Набери 100% на 10 тестах', earned: false, color: 'from-green-500 to-emerald-500' },
    { id: '5', icon: Medal, title: 'Полиглот', description: 'Переведи 100 текстов', earned: false, color: 'from-purple-500 to-pink-500' },
    { id: '6', icon: Crown, title: 'Король знаний', description: 'Заработай все достижения', earned: false, color: 'from-indigo-500 to-purple-500' },
  ];

  const stats = [
    { label: 'Заработано', value: '3/6', icon: Trophy, color: 'text-yellow-600' },
    { label: 'Баллы', value: '1,250', icon: Star, color: 'text-blue-600' },
    { label: 'Уровень', value: '12', icon: Zap, color: 'text-purple-600' },
    { label: 'Место в рейтинге', value: '#42', icon: Award, color: 'text-green-600' },
  ];

  const progress = {
    level: 12,
    currentXP: 750,
    nextLevelXP: 1000,
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-gray-900 mb-2">Достижения</h1>
        <p className="text-gray-600">Отслеживай свой прогресс и получай награды</p>
      </div>

      {/* Player Card */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-24 h-24 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
            <Crown className="w-12 h-12" />
          </div>
          <div>
            <h2 className="mb-2">Студент №1</h2>
            <p className="text-blue-100">Уровень {progress.level} • 1,250 XP</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Прогресс до уровня {progress.level + 1}</span>
            <span>{progress.currentXP} / {progress.nextLevelXP} XP</span>
          </div>
          <div className="w-full bg-white bg-opacity-20 rounded-full h-3 overflow-hidden">
            <div
              className="bg-white h-full rounded-full transition-all duration-500"
              style={{ width: `${(progress.currentXP / progress.nextLevelXP) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all hover:-translate-y-1">
              <Icon className={`w-10 h-10 mx-auto mb-3 ${stat.color}`} />
              <div className="text-gray-900 mb-1">{stat.value}</div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Achievements Grid */}
      <div>
        <h2 className="text-gray-900 mb-6">Твои достижения</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            return (
              <div
                key={achievement.id}
                className={`relative rounded-2xl p-6 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 ${
                  achievement.earned
                    ? 'bg-white border-2 border-transparent'
                    : 'bg-gray-100 opacity-60'
                }`}
              >
                {achievement.earned && (
                  <div className="absolute top-4 right-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                )}

                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${achievement.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-gray-900 mb-2">{achievement.title}</h3>
                <p className="text-gray-600 text-sm">{achievement.description}</p>

                {achievement.earned && (
                  <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    <Award className="w-4 h-4" />
                    Получено
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Leaderboard Preview */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-gray-900 mb-6">Топ-5 учеников</h2>
        <div className="space-y-4">
          {[
            { rank: 1, name: 'Анна К.', points: 2500, avatar: '👑' },
            { rank: 2, name: 'Максим П.', points: 2340, avatar: '🥈' },
            { rank: 3, name: 'София В.', points: 2100, avatar: '🥉' },
            { rank: 4, name: 'Дмитрий С.', points: 1890, avatar: '⭐' },
            { rank: 5, name: 'Мария Л.', points: 1750, avatar: '✨' },
          ].map((user) => (
            <div key={user.rank} className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white">
                {user.avatar}
              </div>
              <div className="flex-1">
                <div className="text-gray-900">#{user.rank} {user.name}</div>
                <div className="text-gray-500 text-sm">{user.points} XP</div>
              </div>
              {user.rank <= 3 && (
                <Medal className={`w-6 h-6 ${
                  user.rank === 1 ? 'text-yellow-500' :
                  user.rank === 2 ? 'text-gray-400' :
                  'text-amber-600'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
