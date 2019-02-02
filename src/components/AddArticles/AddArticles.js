    /*global chrome*/
import React from "react";
import ReactDOM from "react-dom";
import { Card, CardTitle, CardText, ProgressBar, Textfield, Snackbar } from "react-mdl";
var request = require('request');

class AddArticles extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isSnackbarActive: false,
            snackbarMessage: "",
            loading: false
        };
        this.handleShowSnackbar = this.handleShowSnackbar.bind(this);
        this.handleTimeoutSnackbar = this.handleTimeoutSnackbar.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleShowLoading = this.handleShowLoading.bind(this);
    }

    handleShowSnackbar(message) {
        this.setState({
            isSnackbarActive: true,
            snackbarMessage: message
        });
    }

    handleShowLoading(val) {
        this.setState({
            loading: val
        });
    }

    handleTimeoutSnackbar() {
        this.setState({
            isSnackbarActive: false
        });
    }

    handleSubmit(e) {
        
        function handleShowSnackbarS(param) {
            this.handleShowSnackbar(param);
        }
        function handleShowLoadingS(param) {
            this.handleShowLoading(param);
        }
        if (e.key === "Enter") {
            if (e.target.value === "") {
                this.handleShowSnackbar("Please enter a query.");
            } else {
                this.handleShowSnackbar("Searching...");
                this.handleShowLoading(true);
                var query = e.target.value;
                request("http://inventt.org:5000/api/v1/searchGN?q=" + query, function(error, response, body) {
                    console.log(response);
                    var result = JSON.parse(response.body);
                    if (result.status === true) {
                        console.log("saving now");
                        window.localStorage.setItem(query, JSON.stringify(result.data));
                        console.log('Done.');
                        alert("Saved " + result.data.length + " articles. :)");
                    } else {
                        alert("There's an error. (Error code 20)");
                    }
                });
            }
        }
    }

    get showLoading() {
        if (this.state.loading) {
            return <ProgressBar style={{width: "100%"}} indeterminate />;
        } else{
            return;
        }
    }

    render() {
        return (
            <div>
                <Card shadow={0} style={{width: '95%', height: 'auto', margin: 'auto'}}>
                    <CardTitle expand style={{color: '#fff', background: 'url(http://www.getmdl.io/assets/demos/dog.png) bottom right 15% no-repeat #46B6AC'}}>Add articles</CardTitle>
                    <CardText>
                        <Textfield
                                label="Query"
                                floatingLabel
                                style={{width: '20%', margin: "5%"}}
                                autoFocus="autofocus"
                                id="patrontext"
                                onKeyPress={this.handleSubmit}
                            />
                    </CardText>
                    {this.showLoading}
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

export default AddArticles;