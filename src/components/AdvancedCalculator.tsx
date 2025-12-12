import { useState } from 'react';
import { Calculator, Sigma, Zap, Binary, Globe } from 'lucide-react';

type CalculatorMode = 'basic' | 'math' | 'physics' | 'cs' | 'geography';

export function AdvancedCalculator() {
  const [mode, setMode] = useState<CalculatorMode>('basic');
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  // Math functions
  const [mathInputA, setMathInputA] = useState('');
  const [mathInputB, setMathInputB] = useState('');
  const [mathResult, setMathResult] = useState('');

  // Physics calculations
  const [physicsValues, setPhysicsValues] = useState({
    velocity: '',
    time: '',
    distance: '',
    mass: '',
    acceleration: '',
  });
  const [physicsResult, setPhysicsResult] = useState('');

  // CS calculations
  const [binaryInput, setBinaryInput] = useState('');
  const [decimalInput, setDecimalInput] = useState('');
  const [hexInput, setHexInput] = useState('');

  // Geography calculations
  const [geoValues, setGeoValues] = useState({
    lat1: '',
    lon1: '',
    lat2: '',
    lon2: '',
    area: '',
    radius: '',
    temperature: '',
    scale: '',
  });
  const [geoResult, setGeoResult] = useState('');

  const handleBasicCalculator = (value: string) => {
    if (value === 'C') {
      setDisplay('0');
      setEquation('');
    } else if (value === '=') {
      try {
        const result = eval(display);
        setEquation(display + ' =');
        setDisplay(result.toString());
      } catch {
        setDisplay('Ошибка');
      }
    } else if (value === '⌫') {
      setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
    } else {
      setDisplay(display === '0' ? value : display + value);
    }
  };

  const calculateMath = (operation: string) => {
    const a = parseFloat(mathInputA);
    const b = parseFloat(mathInputB);
    
    if (isNaN(a) || (operation !== 'sqrt' && operation !== 'factorial' && isNaN(b))) {
      setMathResult('Введите корректные числа');
      return;
    }

    let result = 0;
    switch (operation) {
      case 'power':
        result = Math.pow(a, b);
        setMathResult(`${a}^${b} = ${result}`);
        break;
      case 'sqrt':
        result = Math.sqrt(a);
        setMathResult(`√${a} = ${result}`);
        break;
      case 'log':
        result = Math.log10(a);
        setMathResult(`log₁₀(${a}) = ${result}`);
        break;
      case 'ln':
        result = Math.log(a);
        setMathResult(`ln(${a}) = ${result}`);
        break;
      case 'sin':
        result = Math.sin(a * Math.PI / 180);
        setMathResult(`sin(${a}°) = ${result.toFixed(4)}`);
        break;
      case 'cos':
        result = Math.cos(a * Math.PI / 180);
        setMathResult(`cos(${a}°) = ${result.toFixed(4)}`);
        break;
      case 'tan':
        result = Math.tan(a * Math.PI / 180);
        setMathResult(`tan(${a}°) = ${result.toFixed(4)}`);
        break;
      case 'factorial':
        result = factorial(Math.floor(a));
        setMathResult(`${Math.floor(a)}! = ${result}`);
        break;
    }
  };

  const factorial = (n: number): number => {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
  };

  const calculatePhysics = (formula: string) => {
    const { velocity, time, distance, mass, acceleration } = physicsValues;
    
    switch (formula) {
      case 'distance':
        const v = parseFloat(velocity);
        const t = parseFloat(time);
        if (!isNaN(v) && !isNaN(t)) {
          setPhysicsResult(`Расстояние: S = v × t = ${v} × ${t} = ${v * t} м`);
        }
        break;
      case 'velocity':
        const s = parseFloat(distance);
        const t2 = parseFloat(time);
        if (!isNaN(s) && !isNaN(t2)) {
          setPhysicsResult(`Скорость: v = S / t = ${s} / ${t2} = ${s / t2} м/с`);
        }
        break;
      case 'force':
        const m = parseFloat(mass);
        const a = parseFloat(acceleration);
        if (!isNaN(m) && !isNaN(a)) {
          setPhysicsResult(`Сила: F = m × a = ${m} × ${a} = ${m * a} Н`);
        }
        break;
      case 'kinetic':
        const m2 = parseFloat(mass);
        const v2 = parseFloat(velocity);
        if (!isNaN(m2) && !isNaN(v2)) {
          setPhysicsResult(`Кинетическая энергия: E = (m × v²) / 2 = ${(m2 * v2 * v2) / 2} Дж`);
        }
        break;
    }
  };

  const convertBinary = () => {
    if (binaryInput && /^[01]+$/.test(binaryInput)) {
      const decimal = parseInt(binaryInput, 2);
      setDecimalInput(decimal.toString());
      setHexInput(decimal.toString(16).toUpperCase());
    }
  };

  const convertDecimal = () => {
    const num = parseInt(decimalInput);
    if (!isNaN(num)) {
      setBinaryInput(num.toString(2));
      setHexInput(num.toString(16).toUpperCase());
    }
  };

  const convertHex = () => {
    if (hexInput && /^[0-9A-Fa-f]+$/.test(hexInput)) {
      const decimal = parseInt(hexInput, 16);
      setDecimalInput(decimal.toString());
      setBinaryInput(decimal.toString(2));
    }
  };

  // Geography calculations
  const calculateGeography = (type: string) => {
    const { lat1, lon1, lat2, lon2, area, radius, temperature, scale } = geoValues;

    switch (type) {
      case 'distance':
        const latitud1 = parseFloat(lat1);
        const longitud1 = parseFloat(lon1);
        const latitud2 = parseFloat(lat2);
        const longitud2 = parseFloat(lon2);

        if (!isNaN(latitud1) && !isNaN(longitud1) && !isNaN(latitud2) && !isNaN(longitud2)) {
          // Формула гаверсинуса для расчета расстояния между двумя точками на сфере
          const R = 6371; // Радиус Земли в км
          const dLat = ((latitud2 - latitud1) * Math.PI) / 180;
          const dLon = ((longitud2 - longitud1) * Math.PI) / 180;
          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((latitud1 * Math.PI) / 180) *
              Math.cos((latitud2 * Math.PI) / 180) *
              Math.sin(dLon / 2) *
              Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const distance = R * c;
          setGeoResult(`Расстояние между точками: ${distance.toFixed(2)} км`);
        }
        break;

      case 'circumference':
        const r = parseFloat(radius);
        if (!isNaN(r)) {
          const circ = 2 * Math.PI * r;
          setGeoResult(`Длина окружности: ${circ.toFixed(2)} км`);
        }
        break;

      case 'circleArea':
        const r2 = parseFloat(radius);
        if (!isNaN(r2)) {
          const circArea = Math.PI * r2 * r2;
          setGeoResult(`Площадь круга: ${circArea.toFixed(2)} км²`);
        }
        break;

      case 'scale':
        const mapDist = parseFloat(area);
        const mapScale = parseFloat(scale);
        if (!isNaN(mapDist) && !isNaN(mapScale)) {
          const realDist = mapDist * mapScale;
          setGeoResult(`Реальное расстояние: ${realDist.toFixed(2)} км (при масштабе 1:${mapScale})`);
        }
        break;

      case 'celsiusToFahrenheit':
        const celsius = parseFloat(temperature);
        if (!isNaN(celsius)) {
          const fahrenheit = (celsius * 9) / 5 + 32;
          setGeoResult(`${celsius}°C = ${fahrenheit.toFixed(2)}°F`);
        }
        break;

      case 'fahrenheitToCelsius':
        const fahr = parseFloat(temperature);
        if (!isNaN(fahr)) {
          const cels = ((fahr - 32) * 5) / 9;
          setGeoResult(`${fahr}°F = ${cels.toFixed(2)}°C`);
        }
        break;

      case 'timezone':
        const long = parseFloat(lon1);
        if (!isNaN(long)) {
          const timezone = Math.round(long / 15);
          setGeoResult(`Приблизительный часовой пояс: UTC${timezone >= 0 ? '+' : ''}${timezone}`);
        }
        break;
    }
  };

  const modes = [
    { id: 'basic' as CalculatorMode, label: 'Базовый', icon: Calculator },
    { id: 'math' as CalculatorMode, label: 'Математика', icon: Sigma },
    { id: 'physics' as CalculatorMode, label: 'Физика', icon: Zap },
    { id: 'cs' as CalculatorMode, label: 'Информатика', icon: Binary },
    { id: 'geography' as CalculatorMode, label: 'География', icon: Globe },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-gray-900 mb-2">Умный Калькулятор</h1>
        <p className="text-gray-600">
          Выполняй вычисления по математике, физике и информатике
        </p>
      </div>

      {/* Mode Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {modes.map((m) => {
          const Icon = m.icon;
          return (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`p-4 rounded-xl transition-all ${
                mode === m.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
              }`}
            >
              <Icon className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm">{m.label}</span>
            </button>
          );
        })}
      </div>

      {/* Basic Calculator */}
      {mode === 'basic' && (
        <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto">
          <div className="mb-4">
            <div className="text-gray-500 text-sm text-right h-6">{equation}</div>
            <div className="text-right p-4 bg-gray-100 rounded-lg text-gray-900 text-2xl">
              {display}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {['C', '⌫', '%', '/'].map((btn) => (
              <button
                key={btn}
                onClick={() => handleBasicCalculator(btn)}
                className="p-4 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors text-gray-800"
              >
                {btn}
              </button>
            ))}
            {['7', '8', '9', '*'].map((btn) => (
              <button
                key={btn}
                onClick={() => handleBasicCalculator(btn)}
                className="p-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-800"
              >
                {btn}
              </button>
            ))}
            {['4', '5', '6', '-'].map((btn) => (
              <button
                key={btn}
                onClick={() => handleBasicCalculator(btn)}
                className="p-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-800"
              >
                {btn}
              </button>
            ))}
            {['1', '2', '3', '+'].map((btn) => (
              <button
                key={btn}
                onClick={() => handleBasicCalculator(btn)}
                className="p-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-800"
              >
                {btn}
              </button>
            ))}
            {['0', '.', '='].map((btn) => (
              <button
                key={btn}
                onClick={() => handleBasicCalculator(btn)}
                className={`p-4 rounded-lg transition-colors ${
                  btn === '='
                    ? 'bg-blue-600 hover:bg-blue-700 text-white col-span-2'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Math Calculator */}
      {mode === 'math' && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-gray-900 mb-6">Математические функции</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Число A</label>
                <input
                  type="number"
                  value={mathInputA}
                  onChange={(e) => setMathInputA(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Введите число"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Число B</label>
                <input
                  type="number"
                  value={mathInputB}
                  onChange={(e) => setMathInputB(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Введите число (если нужно)"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => calculateMath('power')}
                className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                A^B
              </button>
              <button
                onClick={() => calculateMath('sqrt')}
                className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                √A
              </button>
              <button
                onClick={() => calculateMath('log')}
                className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                log A
              </button>
              <button
                onClick={() => calculateMath('ln')}
                className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                ln A
              </button>
              <button
                onClick={() => calculateMath('sin')}
                className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                sin A
              </button>
              <button
                onClick={() => calculateMath('cos')}
                className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                cos A
              </button>
              <button
                onClick={() => calculateMath('tan')}
                className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                tan A
              </button>
              <button
                onClick={() => calculateMath('factorial')}
                className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                A!
              </button>
            </div>
          </div>
          {mathResult && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800">{mathResult}</p>
            </div>
          )}
        </div>
      )}

      {/* Physics Calculator */}
      {mode === 'physics' && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-gray-900 mb-6">Физические формулы</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Скорость (м/с)</label>
                <input
                  type="number"
                  value={physicsValues.velocity}
                  onChange={(e) =>
                    setPhysicsValues({ ...physicsValues, velocity: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Время (с)</label>
                <input
                  type="number"
                  value={physicsValues.time}
                  onChange={(e) =>
                    setPhysicsValues({ ...physicsValues, time: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Расстояние (м)</label>
                <input
                  type="number"
                  value={physicsValues.distance}
                  onChange={(e) =>
                    setPhysicsValues({ ...physicsValues, distance: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Масса (кг)</label>
                <input
                  type="number"
                  value={physicsValues.mass}
                  onChange={(e) =>
                    setPhysicsValues({ ...physicsValues, mass: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Ускорение (м/с²)</label>
                <input
                  type="number"
                  value={physicsValues.acceleration}
                  onChange={(e) =>
                    setPhysicsValues({ ...physicsValues, acceleration: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="text-gray-800">Формулы:</h4>
              <button
                onClick={() => calculatePhysics('distance')}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-left"
              >
                <div>Расстояние</div>
                <div className="text-sm text-blue-100">S = v × t</div>
              </button>
              <button
                onClick={() => calculatePhysics('velocity')}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-left"
              >
                <div>Скорость</div>
                <div className="text-sm text-blue-100">v = S / t</div>
              </button>
              <button
                onClick={() => calculatePhysics('force')}
                className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-left"
              >
                <div>Сила</div>
                <div className="text-sm text-purple-100">F = m × a</div>
              </button>
              <button
                onClick={() => calculatePhysics('kinetic')}
                className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-left"
              >
                <div>Кинетическая энергия</div>
                <div className="text-sm text-purple-100">E = (m × v²) / 2</div>
              </button>
            </div>
          </div>
          {physicsResult && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800">{physicsResult}</p>
            </div>
          )}
        </div>
      )}

      {/* CS Calculator */}
      {mode === 'cs' && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-gray-900 mb-6">Системы счисления</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Двоичная (Binary)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={binaryInput}
                  onChange={(e) => setBinaryInput(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="1010101"
                />
                <button
                  onClick={convertBinary}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Конвертировать
                </button>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Десятичная (Decimal)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={decimalInput}
                  onChange={(e) => setDecimalInput(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="85"
                />
                <button
                  onClick={convertDecimal}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Конвертировать
                </button>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Шестнадцатеричная (Hex)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={hexInput}
                  onChange={(e) => setHexInput(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="55"
                />
                <button
                  onClick={convertHex}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Конвертировать
                </button>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-gray-800 mb-3">Справка:</h4>
              <ul className="text-gray-700 space-y-1 text-sm">
                <li>• Двоичная: использует цифры 0 и 1</li>
                <li>• Десятичная: обычные числа 0-9</li>
                <li>• Шестнадцатеричная: использует 0-9 и A-F</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Geography Calculator */}
      {mode === 'geography' && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-gray-900 mb-6">Географические расчеты</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Широта 1 (Lat1)</label>
                <input
                  type="number"
                  value={geoValues.lat1}
                  onChange={(e) =>
                    setGeoValues({ ...geoValues, lat1: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Долгота 1 (Lon1)</label>
                <input
                  type="number"
                  value={geoValues.lon1}
                  onChange={(e) =>
                    setGeoValues({ ...geoValues, lon1: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Широта 2 (Lat2)</label>
                <input
                  type="number"
                  value={geoValues.lat2}
                  onChange={(e) =>
                    setGeoValues({ ...geoValues, lat2: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Долгота 2 (Lon2)</label>
                <input
                  type="number"
                  value={geoValues.lon2}
                  onChange={(e) =>
                    setGeoValues({ ...geoValues, lon2: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Радиус (Radius)</label>
                <input
                  type="number"
                  value={geoValues.radius}
                  onChange={(e) =>
                    setGeoValues({ ...geoValues, radius: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Площадь (Area)</label>
                <input
                  type="number"
                  value={geoValues.area}
                  onChange={(e) =>
                    setGeoValues({ ...geoValues, area: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Масштаб (Scale)</label>
                <input
                  type="number"
                  value={geoValues.scale}
                  onChange={(e) =>
                    setGeoValues({ ...geoValues, scale: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Температура (Temperature)</label>
                <input
                  type="number"
                  value={geoValues.temperature}
                  onChange={(e) =>
                    setGeoValues({ ...geoValues, temperature: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="text-gray-800">Формулы:</h4>
              <button
                onClick={() => calculateGeography('distance')}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-left"
              >
                <div>Расстояние между точками</div>
                <div className="text-sm text-blue-100">S = v × t</div>
              </button>
              <button
                onClick={() => calculateGeography('circumference')}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-left"
              >
                <div>Длина окружности</div>
                <div className="text-sm text-blue-100">C = 2πr</div>
              </button>
              <button
                onClick={() => calculateGeography('circleArea')}
                className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-left"
              >
                <div>Площадь круга</div>
                <div className="text-sm text-purple-100">A = πr²</div>
              </button>
              <button
                onClick={() => calculateGeography('scale')}
                className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-left"
              >
                <div>Реальное расстояние по масштабу</div>
                <div className="text-sm text-purple-100">RealDist = MapDist * Scale</div>
              </button>
              <button
                onClick={() => calculateGeography('celsiusToFahrenheit')}
                className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-left"
              >
                <div>Цельсий в Фаренгейт</div>
                <div className="text-sm text-purple-100">F = (C * 9/5) + 32</div>
              </button>
              <button
                onClick={() => calculateGeography('fahrenheitToCelsius')}
                className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-left"
              >
                <div>Фа��енгейт в Цельсий</div>
                <div className="text-sm text-purple-100">C = (F - 32) * 5/9</div>
              </button>
              <button
                onClick={() => calculateGeography('timezone')}
                className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-left"
              >
                <div>Приблизительный часовой пояс</div>
                <div className="text-sm text-purple-100">Timezone = Lon1 / 15</div>
              </button>
            </div>
          </div>
          {geoResult && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800">{geoResult}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}