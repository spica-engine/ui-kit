import { memo, useRef, FC } from "react";
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
  Chart,
  ScaleOptionsByType,
  CartesianScaleTypeRegistry,
  PluginOptionsByType,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import annotationPlugin from "chartjs-plugin-annotation";
import "chartjs-adapter-date-fns";
import Icon from "components/atoms/icon/Icon";
import Button from "components/atoms/button/Button";
import FluidContainer, {
  TypeFluidContainer,
} from "components/atoms/fluid-container/FluidContainer";
import FlexElement from "components/atoms/flex-element/FlexElement";
import Text from "components/atoms/text/Text";
import { utils } from "utils";
import { _DeepPartialObject } from "chart.js/dist/types/utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  zoomPlugin,
  annotationPlugin
);

export type TypeBarChartData = ChartData<"bar", (number | [number, number] | null)[], unknown>;
type TypeScales =
  | _DeepPartialObject<{ [key: string]: ScaleOptionsByType<keyof CartesianScaleTypeRegistry> }>
  | undefined;

type TypePlugins = _DeepPartialObject<PluginOptionsByType<"bar">> | undefined;

type TypeUnit =
  | "millisecond"
  | "second"
  | "minute"
  | "hour"
  | "day"
  | "week"
  | "month"
  | "quarter"
  | "year";

type TypeTimeline = {
  dateRange: { from: Date; to: Date };
  annotationRange?: { from: Date; to: Date };
  data: TypeBarChartData;
  showArrows?: boolean;
  onPan?: (direction: "left" | "right", seconds: number) => void;
  onClickBar?: (date: Date) => void;
} & TypeFluidContainer;

const Timeline: FC<TypeTimeline> = ({
  dateRange,
  annotationRange,
  data,
  showArrows = true,
  onPan,
  onClickBar,
  ...props
}) => {
  const chartRef = useRef<Chart<"bar", number[], string> | null>(null);

  const getUnit = (): TypeUnit => {
    const diffInMinutes = utils.time.getDiffInMinutes(dateRange.from, dateRange.to);
    return utils.time.unitMapper(diffInMinutes);
  };

  const handlePan = (direction: "left" | "right") => {
    const ticks = chartRef?.current?.scales.x.ticks;
    if (!ticks) return;
    const valueInPercent = ticks.length * 0.1;
    const timeUnit = getUnit();
    const seconds = valueInPercent * utils.time.timeUnitsInSeconds[timeUnit];

    onPan?.(direction, seconds);
  };

  const handleClickBar = (event: MouseEvent) => {
    const chart = chartRef.current;
    if (!chart) return;

    const points = chart.getElementsAtEventForMode(event, "nearest", { intersect: true }, false);
    if (!points.length) return;

    const point = points[0];
    const xValueFrom = chart.data?.labels?.[point.index];
    if (!xValueFrom) return;

    onClickBar?.(new Date(xValueFrom));
  };

  const scales: TypeScales = {
    x: {
      type: "time",
      time: {
        unit: getUnit(),
        displayFormats: {
          [getUnit()]: "p",
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
      ticks: {
        padding: 10,
      },
      offset: true,
      beginAtZero: true,
    },
  };

  const plugins: TypePlugins = {
    legend: {
      display: false,
    },
    annotation: {
      annotations: annotationRange
        ? {
            selectedBox: {
              type: "box",
              drawTime: "beforeDraw",
              xMin: annotationRange?.from.toISOString(),
              xMax: annotationRange?.to.toISOString(),
              backgroundColor: "#eaf0fd",
              borderWidth: 0,
            },
          }
        : {},
    },
  };

  const options: any = {
    responsive: true,
    onClick: handleClickBar,
    scales,
    plugins,
  };

  return (
    <FluidContainer
      dimensionX="fill"
      alignment="top"
      gap={0}
      prefix={{
        children: showArrows && (
          <Button
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
        dimensionX: "fill",
        dimensionY: "fill",
        children: (
          <FlexElement className={styles.container} dimensionX="fill" dimensionY={"fill"}>
            <Text className={`${styles.date} ${styles.from}`}>
              {utils.time.formatDateToEnUs(dateRange.from)}
            </Text>
            <Bar ref={chartRef} options={options} data={data} />
            <Text className={`${styles.date} ${styles.to}`}>
              {utils.time.formatDateToEnUs(dateRange.to)}
            </Text>
          </FlexElement>
        ),
      }}
      suffix={{
        children: showArrows && (
          <Button
            variant="filled"
            color="transparent"
            className={styles.pan}
            onClick={() => handlePan("right")}
          >
            <Icon name="chevronRight" size={32} />
          </Button>
        ),
      }}
      {...props}
    />
  );
};

export default memo(Timeline);
