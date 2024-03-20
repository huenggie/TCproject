import React from 'react';
import axios from 'axios';
import './Style.css';

export default class DHvanchuyen extends React.Component {
  state = {
    data: []
  }


  componentDidMount() {
    axios.get(`http://localhost:3000/web_data`)
      .then(res => {
        const data = res.data;
        this.setState({ data });
      })
      .catch(error => console.log(error));
  }


  render() {
    
    return (
        <div>
          <table className="table-responsive">
        <thead>
          <tr>
            <th>Khach Hang</th>
            <th>Ma don hang</th>
            <th>Ngay hoan thanh</th>
            <th>Ma chuyen di</th>
            <th>SST chang</th>
            <th>Loai hinh</th>
            <th>Loai cont</th>
            <th>So cont</th>
            <th>Diem xuat</th>
            <th>Diem nhap</th>
            <th>Nha van tai</th>
            <th>Tai xe</th>
            <th>Ghi chu</th>
            <th>Trang thai</th>
          </tr>
        </thead>
        <tbody>
          {this.state.data.map((item, index) => (
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

      <div>
          <select>
            <option value="5">Hiển thị 5 hàng</option>
            <option value="10">Hiển thị 10 hàng</option>
            <option value="15">Hiển thị 15 hàng</option>
          </select>
        </div>
        </div>
    )
  }
}
