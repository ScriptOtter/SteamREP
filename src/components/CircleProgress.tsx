const CircleProgress = ({ percent }: any) => {
  const radius = 15; // Радиус круга
  const circumference = 2 * Math.PI * radius; // Длина окружности

  // Вычисляем длину закрашенной части
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex items-center justify-center relative">
      <svg width="60" height="60">
        {/* Уменьшите размеры SVG */}
        <circle
          className="text-gray-300"
          strokeWidth="5"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="30" // Центрируем круг
          cy="30" // Центрируем круг
        />
        <circle
          className="text-blue-500"
          strokeWidth="5" // Сделайте ширину стержня одинаковой для лучшего вида
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="var(--color-light-blue-3)"
          fill="transparent"
          r={radius}
          cx="30" // Центрируем круг
          cy="30" // Центрируем круг
        />
      </svg>
      <div className="absolute text-xs font-bold">{percent}%</div>{" "}
      {/* Уменьшите размер текста */}
    </div>
  );
};

export default CircleProgress;
