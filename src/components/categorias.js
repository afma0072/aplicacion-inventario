import React, { useEffect, useState, useRef } from "react";

//Primereact
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {Panel} from 'primereact/panel';
import { CategoriaService } from "../service/CategoriaService";
import {PrimeIcons} from 'primereact/api';
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { confirmDialog } from 'primereact/confirmdialog';

const Categorias = () => {

    const [categorias, setCategorias] = useState([]);
    const [selectedCategoria, setSelectedCategoria] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [status, setStatus] = useState('');
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
        command : () => {deleteCategoria()}
      }
    ];

    useEffect(() => {
        let categoriaService = new CategoriaService();
        categoriaService.getAll().then(res => setCategorias(res));
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
      setStatus('');
      setShowModal(true);
    };

    const save = () => {
      let categoria = {};
      if (id !== '') {
        categoria.id = id;
      }
      categoria.nombre = nombre;
      categoria.status = status;

      let categoriaService = new CategoriaService();
      categoriaService.save(categoria).then(res => {
        setId('');
        setNombre('');
        setStatus('');
        setShowModal(false);
        toast.current.show({severity:'success', summary: 'Atencion!', detail:'Categoria registrada correctamente', life: 3000});
      });
    };

    const edit = () => {
      setId(selectedCategoria.id);
      setNombre(selectedCategoria.nombre);
      setStatus(selectedCategoria.status);
      setShowModal(true);
    };

    const showConfirmDelete = () => {
      confirmDialog({
        message: 'Are you sure you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => deleteCategoria()
    });
  }

    const deleteCategoria = () => {
      let categoriaService = new CategoriaService();
      categoriaService.delete(selectedCategoria.id).then(res => {
        toast.current.show({severity:'info', summary: 'Atencion!', detail:'Categoria eliminada correctamente', life: 3000});
      });
    };

    return(
        <div style={{width:'80%', margin: '0 auto', marginTop: '20px'}}>
        <Toast ref={toast} />
        <Panel header="Categorias">
        <Menubar model={items} style={{marginBottom: '20px'}} />
          <DataTable value={categorias} selectionMode="single" selection={selectedCategoria} onSelectionChange={e => setSelectedCategoria(e.value)} dataKey="id" className="p-datatable-gridlines">
              <Column field="id" header="ID"></Column>
              <Column field="nombre" header="Nombre"></Column>
              <Column field="status" header="Status"></Column>
          </DataTable>
        </Panel>
        
        <Dialog header="Categoria" visible={showModal} style={{ width: '50vw' }} footer={renderFooter()} onHide={() => setShowModal(false)}>
        <div className="p-fluid">
          <form id="categoria-form">
            <div className="p-field">
              <label htmlFor="nombre">Nombre</label>
              <InputText name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </div>
            <div className="p-field">
              <label htmlFor="status">Status</label>
              <InputText name="status" value={status} onChange={(e) => setStatus(e.target.value)} />
            </div>
          </form>
        </div>
        </Dialog>
      </div>
    )
}

export default Categorias