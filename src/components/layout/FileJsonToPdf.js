import React from 'react';
import { jsPDF } from 'jspdf';
import contraportada from '../../img/jsonToPdf/contraportada.png'
import footer from '../../img/jsonToPdf/footer.png'
import portada from '../../img/jsonToPdf/portada.jpg'
import logo from '../../img/icon-menu.png'
import cert1 from '../../img/jsonToPdf/cert1.png'
import verde from '../../img/jsonToPdf/semaforo/verde.png'
import amarillo from '../../img/jsonToPdf/semaforo/amarillo.png'
import naranja from '../../img/jsonToPdf/semaforo/naranja.png'
import azul from '../../img/jsonToPdf/semaforo/azul.png'
import roja from '../../img/jsonToPdf/semaforo/rojo.png'
import {toDate} from '../../functions'

const IsPar = (value) =>{
    if (value%2==0) {
        return true;
    } else {
        return false
    }
}

export const printFile = (data, clientes, usuario, array, spin) => {
    const PDF = new jsPDF();
    const semaforo = (state) =>{
        switch(state){
            case "verde":
                return verde
            case "amarillo":
                return amarillo
            case "naranja":
                return naranja
            case "azul":
                return azul
            case "rojo":
                return roja
            default: 
                return null 
        }
    }
    
    const generateHeader = async () =>{
        const filterClient = clientes.filter(cliente => cliente._id === data.cliente)
        PDF.addImage(portada, 'png', 0, -2, 215, 299)
        PDF.addImage(logo, 'png', 20, 30, 80, 25);
        PDF.addPage();
        PDF.addImage(cert1, 'png', 185, 3, 20, 20);

        PDF.setFont(undefined, 'bold');
        PDF.text("Resumen de inspección", 20, 20);
        PDF.setFontSize(14);
        PDF.setFont(undefined, 'normal');
        PDF.text(`${filterClient[0].nombre}`, 20, 30);
        PDF.text(`${filterClient[0].email}`, 20, 35);
        PDF.setDrawColor(102, 56, 182);
        PDF.line(20, 40, 95, 40);

        PDF.setFont(undefined, 'bold');
        PDF.setFontSize(16);
        PDF.text("Información de la propiedad", 20, 52);
        PDF.setFontSize(14);
        PDF.setFont(undefined, 'normal');
        PDF.text(`Tipo de inspección: ${data.tipoInspeccion === "basic" ? "Básica" : "Avanzada"}`, 20, 57);
        PDF.text(`Tipo de Inmueble: ${data.tipoInmueble}`, 20, 62);
        PDF.text(`Tamaño: ${data.construccion} m2`, 20, 67);
        PDF.text(`Dirección:${filterClient[0].direccion}, Col. ${filterClient[0].colonia}, ${filterClient[0].ciudad}`, 20, 72);
        PDF.text(`Fecha y hora:${toDate(data.createAt)}`, 20, 77);
        PDF.setDrawColor(102, 56, 182);
        PDF.line(20, 82, 95, 82);

        PDF.setFont(undefined, 'bold');
        PDF.setFontSize(16);
        PDF.text("Información del inspector", 20, 92);
        PDF.setFontSize(14);
        PDF.setFont(undefined, 'normal');
        PDF.text(`Nombre: ${usuario.nombre}`, 20, 97);
        PDF.text(`Contacto: ${usuario.email}`, 20, 102);
        PDF.setDrawColor(102, 56, 182);
        PDF.line(20, 107, 95, 107);

        PDF.setFont(undefined, 'bold');
        PDF.setFontSize(16);
        PDF.text("Semáforo de inspección", 20, 130);
        PDF.line(20, 135, 95, 135);
        
        PDF.setFont(undefined, 'normal');
        PDF.setFontSize(10);

        let position = {
            verde: {x:25, y:145},
            amarillo: {x:60, y:145},
            naranja: {x:95, y:145},
            azul: {x:130, y:145},
            rojo: {x:165, y:145}
        }

        PDF.addImage(verde, 'png', position.verde.x, position.verde.y, 15, 15);
        PDF.setDrawColor(0, 176, 80);
        PDF.line(position.verde.x +3, position.verde.y + 11, position.verde.x+3, position.verde.y + 25);
        PDF.line(position.verde.x +3, position.verde.y + 25, position.verde.x+4, position.verde.y + 26);
        PDF.line(position.verde.x +4, position.verde.y + 26, position.verde.x+11, position.verde.y + 26);
        PDF.line(position.verde.x +11, position.verde.y + 26, position.verde.x+12, position.verde.y + 25);
        PDF.line(position.verde.x +12, position.verde.y + 25, position.verde.x+12, position.verde.y + 11);
        PDF.text("10", position.verde.x +5, position.verde.y+21);
        PDF.text("Elementos", position.verde.x, position.verde.y + 30);
        PDF.text("en", 31, position.verde.y + 33);
        PDF.text("excelente", position.verde.x+2, position.verde.y + 36);
        PDF.text("estado", position.verde.x+3, position.verde.y + 40);

        PDF.addImage(amarillo, 'png', position.amarillo.x, position.amarillo.y, 15, 15);
        PDF.setDrawColor(255, 255, 0);
        PDF.line(position.amarillo.x +3, position.amarillo.y + 11, position.amarillo.x+3, position.amarillo.y + 25);
        PDF.line(position.amarillo.x +3, position.amarillo.y + 25, position.amarillo.x+4, position.amarillo.y + 26);
        PDF.line(position.amarillo.x +4, position.amarillo.y + 26, position.amarillo.x+11, position.amarillo.y + 26);
        PDF.line(position.amarillo.x +11, position.amarillo.y + 26, position.amarillo.x+12, position.amarillo.y + 25);
        PDF.line(position.amarillo.x +12, position.amarillo.y + 25, position.amarillo.x+12, position.amarillo.y + 11);
        PDF.text("9", position.amarillo.x + 6, position.amarillo.y+21);
        PDF.text("Elementos", position.amarillo.x, position.amarillo.y + 30);
        PDF.text("en buen", position.amarillo.x + 2, position.amarillo.y + 33);
        PDF.text("estado", position.amarillo.x + 2, position.amarillo.y + 36);

        PDF.addImage(naranja, 'png', position.naranja.x, position.naranja.y, 15, 15);
        PDF.setDrawColor(230, 127, 24);
        PDF.line(position.naranja.x +3, position.naranja.y + 11, position.naranja.x+3, position.naranja.y + 25);
        PDF.line(position.naranja.x +3, position.naranja.y + 25, position.naranja.x+4, position.naranja.y + 26);
        PDF.line(position.naranja.x +4, position.naranja.y + 26, position.naranja.x+11, position.naranja.y + 26);
        PDF.line(position.naranja.x +11, position.naranja.y + 26, position.naranja.x+12, position.naranja.y + 25);
        PDF.line(position.naranja.x +12, position.naranja.y + 25, position.naranja.x+12, position.naranja.y + 11);
        PDF.text("8", position.naranja.x +6, position.naranja.y+21);
        PDF.text("Elementos", position.naranja.x, position.naranja.y + 30);
        PDF.text("que exigen", position.naranja.x -1, position.naranja.y+33);
        PDF.text("atención", position.naranja.x+2, position.naranja.y+36);

        PDF.addImage(azul, 'png', position.azul.x, position.azul.y, 15, 15);
        PDF.setDrawColor(68, 114, 196);
        PDF.line(position.azul.x +3, position.azul.y + 11, position.azul.x+3, position.azul.y + 25);
        PDF.line(position.azul.x +3, position.azul.y + 25, position.azul.x+4, position.azul.y + 26);
        PDF.line(position.azul.x +4, position.azul.y + 26, position.azul.x+11, position.azul.y + 26);
        PDF.line(position.azul.x +11, position.azul.y + 26, position.azul.x+12, position.azul.y + 25);
        PDF.line(position.azul.x +12, position.azul.y + 25, position.azul.x+12, position.azul.y + 13);
        PDF.text("8", position.azul.x +6, position.azul.y+21);
        PDF.text("Elementos con", position.azul.x - 3, position.azul.y+30);
        PDF.text("necesidad de", position.azul.x -2, position.azul.y+33);
        PDF.text("mantenimiento", position.azul.x-3, position.azul.y+36);
        
        PDF.addImage(roja, 'png', position.rojo.x, position.rojo.y, 15, 15);
        PDF.setDrawColor(255, 0, 0);
        PDF.line(position.rojo.x +3, position.rojo.y + 13, position.rojo.x+3, position.rojo.y + 25);
        PDF.line(position.rojo.x +3, position.rojo.y + 25, position.rojo.x+4, position.rojo.y + 26);
        PDF.line(position.rojo.x +4, position.rojo.y + 26, position.rojo.x+11, position.rojo.y + 26);
        PDF.line(position.rojo.x +11, position.rojo.y + 26, position.rojo.x+12, position.rojo.y + 25);
        PDF.line(position.rojo.x +12, position.rojo.y + 25, position.rojo.x+12, position.rojo.y + 13);
        PDF.text("8", position.rojo.x +6, position.rojo.y+21);
        PDF.text("Elementos con", position.rojo.x, position.rojo.y+30);
        PDF.text("en", position.rojo.x +6, position.rojo.y+33);
        PDF.text("peligro", position.rojo.x+3, position.rojo.y+36);

        PDF.addImage(footer, 'png',  0, 218, 215, 90);

        PDF.addPage();
        PDF.setFontSize(14);
        PDF.setFont(undefined, 'bold');
        PDF.text("Resumen de elementos inspeccionados", 20, 20);
        PDF.setDrawColor(102, 56, 182);
        PDF.line(20, 23, 190, 23);
        if(data.items.length > 0){
            data.items.map((item,n) => {
                PDF.setFont(undefined, 'normal');
                PDF.setFontSize(12);
                let color = semaforo(item.data['Semáforo'])
                PDF.addImage(color, 'png', 20, 25 + (n*7), 5, 5);
                PDF.text(`${item.name}`, 30, 28 + (n*7))
                console.log(n)
            })
        }
    }

    const generateFooter = () =>{
        let position = {
            monterrey: 195,
            riviera: 220,
            matamoros: 245,
            cdVictoria: 270
        }
        PDF.addPage();
        PDF.addImage(contraportada, 'png', 0, -2, 215, 299)
        PDF.addImage(logo, 'png', 20, 130, 80, 25);
        PDF.setTextColor(255,255,255);
        PDF.setFontSize(10);
        PDF.text("contacto@inspeccionprecompra.com", 20, 180);
        PDF.text("Monterrey", 20, position.monterrey);
        PDF.text("Pedro Martínez", 20, position.monterrey + 5);
        PDF.text("Tigres Fracc. Estadio, Monterrey, Nuevo León 64700, México", 20, position.monterrey + 10);
        PDF.text("+5218341677147", 20, position.monterrey + 15);
        PDF.text("Riviera Maya", 20, position.riviera);
        PDF.text("Jose Alfredo Castillo Ferretiz", 20, position.riviera + 5);
        PDF.text("Privada Marfil, Calle 02 lt 01 Mz 02, La Joya, Playa del Carmen, México", 20, position.riviera + 10);
        PDF.text("+52 833 188 0312", 20, position.riviera + 15);
        PDF.text("Matamoros", 20, position.matamoros);
        PDF.text("Jorge Alberto Peña Jara", 20, position.matamoros + 5);
        PDF.text("Sexta no.800, entre Independencia y Victoria, Z. Centro 87300, México", 20, position.matamoros + 10);
        PDF.text("868 828 0420", 20, position.matamoros + 15);
        PDF.text("Ciudad Victoria", 20, position.cdVictoria);
        PDF.text("Felipe Rodríguez Ruiz", 20, position.cdVictoria +5);
        PDF.text("Matías S Canales 532 Zona Centro, Victoria Tamaulipas 837000, México", 20, position.cdVictoria +10);
        PDF.text("+52 1 834 126 3387", 20, position.cdVictoria + 15);
        PDF.save("ipc-report.pdf");
    }

    const getImagesBucket = async () =>{
        let item = data.items;
        let position = {
            par: 20,
            impar: 152
        }
        array.map((itm, n) =>{
            let filterItem = item.filter(item => item.data["name-item"] === itm.id)
            
            if(!IsPar(n+1)){
                PDF.addPage()
                PDF.addImage(semaforo(filterItem[0].data["Semáforo"]) , 'JPEG', 180, position.par + 8, 10, 10);
                PDF.setFontSize(14);
                PDF.setFont(undefined, 'bold');
                PDF.text(`${filterItem[0].zona.nombre}`, 20, position.par);
                PDF.setDrawColor(102, 56, 182);
                PDF.line(20, position.par + 3 , 195, position.par + 3);
                PDF.setFontSize(12);
                PDF.text(`${filterItem[0].name}`, 20, position.par + 10);
                PDF.setFont(undefined, 'normal');
                PDF.text(`Clasificación: ${filterItem[0].data["Clasificación"]}`, 20, position.par + 15);
                PDF.text(`Observaciones: ${filterItem[0].data.Observaciones}`, 20, position.par + 20);
                PDF.text(`Normas de referencia: ${filterItem[0].data["Normas de referencia"]}`, 20, position.par + 25);
                PDF.addImage(itm.src , 'JPEG', 65, position.par + 35, 70, 70);
            }else{
                PDF.setFontSize(14);
                PDF.addImage(semaforo(filterItem[0].data["Semáforo"]) , 'JPEG', 180, position.impar + 8, 10, 10);
                PDF.setFont(undefined, 'bold');
                PDF.text(`${filterItem[0].zona.nombre}`, 20, position.impar);
                PDF.setDrawColor(102, 56, 182);
                PDF.line(20, position.impar + 3, 195, position.impar + 3);
                PDF.setFontSize(12);
                PDF.text(`${filterItem[0].name}`, 20, position.impar + 10);
                PDF.setFont(undefined, 'normal');
                PDF.text(`Clasificación: ${filterItem[0].data["Clasificación"]}`, 20, position.impar + 15);
                PDF.text(`Observaciones: ${filterItem[0].data.Observaciones}`, 20, position.impar + 20);
                PDF.text(`Normas de referencia: ${filterItem[0].data["Normas de referencia"]}`, 20, position.impar + 25);
                PDF.addImage(itm.src , 'JPEG', 65, position.impar + 35, 70, 70);
            }
        })
    }

    generateHeader()
    getImagesBucket()
    setTimeout(()=>{
        generateFooter()
        spin(false)
    },3000)
}

