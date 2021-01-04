import React, {useEffect, useState} from "react";
import {VehicleInterface} from "../vehicule/Vehicles";
import {makeStyles} from "@material-ui/core/styles";
import ApiService from "../../services/api";
import Loader from "react-loader-spinner";
import {Color} from "../../config/Color";
import Alert from "@material-ui/lab/Alert";
import MaterialTable from "material-table";
import tableIcons from "../../components/table/TableIcons";

export interface NumarMarci {
    marca : string | null,
    marci : number | null,
    nrVehicole: number | null,
}

const Main = () => {
    const classes = useStyles();

    const [data, setData] = useState<NumarMarci[]>([]); //table data
    const [inProgress,setInProgress] = useState<boolean>(true)
    const [iserror, setIserror] = useState<boolean>(false)
    const [errorMessages, setErrorMessages] = useState<string[]>([])

    const [sumaTotala,setSumaTotala] = useState<number>(-1);
    const [marci,setMarci] = useState<any>({});

    useEffect(() => {
        (async () => {
            try{
                setInProgress(true)
                const response = await ApiService.get('additional/punctulc', {})
                const responseSuma = await ApiService.get('additional/punctuld',{});
                const responseMarci = await ApiService.get('additional/getmarci',{});
                setMarci(responseMarci.result);
                setSumaTotala(responseSuma.result);
                const payload = response.result.map((nrMarci : NumarMarci) => nrMarci.marca ? nrMarci : {...nrMarci,marca : 'total'})
                setData(payload)
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
        {title: 'marca', field: 'marca', },
        {title: "marci", field: "marci"},
        {title: 'Numarul vehiculelor', field: 'nrVehicole', },
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
                        options={{
                            search: true,
                            exportButton: true,
                        }}
                    />
                    <br/>
                    <div style={{alignSelf:'center'}}>
                         <h1 style={{alignSelf:'center'}}>{`Suma totala este ${sumaTotala}`}</h1>
                    </div>
                    {marci.map( (el : any) => {
                        return (
                            <li>{el.marca}</li>
                        )
                    })}
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

export default Main;
