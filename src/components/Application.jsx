class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            headings: ["heading1", "heading2"],
            url: "http://app.mockloki.com/loki/4de752dd1241bfe323ffdb4e8e599456b80168b8/diagnotic"
        };
    }

    render() {
        return <div>
            <h1>Testing</h1>
            <Table  url={this.state.url} headings={this.state.headings}/>
        </div>;
    }
}


