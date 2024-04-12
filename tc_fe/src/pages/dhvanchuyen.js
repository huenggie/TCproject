import React from "react";
import axios from "axios";
import "./Style.css";

export default class DHvanchuyen extends React.Component {
  state = {
    data: [],
    keyword: "",
    rowsPerPage: 10, // Số hàng hiển thị mặc định
    currentPage: 1,
    // Thêm state để lưu trữ thông tin tạm thời từ các thẻ input và select
    temporaryData: {
      textInput: "",
      dateInput: "",
      numberInput: "",
      statusSelect: "Trạng thái",
      transportSelect: "Nhà vận tải",
    },
    filteredData: [], // Thêm state để lưu trữ dữ liệu sau khi lọc
  };

  componentDidMount() {
    axios
      .get(`http://localhost:3000/web_data`)
      .then((res) => {
        const data = res.data;
        this.setState({ data, filteredData: data }); // Khởi tạo filteredData ban đầu
      })
      .catch((error) => console.log(error));
  }


  handleSearchChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      temporaryData: { ...this.state.temporaryData, [name]: value },
    });
  };

  handleSearchSubmit = (e) => {
    e.preventDefault();
    this.filterDataFromAPI();
  };

  filterData = () => {
    const { filteredData, currentPage, rowsPerPage } = this.state;
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredData.slice(startIndex, endIndex);
  };

  handleChangeRowsPerPage = (e) => {
    this.setState({ rowsPerPage: parseInt(e.target.value), currentPage: 1 });
  };

  handleChangePage = (page) => {
    this.setState({ currentPage: page });
  };


  filterDataFromAPI = () => {
    const { temporaryData } = this.state;
    const { textInput, dateInput, numberInput, statusSelect, transportSelect } = temporaryData;
  
    // Gọi API để lấy dữ liệu mới
    axios.get(`http://localhost:3000/web_data`)
      .then((res) => {
        let filteredData = res.data;
  
        // Lọc dữ liệu dựa trên các trường tìm kiếm
        filteredData = filteredData.filter((item) => {
          const keyword = textInput.toLowerCase();
          const formattedDateInput = dateInput ? new Date(dateInput).toLocaleDateString("en-GB") : ""; // Chuyển đổi định dạng ngày tìm kiếm
  
          return (
            (textInput === "" || 
              item.KHACH_HANG.toLowerCase().includes(keyword) ||
              item.MA_DON_HANG.toLowerCase().includes(keyword) ||
              item.SO_CONT.toLowerCase().includes(keyword)) &&
            (!dateInput || item.NGAY_HOAN_THANH === formattedDateInput) && // So sánh ngày
            (numberInput === "" || item.SO_CONT.toLowerCase().includes(numberInput.toLowerCase())) &&
            (statusSelect === "Trạng thái" || item.TRANG_THAI === statusSelect) &&
            (transportSelect === "Nhà vận tải" || item.NHA_VAN_TAI === transportSelect)
          );
        });
  
        // Cập nhật dữ liệu lọc vào state và reset trang về trang đầu tiên
        this.setState({ filteredData, currentPage: 1 });
      })
      .catch((error) => console.log(error));
  };
  
  
  

  render() {
    return (
      <div>
        <form onSubmit={this.handleSearchSubmit}>
          <div className="header-down">
            <div className="header-down-items">
              <input
                type="text"
                name="textInput"
                placeholder="Mã chuyến, Khách hàng..."
                value={this.state.temporaryData.textInput}
                onChange={this.handleSearchChange}
              />
            </div>

            <div className="header-down-items">
              <input
                type="date"
                name="dateInput"
                value={this.state.temporaryData.dateInput}
                onChange={this.handleSearchChange}
              />
            </div>

            <div className="header-down-items">
              <input
                type="text"
                name="numberInput"
                placeholder="Số cont..."
                value={this.state.temporaryData.numberInput}
                onChange={this.handleSearchChange}
              />
            </div>

            <div className="header-down-items">
              <select
                name="statusSelect"
                value={this.state.temporaryData.statusSelect}
                onChange={this.handleSearchChange}
              >
                <option value="Trạng thái" disabled>
                  Trạng thái
                </option>
                <option value="Chưa gắn">Chưa gắn</option>
                <option value="Đang làm">Đang làm</option>
                <option value="Hoàn thành">Hoàn thành</option>
              </select>
            </div>

            <div className="header-down-items">
              <select
                name="transportSelect"
                value={this.state.temporaryData.transportSelect}
                onChange={this.handleSearchChange}
              >
                <option value="Nhà vận tải" disabled>
                  Nhà vận tải
                </option>
                <option value="ECOTRUCK">ECOTRUCK</option>
                <option value="TRASIMEX">TRASIMEX</option>
              </select>
            </div>

            <div className="header-down-items">
              <button type="submit">Tìm kiếm</button>
            </div>
          </div>
        </form>

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
