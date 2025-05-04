import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { selectUnit } from "../../store/tempeture/tempeture.selector";
import { convertTemp } from "../../utils/tempeture.utils";

interface WeatherChartProps {
  title: string;
  description: string;
  changePercentage: number;
  weeklyData: {
    week: string;
    temp: number;
  }[];
}

const WeatherChart: React.FC<WeatherChartProps> = ({
  title,
  description,
  changePercentage,
  weeklyData,
}) => {
  const chartRef = useRef<ApexCharts | null>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const unit = useSelector((state: RootState) => selectUnit(state));

  // init chartRef
  useEffect(() => {
    if (!chartContainerRef.current) return;

    const options: ApexCharts.ApexOptions = {
      series: [
        {
          name: "Temperature",
          data: weeklyData.map((item) => convertTemp(item.temp, unit)),
        },
      ],
      chart: {
        type: "line",
        height: 350,
        toolbar: { show: false },
        animations: { enabled: true },
      },
      xaxis: {
        categories: weeklyData.map((item) => item.week),
      },
      yaxis: {
        title: { text: `Temperature (${unit === "celsius" ? "C" : "F"}°)` },
        labels: {
          formatter: (value: number) =>
            `${Math.round(value)}°${unit === "celsius" ? "C" : "F"}`,
        },
      },
      colors: ["#3B82F6"],
      stroke: { width: 3, curve: "smooth" },
    };

    chartRef.current = new ApexCharts(chartContainerRef.current, options);
    chartRef.current.render();

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [weeklyData]);

  // update chart with unit change
  useEffect(() => {
    if (!chartRef.current) return;

    chartRef.current.updateOptions({
      series: [
        {
          data: weeklyData.map((item) => convertTemp(item.temp, unit)),
        },
      ],
      yaxis: {
        title: { text: `Temperature (°${unit === "celsius" ? "C" : "F"})` },
        labels: {
          formatter: (value: number) =>
            `${value} ${unit === "celsius" ? "C°" : "F°"}`,
        },
      },
    });
  }, [unit, weeklyData]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-gray-500">{description}</p>
        </div>
        <div
          className={`font-medium ${
            changePercentage >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {Math.abs(changePercentage)}% {changePercentage >= 0 ? "↑" : "↓"}
        </div>
      </div>
      <div ref={chartContainerRef} />
    </div>
  );
};

export default WeatherChart;
