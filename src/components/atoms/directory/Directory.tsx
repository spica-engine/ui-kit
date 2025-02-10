import FlexElement from "components/atoms/flex-element/FlexElement";
import { FC, Fragment, memo } from "react";
import styles from "./Directory.module.scss";
import Icon from "components/atoms/icon/Icon";
import Popover from "components/atoms/popover/Popover";
import Text from "components/atoms/text/Text";
import ListItem from "components/atoms/list-item/ListItem";

type TypeDirectory = {
  directory: string[];
  onChangeDirectory?: (index: number) => void;
};

const Directory: FC<TypeDirectory> = ({ directory, onChangeDirectory }) => {
  const hasMoreThanTwo = directory.length > 2;
  const visiblePaths = directory.slice(-2);
  const hiddenPaths = directory.slice(0, -2);

  return (
    <FlexElement gap={20} className={styles.directory}>
      {hasMoreThanTwo && (
        <Popover
          content={
            <FlexElement direction="vertical" dimensionX={150}>
              {hiddenPaths.map((el, index) => (
                <ListItem key={index} label={el} onClick={() => onChangeDirectory?.(index)} />
              ))}
            </FlexElement>
          }
          placement="bottomEnd"
          trigger="click"
        >
          <Icon name="dotsHorizontal" className={styles.moreIcon} />
        </Popover>
      )}

      {visiblePaths.map((el, index) => {
        const originalIndex = hiddenPaths.length + index;

        return (
          <Fragment key={el}>
            {(hasMoreThanTwo || index !== 0) && <Icon name="chevronRight" />}
            <Text
              size="large"
              className={styles.path}
              onClick={() => onChangeDirectory?.(originalIndex)}
            >
              {el}
            </Text>
          </Fragment>
        );
      })}
    </FlexElement>
  );
};

export default memo(Directory);
