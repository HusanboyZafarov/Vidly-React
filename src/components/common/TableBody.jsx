import React, { Component } from 'react'
import Like from './Like';
import _ from "lodash"

class TableBody extends Component {
    render() {
        const { data, columns, onFavourite, onDelete } = this.props
        return (
            <tbody>
                {data.map((item) => (
                    // <tr key={item._id}>
                    //     <td>{item.title}</td>
                    //     <td>{item.genre.name}</td>
                    //     <td>{item.numberInStock}</td>
                    //     <td>{item.dailyRentalRate}</td>
                    //     <td>
                    //         <Like
                    //             onFavourite={onFavourite}
                    //             liked={item.isFavourite}
                    //             item={item}
                    //         />
                    //     </td>
                    //     <td>
                    //         <button onClick={() => onDelete(item)} className="btn btn-danger btn-sm">
                    //             Delete
                    //         </button>
                    //     </td>
                    // </tr>
                    <tr key={item.path}>
                        {columns.map(column => {
                            <td key={column.path}>
                                {_.get(item, column.path)}
                            </td>
                        })}
                    </tr>
                ))}
            </tbody>
        );
    }
}

export default TableBody;