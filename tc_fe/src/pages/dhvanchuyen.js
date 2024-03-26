import React from "react";
import axios from "axios";
import "./Style.css";

export default class DHvanchuyen extends React.Component {
  state = {
    data: [],
    keyword: "",
    rowsPerPage: 5, // Số hàng hiển thị mặc định
    currentPage: 1,
  };

  componentDidMount() {
    axios
      .get(`http://localhost:3000/web_data`)
      .then((res) => {
        const data = res.data;
        this.setState({ data });
      })
      .catch((error) => console.log(error));
  }

  handleSearchChange = (e) => {
    this.setState({ keyword: e.target.value });
  };

  // filterData để lọc dữ liệu bằng thanh tìm kiếm
  filterData = () => {
    const { data, keyword } = this.state;
    return data.filter((item) =>
      Object.values(item).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(keyword.toLowerCase())
      )
    );
  };

  handleRefresh = (e) => {
    window.location.reload(false);
  };
  handleChangeRowsPerPage = (e) => {
    this.setState({ rowsPerPage: parseInt(e.target.value) });
  };
  handleChangePage = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    return (
      <div>
        <div className="header-down">
          <div className="header-down-items">
            <input
              type="text"
              placeholder="Mã chuyến, Khách hàng..."
              value={this.state.keyword}
              onChange={this.handleSearchChange}
            ></input>
          </div>

          <div className="header-down-items">
            <input type="date" />
          </div>

          <div className="header-down-items">
            <select>
              <option>Số cont</option>
              <option value="MRU3157427">MRU3157427</option>
              <option value="BMOU6402204">BMOU6402204</option>
            </select>
          </div>

          <div className="header-down-items">
            <select>
              <option>Trạng thái</option>
              <option value="Chưa gắn">Chưa gắn</option>
              <option value="Đang làm">Đang làm</option>
              <option value="Hoàn thành">Hoàn thành</option>
            </select>
          </div>

          <div className="header-down-items">
            <select>
              <option>Nhà vận tải</option>
              <option value="ECOTRUCK">ECOTRUCK</option>
              <option value="TRASIMEX">TRASIMEX</option>
            </select>
          </div>

          <div className="header-down-items">
            <button onClick={this.handleRefresh}>Làm mới</button>
          </div>
        </div>

        <div>
          <p>{this.state.startDate}</p>
        </div>

        <div>
          <table className="table-responsive">
            <thead>
              <tr>
                <th>Khách hàng</th>
                <th>Mã đơn hàng</th>
                <th>Ngày hoàn thành</th>
                <th>Mã chuyến đi</th>
                <th>SST chặng</th>
                <th>Loại hình</th>
                <th>Loại cont</th>
                <th>Số cont</th>
                <th>Điểm xuất</th>
                <th>Điểm nhập</th>
                <th>Nhà vận tải</th>
                <th>Tài xế</th>
                <th>Ghi chú</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {this.filterData()
                .slice(
                  (this.state.currentPage - 1) * this.state.rowsPerPage,
                  this.state.currentPage * this.state.rowsPerPage
                )
                .map((item, index) => (
                  <tr key={index}>
                    <td>{item.KHACH_HANG}</td>
                    <td>{item.MA_DON_HANG}</td>
                    <td>{item.NGAY_HOAN_THANH}</td>
                    <td>{item.MA_CHUYEN_DI}</td>
                    <td>{item.SST_CHANG}</td>
                    <td>{item.LOAI_HINH}</td>
                    <td>{item.LOAI_CONT}</td>
                    <td>{item.SO_CONT}</td>
                    <td>{item.DIEM_XUAT}</td>
                    <td>{item.DIEM_NHAP}</td>
                    <td>{item.NHA_VAN_TAI}</td>
                    <td>{item.TAI_XE}</td>
                    <td>{item.GHI_CHU}</td>
                    <td>{item.TRANG_THAI}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="footer">
          <div className="footer-left">
            <select
              value={this.state.rowsPerPage}
              onChange={this.handleChangeRowsPerPage}
            >
              <option value="5">Hiển thị 5 hàng</option>
              <option value="10">Hiển thị 10 hàng</option>
              <option value="20">Hiển thị 20 hàng</option>
              <option value="50">Hiển thị 50 hàng</option>
            </select>
          </div>
          <div className="footer-right">
            {Array(Math.ceil(this.filterData().length / this.state.rowsPerPage))
              .fill()
              .map((_, index) => (
                <button
                  key={index}
                  onClick={() => this.handleChangePage(index + 1)}
                >
                  {index + 1}
                </button>
              ))
              .slice(
                this.state.currentPage > 3
                  ? Math.max(this.state.currentPage - 2, 0)
                  : 0,
                this.state.currentPage > 3
                  ? Math.min(
                      this.state.currentPage + 2,
                      Math.ceil(
                        this.filterData().length / this.state.rowsPerPage
                      )
                    )
                  : 5
              )}
            {this.state.currentPage > 3 && (
              <>
                <span>...</span>
                <button
                  onClick={() =>
                    this.handleChangePage(
                      Math.ceil(
                        this.filterData().length / this.state.rowsPerPage
                      )
                    )
                  }
                >
                  {Math.ceil(this.filterData().length / this.state.rowsPerPage)}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}
