import React, {useEffect, useState} from "react";

import ApiService from "../../services/api";
// import MaterialTable from "material-table";

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
    return(
        <h1>Vehicles</h1>
    )
}

export default Vehicles
