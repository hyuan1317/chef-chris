import { TouchableOpacity, StyleSheet } from "react-native";
import { Card, useTheme } from "react-native-paper";
import SwipeableRow, { SwipableAction } from "@components/shared/SwipeableRow";
import { Link } from "expo-router";
import { PlanDetail } from "./types";
import { usePlan } from "./PlanContext";

interface IPlanCard {
  plan: PlanDetail;
}

const PlanCard = (props: IPlanCard) => {
  const {
    plan: { id, name, time },
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
          <Card style={style.card}>
            <Card.Title title={name} subtitle={formatTime(time)} />
          </Card>
        </TouchableOpacity>
      </Link>
    </SwipeableRow>
  );
};

export default PlanCard;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    card: {
      borderRadius: 0,
    },
  });
