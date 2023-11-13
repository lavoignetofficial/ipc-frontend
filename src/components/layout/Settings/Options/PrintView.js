import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { printFile } from '../../FileJsonToPdf';
import contraportada from '../../../../img/jsonToPdf/contraportada.png'
import portada from '../../../../img/jsonToPdf/portada.jpg'
import logo from '../../../../img/icon-menu.png'
import { jsPDF } from 'jspdf';

const print = (props) =>{
    const {data, clientes, usuario} = props;
    const PDF = new jsPDF();
    let position = {
        monterrey: 195,
        riviera: 220,
        matamoros: 245,
        cdVictoria: 270
    }

    // PDF.addImage(portada, 'png', 0, -2, 215, 299)
    // PDF.addImage(logo, 'png', 20, 30, 80, 25);
    // PDF.addPage();
    var source = document.querySelector("#test");
    PDF.html(source, {
		callback: function(PDF) {
            PDF.save("ipc-report.pdf")
		},
		    x: 10,
		    y: 325
        }
    )
    // PDF.addPage();
    // PDF.addImage(contraportada, 'png', 0, -2, 215, 299)
    // PDF.addImage(logo, 'png', 20, 130, 80, 25);
    // PDF.setTextColor(255,255,255);
    // PDF.setFontSize(10);
    // PDF.text("contacto@inspeccionprecompra.com", 20, 180);
    // PDF.text("Monterrey", 20, position.monterrey);
    // PDF.text("Pedro Martínez", 20, position.monterrey + 5);
    // PDF.text("Tigres Fracc. Estadio, Monterrey, Nuevo León 64700, México", 20, position.monterrey + 10);
    // PDF.text("+5218341677147", 20, position.monterrey + 15);
    // PDF.text("Riviera Maya", 20, position.riviera);
    // PDF.text("Jose Alfredo Castillo Ferretiz", 20, position.riviera + 5);
    // PDF.text("Privada Marfil, Calle 02 lt 01 Mz 02, La Joya, Playa del Carmen, México", 20, position.riviera + 10);
    // PDF.text("+52 833 188 0312", 20, position.riviera + 15);
    // PDF.text("Matamoros", 20, position.matamoros);
    // PDF.text("Jorge Alberto Peña Jara", 20, position.matamoros + 5);
    // PDF.text("Sexta no.800, entre Independencia y Victoria, Z. Centro 87300, México", 20, position.matamoros + 10);
    // PDF.text("868 828 0420", 20, position.matamoros + 15);
    // PDF.text("Ciudad Victoria", 20, position.cdVictoria);
    // PDF.text("Felipe Rodríguez Ruiz", 20, position.cdVictoria +5);
    // PDF.text("Matías S Canales 532 Zona Centro, Victoria Tamaulipas 837000, México", 20, position.cdVictoria +10);
    // PDF.text("+52 1 834 126 3387", 20, position.cdVictoria + 15);
}
const PrintView = ({props}) => {
    return(
        <Container>
            <Container>
                <Row id="test">
                    <img src={portada} />
                    <p>test</p>
                </Row>
            </Container>
            <Row className="card-template space-display-top">
                <div>
                    <button type="button" onClick={()=>print(props)}>imprimir</button>
                </div>
            </Row>
        </Container>
    )
}

export default PrintView;