const MapEmbed = () => {
  return (
    <div style={{ borderRadius: '10px', overflow: 'hidden', maxWidth: '100%', width: '1000px', height: '350px' }}>
      <iframe
        title="Ubicación Inmobiliaria"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3277.497124550709!2d-58.196604623392346!3d-34.768258466208074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a328a947eae887%3A0x1c0f684213a49484!2sAv.%20Mitre%202450%2C%20B1880EFY%20Berazategui%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1753376137942!5m2!1ses!2sar" 
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


