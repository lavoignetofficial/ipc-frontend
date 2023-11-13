/* eslint-disable react/jsx-pascal-case */
import TEST from "./src/testTemplate";
import REPORT from "./src/reportTemplate";
import ZONAS from "./src/zonasTemplate";
import ELEMENTOS from "./src/elementosTemplate";
import COMENTARIOS from "./src/comentariosTemplate";
import FORMULARIO from "./src/formularioTemplate";
import GESTION from "./src/gestionTemplate";
import EDITARFORM from "./src/editarFormTemplate";
import CONTACT from "./src/contactTemplate";

const Componente = ({nombre}) => {
    switch(nombre){
        case COMENTARIOS.nombre:
            return (<COMENTARIOS.template />);
        case GESTION.nombre:
            return (<GESTION.template />);
        case ELEMENTOS.nombre:
            return (<ELEMENTOS.template />);
        case FORMULARIO.nombre:
            return (<FORMULARIO.template />);
        case REPORT.nombre:
            return (<REPORT.template />);
        case TEST.nombre:
            return (<TEST.template />);
        case ZONAS.nombre:
            return (<ZONAS.template />);
        case EDITARFORM.nombre:
            return (<EDITARFORM.template />);
        case CONTACT.nombre:
            return (<CONTACT.template />);
        default:
            return (<div>
                <p>Plantilla por default</p>
            </div>);
    }
}

export default Componente;