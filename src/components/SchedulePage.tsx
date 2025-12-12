import { useState } from 'react';
import { Clock, Plus, X, Edit2, Trash2 } from 'lucide-react';

interface ScheduleItem {
  id: string;
  day: string;
  time: string;
  subject: string;
  teacher: string;
  room: string;
  color: string;
}

export function SchedulePage() {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([
    { id: '1', day: 'Понедельник', time: '09:00', subject: 'Математика', teacher: 'Иванов И.И.', room: '201', color: 'blue' },
    { id: '2', day: 'Понедельник', time: '10:45', subject: 'Физика', teacher: 'Петров П.П.', room: '305', color: 'purple' },
    { id: '3', day: 'Вторник', time: '09:00', subject: 'История', teacher: 'Сидорова С.С.', room: '102', color: 'amber' },
    { id: '4', day: 'Вторник', time: '10:45', subject: 'Английский', teacher: 'Смирнова А.А.', room: '210', color: 'green' },
    { id: '5', day: 'Среда', time: '09:00', subject: 'Химия', teacher: 'Козлов К.К.', room: '401', color: 'pink' },
    { id: '6', day: 'Четверг', time: '09:00', subject: 'Литература', teacher: 'Новикова Н.Н.', room: '105', color: 'indigo' },
    { id: '7', day: 'Пятница', time: '09:00', subject: 'Информатика', teacher: 'Волков В.В.', room: '301', color: 'cyan' },
  ]);

  const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  const timeSlots = ['09:00', '10:45', '12:30', '14:15', '16:00'];

  const colorClasses = {
    blue: 'bg-blue-100 border-blue-300 text-blue-800',
    purple: 'bg-purple-100 border-purple-300 text-purple-800',
    green: 'bg-green-100 border-green-300 text-green-800',
    amber: 'bg-amber-100 border-amber-300 text-amber-800',
    pink: 'bg-pink-100 border-pink-300 text-pink-800',
    indigo: 'bg-indigo-100 border-indigo-300 text-indigo-800',
    cyan: 'bg-cyan-100 border-cyan-300 text-cyan-800',
  };

  const getItemsForSlot = (day: string, time: string) => {
    return schedule.filter(item => item.day === day && item.time === time);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-gray-900 mb-2">Расписание занятий</h1>
        <p className="text-gray-600">Планируй свое время эффективно</p>
      </div>

      {/* Schedule Grid */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <th className="px-4 py-4 text-left">Время</th>
                {days.map(day => (
                  <th key={day} className="px-4 py-4 text-center">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((time, timeIndex) => (
                <tr key={time} className={timeIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-4 py-6 border-r border-gray-200">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Clock className="w-4 h-4" />
                      {time}
                    </div>
                  </td>
                  {days.map(day => {
                    const items = getItemsForSlot(day, time);
                    return (
                      <td key={`${day}-${time}`} className="px-2 py-2 border-r border-gray-200">
                        {items.map(item => (
                          <div
                            key={item.id}
                            className={`p-3 rounded-lg border-2 ${colorClasses[item.color as keyof typeof colorClasses]} hover:shadow-md transition-shadow`}
                          >
                            <div className="mb-1">{item.subject}</div>
                            <div className="text-xs opacity-75">{item.teacher}</div>
                            <div className="text-xs opacity-75">Каб. {item.room}</div>
                          </div>
                        ))}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-lg">
          <div className="mb-2">{schedule.length}</div>
          <p className="text-sm text-blue-100">Всего занятий</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg">
          <div className="mb-2">{Array.from(new Set(schedule.map(s => s.subject))).length}</div>
          <p className="text-sm text-purple-100">Предметов</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 text-white shadow-lg">
          <div className="mb-2">{schedule.filter(s => s.day === 'Понедельник').length}</div>
          <p className="text-sm text-green-100">Занятий в ПН</p>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-6 text-white shadow-lg">
          <div className="mb-2">8:00 - 17:00</div>
          <p className="text-sm text-amber-100">Учебное время</p>
        </div>
      </div>
    </div>
  );
}
