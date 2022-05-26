import React, { useEffect, useState, useRef } from "react";

//Primereact
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {Panel} from 'primereact/panel';
import { ProductoService } from "../service/ProductoService";
import {PrimeIcons} from 'primereact/api';
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { confirmDialog } from 'primereact/confirmdialog';

const Productos = () => {

    const [producto, setProducto] = useState([]);
    const [selectedProducto, setSelectedProducto] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [existencia, setExistencia] = useState('');
    const [precio, setPrecio] = useState('');
    const [status, setStatus] = useState('');
    const [id_producto, setId_producto] = useState('');
    const toast = useRef(null);

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
        command : () => {deleteProducto()}
      }
    ];

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
      setNombre('');
      setExistencia('');
      setPrecio('');
      setStatus('');
      setId_producto('');
      setShowModal(true);
    };

    const save = () => {
      let producto = {};
      if (id !== '') {
        producto.id = id;
      }
      producto.nombre = nombre;
      producto.existencia = existencia;
      producto.precio = precio;
      producto.status = status;
      producto.id_producto = id_producto;

      let productoService = new ProductoService();
      productoService.save(producto).then(res => {
        setId('');
        setNombre('');
        setExistencia('');
        setPrecio('');
        setStatus('');
        setId_producto('');
        setShowModal(false);
        toast.current.show({severity:'success', summary: 'Atencion!', detail:'Producto registrado correctamente', life: 3000});
      });
    };

    const edit = () => {
      setId(selectedProducto.id);
      setNombre(selectedProducto.nombre);
      setExistencia(selectedProducto.existencia);
      setPrecio(selectedProducto.precio);
      setStatus(selectedProducto.status);
      setId_producto(selectedProducto.id_producto);
      setShowModal(true);
    };

    const deleteProducto = () => {
      let productoService = new ProductoService();
      productoService.delete(selectedProducto.id).then(res => {
        toast.current.show({severity:'info', summary: 'Atencion!', detail:'Producto eliminado correctamente', life: 3000});
      });
    };

    return(
        <div style={{width:'80%', margin: '0 auto', marginTop: '20px'}}>
        <Toast ref={toast} />
        <Panel header="Productos">
          <Menubar model={items} style={{marginBottom: '20px'}} />
          <DataTable value={producto} selectionMode="single" selection={selectedProducto} onSelectionChange={e => setSelectedProducto(e.value)} dataKey="id" className="p-datatable-gridlines" >
              <Column field="id" header="ID"></Column>
              <Column field="nombre" header="Nombre"></Column>
              <Column field="existencia" header="Existencia"></Column>
              <Column field="precio" header="Precio"></Column>
              <Column field="status" header="Status"></Column>
              <Column field="id_producto" header="Id_producto"></Column>
          </DataTable>
        </Panel>

        <Dialog header="Producto" visible={showModal} style={{ width: '50vw' }} footer={renderFooter()} onHide={() => setShowModal(false)}>
        <div className="p-fluid">
          <form id="producto-form">
            <div className="p-field">
              <label htmlFor="nombre">Nombre</label>
              <InputText name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </div>
            <div className="p-field">
              <label htmlFor="existencia">Existencia</label>
              <InputText name="existencia" value={existencia} onChange={(e) => setExistencia(e.target.value)} />
            </div>
            <div className="p-field">
              <label htmlFor="precio">Precio</label>
              <InputText name="precio" value={precio} onChange={(e) => setPrecio(e.target.value)} />
            </div>
            <div className="p-field">
              <label htmlFor="status">Status</label>
              <InputText name="status" value={status} onChange={(e) => setStatus(e.target.value)} />
            </div>
            <div className="p-field">
              <label htmlFor="id_producto">Id_producto</label>
              <InputText name="id_producto" value={id_producto} onChange={(e) => setId_producto(e.target.value)} />
            </div>
          </form>
        </div>
        </Dialog>
      </div>
    )
}

export default Productos