
class TableNav extends React.Component{
    constructor(props){
        super(props);
    }
    render() {
        return <tr><td><button onClick={this.props.prev}>Prev</button><button onClick={this.props.next}>Next</button></td></tr>
    }
}