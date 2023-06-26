import { useEffect, useState } from 'react';
import axios from 'axios'
import AdminLayout from '../../components/plantillas/AdminLayout'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

function VehiculoGasto() {

    let [vehiculoGasto, setVehiculoGasto] = useState([])
    let [vehiculo, setVehiculo] = useState([])
    let [tipoGastos, setTipoGasto] = useState([])
    let [pos, setPos] = useState(null)
    let [title, setTitle] = useState("Nuevo Vehiculo Gasto")
    let [id, setId] = useState(0)
    let [fecha, setFecha] = useState('')
    let [monto, setMonto] = useState('')
    let [vehiculoId, setVehiculoId] = useState(0)
    let [tipoGastoId, setTipoGastoId] = useState(0)


    useEffect(() => {
        const fetchData = async () => {
            try {
                let response1 = await axios.get('http://127.0.0.1:8000/vehiculogasto/');
                let response2 = await axios.get('http://127.0.0.1:8000/vehiculo/');
                let response3 = await axios.get('http://127.0.0.1:8000/tipogasto/');
                setVehiculoGasto(response1.data);
                setVehiculo(response2.data);
                setTipoGasto(response3.data);
            } catch (error) {
                console.log(error.toString());
            }
        };
        fetchData();
    }, [pos]);
    

    function mostrar(cod, index) {
        axios.get('http://127.0.0.1:8000/vehiculogasto/' + cod)
            .then(res => {
                setPos(index)
                setTitle('Editar Gasto Vehiculo')
                setId(res.data.id);
                setFecha(res.data.fecha);
                setMonto(res.data.monto)
                setVehiculoId(0)
                setTipoGasto(0)
            })
    }


    function eliminar(cod) {
        let rpta = window.confirm("desea eliminar");
        if (rpta) {
            axios.delete('http://127.0.0.1:8000/vehiculogasto/' + cod)
                .then(res => {
                    var temp = vehiculoGasto.filter((gastoV) => gastoV.id !== cod);
                    setVehiculoGasto(temp);
                })
        }
    }

    function guardarVehiculoGasto(e) {
        e.preventDefault();
        let cod = id;
        let datos = {
            fecha: fecha,
            monto: monto,
            vehiculo: vehiculoId,
            tipo_gasto: tipoGastoId
        }
        if (cod > 0) {
            axios.put('http://127.0.0.1:8000/vehiculogasto/' + cod + "/", datos)
                .then(res => {
                    let indx = pos;
                    vehiculoGasto[indx] = res.data;
                    var temp = vehiculoGasto;
                    setPos(null);
                    setTitle('Nuevo');
                    setId(0);
                    setFecha('');
                    setMonto('')
                    setVehiculoId(0)
                    setTipoGastoId(0)
                    setVehiculoGasto(temp);
                }).catch((error) => {

                    console.log(error.toString());
                })
        }
        else {
            axios.post('http://127.0.0.1:8000/vehiculogasto/', datos)
                .then(response => {
                    var temp = vehiculoGasto;
                    temp.push(response.data);
                    setPos(null);
                    setId(0);
                    setFecha('');
                    setMonto('')
                    setVehiculoId(0)
                    setTipoGasto(0)
                    setVehiculoGasto(temp);
                }).catch((error) => {
                    console.log(error.toString());
                })
        }
    }
    return (
        <AdminLayout>
            <>
                <h1>Parentescos</h1>
                <div className="mb-3">
                    Formulario : <h1>{title}</h1>
                    <Form onSubmit={guardarVehiculoGasto}>
                        <Form.Control type="hidden" value={id} />
                        <Form.Group className="mb-3">
                            <Form.Label>Fecha:</Form.Label>
                            <Form.Control type="date" value={fecha}
                                onChange={(e) => setFecha(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Ingrese el monto:</Form.Label>
                            <Form.Control type="text" value={monto}
                                onChange={(e) => setMonto(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Seleccione una opción:</Form.Label>
                            <Form.Control
                                as="select"
                                value={vehiculoId}
                                onChange={(e) => setVehiculoId(e.target.value)}
                            >
                                <option value="">Seleccionar opción</option>
                                {vehiculo.map((option) => (
                                    <option key={option.id} value={option.id}>
                                        {option.marca}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Seleccione una opción:</Form.Label>
                            <Form.Control
                                as="select"
                                value={tipoGastoId}
                                onChange={(e) => setTipoGastoId(e.target.value)}
                            >
                                <option value="">Seleccionar opción</option>
                                {tipoGastos.length > 0 &&
                                    tipoGastos.map((option) => (
                                        <option key={option.id} value={option.id}>
                                            {option.nombre}
                                        </option>
                                    ))}
                            </Form.Control>
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
                            <th scope="col">Fecha</th>
                            <th scope="col">Monto</th>
                            <th scope="col">Vehiculo</th>
                            <th scope="col">Tipo de Gasto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            vehiculoGasto.map((gastoV, index) => {
                                return (
                                    <tr key={gastoV.id}>
                                        <td>{index + 1}</td>
                                        <td>{gastoV.fecha}</td>
                                        <td>{gastoV.monto}</td>
                                        <td>{gastoV.vehiculo}</td>
                                        <td>{gastoV.tipo_gasto}</td>
                                        <td>
                                            <Button variant="success" onClick={() => mostrar(gastoV.id)}>Editar</Button>
                                            <Button variant="danger" onClick={() => eliminar(gastoV.id)}>Eliminar</Button>
                                        </td>

                                    </tr>
                                )
                            }

                            )
                        }

                    </tbody>
                </table>

            </>
        </AdminLayout>
    )
}

export default VehiculoGasto;