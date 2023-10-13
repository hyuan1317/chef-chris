import { View, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import CCText from "@components/shared/CCText";
import SwipeableRow, { SwipableAction } from "@components/shared/SwipeableRow";
import { IconButton, useTheme } from "react-native-paper";
import { IngredientWithQty } from "../ingredient/types";

interface Props {
  ingredient: IngredientWithQty;
  onPlus: () => void;
  onMinus: () => void;
  onQtyChange: (text: string) => void;
  onDelete: (id: number) => void;
}

const IngredientRow = (props: Props) => {
  const {
    ingredient: { id, name, quantity },
    onPlus,
    onMinus,
    onQtyChange,
    onDelete,
  } = props;
  const theme = useTheme();
  const style = makeStyles(theme.colors);

  const actions: SwipableAction[] = [
    {
      text: "Delete",
      backgroundColor: "#DD2C00",
      icon: "delete",
      onPress: () => {
        onDelete(id);
      },
    },
  ];

  return (
    <SwipeableRow actions={actions}>
      <View style={style.ingredientRow}>
        <CCText style={style.ingredientTitle}>{name}</CCText>
        <View style={style.ingredientContainer}>
          <TouchableOpacity onPress={onPlus}>
            <IconButton
              style={style.ingredientOperator}
              icon="plus"
              size={20}
            />
          </TouchableOpacity>
          <TextInput
            style={style.ingredientQty}
            inputMode="decimal"
            keyboardType="number-pad"
            value={quantity.toString()}
            onChangeText={onQtyChange}
          />
          <TouchableOpacity onPress={onMinus}>
            <IconButton
              style={style.ingredientOperator}
              icon="minus"
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SwipeableRow>
  );
};

export default IngredientRow;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    ingredientRow: {
      flexDirection: "row",
      alignItems: "center",
      padding: 12,
      backgroundColor: colors.background,
      justifyContent: "space-between",
    },
    ingredientContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    ingredientTitle: {
      fontFamily: "Inter_900Black",
    },
    ingredientQty: {
      borderColor: colors.outlineVariant,
      borderWidth: 1,
      width: 40,
      height: 40,
      textAlign: "center",
    },
    ingredientOperator: {
      borderColor: colors.outlineVariant,
      borderWidth: 1,
      width: 40,
      height: 40,
      borderRadius: 0,
    },
  });
