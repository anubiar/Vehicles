import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {VehicleInterface} from "../vehicule/Vehicles";
import ApiService from "../../services/api";
import Loader from "react-loader-spinner";
import {Color} from "../../config/Color";
import Alert from "@material-ui/lab/Alert";
import MaterialTable from "material-table";
import tableIcons from "../../components/table/TableIcons";

export interface PersonInterface {
    persoanaId : number,
    nume : string,
    preNume : string,
    carteIdentitate : string,
    cnp : number,
    adresa : string,
}


const Persons = () => {
    const classes = useStyles();

    const [data, setData] = useState<PersonInterface[]>([]); //table data
    const [inProgress,setInProgress] = useState<boolean>(true)
    const [iserror, setIserror] = useState<boolean>(false)
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const cnpRegex = /^[1-9]\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])(0[1-9]|[1-4]\d|5[0-2]|99)(00[1-9]|0[1-9]\d|[1-9]\d\d)\d$/

    useEffect(() => {
        (async () => {
            try{
                setInProgress(true)
                const response = await ApiService.get('persoana', {})
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
        })()
    },[])

    const handleRowAdd = async (newData: any, resolve: Function) => {
        //validation
        let errorList = []
        if (newData.nume === undefined) {
            errorList.push("Please enter Nume")
        }
        if (newData.preNume === undefined) {
            errorList.push("Please enter Prenume")
        }
        if(newData.carteIdentitate === undefined) {
            errorList.push("Please enter Carte de Identitate");
        }
        if(newData.cnp === undefined) {
            errorList.push("Please enter Cnp");
        }
        if(!cnpRegex.test(newData.cnp)) {
            errorList.push('Please enter a valid cnp');
        }
        if(newData.adresa === undefined) {
            errorList.push("Please enter adresa");
        }


        if (errorList.length < 1) { //no error
            try {
                const responseCnp = await ApiService.get(`persoana/${newData.cnp}`,{});
                if(responseCnp.exista){
                    setIserror(true);
                    setErrorMessages(['This cnp already exist']);
                    resolve()
                }
                else {
                    const response = await ApiService.post('persoana', newData)
                    const dataToAdd = [...data];
                    dataToAdd.push(newData);
                    setData(dataToAdd);
                    resolve();
                    setIserror(false)
                    setErrorMessages([])
                }
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

    const handleRowUpdate = async (newData: any,oldData : any, resolve: Function) => {
        //validation
        let errorList = []
        if (newData.nume === undefined) {
            errorList.push("Please enter Nume")
        }
        if (newData.preNume === undefined) {
            errorList.push("Please enter Prenume")
        }
        if(newData.carteIdentitate === undefined) {
            errorList.push("Please enter Carte de Identitate");
        }
        if(newData.cnp === undefined) {
            errorList.push("Please enter Cnp");
        }
        if(!cnpRegex.test(newData.cnp)) {
            errorList.push('Please enter a valid cnp');
        }
        if(newData.adresa === undefined) {
            errorList.push("Please enter adresa");
        }


        if (errorList.length < 1) { //no error
            try {
                const responseCnp = await ApiService.get(`persoana/${newData.cnp}`,{});
                if(responseCnp.exista && newData.cnp !==oldData.cnp){
                    setIserror(true);
                    setErrorMessages(['This cnp already exist']);
                    resolve()
                }
                else {
                    const response = await ApiService.put('persoana', newData)
                    const dataUpdate = [...data];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData;
                    setData([...dataUpdate]);
                    resolve()
                    setIserror(false)
                    setErrorMessages([])
                }
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
            const response = await ApiService.delete(`persoana/${oldData.persoanaId}`)
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
        {title: "Persoana id",field : 'persoanaId',hidden:true},
        {title: 'Nume', field: 'nume', },
        {title: "Prenume", field: "preNume"},
        {title: 'Carte de identitate', field: 'carteIdentitate', },
        {title: 'Cnp', field: 'cnp',type:'numeric' },
        {title: 'adresa', field: 'adresa', },
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
                        title={'Persons'}
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


export default Persons
