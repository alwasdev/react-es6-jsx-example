class TableHeadings extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        var headings = this.props.headings;
        return <tr>
            {headings.map(function (item, idx) { return <th key={idx}>{item}</th> }) }
        </tr>
    }
}