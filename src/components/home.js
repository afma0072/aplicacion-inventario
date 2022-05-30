import React, { useEffect, useState, useRef } from "react";

//Primereact
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {Panel} from 'primereact/panel';
import { TransaccionService } from "../service/TransaccionService";
import {PrimeIcons} from 'primereact/api';
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { ProductoService } from "../service/ProductoService";

const Home = () => {

    const [transaccion, setTransaccion] = useState([]);
    const [selectedTransaccion, setSelectedTransaccion] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState('');
    const [tipo, setTipo] = useState(null);
    const [id_producto, setId_producto] = useState(null);
    const [cantidad, setCantidad] = useState(null);
    const [nro_transaccion, setNro_transaccion] = useState(null);
    const [fecha, setFecha] = useState(null);
    const [descripcion, setDescripcion] = useState(null);
    const [status, setStatus] = useState(null);
    const toast = useRef(null);

    const [producto, setProducto] = useState([]);

    const items = [
      {
        label : "Nuevo",
        icon : PrimeIcons.PLUS,
        command : () => {showSaveModal(true)}
      },
      {
        label : "Editar",
        icon : PrimeIcons.PENCIL,
        command : () => {edit()}
      },
      {
        label : "Eliminar",
        icon : PrimeIcons.TRASH,
        command : () => {deleteTransaccion()}
      }
    ];

    useEffect(() => {
        let transaccionService = new TransaccionService();
        transaccionService.getAll().then(res => setTransaccion(res));
    });

    useEffect(() => {
        let productoService = new ProductoService();
        productoService.getAll().then(res => setProducto(res));
    });

    const renderFooter = () => {
      return (
        <div>
          <Button label="Cancelar" icon="pi pi-times" onClick={() => setShowModal(false)} className="p-button-text" />
          <Button label="Guardar" icon="pi pi-check" onClick={() => save()} autoFocus />
        </div>
      );
    }

    const showSaveModal = () => {
        setId('');
        setTipo('');
        setId_producto('');
        setCantidad('');
        setNro_transaccion('');
        setFecha('');
        setDescripcion('');
        setStatus('');
        setShowModal(true);
    };

    const save = () => {
      let transaccion = {};
      if (id !== '') {
        transaccion.id = id;
      }
      transaccion.tipo = tipo;
      transaccion.id_producto = parseInt(id_producto);
      transaccion.cantidad = cantidad;
      transaccion.nro_transaccion = parseInt(nro_transaccion);
      transaccion.fecha = fecha;
      transaccion.descripcion = descripcion;
      transaccion.status = status;     

      let transaccionService = new TransaccionService();
      transaccionService.save(transaccion).then(res => {
        setId('');
        setTipo('');
        setId_producto('');
        setCantidad('');
        setNro_transaccion('');
        setFecha('');
        setDescripcion('');
        setStatus('');
        setShowModal(false);
        toast.current.show({severity:'success', summary: 'Atencion!', detail:'Transaccion registrada correctamente', life: 3000});
      });
    };

    const edit = () => {
      setId(selectedTransaccion.id);
      setTipo(selectedTransaccion.tipo);
      setId_producto(selectedTransaccion.id_producto);
      setCantidad(selectedTransaccion.cantidad);
      setNro_transaccion(selectedTransaccion.nro_transaccion);
      setFecha(selectedTransaccion.fecha);
      setDescripcion(selectedTransaccion.descripcion);
      setStatus(selectedTransaccion.status);
      setShowModal(true);
    };

    const deleteTransaccion = () => {
      let transaccionService = new TransaccionService();
      transaccionService.delete(selectedTransaccion.id).then(res => {
        toast.current.show({severity:'info', summary: 'Atencion!', detail:'Transaccion eliminada correctamente', life: 3000});
      });
    };

    const selectTipo = [
        { opciontipo: "Compra", value: "Compra" },
        { opciontipo: "Venta", value: "Venta" }
      ];
  
      const cambioTipo = (e) => {
          setTipo(e.value)
      };

      let optionsProducto = producto.map(elemento => {    
        return  { value:  `${elemento.id}`, label: `${elemento.nombre}` };
      });

  
      const cambioProducto = (e) => {
        setId_producto(e.value)
    };
  

    const selectStatus = [
      { opcionstatus: "Disponible", value: 1 },
      { opcionstatus: "Agotado", value: 0 }
    ];

    const cambioStatus = (e) => {
        setStatus(e.value)
    };


    return(
        <div style={{width:'80%', margin: '0 auto', marginTop: '20px'}}>

          <Toast ref={toast} />
          <Panel header="Transacciones">
            <Menubar model={items} style={{marginBottom: '20px'}} />
              <DataTable value={transaccion} selectionMode="single" selection={selectedTransaccion} onSelectionChange={e => setSelectedTransaccion(e.value)} dataKey="id" className="p-datatable-gridlines">
                  <Column field="id" align="center" header="ID"></Column>
                  <Column field="tipo" align="center" header="Tipo"></Column>
                  <Column field="id_producto" align="center" header="Producto"></Column>
                  <Column field="cantidad" align="center" header="Cantidad"></Column>
                  <Column field="nro_transaccion" align="center" header="Nro_transaccion"></Column>
                  <Column field="fecha" align="center" header="Fecha"></Column>
                  <Column field="descripcion" align="center" header="Descripcion"></Column>
                  <Column field="status" align="center" header="Status"></Column>
              </DataTable>
          </Panel>
        
          <Dialog header="Transaccion" visible={showModal} style={{ width: '50vw' }} footer={renderFooter()} onHide={() => setShowModal(false)}>
            <div className="p-fluid">
              <form id="categoria-form">
                <div className="p-field">
                    <label htmlFor="tipo">Tipo de transaccion</label>
                    <Dropdown name="tipo" id="select" value={tipo} options={selectTipo} onChange={cambioTipo} optionLabel="opciontipo" optionValue="value" placeholder="Tipo de transaccion"/>
                </div>
                <div className="p-field">
                    <label htmlFor="id_producto">Producto</label>
                    <Dropdown name="id_producto" value={id_producto} options={optionsProducto} onChange={cambioProducto} optionLabel="label" optionValue="value" placeholder="Producto"/>
                </div>
                <div className="p-field">
                    <label htmlFor="cantidad">Cantidad</label>
                    <InputNumber inputId="cantidad" value={cantidad} onValueChange={(e) => setCantidad(e.value)}/>
                </div>
                <div className="p-field">
                    <label htmlFor="fecha">Fecha</label>
                    <InputText name="fecha" value={fecha} onChange={(e) => setFecha(e.target.value)}/>
                </div>
                <div className="p-field">
                    <label htmlFor="descripcion">Descripcion</label>
                    <InputText name="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}/>
                </div>
                <div className="p-field">
                    <label htmlFor="status">Status</label>
                    <Dropdown name="status" value={status} options={selectStatus} onChange={cambioStatus} optionLabel="opcionstatus" optionValue="value" placeholder="Seleccionar status"/>
                </div>
              </form>
            </div>
          </Dialog>
      </div>
    )
}

export default Home