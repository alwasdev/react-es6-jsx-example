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
