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
                    return <TableRow key={index} data ={item}/>
                })
            }

            < TableNav next = { this.next } prev= { this.prev } />
        </tbody>;
    }
}