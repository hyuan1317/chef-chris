import { TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { StyleSheet, Image } from "react-native";
import { Link } from "expo-router";
import foodImg from "../../assets/food.jpg";
import { Meal } from "./types";

interface IMealCard {
  meal: Meal;
}

const MealCard = (props: IMealCard) => {
  const {
    meal: { id, name, ingredients },
  } = props;

  const getSubtitle = () => {
    const threeIngredients = ingredients.slice(0, 3);
    const stringArr = threeIngredients.map((i) => `${i.name} x${i.quantity}`);
    return stringArr.join(", ");
  };

  return (
    <Link href={`/meals/${id}`} asChild>
      <TouchableOpacity>
        <Card>
          <Card.Title
            left={() => <Image style={style.image} source={foodImg} />}
            title={name}
            subtitle={getSubtitle()}
          />
        </Card>
      </TouchableOpacity>
    </Link>
  );
};

const style = StyleSheet.create({
  image: {
    flex: 1,
    width: "100%",
  },
});

export default MealCard;
