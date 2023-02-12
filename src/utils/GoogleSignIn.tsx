import { rollbar } from "@/rollbar";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import Config from "../../Env";

GoogleSignin.configure({
  webClientId: Config.webClientId
});

export async function onGoogleButtonPress() {
  // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
    // Sign-in the user with the credential
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Create a Google credential with the token
    return auth().signInWithCredential(googleCredential);
}

export async function onLogout() {
  return auth().signOut();
}
