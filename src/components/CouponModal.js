import axios from "axios";
import { Modal } from "bootstrap";
import { useState, useEffect, useRef } from "react";


function CouponModal({ isOpen, closeModal, getCoupons, type, tempCoupon }) {
  const [tempData, setTempData] = useState({
    title: "",
    is_enabled: 1,
    percent: 80,
    due_date: Math.floor(new Date().getTime() / 1000),
    code: "testCode",
  });

  const [date, setDate] = useState(new Date()); 
  const couponModalRef = useRef(null);
  
  // 取得今天的日期字串 
  const getTodayString = () => {
    const today = new Date();
    return `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (couponModalRef.current) {
      Modal.getOrCreateInstance(couponModalRef.current, {
        backdrop: "static",
        keyboard: false,
      });
    }
    
    // 監聽關閉事件自動清理 Backdrop
    const currentRef = couponModalRef.current;
    const handleHidden = () => {
      document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());
    };
    currentRef?.addEventListener("hidden.bs.modal", handleHidden);

    return () => {
      currentRef?.removeEventListener("hidden.bs.modal", handleHidden);
    };
  }, []);


  useEffect(() => {
    const modalInstance = Modal.getInstance(couponModalRef.current);
    if (isOpen) {
      modalInstance?.show();
    } else {
      modalInstance?.hide();
    }
  }, [isOpen]);

  

  // 監聽外部傳入的編輯/新增動作
  useEffect(() => {
    if (type === "create") {
      setTempData({
        title: "",
        is_enabled: 1,
        percent: 80,
        due_date: Math.floor(new Date().getTime() / 1000),
        code: "testCode",
      });
      setDate(new Date());
    } else if (type === "edit") {
      setTempData(tempCoupon);
      if (tempCoupon.due_date) {
        setDate(new Date(tempCoupon.due_date * 1000));
      }
    }
  }, [type, tempCoupon]);

  const handleChange = (e) => {
    const { value, name, checked, type } = e.target;
    setTempData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? +checked : value,
    }));
  };

  // 折扣限制 
  const handleDiscountChange = (e) => {
    const { name } = e.target;
    let value = Number(e.target.value);
    if (value < 1) value = 1;
    if (value > 99) value = 99; 
    if (value < 0) value = 0; 
    setTempData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    if (!e.target.value) return;
    const selectedDate = new Date(e.target.value);
    selectedDate.setHours(23, 59, 59, 0); //當天最後一秒
    setDate(selectedDate);
  };

  const submit = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) {
      alert("到期日不能在今日以前！");
      return;
    }

  
    try {
      let api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon`;
      let method = "post";
      if (type === "edit") {
        api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${tempCoupon.id}`;
        method = "put";
      }

      const submitData = {
        ...tempData,
        percent: Number(tempData.percent),
        due_date: Math.floor(date.getTime() / 1000),
      };

      const res = await axios[method](api, { data: submitData });
      console.log(res);
      closeModal();
      getCoupons();
    } catch (error) {
      console.error("送出優惠券失敗：", error.response?.data || error);
    }
  };

  return (
    <div
      className="modal fade"
      ref={couponModalRef}
      id="couponModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {type === "create" ? "建立新優惠卷" : `編輯 ${tempData.title}`}
            </h1>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={closeModal}
            />
          </div>
          <div className="modal-body">
            <div className="mb-2">
              <label className="w-100" htmlFor="title">
                標題
                <input
                  type="text"
                  id="title"
                  placeholder="請輸入標題"
                  name="title"
                  className="form-control mt-1"
                  value={tempData.title}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="row">
              <div className="col-md-6 mb-2">
                <label className="w-100" htmlFor="percent">
                  折扣（%）<span className="text-muted small">1-99</span>
                  <input
                    type="number"
                    name="percent"
                    id="percent"
                    placeholder="請輸入折扣（%）"
                    className="form-control mt-1"
                    value={tempData.percent || ""}
                    onChange={handleDiscountChange}
                  />
                </label>
              </div>
              <div className="col-md-6 mb-2">
                <label className="w-100" htmlFor="due_date">
                  到期日
                  <input
                    type="date"
                    id="due_date"
                    name="due_date"
                    min={getTodayString()}
                    placeholder="請輸入到期日"
                    className="form-control mt-1"
                    value={`${date.getFullYear().toString()}-${(
                      date.getMonth() + 1
                    )
                      .toString()
                      .padStart(2, 0)}-${date
                      .getDate()
                      .toString()
                      .padStart(2, 0)}`}
                    onChange={handleDateChange}
                  />
                </label>
              </div>
              <div className="col-md-6 mb-2">
                <label className="w-100" htmlFor="code">
                  優惠碼
                  <input
                    type="text"
                    id="code"
                    name="code"
                    placeholder="請輸入優惠碼"
                    className="form-control mt-1"
                    value={tempData.code}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
            <label className="form-check-label" htmlFor="is_enabled">
              <input
                className="form-check-input me-2"
                type="checkbox"
                id="is_enabled"
                name="is_enabled"
                checked={!!tempData.is_enabled}
                onChange={handleChange}
              />
              是否啟用
            </label>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeModal}
            >
              關閉
            </button>
            <button type="button" className="btn btn-primary" onClick={submit}>
              儲存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CouponModal;
