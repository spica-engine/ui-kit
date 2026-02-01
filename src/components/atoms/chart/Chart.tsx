import { useEffect, useRef } from "react";
import { Chart, ChartType, ChartData, ChartOptions, Plugin } from "chart.js/auto";

export type TypeChartComponentProps<T extends ChartType> = {
  type: T;
  data: ChartData<T>;
  options?: ChartOptions<T>;
  className?: string;
  style?: React.CSSProperties;
  plugins?: Plugin<T>[];
};

const ChartComponent = <T extends ChartType>({
  type,
  data,
  options,
  className,
  style,
  plugins,
}: TypeChartComponentProps<T>) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart<T> | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart<T>(ctx, {
      type,
      data,
      options: options! || {},
      plugins: plugins || [],
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [type, data, options, plugins]);

  return <canvas ref={canvasRef} className={className} style={style} />;
};

export default ChartComponent;
