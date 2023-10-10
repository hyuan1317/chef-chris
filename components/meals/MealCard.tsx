import { TouchableOpacity } from "react-native-gesture-handler";
import { Card } from "react-native-paper";
import { StyleSheet, Image } from "react-native";
import { useMemo } from "react";
import SwipeableRow, { SwipableAction } from "@components/shared/SwipeableRow";
import foodImg from "../../assets/food.jpg";
import { Meal } from "./types";

interface IMealCard {
  meal: Meal;
  onSelect: (meal: Meal) => void;
  onDelete?: (id: number) => void;
}

const MealCard = (props: IMealCard) => {
  const {
    meal,
    meal: { id, name, ingredients },
    onSelect,
    onDelete,
  } = props;

  const actions = useMemo(() => {
    const results: SwipableAction[] = [];
    if (onDelete) {
      results.push({
        text: "Delete",
        backgroundColor: "#DD2C00",
        icon: "delete",
        onPress: () => {
          onDelete(id);
        },
      });
    }
    return results;
  }, [onDelete]);

  const getSubtitle = () => {
    const threeIngredients = ingredients.slice(0, 5);
    const stringArr = threeIngredients.map((i) => `${i.name} x${i.quantity}`);
    return stringArr.join(", ");
  };

  const handleOnPress = () => {
    onSelect(meal);
  };

  return (
    <SwipeableRow actions={actions}>
      <TouchableOpacity onPress={handleOnPress}>
        <Card style={style.card}>
          <Card.Title
            left={() => <Image style={style.image} source={foodImg} />}
            title={name}
            subtitle={getSubtitle()}
          />
        </Card>
      </TouchableOpacity>
    </SwipeableRow>
  );
};

const style = StyleSheet.create({
  card: {
    borderRadius: 0,
  },
  image: {
    flex: 1,
    width: "100%",
  },
});

export default MealCard;
