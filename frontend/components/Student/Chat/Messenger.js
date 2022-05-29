import React, { useState, useEffect } from 'react';
import {
    Container,
    Grid,
    Typography,
    Card,
    Avatar,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    TextField,

} from "@mui/material";
import { io } from "socket.io-client";
import { getUserSessionDetails } from '../../../helpers/userSessionHandler';
import axios from 'axios';
import { BASE_URL } from '../../constants';

const Messenger = () => {
    const socket = io("http://localhost:5001/");
    const { userId } = getUserSessionDetails();

    // const messages = [
    //     {
    //         _id: "MS0000012",
    //         group: "AF_1",
    //         senderId: "628e4ef3062b6c5039ed6f10",
    //         sender: "Lakshan",
    //         message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    //     },
    //     {
    //         _id: "MS0048798",
    //         group: "AF_2",
    //         senderId: "628e4ef3062b6c5039ed6f11",
    //         sender: "Pasindu",
    //         message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    //     },
    //     {
    //         _id: "MS00012647",
    //         group: "AF_3",
    //         senderId: "628e4ef3062b6c5039ed6f13",
    //         sender: "Lakshika",
    //         message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    //     },
    //     {
    //         _id: "MS00105648",
    //         group: "AF_4",
    //         senderId: "628e4ef3062b6c5039ed6f12",
    //         sender: "Charith",
    //         message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    //     }
    // ]

    const [open, setOpen] = React.useState(false);
    const [userGroupIds, setUserGroupIds] = React.useState([]);
    const [scroll, setScroll] = React.useState('paper');
    const [send_message, setSend_message] = useState("")
    const [messages, setMessages] = useState([]);
    const [messageLength, setMessageLength] = useState(0);

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    useEffect(() => {
        userGroupIds.map((group) => {
            socket.on(`messageTo${group}`, ({ messageData }) => {
                console.log(messageData);
                // alert(messageData.message);
            })
        })
    }, [userGroupIds])

    useEffect(() => {
        fetchUserGroups();
    }, [])

    const fetchUserGroups = async () => {
        const response = await axios.get(`${BASE_URL}/user/getGroupIds/${userId}`);
        setUserGroupIds(response.data.groupIds);

        const groupIds = JSON.stringify(response.data.groupIds);
        const msgResponses = await axios.get(`${BASE_URL}/messages/getMessagesByGroup/${groupIds}`);
        setMessages(msgResponses.data.messages)
        setMessageLength(msgResponses.data.messageLength);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    const renderChatCards = messages => {
        return messages[1].map((msg, index) => {
            if (index === 0) {
                return (
                    <Card onClick={handleClickOpen('paper')} className='chat-card'>
                        {
                            <div className='card-content'>
                                <Grid item md={2}>
                                    <Avatar className='avatar' aria-label="user">
                                        {/* {item._id} */}
                                    </Avatar>

                                </Grid>
                                <Grid item md={10}>
                                    <Typography className='message-sender' variant="h5">{msg.senderName}</Typography>
                                    <Typography className='message-body' sx={{ mt: 2 }}>{msg.message}</Typography>
                                </Grid>
                            </div>
                        }
                    </Card>
                );
            } else {
                return <></>;
            }
        })
    }

    return (
        <Container>
            <Grid mb={10} md={12} xs={12} >

                <Typography variant="h4">Chat</Typography>
                <hr />

            </Grid>
            <Grid container md={12} sx={{ display: 'flex', justifyContent: 'center', }}>
                <Grid item className='chat-layout'>
                    {messageLength > 0 && (
                        messages.map((i) => {
                            return renderChatCards(i);
                        })
                    )}
                </Grid>
            </Grid>



            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                >
                    <DialogTitle id="scroll-dialog-title">Chat</DialogTitle>
                    <DialogContent className="card-dialog" dividers={scroll === 'paper'}>
                        <DialogContentText
                            id="scroll-dialog-description"
                            ref={descriptionElementRef}
                            tabIndex={-1}
                        >
                            {/* {messages.map((message, index) => {
                                return (
                                    <div className="message-card-group">
                                        <Card className={userId === message.senderId ? "message-card-right" : "message-card-left"}>
                                            <Typography variant='h6'>
                                                {message.sender}
                                            </Typography>
                                            <Typography variant='p'>
                                                {message.message}
                                            </Typography>
                                        </Card>
                                    </div>
                                );
                            })} */}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions style={{ padding: '20px' }}>
                        <TextField
                            id="standard-multiline-flexible"
                            label="Message"
                            multiline
                            sx={{ width: '80%' }}
                            maxRows={4}
                            value={send_message}
                            onChange={(e) => setSend_message(e.target.value)}
                            variant="standard"
                            required
                        />
                        <Button
                            variant="contained"
                            sx={{ marginLeft: '10px' }}
                            color='primary'
                            onClick={handleSubmit}
                            type="submit"
                        >
                            Send {`>`}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

        </Container >
    )
}

export default Messenger