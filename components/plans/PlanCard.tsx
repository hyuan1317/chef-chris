import { TouchableOpacity, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { Link } from "expo-router";
import { PlanDetail } from "./types";

interface IPlanCard {
  plan: PlanDetail;
}

const PlanCard = (props: IPlanCard) => {
  const {
    plan: { id, name, time },
  } = props;

  const formatTime = (time: string) => {
    return time.split("T")[0];
  };
  return (
    <Link href={`/plans/${id}`} asChild>
      <TouchableOpacity>
        <Card>
          <Card.Title title={name} subtitle={formatTime(time)} />
        </Card>
      </TouchableOpacity>
    </Link>
  );
};

const style = StyleSheet.create({});

export default PlanCard;
