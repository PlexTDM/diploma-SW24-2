import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [foodInfo, setFoodInfo] = useState<any>(null);

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  async function handleBarcodeScanned({ data }: { data: string }) {
    if (scanned) return;
    setScanned(true);
    setFoodInfo(null); // хуучин мэдээллийг устгана

    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/api/v0/product/${data}.json`
      );
      const json = await response.json();

      console.log("Full product info:", json);

      if (json.status === 1 && json.product) {
        setFoodInfo(json.product);
      } else {
        alert("Бүтээгдэхүүн олдсонгүй!");
        setFoodInfo(null);
        setScanned(false);
      }
    } catch (err) {
      console.log("Error fetching product", err);
      alert("Алдаа гарлаа. Сүлжээг шалгана уу.");
      setScanned(false);
    }
  }

  return (
    <View style={styles.container}>
      {!foodInfo ? (
        <CameraView
          style={styles.camera}
          facing={facing}
          barcodeScannerSettings={{
            barcodeTypes: ["ean13", "ean8", "upc_a", "upc_e"],
          }}
          onBarcodeScanned={handleBarcodeScanned}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      ) : (
        <ScrollView contentContainerStyle={styles.infoContainer}>
          <Text style={styles.title}>{foodInfo.product_name || "Нэр олдсонгүй"}</Text>
          <Text>Brand: {foodInfo.brands || "Unknown"}</Text>

          {foodInfo.image_url ? (
            <Image source={{ uri: foodInfo.image_url }} style={styles.image} />
          ) : null}

          <Text>Calories: {foodInfo.nutriments?.energy_kcal || "?"} kcal</Text>
          <Text>Ingredients: {foodInfo.ingredients_text || "Not available"}</Text>
          <Text>
            Nutri Score: {foodInfo.nutriscore_grade?.toUpperCase() || "?"}
          </Text>
          <Text>Serving Size: {foodInfo.serving_size || "?"}</Text>

          <Button
            title="Scan Another"
            onPress={() => {
              setFoodInfo(null);
              setScanned(false);
            }}
          />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  message: { textAlign: "center", paddingBottom: 10 },
  camera: { flex: 1 },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: { fontSize: 24, fontWeight: "bold", color: "white" },
  infoContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: { width: 200, height: 200, marginVertical: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
});
