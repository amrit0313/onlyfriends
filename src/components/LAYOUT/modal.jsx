import ReactDOM from "react-dom";
const Backdrop = (props) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-screen z-[20] bg-slate-300/50"
      onClick={props.onClose}
    ></div>
  );
};

const ModalOverlay = (props) => {
  return <div className={props.className}>{props.children}</div>;
};

const PortalElement = document.getElementById("overlay");
const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        PortalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay className={props.className}>
          {props.children}
        </ModalOverlay>,
        PortalElement
      )}
    </>
  );
};

export default Modal;
