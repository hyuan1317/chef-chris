import { ListItem as ListItemType } from "./types";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import CCText from "@components/shared/CCText";
import { useTheme, Checkbox } from "react-native-paper";

interface Props {
  item: ListItemType;
  onPress: (id: number, checked: boolean) => void;
}

const ListItem = (props: Props) => {
  const {
    item: { id, name, quantity, checked },
    onPress,
  } = props;
  const theme = useTheme();
  const style = makeStyles(theme.colors);

  const handleOnPress = () => {
    onPress(id, checked);
  };

  return (
    <TouchableOpacity style={style.wrapper} onPress={handleOnPress}>
      <View style={style.checkboxContainer}>
        <Checkbox status={checked ? "checked" : "unchecked"} color="#27AE60" />
      </View>
      <CCText style={style.text}>{name}</CCText>
      <View style={style.rowRight}>
        <CCText style={style.text}>X</CCText>
        <CCText style={[style.text, style.quantity]}>{quantity}</CCText>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    wrapper: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 12,
      paddingRight: 20,
      height: 50,
      backgroundColor: colors.background,
      borderRadius: 14,
    },
    checkboxContainer: {
      marginRight: 12,
    },
    text: {
      fontSize: 16,
    },
    quantity: {
      width: 20,
      textAlign: "right",
    },
    rowRight: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
      justifyContent: "flex-end",
    },
  });
