import { usePlan } from "@components/plans/PlanContext";
import { PlanDetail } from "@components/plans/types";
import PlanForm from "@components/plans/PlanForm";
import { useEditPlan } from "@components/plans/EditPlanContext";
import { useEffect } from "react";

const NewPlan = () => {
  const { createPlan } = usePlan();
  const { setEditPlanState } = useEditPlan();

  useEffect(() => {
    setEditPlanState((prev) => ({
      ...prev,
      name: "New Plan",
    }));
  }, []);

  const handleOnCreate = async (plan: PlanDetail) => {
    createPlan(plan);
  };

  return <PlanForm submitTItle="Create" onSubmit={handleOnCreate} />;
};

export default NewPlan;
