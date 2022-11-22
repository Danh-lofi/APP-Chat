import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalSliceAction } from "../../../store/modalSlice";
import "./confirmmodal.scss";

const ConfirmModal = () => {
  // Redux
  const dispatch = useDispatch();
  let confirm = useSelector((state) => state.modal.confirm);
  const { isOpenConfirm, title, content, onConfirm } = confirm;
  // Ẩn modal
  const hideModal = () => {
    // Action đến redux
    dispatch(modalSliceAction.setOpenConfirm(false));
  };

  const confirmHandle = () => {
    dispatch(
      modalSliceAction.setOpenConfirm({
        title: "",
        content: "",
        onConfirm: null,
        isOpenConfirm: false,
      })
    );
    onConfirm();
  };
  return (
    <div
      className={`confirm__modal__container  ${
        isOpenConfirm ? "open" : "close"
      }`}
    >
      <div className="confirm__modal__overlay" onClick={hideModal}></div>
      <div className="confirm__modal__wrap">
        <div className="confirm__modal__card">
          <div className="confirm__modal__card__header">
            <h4 className="confirm__modal__card__header__title">{title}</h4>
            <div className="confirm__modal__close" onClick={hideModal}>
              <span>x</span>
            </div>
          </div>
          <div className="confirm__modal__card__body">
            <p className="confirm__modal__card__body__text">{content}</p>
          </div>
          <div className="confirm__modal__card__footer">
            <button
              className="confirm__modal__card__footer__confirm"
              onClick={confirmHandle}
            >
              Xác nhận
            </button>
            <button
              className="confirm__modal__card__footer__cancel"
              onClick={hideModal}
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
