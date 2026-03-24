import { useModal } from "../../context/ModalContext";
import { MenuContainer } from "../../modals/Modal";
import type { ConfirmOptions } from "../../../shared/types";

export function ConfirmModal() {
  const { data, resolveConfirm } = useModal();
  const options = data as ConfirmOptions;

  return (
    <MenuContainer onClose={() => resolveConfirm(false)}>
      <div className="confirm-modal">
        <h2 className="popul-title">{options.title}</h2>
        <p className="popup-subtitle">{options.message}</p>
        <div className="confirm-modal__actions">
          <button
            className="confirm-modal__cancel"
            onClick={() => resolveConfirm(false)}
          >
            {options.cancelLabel ?? "Cancel"}
          </button>
          <button
            className={`confirm-modal__confirm confirm-modal__confirm--${options.variant ?? 'danger'}`}
            onClick={() => resolveConfirm(true)}
          >
            {options.confirmLabel ?? "Confirm"}
          </button>
        </div>
      </div>
    </MenuContainer>
  );
}