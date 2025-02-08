import { useSignIn, useSignUp, useSSO } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import {
  Text,
  TextInput,
  Button,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useEffect, useCallback } from "react";
import React from "react";
import * as WebBrowser from "expo-web-browser";

export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Preloads the browser for Android devices to reduce authentication load time
    // See: https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      // Cleanup: closes browser when component unmounts
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const { signUp } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { startSSOFlow } = useSSO();

  useWarmUpBrowser();

  const onGoogleLogin = useCallback(async () => {
    try {
      // Start the authentication process by calling `startSSOFlow()`
      const { createdSessionId, setActive, signIn, signUp } =
        await startSSOFlow({
          strategy: "oauth_google",
        });

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        // If there is no `createdSessionId`,
        // there are missing requirements, such as MFA
        // Use the `signIn` or `signUp` returned from `startSSOFlow`
        // to handle next steps
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  }, []);

  // Handle the submission of the sign-in form
  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded || !signUp) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]);

  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded || !signUp) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded || !signUp) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <>
        <Text>Verify your email</Text>
        <TextInput
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
        />
        <Button title="Verify" onPress={onVerifyPress} />
      </>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.signInTitle}>Access Account</Text>
        <View style={{ rowGap: 4 }}>
          <TextInput
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Enter email"
            placeholderTextColor={"#aaa"}
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
            style={styles.input}
          />
          <TextInput
            value={password}
            placeholder="Enter password"
            placeholderTextColor={"#aaa"}
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            style={styles.input}
          />
        </View>
        <View style={{ alignItems: "center", rowGap: 12 }}>
          <TouchableOpacity onPress={onSignInPress} style={styles.signInButton}>
            <Text style={{ color: "#fff", fontSize: 24 }}>Sign in</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onSignUpPress} style={styles.signUpButton}>
            <Text style={{ color: "#fff", fontSize: 24 }}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onGoogleLogin} style={styles.signUpButton}>
            <Text style={{ color: "#fff", fontSize: 24 }}>ANTEP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  card: {
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 24,
    rowGap: 24,
    height: "60%",
  },
  signInTitle: {
    fontSize: 38,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#640000",
  },
  input: {
    height: 40,
    backgroundColor: "#f0f0f0",
    borderRadius: 16,
    marginBottom: 12,
    paddingLeft: 8,
  },
  signInButton: {
    backgroundColor: "#640000",
    borderRadius: 16,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
  },
  signUpButton: {
    backgroundColor: "#000",
    borderRadius: 16,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
  },
});
