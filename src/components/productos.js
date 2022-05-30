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


const Productos = () => {

    const [producto, setProducto] = useState([]);
    const [selectedProducto, setSelectedProducto] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [existencia, setExistencia] = useState('');
    const [precio, setPrecio] = useState('');
    const [status, setStatus] = useState(null);
    const [id_categoria, setId_categoria] = useState(null);
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
      producto.existencia = 0;
      producto.precio = precio;
      producto.status = 0;
      producto.id_categoria = parseInt(id_categoria);

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
      setPrecio(selectedProducto.precio);
      setId_categoria(selectedProducto.id_categoria);
      setShowModal(true);
    };

    const deleteProducto = () => {
      let productoService = new ProductoService();
      productoService.delete(selectedProducto.id).then(res => {
        toast.current.show({severity:'info', summary: 'Atencion!', detail:'Producto eliminado correctamente', life: 3000});
      });
    };


    
    let optionsCategoria = categoria.map(elemento => {    
      return  { value:  `${elemento.id}`, label: `${elemento.nombre}` };
    });



    const cambioCategoria = (e) => {
      setId_categoria(e.value)
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
              <label htmlFor="precio">Precio</label>
              <InputNumber inputId="precio" value={precio} onValueChange={(e) => setPrecio(e.value)} />
            </div>
            <div className="p-field">
              <label htmlFor="id_categoria">Categoria</label>
              <Dropdown name="id_categoria" value={id_categoria} options={optionsCategoria} onChange={cambioCategoria} optionLabel="label" optionValue="value" placeholder="Seleccionar categoria" />
            </div>
          </form>
        </div>

        
        </Dialog>
      </div>
    )
}

export default Productos