import "../styles/home.css";

function Banner(){
    return(
            <div className="contenedor-titulo-encabezado">
                <p>Propiedades</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mottoso</p>
            </div>   
        );
}

function MisItems() {
    return(
        <>
        <div className="contenedor-menor">
        <div className="contenedor-imagen">
            <img src="/casa.avif" alt="casa" />
        </div>
        <p id="item-titulo">Informacion</p>
        <p id="item-info">Informacion sobre las novedades y funciones de la pagina Mottoso.</p>
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
     <MisItems/>
     <MisItems/>
     <MisItems/>
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