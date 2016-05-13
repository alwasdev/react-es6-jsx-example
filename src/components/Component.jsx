
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

class Table extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <table>
            <TableBody url={this.props.url} headings={this.props.headings}/>
        </table>;
    }
}


class TableBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            next: this.props.url,
            prev: ""
        }
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
    }

    componentDidMount() {
        this.loadNext();
    }
    loadNext() {
        console.log("Loading next:", this.state.next)
        $.get(this.state.next, (result) => {
            console.log("Loaded data after component is mount", result)
            this.setState({
                data: result._embedded.diagnosticDatas,
                next: result._links.next.href,
                prev: result._links.next.href
            });
        });
    }

    loadPrev() {
        console.log("Loading next:", this.state.next)
        $.get(this.state.prev,(result) => {
            console.log("Loaded data after component is mount", result)
            this.setState({
                data: result._embedded.diagnosticDatas,
                next: result._links.next.href,
                prev: result._links.next.href
            });
        });
    }
    /*
        Next for loading data here
    */
    next() {
        console.log("next");
        this.loadNext();
    }
    /*
        Prev loading data here
    */
    prev() {
        console.log("prev");
        this.loadPrev();
    }
    render() {
        return <tbody>
            <TableHeadings headings={this.props.headings } />

            {
                this.state.data.map(function (item, index) {
                    return <TableRow data ={item}/>
                })
            }

            < TableNav next = { this.next } prev= { this.prev } />
        </tbody>;
    }
}

class TableHeadings extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        var headings = this.props.headings;
        return <tr>
            {headings.map(function (item, idx) { return <th>{item}</th> }) }
        </tr>
    }
}
class TableRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var data = this.props.data;
        return <tr>
            <td>{data.id}</td>
            <td>{data.id}</td>
        </tr>
    }
}


class TableNav extends React.Component{
    constructor(props){
        super(props);
    }
    render() {
        return <tr><td><button onClick={this.props.prev}>Prev</button><button onClick={this.props.next}>Next</button></td></tr>
    }
}

ReactDOM.render(<App/>, document.getElementsByTagName("reactApp")[0]);
ReactDOM.render(<HelloComponent/>, document.getElementsByTagName("hello")[0]);