import React, {useEffect, useState} from "react";
import MaterialTable from "material-table";
import tableIcons from "../../components/table/TableIcons";
import Alert from "@material-ui/lab/Alert";
import Loader from "react-loader-spinner";

import ApiService from "../../services/api";
import {Color} from "../../config/Color";
import {makeStyles} from "@material-ui/core/styles";

export interface VehicleInterface {
    nrVehicol : number,
    marca : string,
    tip : string,
    serieMotor : string,
    serieCaroserie : string,
    carburant : string,
    culoare : string,
    cappacitateCil : number,
}

const Vehicles = () => {
    const classes = useStyles();

    const [data, setData] = useState<VehicleInterface[]>([]); //table data
    const [inProgress,setInProgress] = useState<boolean>(true)
    const [iserror, setIserror] = useState<boolean>(false)
    const [errorMessages, setErrorMessages] = useState<string[]>([])



    useEffect(() => {
        (async () => {
           try{
               setInProgress(true)
               const response = await ApiService.get('vehicol', {})
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
        if (newData.marca === undefined) {
            errorList.push("Please enter marca")
        }
        if (newData.tip === undefined) {
            errorList.push("Please enter tip")
        }
        if (newData.serieMotor === undefined) {
            errorList.push("Please enter serieMotor")
        }
        if(newData.serieCaroserie === undefined) {
            errorList.push("Please select Serie Caroserie");
        }
        if(newData.carburant === undefined) {
            errorList.push("Please select carburant");
        }
        if(newData.culoare === undefined) {
            errorList.push("Please select culoare");
        }
        if(newData.cappacitateCil === undefined) {
            errorList.push("Please select Capacitate Cilindru");
        }
        if(newData.cappacitateCil <0 ) {
            errorList.push("Capacitate cilindru should be bigger than 0");
        }



        if (errorList.length < 1) { //no error
            try {
                const response = await ApiService.post('vehicol', newData)
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
        if (newData.marca === undefined) {
            errorList.push("Please enter marca")
        }
        if (newData.tip === undefined) {
            errorList.push("Please enter tip")
        }
        if (newData.serieMotor === undefined) {
            errorList.push("Please enter serieMotor")
        }
        if(newData.serieCaroserie === undefined) {
            errorList.push("Please enter Serie Caroserie");
        }
        if(newData.carburant === undefined) {
            errorList.push("Please enter carburant");
        }
        if(newData.culoare === undefined) {
            errorList.push("Please enter culoare");
        }
        if(newData.cappacitateCil === undefined) {
            errorList.push("Please enter Capacitate Cilindru");
        }
        if(newData.cappacitateCil <0 ) {
            errorList.push("Capacitate cilindru should be bigger than 0");
        }



        if (errorList.length < 1) { //no error
            try {
                const response = await ApiService.put('vehicol', newData)
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
            const response = await ApiService.delete(`vehicol/${oldData.nrVehicol}`)
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
        {title: "Nr vehicol",field : 'nrVehicol',hidden:true},
        {title: 'marca', field: 'marca', },
        {title: "tip", field: "tip"},
        {title: 'serie Motor', field: 'serieMotor', },
        {title: 'serie Caroserie', field: 'serieCaroserie', },
        {title: 'carburant', field: 'carburant', },
        {title: 'culoare', field: 'culoare', },
        {title: 'capacitate Cilindru', field: 'cappacitateCil',type:'numeric' },
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
                        title={'Vehicles'}
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

export default Vehicles
