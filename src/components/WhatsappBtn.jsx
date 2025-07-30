import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import "../styles/whatsappbtn.css";

export default function WhatsAppButton({ phone, message = "" }) {

  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const url = `https://api.whatsapp.com/send?phone=${phone}${
      message ? `&text=${encodedMessage}` : ""
    }`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <button className="btn-wsp" onClick={handleClick}>
      <FaWhatsapp /> Contactar
    </button>
  );
}

