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


        if (errorList.length < 1) { //no error
            try {
                console.log(newData);
                console.log(newData.dataCumpararii);
                console.log(moment(newData.dataCumpararii).unix());
                const response = await ApiService.post('proprietate', {
                    ...newData,
                    dataCumpararii : moment(newData.dataCumpararii).unix(),
                })
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
                                    // handleRowUpdate(newData, oldData, resolve);
                                }),
                            onRowDelete: (oldData) =>
                                new Promise((resolve) => {
                                    // handleRowDelete(oldData, resolve)
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
