import React from "react";
import { Header, Navigation, Drawer, Content, Layout, Textfield } from 'react-mdl';

class MainMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSubmit(e) {
        if (e.key === "Enter") {
            fetch("http://localhost:5000/api/v1/search?q=" + this.state.searchq)
            .then(res => res.json())
            .then(
            (result) => {
                window.location.href = "inventory?data=" + JSON.stringify(result);
            });
        }
    }
    
    handleSearch(e) {
        this.setState({
            searchq: e.target.value
        });
    }

    render() {
        return (
            <div style={{location: "absolute"}}>
                <Layout fixedHeader>
                    <Header title={<span><span style={{ color: '#ddd' }}></span><strong>ColumnCatcher</strong></span>}>
                        <Navigation>
                            <Textfield
                                label="Search"
                                expandable
                                expandableIcon="search"
                                onKeyPress={this.handleSubmit}
                                onChange={this.handleSearch}
                            />
                        </Navigation>
                    </Header>
                    <Drawer title="Menu">
                        <Navigation>
                            <a onClick={() => {this.props.changeLayout("add")}}>Add articles</a>
                            <a onClick={() => {this.props.changeLayout("view")}}>View articles</a>
                            <a>More features coming soon!</a>
                        </Navigation>
                    </Drawer>
                    <Content />
                </Layout>
            </div>
        );
    }
}

export default MainMenu;