import Swipeable from "react-native-gesture-handler/Swipeable";
import { RectButton } from "react-native-gesture-handler";
import { Animated, StyleSheet, Text, View } from "react-native";
import { IconButton } from "react-native-paper";

interface Props {
  actions: SwipableAction[];
  children: React.ReactNode;
}

export interface SwipableAction {
  text: string;
  icon?: string;
  color?: string;
  backgroundColor: string;
  onPress: () => void;
}

const ACTION_WIDTH = 75;

const SwipeableRow = (props: Props) => {
  const { actions, children } = props;

  const renderRightAction = (
    action: SwipableAction,
    x: number,
    progress: Animated.AnimatedInterpolation<number>
  ) => {
    const { text, icon, color = "white", backgroundColor, onPress } = action;
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });

    return (
      <Animated.View
        style={{
          flex: 1,
          transform: [{ translateX: trans }],
          backgroundColor: backgroundColor,
        }}
        key={text}
      >
        <RectButton
          style={[styles.rightAction, { backgroundColor }]}
          onPress={onPress}
        >
          {icon && (
            <IconButton
              style={styles.actionIcon}
              icon={icon}
              iconColor={color}
              size={24}
            />
          )}
          <Text style={[styles.actionText, { color }]}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    _dragAnimatedValue: Animated.AnimatedInterpolation<number>
  ) => {
    const actionsWidth = actions.length * ACTION_WIDTH;
    return (
      <View
        style={{
          width: actionsWidth,
          flexDirection: "row",
        }}
      >
        {actions.map((action, index) =>
          renderRightAction(
            action,
            actionsWidth - index * ACTION_WIDTH,
            progress
          )
        )}
      </View>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>{children}</Swipeable>
  );
};

export default SwipeableRow;

const styles = StyleSheet.create({
  rightAction: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  actionIcon: {
    height: 24,
    width: 24,
    marginBottom: 4,
  },
  actionText: {
    fontSize: 16,
  },
});
