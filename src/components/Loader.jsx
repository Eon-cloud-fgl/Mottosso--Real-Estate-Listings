import "../styles/loader.css";


export default function Loader({ visible = true }) {
    return (

         <div className={`loader${visible ? " loader--visible" : " loader--hidden"}`}>
            <div className="spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}