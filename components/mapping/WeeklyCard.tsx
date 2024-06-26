import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  location: string;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl, location }) => {
  const [buttonOpacity, setButtonOpacity] = useState(1);
  const [buttonText, setButtonText] = useState("Check in");

  const handleButton = () => {
    try {
      setButtonOpacity(buttonOpacity === 1 ? 0.5 : 1);
      setButtonText(buttonText === "Check in" ? "Checked in" : "Check in");
      toast.success("Yayy! You have checked in successfully!", {
        position: "top-right",
      });
    } catch {
      toast.error("Oops! Something went wrong!", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="rounded-[20px] p-3 bg-white mb-8">
      <img src={imageUrl} alt="card img" className="rounded-[20px]" />
      <div className="flex justify-between mt-8">
        <p className="text-xl font-bold">{title}</p>
        <div className="flex justify-end gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
          <div>{location}</div>
        </div>
      </div>
      <p className="mt-6">{description}</p>
      <div className="flex justify-between mt-8">
        <button
          className="rounded-[20px] w-40 bg-[#4A37BE]"
          onClick={handleButton}
          style={{ opacity: buttonOpacity }}
        >
          {buttonText}
        </button>
        <p className="text-lg">10 Tickets</p>
      </div>
    </div>
  );
};

export default Card;
