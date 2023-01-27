import { ReactElement } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import ConnectPanel from "components/BurgerMenu/ConnectPanel";
import WalletPanel from "components/BurgerMenu/WalletPanel";
import ConfirmSwapPanel from "components/BurgerMenu/ConfirmSwapPanel";
import { useModal } from "providers/modal";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.primary,
    margin: theme.spacing(2),
    padding: `${theme.spacing(3)}px ${theme.spacing(2)}px`,
    borderRadius: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      borderRadius: theme.spacing(3),
      padding: `${theme.spacing(5)}px ${theme.spacing(4)}px`,
      minWidth: 380,
    },
  },
  backdrop: {
    background: "rgba(0,0,0,0.8)",
  },
}));

export default function ModalMenu() {
  const classes = useStyles();
  const { menuOpen, menu, setMenu } = useModal();

  const renderModalContent = (): ReactElement => {
    switch (menu) {
      case "connect":
        return <ConnectPanel />;
      case "wallet":
        return <WalletPanel />;
      case "confirm-swap":
        return <ConfirmSwapPanel />;
      case "deposit":
        return null; // <DepositPanel />
      case "withdraw":
        return null; // <WithdrawPanel />
      default:
        return null;
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={menuOpen}
        onClose={() => setMenu(false, "")}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          classes: { root: classes.backdrop },
        }}
      >
        <Fade in={menuOpen}>
          <div className={classes.paper}>{renderModalContent()}</div>
        </Fade>
      </Modal>
    </div>
  );
}
