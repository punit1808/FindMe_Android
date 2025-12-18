import { View, Text, StyleSheet } from "react-native";

export default function AuthHero() {
  return (
    <View style={styles.hero}>
      <Text style={styles.title}>
        Coordinate with your group in real time
      </Text>
      <Text style={styles.subtitle}>
        Create groups, share your live location, and see your team on the map
        with instant updates.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: "#4f46e5",
    paddingVertical: 40,
    paddingHorizontal: 20,
    margin: 5,
    borderRadius: 10
  },
  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    color: "#e0e7ff",
    textAlign: "center",
    fontSize: 15,
  },
});
