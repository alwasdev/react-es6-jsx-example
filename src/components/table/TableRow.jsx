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