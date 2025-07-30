const MapEmbed = () => {
  return (
    <div style={{ borderRadius: '10px', overflow: 'hidden', maxWidth: '100%', width: '1000px', height: '350px' }}>
      <iframe
        title="Ubicación Inmobiliaria"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3212.499993663974!2d-56.72049612332963!3d-36.372888353074956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959c1b154dda6499%3A0x369ec85d5d646157!2sAv.%20Talas%20del%20Tuy%C3%BA%203295%2C%20B7105%20San%20Clemente%20del%20Tuyu%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1753822676361!5m2!1ses!2sar"
        width="100%"
        height="100%"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        style={{ border: 0 }}
      />
    </div>
  );
};

export default MapEmbed;


