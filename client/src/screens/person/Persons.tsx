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
    persoanaid : number,
    nume : string,
    prenume : string,
    carteidentitate : string,
    cnp : number,
    adresa : string,
}


const Persons = () => {
    const classes = useStyles();

    const [data, setData] = useState<PersonInterface[]>([]); //table data
    const [inProgress,setInProgress] = useState<boolean>(true)
    const [iserror, setIserror] = useState<boolean>(false)
    const [errorMessages, setErrorMessages] = useState<string[]>([])

    useEffect(() => {
        (async () => {
            try{
                setInProgress(true)
                const response = await ApiService.get('persoana', {})
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



    const columns = [
        {title: "Persoana id",field : 'persoanaid',hidden:true},
        {title: 'Nume', field: 'nume', },
        {title: "Prenume", field: "prenume"},
        {title: 'Carte de identitate', field: 'carteidentitate', },
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
                                    // handleRowAdd(newData, resolve)
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


export default Persons
