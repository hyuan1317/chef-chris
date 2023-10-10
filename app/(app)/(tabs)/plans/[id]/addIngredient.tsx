import AddIngredientView from "@components/ingredient/AddIngredientView";
import { useEditPlan } from "@components/plans/EditPlanContext";
import { Ingredient } from "@components/ingredient/types";

const AddIngredient = () => {
  const { setEditPlanState } = useEditPlan();

  const handleOnSelect = (item: Ingredient) => {
    setEditPlanState((prev) => {
      const newPlanDetails = { ...prev };
      newPlanDetails.ingredients[item.id] = {
        ...item,
        quantity: 1,
      };
      return newPlanDetails;
    });
  };

  return <AddIngredientView onSelect={handleOnSelect} />;
};

export default AddIngredient;
