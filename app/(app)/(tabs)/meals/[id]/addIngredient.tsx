import { useEditMeal } from "@components/meals/EditMealContext";
import { Ingredient } from "@components/ingredient/types";
import AddIngredientView from "@components/ingredient/AddIngredientView";

const AddIngredient = () => {
  const { setEditMealState } = useEditMeal();

  const handleOnSelect = (item: Ingredient) => {
    setEditMealState((prev) => {
      const newMealDetails = { ...prev };
      newMealDetails.ingredients[item.id] = {
        ...item,
        quantity: 1,
      };
      return newMealDetails;
    });
  };

  return <AddIngredientView onSelect={handleOnSelect} />;
};

export default AddIngredient;
