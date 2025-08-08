import React, { useEffect, useState } from 'react';

function OtterTaskTest() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTest = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('https://task-forge-plus.fwh.is/Controller/apiTestController.php'); // cambia por tu URL real
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message || 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchTest();
  }, []);

  return (
    <div style={{ padding: '1rem', fontFamily: 'Arial, sans-serif' }}>
      <h2>Prueba OtterTask API</h2>
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {data && (
        <pre
          style={{
            background: '#f4f4f4',
            padding: '1rem',
            borderRadius: '4px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default OtterTaskTest;
