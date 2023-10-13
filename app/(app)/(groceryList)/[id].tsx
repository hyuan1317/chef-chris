import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { usePlan } from "@components/plans/PlanContext";
import { useCheckList } from "@components/groceryList/CheckListContext";
import { FlatList } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";
import ListItem from "@components/groceryList/ListItem";

const GroceyList = () => {
  const { id } = useLocalSearchParams();
  const { plans } = usePlan();
  const { list, setupCheckList, checkListItem, unCheckListItem } =
    useCheckList();
  const theme = useTheme();
  const style = makeStyles(theme.colors);

  const plan = plans.find((m) => m.id === Number(id));
  useEffect(() => {
    setupCheckList(plan);
  }, []);

  const handleOnPress = (id: number, checked: boolean) => {
    if (checked) {
      unCheckListItem(id);
    } else {
      checkListItem(id);
    }
  };

  return (
    <View>
      <Stack.Screen options={{ title: plan.name }} />
      <FlatList
        contentContainerStyle={style.container}
        ItemSeparatorComponent={() => <View style={style.separator} />}
        data={Object.values(list.checklist)}
        renderItem={({ item }) => (
          <ListItem item={item} onPress={handleOnPress} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default GroceyList;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      padding: 12,
    },
    separator: {
      height: 8,
    },
  });
