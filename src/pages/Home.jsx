import "../styles/home.css";

function Banner(){
    return(
            <div className="contenedor-titulo-encabezado">
                <p>Propiedades</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mottoso</p>
            </div>   
        );
}

function MisItems({imageN, title, info}) {
    return(
        <>
        <div className="contenedor-menor">
        <div className="contenedor-imagen">
            <img src={`/info-banner-${imageN}.avif`} alt={title} />
        </div>
        <p id="item-titulo">{title}</p>
        <p id="item-info">{info}</p>
        <div className="contenedor-boton">
            <button>Conocer Mas</button>
        </div>
        </div>
        
        </>
    );
}

function Miscellaneous(){
    return(  
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
        <header  className="fondo-encabezado">
        <Banner />
        </header>
        <main>
        <Miscellaneous />
        <p id="text-final">Inversion Asegurada</p>
        </main>
        <footer>
        
        </footer>
    </>
    );
}