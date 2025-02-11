import React from "react";
import styles from "./App.module.scss";
import MenuGroup from "components/organisms/menu-group/MenuGroup";
import Button from "components/atoms/button/Button";
import Icon from "components/atoms/icon/Icon";

function App() {
  const menuOptions = [
    [
      { prefix: <Icon name="formatSize" />, value: "Configure the viewwwwwwwww" },
      { prefix: <Icon name="security" />, value: "Configure rules" },
    ],
    [
      {
        prefix: (
          <Button
            children={undefined}
            style={{ height: "14px", width: "14px", padding: 0, minWidth: 0 }}
          />
        ),
        value: "History",
      },
      {
        prefix: (
          <Button
            children={undefined}
            style={{ height: "14px", width: "14px", padding: 0, minWidth: 0 }}
          />
        ),
        value: "Limitations",
      },
      {
        prefix: (
          <Button
            children={undefined}
            style={{ height: "14px", width: "14px", padding: 0, minWidth: 0 }}
          />
        ),
        value: "Read Only",
      },
    ],
  ];

  return (
    <div className={styles.app}>
      <MenuGroup options={menuOptions} />
    </div>
  );
}

export default App;
