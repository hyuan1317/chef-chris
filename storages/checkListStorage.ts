import AsyncStorage from "@react-native-async-storage/async-storage";
import { CheckListState } from "@components/groceryList/types";

export const CHECK_LIST = "CHECK_LIST";

export const getStorageLists = async (): Promise<CheckListState[]> => {
  try {
    const storageLists = await AsyncStorage.getItem(CHECK_LIST);
    return storageLists ? JSON.parse(storageLists) : [];
  } catch {
    // error
  }
};

export const deleteCheckListById = async (id: number) => {
  const lists = await getStorageLists();
  const newLists = lists.filter((l) => l.planId !== id);
  try {
    await AsyncStorage.setItem(CHECK_LIST, JSON.stringify(newLists));
  } catch {
    // error
  }
};

export const syncListToStorage = async (
  list: CheckListState
): Promise<void> => {
  const lists = await getStorageLists();
  const targetList = lists.find((l) => l.planId === list.planId);
  if (targetList) {
    targetList.checklist = list.checklist;
  } else {
    lists.push(list);
  }
  try {
    await AsyncStorage.setItem(CHECK_LIST, JSON.stringify(lists));
  } catch {
    // error
  }
};
