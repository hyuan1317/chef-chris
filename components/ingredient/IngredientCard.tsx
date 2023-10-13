import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import CCText from "@components/shared/CCText";
import { Ingredient } from "../ingredient/types";

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
      <CCText style={style.title}>{name}</CCText>
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
