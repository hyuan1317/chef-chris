import { TouchableOpacity, StyleSheet, View } from "react-native";
import CCText from "@components/shared/CCText";
import { useTheme, IconButton } from "react-native-paper";
import SwipeableRow, { SwipableAction } from "@components/shared/SwipeableRow";
import { Link } from "expo-router";
import { PlanDetail } from "./types";
import { usePlan } from "./PlanContext";

interface IPlanCard {
  plan: PlanDetail;
}

const PlanCard = (props: IPlanCard) => {
  const {
    plan: { id, name, time, completed },
  } = props;
  const theme = useTheme();
  const style = makeStyles(theme.colors);
  const { deletePlan } = usePlan();

  const actions: SwipableAction[] = [
    {
      text: "Delete",
      backgroundColor: "#DD2C00",
      icon: "delete",
      onPress: () => {
        deletePlan(id);
      },
    },
  ];

  const formatTime = (time: string) => {
    return time.split("T")[0];
  };

  return (
    <SwipeableRow actions={actions}>
      <Link href={`/plans/${id}`} asChild>
        <TouchableOpacity>
          <View style={style.card}>
            <View style={style.cardLeft}>
              <View style={style.IconContainer}>
                <Link href={`/${id}`} asChild>
                  <IconButton
                    icon={completed ? "playlist-check" : "playlist-edit"}
                    size={36}
                    style={style.icon}
                    iconColor={completed ? "#27AE60" : "#F7CB73"}
                    onPress={() => {}}
                  />
                </Link>
              </View>
            </View>
            <View style={style.cardRight}>
              <CCText style={style.title}>{name}</CCText>
              <CCText style={style.subTitle}>{formatTime(time)}</CCText>
            </View>
          </View>
        </TouchableOpacity>
      </Link>
    </SwipeableRow>
  );
};

export default PlanCard;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    card: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 12,
      backgroundColor: colors.elevation.level1,
    },
    IconContainer: {
      borderColor: colors.outlineVariant,
      borderWidth: 1,
      borderRadius: 50,
      backgroundColor: colors.background,
    },
    cardLeft: {},
    icon: {
      margin: 0,
      padding: 0,
      borderRadius: 50,
    },
    cardRight: {
      alignItems: "flex-end",
    },
    title: {
      fontSize: 16,
      marginBottom: 8,
    },
    subTitle: {},
  });
