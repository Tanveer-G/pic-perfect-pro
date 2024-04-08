const grayscaleUrl = `http://localhost:3000/api/filter?filtertype=grayscale&value=grayscale`;
import ReadonlyField from "../../ReadonlyField";

export default function Grayscale() {
  return <ReadonlyField apiUrl={grayscaleUrl} />;
}
