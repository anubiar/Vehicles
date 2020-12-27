import React from "react";
import {
    Router,
    Route,
    Redirect, Switch
} from 'react-router'
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';

import Main from "../screens/main/Main";
import PageNotFound from "../screens/pageNotFound/PageNotFound";
import {CssBaseline} from "@material-ui/core";
import NavBar from "../components/navbar/NavBar";
import Vehicles from "../screens/vehicule/Vehicles";
import Persons from "../screens/person/Persons";
import Owners from "../screens/owner/Owners";


const Navigation = ({history} : any) => {
    const classes = useStyles();
    return(
        <Router history={history}>
            <Switch>
                <Route exact path={'/'} render={() => (
                    <div className={classes.root}>
                        <CssBaseline/>
                        <NavBar Class/>
                        <div style={{marginTop:100}}>
                            <Route component={Main}/>
                        </div>
                    </div>
                )}/>
                <Route exact path={'/vehicols'} render={() => (
                    <div className={classes.root}>
                        <CssBaseline/>
                        <NavBar Class />
                        <Route component={Vehicles}/>
                    </div>
                )}/>
                <Route exact path={'/persoana'} render={() => (
                    <div className={classes.root}>
                        <CssBaseline/>
                        <NavBar Class />
                        <div style={{marginTop:100}}>
                            <Route component={Persons}/>
                        </div>
                    </div>
                )}/>
                <Route exact path={'/proprietate'} render={() => (
                    <div className={classes.root}>
                        <CssBaseline/>
                        <NavBar Class />
                        <div style={{marginTop:100}}>
                            <Route component={Owners}/>
                        </div>
                    </div>
                )}/>
                <Route path={'/*'} component={PageNotFound}/>
            </Switch>
        </Router>
    )
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex',
    },
}))


export default  Navigation
