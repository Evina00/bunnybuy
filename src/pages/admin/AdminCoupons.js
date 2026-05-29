import { useEffect, useState} from "react";
import axios from "axios";
import CouponModal from "../../components/CouponModal";
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";


function AdminCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [pagination, setPagination] = useState({});
  const [type, setType] = useState("create");
  const [tempCoupon, setTempCoupon] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  

  useEffect(() => {
    getCoupons();
  }, []);

  //頁數沒有帶入參數，預設值為1
  const getCoupons = async (page = 1) => {
    setLoading(true);
    try{
      const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupons?page=${page}`
    );
    console.log(res);
    setCoupons(res.data.coupons);
    setPagination(res.data.pagination);
    }catch(error){
       console.error("抓取優惠卷失敗：", error);
    }finally{
      setLoading(false);
    }
  };

  const openCouponModal = (type, item) => {
    setType(type);
    setTempCoupon(item);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);;
  };



  return (
    <div className="p-3">
      <Loading isLoading={isLoading} />

      <CouponModal
        isOpen={isOpen}
        closeModal={closeModal}
        getCoupons={getCoupons}
        tempCoupon={tempCoupon}
        type={type}
      />
      <h3>優惠卷列表</h3>
      <hr />
      <div className="text-end m-2">
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => openCouponModal("create", {})}
        >
          建立新優惠卷
        </button>
      </div>

      <table className="table">
        <thead>
          <tr className="table-light">
            <th scope="col">標題</th>
            <th scope="col">折扣</th>
            <th scope="col">到期日</th>
            <th scope="col">優惠碼</th>
            <th scope="col">啟用狀態</th>
            <th scope="col">編輯</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => {
            return (
              <tr key={coupon.id}>
                <td>{coupon.title}</td>
                <td>{coupon.percent}</td>
                <td>{new Date(coupon.due_date * 1000).toLocaleDateString()}</td>
                <td>{coupon.code}</td>
                <td>{coupon.is_enabled ? "啟用" : "未啟用"}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => openCouponModal("edit", coupon)}
                  >
                    編輯
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination pagination={pagination} changePage={getCoupons} />
    </div>
  );
}

export default AdminCoupons;
