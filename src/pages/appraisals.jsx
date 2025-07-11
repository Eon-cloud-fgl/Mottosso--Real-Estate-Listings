import "../styles/pagegeneral.css";
import "../styles/appraisals.css";
export default function Appraisals() {
    return (
        <>
        <Banner/>
        <Paragraphs/>
        </>

    )
}

function Banner() {
    return(
        <div className="container"> 
            <div className="fondo-texto" id="titulo-tasaciones">
                <h2>Solicitacion de tasaciones</h2>
            </div>
        </div>
    );
}


function Paragraphs(){
    return(
        
        <div id="divfather">
            
            <section>
                <article>
                    <div>
                        <p>Realizamos el analisis de su inmueble, para 
                        brindar un valor real del mercado, tomando 
                        en cuenta la ubicacion, superficie y 
                        comodidades.</p>
                    </div>
                </article>
            </section>
        
            <section>
                <article>
                <div className="fondo-texto" className="sinpadding">
                    <p>No lo dudes mas, la inversion es el
                    exito que te espera</p>
                </div>
            </article>
            </section>
            
            <section>
                <article>
                    <div>
                        <p>No lo dudes mas, la inversion es el
                        exito que te espera</p>
                    </div>
                </article>
            </section>
        </div>
    );
}
