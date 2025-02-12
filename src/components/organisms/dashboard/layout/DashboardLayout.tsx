import React, { FC, useEffect, useRef } from "react";
import GridLayout, { Layout } from "react-grid-layout";
import styles from "./DashboardLayout.module.scss";
import Select, { TypeSelectRef } from "components/molecules/select/Select";

type TypeDashboardItem = {
  ratio: string;
  id: string;
};

type TypeDashboardLayout = {
  dashboards?: TypeDashboardItem[] | undefined;
};

const DashboardLayout: FC<TypeDashboardLayout> = ({ dashboards }) => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const [layout, setLayout] = React.useState<Layout[]>([]);
  const [dashboarItems, setDashboarItems] = React.useState<TypeDashboardItem[]>(dashboards || []);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const layout = localStorage.getItem("dashboardLayout");
    if (layout) {
      return setLayout(JSON.parse(layout));
    }
    return setLayout(createLayout(dashboarItems));
  }, [dashboarItems]);

  const createLayout = (dashboardItems: TypeDashboardItem[]) => {
    const cols = 8;
    let currentX = 0;
    let currentY = 0;
    let currentRowHeight = 0;

    const layout: Layout[] = [];

    dashboardItems.forEach((item) => {
      const [w, h] = item.ratio.split("/").map(Number);
      if (currentX + w > cols) {
        currentY += currentRowHeight;
        currentX = 0;
        currentRowHeight = 0;
      }

      layout.push({
        i: item.id,
        x: currentX,
        y: currentY,
        w: w,
        h: h,
      });
      currentX += w;
      currentRowHeight = Math.max(currentRowHeight, h);
    });

    return layout;
  };

  const handleLayoutChange = (layout: Layout[]) => {
    saveLayoutToLS(layout);
  };

  const saveLayoutToLS = (layout: Layout[]) => {
    localStorage.setItem("dashboardLayout", JSON.stringify(layout));
  };

  const resizeItem = (id: string, newRatio: string) => {
    const updatedDashboardItems = dashboarItems.map((item) =>
      item.id === id ? { ...item, ratio: newRatio } : item
    );
    setDashboarItems(updatedDashboardItems);
    const updatedLayout = createLayout(updatedDashboardItems);
    saveLayoutToLS(updatedLayout);
  };

  return (
    <div className={styles.layoutContainer}>
      <GridLayout
        className={styles.gridLayout}
        layout={layout}
        width={width}
        cols={8}
        onLayoutChange={handleLayoutChange}
        draggableCancel=".resizing"
      >
        {layout.map((item) => (
          <div
            key={item.i}
            className={styles.gridItem}
            onClick={() => {
              console.log(item);
            }}
          >
            <div className="resizing">
              <Select
                options={["1/1", "2/2", "3/3", "4/4"]}
                onChange={(value) => {
                  resizeItem(item.i, value as string);
                }}
                value={`${item.w}/${item.h}`}
              />
            </div>

            {item.i}
          </div>
        ))}
      </GridLayout>
    </div>
  );
};

export default DashboardLayout;
