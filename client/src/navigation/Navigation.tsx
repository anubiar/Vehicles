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


const Navigation = ({history} : any) => {
    const classes = useStyles();
    return(
        <Router history={history}>
            <Switch>
                <Route exact path={'/'} render={() => (
                    <div className={classes.root}>
                        <CssBaseline/>
                        <NavBar/>
                        <Route component={Main}/>
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
