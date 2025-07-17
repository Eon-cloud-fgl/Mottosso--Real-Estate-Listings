import "../styles/home.css";

function Banner() {
    return (
        <div className="contenedor-titulo-encabezado">
            <p>Propiedades <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mottoso</p>
        </div>
    );
}

function Description(){
    return (
        <div className="contenedor-descripcion">
            <DescriptionItem />
        </div>
    );
}

function DescriptionItem(){
    return (
        <div className="cd-item">
            <h6>Tu lugar, nuestra prioridad</h6>
            <p>En Mottoso Propiedades te ayudamos a encontrar el lugar ideal para vivir o invertir. Con asesoramiento profesional y una amplia variedad de opciones, hacemos que tu próxima propiedad esté más cerca.</p>
        </div>
    );
}

function MisItems({ imageN, title, info }) {
    return (
        <>
            <div className="contenedor-menor">
                <div className="contenedor-imagen">
                    <img src={`/info-banner-${imageN}.avif`} alt={title} />
                </div>
                <div className="contenedor-article">
                    <p id="item-titulo">{title}</p>
                    <p id="item-info">{info}</p>
                    <div className="contenedor-boton">
                        <button>Conocer Mas</button>
                    </div>
                </div>

            </div>

        </>
    );
}

function Miscellaneous() {
    return (
        <div className="contenedor-mayor">
            <MisItems imageN={1} title="Appraisals" info="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
            <MisItems imageN="1" title="Appraisals" info="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
            <MisItems imageN="1" title="Appraisals" info="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
        </div>
    );
}

export default function Home() {
    return (
        <>
            <header className="fondo-encabezado">
                <Banner />
            </header>
            <main>
                <Description />
                <Miscellaneous />
            </main>
            <footer>
                <p id="text-final">Inversion Asegurada</p>
            </footer>
        </>
    );
}