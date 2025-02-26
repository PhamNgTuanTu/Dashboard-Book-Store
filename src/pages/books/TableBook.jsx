import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { Badge } from "reactstrap";

Table.propTypes = {
  onRemoveClick: PropTypes.func,
  onEditClick: PropTypes.func,
  searchValue: PropTypes.string,
  books: PropTypes.array,
};

Table.defaultProps = {
  onRemoveClick: null,
  onEditClick: null,
  searchValue: "",
  books: null,
};

function Table(props) {
  let { books } = props;

  const { loadingPage } = useSelector((state) => state.book);

  const { onRemoveClick, onEditClick, searchValue, onViewClick } = props;

  const handleRemoveClick = (book) => {
    if (onRemoveClick) onRemoveClick(book);
  };
  const handleEditClick = (book) => {
    if (onEditClick) onEditClick(book);
  };
  const handleViewClick = (book) => {
    if (onViewClick) onViewClick(book);
  };

  books.sort((a, b) => b.id - a.id);

  //search
  if (searchValue.length > 0) {
    books = books.filter((i) => {
      return i.name.toLowerCase().match(searchValue.toLowerCase());
    });
  }

  return (
    <>
      {loadingPage ? (
        <table className="tg">
          <tbody>
            <tr>
              <th className="tg-cly1">
                <div className="line" />
              </th>
              <th className="tg-cly1">
                <div className="line" />
              </th>
              <th className="tg-cly1">
                <div className="line" />
              </th>
              <th className="tg-cly1">
                <div className="line" />
              </th>
              <th className="tg-cly1">
                <div className="line" />
              </th>
              <th className="tg-cly1">
                <div className="line" />
              </th>
              <th className="tg-cly1">
                <div className="line" />
              </th>
              <th className="tg-cly1">
                <div className="line" />
              </th>
            </tr>
            <tr>
              <td className="tg-cly1">
                <div className="line" />
              </td>
              <td className="tg-cly1">
                <div className="line" />
              </td>
              <td className="tg-cly1">
                <div className="line" />
              </td>
              <td className="tg-cly1">
                <div className="line" />
              </td>
              <td className="tg-cly1">
                <div className="line" />
              </td>
              <td className="tg-cly1">
                <div className="line" />
              </td>
              <td className="tg-cly1">
                <div className="line" />
              </td>
              <td className="tg-cly1">
                <div className="line" />
              </td>
            </tr>
          </tbody>
        </table>
      ) : null}
      <table
        className={loadingPage ? "d-none" : "table table-hover table-bordered"}
      >
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tên</th>
            <th scope="col">Giảm giá</th>
            <th scope="col">Đơn Giá</th>
            <th scope="col">Tồn</th>
            <th scope="col">Thể Loại</th>
            <th scope="col">Tác Giả</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{book.name}</td>
                <td>
                  {book.discount > 0 ? (
                    <Badge color="primary">{`${book.discount}%`}</Badge>
                  ) : (
                    <Badge color="light">{`${book.discount}%`}</Badge>
                  )}
                </td>
                <td>
                  {Number(book.unit_price).toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                </td>
                <td>{book.quantity}</td>
                <td>{book.category.name}</td>
                <td>{book.author.name}</td>
                <td className="min-width-170">
                  <button
                    onClick={() => handleEditClick(book.id)}
                    type="button"
                    className="btn btn-success mr-2"
                  >
                    <i className="bx bxs-edit"></i>
                  </button>
                  <button
                    onClick={() => handleRemoveClick(book.id)}
                    type="button"
                    className="btn btn-danger mr-2"
                  >
                    <i className="bx bx-trash"></i>
                  </button>
                  <button
                    onClick={() => handleViewClick(book.id)}
                    type="button"
                    className="btn btn-primary"
                  >
                    <i className="bx bx-show"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Table;
