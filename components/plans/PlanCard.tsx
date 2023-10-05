import { TouchableOpacity, StyleSheet } from "react-native";
import { Card } from "react-native-paper";

export interface Plan {
  id: number;
  name: string;
  time: string;
}

interface IPlanCard {
  plan: Plan;
}

const PlanCard = (props: IPlanCard) => {
  const {
    plan: { name, time },
  } = props;
  return (
    <TouchableOpacity>
      <Card>
        <Card.Title title={name} subtitle={time} />
      </Card>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({});

export default PlanCard;
