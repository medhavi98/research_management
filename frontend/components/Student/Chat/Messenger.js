import React, { useState } from 'react';
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


const Messenger = () => {

    const messages = [
        {
            _id: "MS0000012",
            group: "AF_1",
            sender: "Lakshan",
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        },
        {
            _id: "MS0048798",
            group: "AF_2",
            sender: "Pasindu",
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
            _id: "MS00012647",
            group: "AF_3",
            sender: "Lakshika",
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
            _id: "MS00105648",
            group: "AF_4",
            sender: "Charith",
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        }
    ]

    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const [send_message, setSend_message] = useState("")

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


    const handleSubmit = (e) => {
        e.preventDefault();
    }


    return (
        <Container>
            <Grid mb={10} md={12} xs={12} >

                <Typography variant="h4">Chat</Typography>
                <hr />

            </Grid>
            <Grid container md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Grid item className='chat-layout'>
                    <div>
                        {messages &&
                            messages.map((item) => {
                                return (
                                    <>
                                        <Card onClick={handleClickOpen('paper')} key={item._id} className='chat-card'>
                                            <div className='card-content'>
                                                <Grid item md={2}>
                                                    <Avatar className='avatar' aria-label="user">
                                                        {item.group}
                                                    </Avatar>

                                                </Grid>
                                                <Grid item md={10}>
                                                    <Typography className='message-sender' variant="h5">{item.sender}</Typography>
                                                    <Typography className='message-body' sx={{ mt: 2 }}>{item.message}</Typography>
                                                </Grid>
                                            </div>
                                        </Card>
                                        <br />
                                    </>
                                )
                            })}
                    </div>
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
                            <div className="message-card-group">
                                <Card className="message-card-left">
                                    <Typography variant='h6'>
                                        {messages[0].sender}
                                    </Typography>
                                    <Typography variant='p'>
                                        {messages[0].message}
                                    </Typography>
                                </Card><br />

                                <Card className="message-card-right">
                                    <Typography variant='h6'>
                                        You
                                    </Typography>
                                    <Typography variant='p'>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    </Typography>
                                </Card>
                            </div>
                            <div className="message-card-group">
                                <Card className="message-card-left">
                                    <Typography variant='h6'>
                                        {messages[0].sender}
                                    </Typography>
                                    <Typography variant='p'>
                                        {messages[0].message}
                                    </Typography>
                                </Card><br />

                                <Card className="message-card-right">
                                    <Typography variant='h6'>
                                        {messages[1].sender}
                                    </Typography>
                                    <Typography variant='p'>
                                        {messages[1].message}                                        
                                    </Typography>
                                </Card>
                            </div>
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

        </Container>
    )
}

export default Messenger