import React from "react";
import {
    AppBar,
    createStyles,
    Divider,
    Drawer,
    Hidden,
    IconButton, Link,
    List,
    ListItem, ListItemIcon, ListItemText,
    Toolbar,
    Typography
} from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {makeStyles, Theme, useTheme} from "@material-ui/core/styles";
import { faHome,faCar,faIdCard,faUser } from '@fortawesome/free-solid-svg-icons'
import {Menu} from "@material-ui/icons";
import {useHistory, useLocation} from "react-router";
import {Color} from "../../config/Color";


const drawerWidth = 240;

const main = {text : 'Main', link : '/',icon : faHome}
const vehicol = {text: 'Vehicule',link:'/vehicols',icon: faCar}
const persoana = {text: 'Persoane',link:'/persoana',icon: faUser}
const proprietate = {text:'Proprietate',link:'/proprietate',icon: faIdCard}

const navOptions = [main,vehicol,persoana,proprietate]

const NavBar = ({window,classToRender} : any) => {

    const classes = useStyles();
    const theme = useTheme();
    const location = useLocation();
    const navigation = useHistory();
    const {pathname} = location;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const container = window !== undefined ? () => window().document.body : undefined;


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };



    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                {navOptions.map(({text,icon,link} : any, index) => (
                    <Link href={link} color={'inherit'}>
                        <ListItem button key={text}>
                            <ListItemIcon>
                                <FontAwesomeIcon icon={icon} size={'lg'} className={pathname===link ?
                                    classes.selectedNavIcon
                                    :
                                    undefined}/>
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    </Link>
                ))}
            </List>
        </div>
    );


    return(
        <>
            <AppBar position="fixed"
                    className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Vehicle Managment
                    </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            {/*<Route component={classToRender}/>*/}
        </>
    )
}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },
        appBar: {
            [theme.breakpoints.up('sm')]: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: drawerWidth,
            },
            background: `linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6);` /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

        },
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up('sm')]: {
                display: 'none',
            },
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: drawerWidth,
            background: `linear-gradient(to left, #1c92d2, #f2fcfe);` /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        selectedNavIcon : {
            color:Color.secondaryColor,
        },
    }),
);

export default NavBar;
