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
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';


import { CategoriaService } from "../service/CategoriaService";
import axios from 'axios';


const Productos = () => {

    const [producto, setProducto] = useState([]);
    const [selectedProducto, setSelectedProducto] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [existencia, setExistencia] = useState('');
    const [precio, setPrecio] = useState('');
    const [status, setStatus] = useState(null);
    const [id_categoria, setId_categoria] = useState('');
    const toast = useRef(null);

    const [categoria, setCategoria] = useState([]);

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

    useEffect(() => {
      let categoriaService = new CategoriaService();
      categoriaService.getAll().then(res => setCategoria(res));
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
      setId_categoria('');
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
      producto.id_categoria = id_categoria;

      let productoService = new ProductoService();
      productoService.save(producto).then(res => {
        setId('');
        setNombre('');
        setExistencia('');
        setPrecio('');
        setStatus('');
        setId_categoria('');
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
      setId_categoria(selectedProducto.id_categoria);
      setShowModal(true);
    };

    const deleteProducto = () => {
      let productoService = new ProductoService();
      productoService.delete(selectedProducto.id).then(res => {
        toast.current.show({severity:'info', summary: 'Atencion!', detail:'Producto eliminado correctamente', life: 3000});
      });
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
        <Panel header="Productos">
          <Menubar model={items} style={{marginBottom: '20px'}} />
          <DataTable value={producto} selectionMode="single" selection={selectedProducto} onSelectionChange={e => setSelectedProducto(e.value)} dataKey="id" className="p-datatable-gridlines" >
              <Column field="id" align="center" header="ID"></Column>
              <Column field="nombre" align="center" header="Nombre"></Column>
              <Column field="existencia" align="center" header="Existencia"></Column>
              <Column field="precio" align="center" header="Precio"></Column>
              <Column field="status" align="center" header="Status"></Column>
              <Column field="id_categoria" align="center" header="Categoria"></Column>
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
              <InputNumber inputId="existencia" value={existencia} onValueChange={(e) => setExistencia(e.value)} />
            </div>
            <div className="p-field">
              <label htmlFor="precio">Precio</label>
              <InputNumber inputId="precio" value={precio} onValueChange={(e) => setPrecio(e.value)} />
            </div>
            <div className="p-field">
                <label htmlFor="status">Status</label>
                <Dropdown name="status" value={status} options={selectStatus} onChange={cambioStatus} optionLabel="opcionstatus" optionValue="value" placeholder="Seleccionar status" />
            </div>
            <div className="p-field">
              <label htmlFor="id_categoria">Categoria</label>
              <select id="id_categoria" name="id_categoria" className="form-control">
                {categoria.map((elemento, index) => {
                  return (
                    <option key={index} value={elemento.id} >{elemento.nombre} {elemento.id}</option>
                  );})}
              </select>
              
            </div>
          </form>
        </div>

        
        </Dialog>
      </div>
    )
}

export default Productos