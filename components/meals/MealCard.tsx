import { TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { StyleSheet, Image } from "react-native";
import foodImg from "../../assets/food.jpg";
import { Meal } from "./types";

interface IMealCard {
  meal: Meal;
  onSelect: (meal: Meal) => void;
}

const MealCard = (props: IMealCard) => {
  const {
    meal,
    meal: { name, ingredients },
    onSelect,
  } = props;

  const getSubtitle = () => {
    const threeIngredients = ingredients.slice(0, 5);
    const stringArr = threeIngredients.map((i) => `${i.name} x${i.quantity}`);
    return stringArr.join(", ");
  };

  const handleOnPress = () => {
    onSelect(meal);
  };

  return (
    <TouchableOpacity onPress={handleOnPress}>
      <Card>
        <Card.Title
          left={() => <Image style={style.image} source={foodImg} />}
          title={name}
          subtitle={getSubtitle()}
        />
      </Card>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  image: {
    flex: 1,
    width: "100%",
  },
});

export default MealCard;
