import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import WebView from "react-native-webview";
import { Camera, useCameraPermissions } from "expo-camera";

const API_KEY = "29e1ca53-d185-46f8-b8a2-cf97d47ee249";
const POSETRACKER_API = "https://app.posetracker.com/pose_tracker/tracking";
const { width, height } = Dimensions.get("window");

export default function CameraTracking() {
  const [poseTrackerInfos, setCurrentPoseTrackerInfos] = useState<any>(null);
  const [repsCounter, setRepsCounter] = useState(0);
  const [permission, requestPermission] = useCameraPermissions();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [requestPermission, permission]);

  const exercise = "squat";
  const difficulty = "easy";
  const skeleton = "&skeleton=default";

  const posetracker_url = `${POSETRACKER_API}?token=${API_KEY}&exercise=${exercise}&difficulty=${difficulty}&width=${width}&height=${height}&isMobile=${true}${skeleton}`;

  const jsBridge = `
    window.addEventListener('message', function(event) {
      window.ReactNativeWebView.postMessage(JSON.stringify(event.data));
    });

    window.webViewCallback = function(data) {
      window.ReactNativeWebView.postMessage(JSON.stringify(data));
    };

    const originalPostMessage = window.postMessage;
    window.postMessage = function(data) {
      window.ReactNativeWebView.postMessage(typeof data === 'string' ? data : JSON.stringify(data));
    };

    true;
  `;

  const handleCounter = (count: number) => {
    setRepsCounter(count);
  };

  const handleInfos = (infos: any) => {
    setCurrentPoseTrackerInfos(infos);
    console.log("Received infos:", infos);
  };

  const webViewCallback = (info: any) => {
    if (info?.type === "counter") {
      handleCounter(info.current_count);
    } else {
      handleInfos(info);
    }
  };

  const onMessage = (event: any) => {
    try {
      let parsedData;
      if (typeof event.nativeEvent.data === "string") {
        parsedData = JSON.parse(event.nativeEvent.data);
      } else {
        parsedData = event.nativeEvent.data;
      }

      console.log("Parsed data:", parsedData);
      webViewCallback(parsedData);
    } catch (error) {
      console.error("Error processing message:", error);
      console.log("Problematic data:", event.nativeEvent.data);
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        style={styles.webView}
        source={{ uri: posetracker_url }}
        originWhitelist={["*"]}
        injectedJavaScript={jsBridge}
        onMessage={onMessage}
        // Activer le debug pour voir les logs WebView
        debuggingEnabled={true}
        // Permettre les communications mixtes HTTP/HTTPS si nécessaire
        mixedContentMode="compatibility"
        // Ajouter un gestionnaire d'erreurs
        onError={(syntheticEvent: any) => {
          const { nativeEvent } = syntheticEvent;
          console.warn("WebView error:", nativeEvent);
        }}
        // Ajouter un gestionnaire pour les erreurs de chargement
        onLoadingError={(syntheticEvent: any) => {
          const { nativeEvent } = syntheticEvent;
          console.warn("WebView loading error:", nativeEvent);
        }}
      />
      <View style={styles.infoContainer}>
        <Text>
          Status : {!poseTrackerInfos ? "loading AI..." : "AI Running"}
        </Text>
        <Text>
          Info type :{" "}
          {!poseTrackerInfos ? "loading AI..." : poseTrackerInfos.type}
        </Text>
        <Text>Counter: {repsCounter}</Text>
        {poseTrackerInfos?.ready === false ? (
          <>
            <Text>Placement ready: false</Text>
            <Text>
              Placement info: Move {poseTrackerInfos?.postureDirection}
            </Text>
          </>
        ) : (
          <>
            <Text>Placement ready: true</Text>
            <Text>Placement info: You can start doing squats 🏋️</Text>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  webView: {
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  infoContainer: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 2,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 10,
  },
});
