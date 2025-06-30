import GoogleSigninSignup from "@/components/GoogleSignin-Signup";
import { StyleSheet, View } from "react-native";

const App = () => {
 

  return (
    <View style={styles.container}>
      <GoogleSigninSignup />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 16,
  },
});

export default App;
