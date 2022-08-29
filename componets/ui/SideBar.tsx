import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material"
import { Box } from "@mui/system"
import InboxIcon from '@mui/icons-material/Inbox';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useContext } from "react";
import { UIContext } from "../../context/ui";

const menuItems : string[] = ['inbox','Starred','Send Email','Drafts'];
export const SideBar = () => {

    const { closeSideMenu ,sidemenuOpen  } = useContext(UIContext)
    return (
        <Drawer
            anchor="left"
            open={ sidemenuOpen }
            onClose ={ closeSideMenu }
        >
            <Box sx={{ width:250 }}>
                <Box sx={{ padding: '5px 10px'}}    >
                    <Typography variant="h4"> Menú </Typography>
                </Box>
            
                <List>
                    {
                        menuItems.map( ( text , index) =>(
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    { index % 2 ?  <InboxIcon/> : <MailOutlineIcon/> }
                                </ListItemIcon>
                                <ListItemText 
                                primary={ text }
                                >
                                    
                                </ListItemText>
                            </ListItem>
                        ))
                    }
                </List>
                <Divider>
                    <List>
                        {
                            menuItems.map( ( text , index) =>(
                                <ListItem button key={text}>
                                    <ListItemIcon>
                                        { index % 2 ?  <InboxIcon/> : <MailOutlineIcon/> }
                                    </ListItemIcon>
                                    <ListItemText 
                                    primary={ text }
                                    >
                                        
                                    </ListItemText>
                                </ListItem>
                            ))
                        }
                    </List>
                </Divider>

            </Box>
            
        </Drawer>   

    )
}
