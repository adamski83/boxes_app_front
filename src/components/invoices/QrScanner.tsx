import { useNavigate } from "react-router-dom";
import { Scanner } from "@yudiel/react-qr-scanner";

interface QrScannerProps {
  onScan: (data: string) => void;
}
interface QrScannerProps {
  onScan: (data: string) => void;
}

const QrScanner: React.FC<QrScannerProps> = ({ onScan }) => {
  const navigate = useNavigate();
  const handleScan = (data: string | null) => {
    if (!data) {
      return <p>not found any data to scan</p>;
    }
    if (data) {
      onScan(data);
      navigate(`/edit/${data}`);
    }
  };
  return <Scanner onScan={(data) => handleScan(data[0].rawValue)} />;
};

export default QrScanner;
