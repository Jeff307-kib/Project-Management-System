import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <AlertCircle className="w-20 h-20 text-red-500 mb-6" />
      <h1 className="text-5xl font-extrabold text-gray-800 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-6 text-center">
        Oops! The page you are looking for does not exist.
      </p>
      <Button 
        className="text-xl cursor-pointer"
        onClick={() => navigate("/")}
      >
        Go Back Home
      </Button>
    </div>
  );
};

export default NotFoundPage;
