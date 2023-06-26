import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../components/plantillas/AdminLayout';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

function TipoGasto() {
  let [tipoGastos, setTipoGastos] = useState([]);
  let [pos, setPos] = useState(null);
  let [title, setTitle] = useState('Nuevo Tipo de Gasto');
  let [id, setId] = useState(0);
  let [nombre, setNombre] = useState('');
  let [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get('http://127.0.0.1:8000/tipogasto/');
        setTipoGastos(response.data);
      } catch (error) {
        console.log(error.toString());
      }
    };
    fetchData();
  }, [pos]);

  function mostrar(cod, index) {
    axios.get('http://127.0.0.1:8000/tipogasto/' + cod).then((res) => {
      setPos(index);
      setTitle('Editar Tipo de Gasto');
      setId(res.data.id);
      setNombre(res.data.nombre);
      setDescripcion(res.data.descripcion);
    });
  }

  function eliminar(cod) {
    let rpta = window.confirm('¿Desea eliminar?');
    if (rpta) {
      axios.delete('http://127.0.0.1:8000/tipogasto/' + cod).then((res) => {
        var temp = tipoGastos.filter((tipoGasto) => tipoGasto.id !== cod);
        setTipoGastos(temp);
      });
    }
  }

  function guardarTipoGasto(e) {
    e.preventDefault();
    let cod = id;
    let datos = {
      nombre: nombre,
      descripcion: descripcion,
    };
    if (cod > 0) {
      axios
        .put('http://127.0.0.1:8000/tipogasto/' + cod + '/', datos)
        .then((res) => {
          let indx = pos;
          tipoGastos[indx] = res.data;
          var temp = tipoGastos;
          setPos(null);
          setTitle('Nuevo');
          setId(0);
          setNombre('');
          setDescripcion('');
          setTipoGastos(temp);
        })
        .catch((error) => {
          console.log(error.toString());
        });
    } else {
      axios
        .post('http://127.0.0.1:8000/tipogasto/', datos)
        .then((response) => {
          var temp = tipoGastos;
          temp.push(response.data);
          setPos(null);
          setId(0);
          setNombre('');
          setDescripcion('');
          setTipoGastos(temp);
        })
        .catch((error) => {
          console.log(error.toString());
        });
    }
  }

  return (
    <AdminLayout>
      <>
        <h1>Tipos de Gastos</h1>
        <div className="mb-3">
          Formulario : <h1>{title}</h1>
          <Form onSubmit={guardarTipoGasto}>
            <Form.Control type="hidden" value={id} />
            <Form.Group className="mb-3">
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Guardar
            </Button>
          </Form>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nombre</th>
              <th scope="col">Descripción</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tipoGastos.map((tipoGasto, index) => {
              return (
                <tr key={tipoGasto.id}>
                  <td>{index + 1}</td>
                  <td>{tipoGasto.nombre}</td>
                  <td>{tipoGasto.descripcion}</td>
                  <td>
                    <Button
                      variant="success"
                      onClick={() => mostrar(tipoGasto.id, index)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => eliminar(tipoGasto.id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    </AdminLayout>
  );
}

export default TipoGasto;
