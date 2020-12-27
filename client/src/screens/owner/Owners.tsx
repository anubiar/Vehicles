import React, {useEffect, useState} from "react";
import {PersonInterface} from "../person/Persons";
import ApiService from "../../services/api";
import {makeStyles} from "@material-ui/core/styles";
import Loader from "react-loader-spinner";
import {Color} from "../../config/Color";
import Alert from "@material-ui/lab/Alert";
import MaterialTable from "material-table";
import tableIcons from "../../components/table/TableIcons";
import {VehicleInterface} from "../vehicule/Vehicles";
import moment from "moment";

export interface Owner{
    cnp : number,
    nrVehicol : number,
    dataCumpararii : any,
    pret : number,
    propId : number
}

const Owners = () => {
    const classes = useStyles();

    const [data, setData] = useState<PersonInterface[]>([]); //table data
    const [inProgress,setInProgress] = useState<boolean>(true)
    const [iserror, setIserror] = useState<boolean>(false)
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    const [persons,setPersons] = useState<any>({})
    const [vehicles,setVehicles] = useState<any>({})

    useEffect(() => {
        (async () => {
            try{
                setInProgress(true)
                const response = await ApiService.get('proprietate', {})
                console.log(response)
                setData(response);
            }
            catch (e) {
                console.log(e);
                setIserror(true);
                setErrorMessages(['Server Error'])
            }
            finally {
                setInProgress(false);
            }

            try{
                const response = await ApiService.get('persoana', {})
                const payload = {};
                response.map((person : PersonInterface) => {
                    const {nume,preNume,cnp} = person
                    //@ts-ignore
                    payload[cnp] = nume + ' ' + preNume
                })
                setPersons(payload)
            }
            catch (e) {
                console.log(e)
            }

            try{
                const response = await ApiService.get('vehicol', {})
                const payload = {};

                response.map((vehicle : VehicleInterface) => {
                    const {nrVehicol,marca,tip,culoare} = vehicle
                    //@ts-ignore
                    payload[nrVehicol] = marca + ' ' + tip + ' ' + culoare;
                })
                setVehicles(payload)
            }
            catch (e) {
                console.log(e)
            }

        })()
    },[])

    const handleRowAdd = async (newData: any, resolve: Function) => {
        //validation
        let errorList = []
        if (newData.cnp === undefined) {
            errorList.push("Please select Proprietar")
        }
        if (newData.nrVehicol === undefined) {
            errorList.push("Please select vehicol")
        }
        if(newData.dataCumpararii === undefined) {
            errorList.push("Please select date");
        }
        if(newData.pret === undefined) {
            errorList.push("Please enter pret");
        }
        if(newData.pret < 0){
            errorList.push('Pret should be bigger than 0')
        }


        if (errorList.length < 1) { //no error
            try {
                const payload = {
                    ...newData,
                    dataCumpararii : moment(newData.dataCumpararii).format(),
                    cnp : parseInt(newData.cnp),
                    nrVehicol : parseInt(newData.nrVehicol),
                }
                console.log(payload)
                const response = await ApiService.post('proprietate', payload);
                const dataToAdd = [...data];
                dataToAdd.push(newData);
                setData(dataToAdd);
                resolve();
                setIserror(false)
                setErrorMessages([])
            }
            catch (e) {
                console.log(e)
                setIserror(true)
                setErrorMessages(["Error server"]);
                resolve();
            }
        }
        else {
            setErrorMessages(errorList)
            setIserror(true)
            resolve()
        }
    }

    const handleRowUpdate = async (newData: any,oldData:any, resolve: Function) => {
        //validation
        let errorList = []
        if (newData.cnp === undefined) {
            errorList.push("Please select Proprietar")
        }
        if (newData.nrVehicol === undefined) {
            errorList.push("Please select vehicol")
        }
        if(newData.dataCumpararii === undefined) {
            errorList.push("Please select date");
        }
        if(newData.pret === undefined) {
            errorList.push("Please enter pret");
        }
        if(newData.pret < 0){
            errorList.push('Pret should be bigger than 0')
        }


        if (errorList.length < 1) { //no error
            try {
                const payload = {
                    ...newData,
                    dataCumpararii : moment(newData.dataCumpararii).format(),
                    cnp : parseInt(newData.cnp),
                    nrVehicol : parseInt(newData.nrVehicol),
                }
                console.log(payload)
                const response = await ApiService.put('proprietate', payload);
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);
                resolve()
                setIserror(false)
                setErrorMessages([])
            }
            catch (e) {
                console.log(e)
                setIserror(true)
                setErrorMessages(["Error server"]);
                resolve();
            }
        }
        else {
            setErrorMessages(errorList)
            setIserror(true)
            resolve()
        }
    }

    const handleRowDelete = async (oldData: any, resolve: Function) => {
        try {
            const response = await ApiService.delete(`proprietate/${oldData.propId}`)
            const dataDelete = [...data];
            const index = oldData.tableData.id;
            dataDelete.splice(index,1);
            setData([...dataDelete]);
            setIserror(false)
            resolve();
        }
        catch (e) {
            console.log(e);
            setIserror(true)
            setErrorMessages(['Server error']);
            resolve()
        }
    }

    const columns = [
        {title: "propId id",field : 'propId',hidden:true},
        {title: 'Proprietari', field: 'cnp',lookup: persons,type:'numeric' },
        {title: "Vehicol", field: "nrVehicol",lookup: vehicles},
        {title: 'dataCumpararii', field: 'dataCumpararii',type: 'date' },
        {title: 'pret', field: 'pret',type:'numeric' },
    ]

    return(
        <div className={classes.mainDiv}>
            {inProgress ?
                <div className={classes.center}>
                    <Loader type={'Puff'} color={Color.secondaryColor}/>
                </div>
                :
                <>
                    <div>
                        {iserror &&
                        <Alert severity="error">
                            {errorMessages.map((msg, i) => {
                                return <div key={i}>{msg}</div>
                            })}
                        </Alert>
                        }
                    </div>
                    <MaterialTable
                        title={'Proprietari'}
                        //@ts-ignore
                        columns={columns}
                        data={data}
                        icons={tableIcons}
                        style={{width:`100%`}}
                        editable={{
                            onRowAdd: (newData) =>
                                new Promise((resolve) => {
                                    handleRowAdd(newData, resolve)
                                }),
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve) => {
                                    handleRowUpdate(newData, oldData, resolve);
                                }),
                            onRowDelete: (oldData) =>
                                new Promise((resolve) => {
                                    handleRowDelete(oldData, resolve)
                                }),
                        }}
                        options={{
                            search: true,
                            exportButton: true,

                        }}
                    />
                </>
            }
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    center: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    },
    footer: {
        height : 200,
    },
    mainDiv: {
        marginTop:150,
        flexGrow: 4,
        marginRight:50,
        marginLeft:50,
    }
}));

export default Owners
