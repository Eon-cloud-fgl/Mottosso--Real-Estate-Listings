import "../styles/footer.css";
function Footerinfo() {
    return (
        <footer className='footer'>
                <div className='footer-content'>
                    <b>Derechos de autor</b>
                    <b>Telefono</b>
                    <b>Redes Sociales</b>
                    <p>© 2023 Mottoso. Todos los derechos reservados.</p>
                    <p>2252-4852-290</p>
                    <p>mottosopropiedades@gmail.com</p>
                    <p>San Clemente Av. Talas del tuyu a la numeracion N°3295.</p>
                    <p>2252-412-525</p>
                    <p>@mottosopropiedades</p>
                </div>
            </footer>
            );
}
export default function Footer() {
    return (
        <>
            <Footerinfo />
        </>
    );
}