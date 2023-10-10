import { TouchableOpacity } from "react-native";
import { StyleSheet, Text } from "react-native";
import { Ingredient } from "../meals/types";

interface IIngredientCard {
  ingredient: Ingredient;
  onSelect: (item: Ingredient) => void;
}

const IngredientCard = (props: IIngredientCard) => {
  const {
    ingredient,
    ingredient: { name },
    onSelect,
  } = props;

  return (
    <TouchableOpacity
      style={style.container}
      onPress={() => onSelect(ingredient)}
    >
      <Text style={style.title}>{name}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    padding: 12,
    minHeight: 40,
  },
  title: {
    fontFamily: "Inter_900Black",
  },
});

export default IngredientCard;
