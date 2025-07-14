import "../styles/appraisals.css";
import { useState } from "react";
export default function Appraisals() {
    return (
        <>

        <header>
            <Banner/>
        </header>

        <main>
            <div className="flex-wrapper">
                <Description />
                <Data_box />
            </div>
        </main>

        </>
    )
}

// Creammos un banner para la pagina de tasaciones, tiene un titulo y un fondo de color
function Banner() {
    return(
        <div className="container"> 
            <div className="fondo-texto" id="titulo-tasaciones">
                <h2>Solicitacion de tasaciones</h2>
            </div>
        </div>
    );
}
// El componente que llama los parrafos principales de la pagina de tasaciones 
function Description() {
    return (
        <div className="container">
            <DescriptionItem/>
        </div>
    )  

}

// Este es el componente que crea los parrafos que se muestran en la pagina de tasaciones, son tres articulos con un texto cada uno
// el primer y tercer articulo tiene un id que le da un estilo de texto alineado a la izquierda
// el segundo articulo tiene un id que le da un estilo de texto sin padding y un color de fondo
function DescriptionItem() {
    return (
        <div classname="paragraphs" id="text-left">
            <article>
                <div  className="text-corrections">
                    <p>Realizamos el análisis de su inmueble, para <br/>
                    brindar un valor real del mercado, tomando <br/>
                    en cuenta la ubicación, superficie y <br/>
                    comodidades.</p>
                </div>
            </article>
            
            <article>
                <div className="fondo-texto" id="sinpadding">
                    <p>No lo dudes más, la inversión es el <br/>
                    éxito que te espera</p>
                </div>
            </article>

            <article>
                <div className="text-corrections">
                    <p>Lo asesoraremos como es debido y le <br/>
                    haremos saber que le conviene mas</p>
                </div>  
            </article>
        </div>
        
    )
}


// Este es el componente que crea el formulario de tasaciones, tiene dos titulos y un boton de submit
function Form(){
    return(
        <div>

            <div className="form-title">
                <h2>Datos del solicitante</h2>
            </div>

            <div className="form-wrapper">
                <form id="form-container">

                
                    <Text_camp type="text"  placeholder="Nombre y apellido / Razon social"/>
                    <Text_camp  type="text" placeholder="Email"/>
                    <Text_camp  type="text" placeholder="Telefono"/>
                
                    <div className="form-title">
                        <h3>Datos de inmueble</h3>
                    </div>

                    <Text_camp placeholder="Tipo de inmueble"/>
                    <Text_camp placeholder="Datos castrales si los posee"/>
                
                    <div className="form-title">
                        <h3>Comentarios</h3>
                    </div>

                    <div className="comment-box">
                        <CommentBox/>
                    </div>
                </form>
            </div>
        </div>

    )
}

function Text_camp({placeholder}){
    return (
        <input type="text" placeholder={placeholder}/>
    )
}

// Creamos un componente que maneja el cuadro de texto para comentarios 
function CommentBox(){
    
    const [comment, setComment] = useState("");

    // Esta funcion manipula el cambio y la carga del valor que va a insertar el usuario en la caja de comentarios (lo almacena en comment)
    const handleChange = (e) => {
        setComment(e.target.value);
    }

    // Esta funcion maneja el envio del formulario, en este caso solo imprime el comentario en la consola y limpia el campo de comentario
    // En una aplicacion real, aqui se enviaria el comentario a un servidor o se guardaria en una base de datos
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Comentario enviado:", comment);
        setComment(""); 
    };

    return (
        <div div="comment-box">
        <form onSubmit={handleSubmit}>
            <label htmlFor=" Comentarios Adicionales:"></label>
            <textarea 
            id="comment"
            value={comment}
            onChange={handleChange}
            placeholder="Escribí acá tu opinión o duda..."
            />
            <div>
                <button type="submit">solicitud de tasacion</button>
            </div>
        </form>
        </div>
    );
}

function Data_box() {
    return (
        <div>
            <Form/>
        </div>
    )
    }

