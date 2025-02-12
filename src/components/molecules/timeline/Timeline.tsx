import { memo, useState, useRef, useEffect, FC } from "react";
import styles from "./Timeline.module.scss";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  ChartData,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import "chartjs-adapter-date-fns";
import Icon from "components/atoms/icon/Icon";
import Button from "components/atoms/button/Button";
import FluidContainer from "components/atoms/fluid-container/FluidContainer";
import FlexElement from "components/atoms/flex-element/FlexElement";
import Text from "components/atoms/text/Text";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

type TypeTimeline = {
  dateRange: { from: Date; to: Date };
  data: ChartData<"bar", (number | [number, number] | null)[], unknown>;
  onPan?: (direction: "left" | "right") => void;
};

const Timeline: FC<TypeTimeline> = ({ dateRange, data, onPan }) => {
  const chartRef = useRef<any>(null);

  const formatDate = (date: Date) => {
    const options: any = {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const handlePan = (direction: "left" | "right") => {
    onPan?.(direction);
  };

  const options: any = {
    responsive: true,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "hour",
          displayFormats: {
            hour: "p",
          },
        },
        title: {
          display: false,
        },
        grid: {
          display: false,
        },
        border: {
          width: 3,
          color: "#d5e3fa",
        },
      },
      y: {
        title: {
          display: false,
        },
        grid: {
          display: false,
        },
        border: {
          width: 1,
          color: "#5187ed",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      zoom: {
        pan: {
          enabled: false,
        },
        zoom: {
          drag: {
            enabled: true,
            backgroundColor: "rgba(0, 0, 255, 0.2)",
          },
          mode: "x",
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "200px" }}>
      <FluidContainer
        alignment="top"
        gap={0}
        prefix={{
          children: (
            <Button
              id="panLeft"
              variant="filled"
              color="transparent"
              className={styles.pan}
              onClick={() => handlePan("left")}
            >
              <Icon name="chevronLeft" size={32} />
            </Button>
          ),
        }}
        root={{
          children: (
            <FlexElement className={styles.container}>
              <Text className={`${styles.date} ${styles.from}`}>{formatDate(dateRange.from)}</Text>
              <Bar width={800} ref={chartRef} options={options} data={data} />
              <Text className={`${styles.date} ${styles.to}`}>{formatDate(dateRange.to)}</Text>
            </FlexElement>
          ),
        }}
        suffix={{
          children: (
            <Button
              id="panRight"
              variant="filled"
              color="transparent"
              className={styles.pan}
              onClick={() => handlePan("right")}
            >
              <Icon name="chevronRight" size={32} />
            </Button>
          ),
        }}
      />
    </div>
  );
};

export default memo(Timeline);
