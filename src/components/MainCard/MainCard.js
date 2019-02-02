import React from "react";
import ReactDOM from "react-dom";
import { Card, CardTitle, CardText, CardActions, Button, Textfield, Snackbar } from "react-mdl";

class MainCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isSnackbarActive: false,
            snackbarMessage: ""
        };
        this.handleShowSnackbar = this.handleShowSnackbar.bind(this);
        this.handleTimeoutSnackbar = this.handleTimeoutSnackbar.bind(this);
    }

    handleShowSnackbar() {
        this.setState({
            isSnackbarActive: true
        });
    }

    handleTimeoutSnackbar() {
        this.setState({
            isSnackbarActive: false
        });
    }

    render() {
        return (
            <div>
                <Card shadow={0} style={{width: '95%', height: '320px', margin: 'auto'}}>
                    <CardTitle expand style={{color: '#fff', background: 'url(http://www.getmdl.io/assets/demos/dog.png) bottom right 15% no-repeat #46B6AC'}}><h1>Welcome to ColumnCatcher!</h1></CardTitle>
                    <CardText>
                        <h1>Welcome to ColumnCatcher!</h1>
                    </CardText>
                </Card>

                <Snackbar
                active={this.state.isSnackbarActive}
                onTimeout={this.handleTimeoutSnackbar}>
                {this.state.snackbarMessage}
                </Snackbar>
            </div>
        );
    }
}

export default MainCard;