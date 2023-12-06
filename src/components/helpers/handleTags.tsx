import { Typography } from "antd";
import { v4 as uuidv4 } from "uuid";
const { Text } = Typography;

export const handleTags = (string: string, func?: (param: string) => void) => {
  return string.split("#").map((text, index) => {
    if (index > 0) {
      return text.split(" ").map((word, i) => {
        if (i === 0) {
          func && func(word);
          return (
            <Text key={uuidv4()} type="success">
              {" "}
              {word}
            </Text>
          );
        }
        return <Text key={uuidv4()}> {word}</Text>;
      });
    }
    return text && <Text key={uuidv4()}> {text}</Text>;
  });
};
