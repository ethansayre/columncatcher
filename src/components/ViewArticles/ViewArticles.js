/*global chrome*/
import React from "react";
import ReactDOM from "react-dom";
import { Card, CardTitle, CardText, Icon, FABButton, Chip, Snackbar } from "react-mdl";

class ViewArticles extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isSnackbarActive: false,
            snackbarMessage: "",
        };
        this.handleShowSnackbar = this.handleShowSnackbar.bind(this);
        this.handleTimeoutSnackbar = this.handleTimeoutSnackbar.bind(this);
        this.handleQueryChange = this.handleQueryChange.bind(this);
        this.handlePinArticle = this.handlePinArticle.bind(this);
    }

    handleShowSnackbar(value) {
        this.setState({
            isSnackbarActive: true,
            snackbarMessage: value
        });
    }

    handleTimeoutSnackbar() {
        this.setState({
            isSnackbarActive: false
        });
    }

    handleQueryChange(query) {
        this.setState({
            currentQuery: query
        });
    }

    handlePinArticle (p1, p2) {
        let article = p1;
        let query = p2;
        this.setState(prevState => ({
            currentArticles: {
                ...prevState.currentArticles,
                [article]: query
            }
        }));
    }

    handleDeleteArticle (p1, p2) {
        let article = p1;
        let query = p2;
        let res = Object.assign({}, this.state.currentArticles);
        delete res[article];
        this.setState(prevState => ({
            currentArticles: {
                ...res
            }
        }));
        console.log(res);
        console.log("Deleted " + article + query);
    }

    get renderQueryList() {
        var toReturn = [];
        var block = ['length', 'key', 'getItem', 'setItem', 'removeItem', 'clear'];
        for (let key in localStorage) {
            if (!block.includes(key)){
                toReturn.push(<Chip onClick={() => {this.handleQueryChange(key)}}>{key}</Chip>);
            }
        }
        return toReturn;
    }

    get renderArticleList() {
        if (this.state.currentQuery) {
            var toReturn = [];
            let currentquery = this.state.currentQuery;
            let contents = JSON.parse(localStorage.getItem(currentquery));
            toReturn.push()
            for (let article in contents) {
                toReturn.push(<tr onClick={() => {this.handlePinArticle(article, currentquery)}}>
                    <th className="lead">{article}</th>
                    <th className="lead">{contents[article].date !== null ? contents[article].date : "N/A"}</th>
                    <th className="lead">{contents[article].publisher !== null ? contents[article].publisher : "N/A"}</th>
                </tr>)
            }
            return toReturn;
        }else{
            return;
        }
    }

    get articleView() {
        if (this.state.currentArticles) {
            var toReturn = [];
            for (let article in this.state.currentArticles) {
                let query = this.state.currentArticles[article];
                let articlecontent = localStorage.getItem(query);
                articlecontent = JSON.parse(articlecontent);
                toReturn.push(
                <Card shadow={0} style={{width: '95%', height: 'auto', margin: 'auto'}}>
                    <FABButton onClick={() => {this.handleDeleteArticle(article, query)}} colored>
                        <Icon name="delete" />
                    </FABButton><h2>{article}</h2>
                    <h6>{articlecontent[article].date !== null ? articlecontent[article].date : "N/A"}</h6>
                    <h6>{" Published by: " + articlecontent[article].publisher !== null ? articlecontent[article].publisher : "N/A"}</h6>
                    <p>{articlecontent[article].link !== null ? articlecontent[article].link : ""}</p>
                    <p>{articlecontent[article].text !== null ? articlecontent[article].text : "N/A"}</p>
                </Card>);
            }
            return toReturn;
        }
    }
    
    render() {
        return (
            <div>
                {this.articleView}
                <Card shadow={0} style={{width: '95%', height: 'auto', margin: 'auto'}}>
                    <CardTitle expand style={{color: '#fff', background: 'bottom right 15% no-repeat #46B6AC'}}>View Articles</CardTitle>
                    <CardText>
                        <div style={{position: 'relative'}}>
                            {this.renderQueryList}
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th className="lead">Article name</th>
                                        <th className="lead">Publication date</th>
                                        <th className="lead">Publisher</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderArticleList}
                                </tbody>
                            </table>
                        </div>
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

export default ViewArticles;