  import { useState, useEffect } from "react";
import { Pedometer } from "expo-sensors";

export function usePedometer() {
  const [isPedometerAvailable, setIsPedometerAvailable] =
    useState<string>("checking");
  const [pastStepCount, setPastStepCount] = useState<number>(0);
  const [currentStepCount, setCurrentStepCount] = useState<number>(0);

  useEffect(() => {
    // get permission
    const getPermission = async () => {
      const { status } = await Pedometer.requestPermissionsAsync();
      console.log("status", status);
      setIsPedometerAvailable(String(status));
    };
    getPermission();
  }, []);

  useEffect(() => {
    let subscription: any = null;

    const subscribe = async () => {
      const isAvailable = await Pedometer.isAvailableAsync();
      setIsPedometerAvailable(String(isAvailable));

      if (isAvailable) {
        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - 1);

        try {
          const pastStepCountResult = await Pedometer.getStepCountAsync(
            start,
            end
          );
          if (pastStepCountResult) {
            setPastStepCount(pastStepCountResult.steps);
          }
        } catch (error) {
          console.warn("Error getting step count:", error);
        }

        subscription = Pedometer.watchStepCount((result) => {
          setCurrentStepCount(result.steps);
        });
      }
    };

    subscribe();

    return () => {
      if (subscription?.remove) {
        subscription.remove();
      }
    };
  }, []);

  return {
    isPedometerAvailable,
    pastStepCount,
    currentStepCount,
  };
}
