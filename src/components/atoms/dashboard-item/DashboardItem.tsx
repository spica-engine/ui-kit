import React, { ReactNode } from "react";
import styles from "./DashboardItem.module.scss";
import Button from "../button/Button";
import Icon from "../icon/Icon";

import { ChartOptions, ChartType } from "chart.js";
import Text from "../text/Text";

import ChartComponent, { TypeChartComponentProps } from "../chart/Chart";

import Section from "components/organisms/section/Section";

type TypeDashboardItem = {
  headerProps?: {
    content?: ReactNode;
    suffix?: ReactNode;
  };
  chartProps?: TypeChartComponentProps<ChartType>;
};

const DashboardItem = ({ headerProps, chartProps }: TypeDashboardItem) => {
  return (
    <Section className={styles.dashboardItem}>
      <Section.Header>
        <Text>{headerProps?.content}</Text>
        {headerProps?.suffix || (
          <Button
            color="transparent"
            shape="circle"
            className={styles.settingButton}
            //TODO: add hover effect
          >
            <Icon name="cog" className={styles.settingIcon} size="xs" />
          </Button>
        )}
      </Section.Header>
      <Section.Content>
        <ChartComponent
          type={chartProps?.type!}
          data={chartProps?.data!}
          options={chartProps?.options!}
          className={styles.chart}
        />
      </Section.Content>
    </Section>
  );
};

export default DashboardItem;
