import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

export const useCameraDevices = () => {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string>("");

  useEffect(() => {
    const getDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );
        setDevices(videoDevices);
        if (videoDevices.length > 0) {
          setSelectedDevice(videoDevices[0].deviceId);
        }
      } catch (error) {
        console.error("Error getting devices:", error);
        toast({
          variant: "destructive",
          title: "Camera Error",
          description: "Unable to access camera devices",
        });
      }
    };

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => getDevices())
      .catch((error) => {
        console.error("Camera permission denied:", error);
        toast({
          variant: "destructive",
          title: "Camera Access Denied",
          description: "Please allow camera access to scan barcodes",
        });
      });
  }, []);

  return { devices, selectedDevice, setSelectedDevice };
};