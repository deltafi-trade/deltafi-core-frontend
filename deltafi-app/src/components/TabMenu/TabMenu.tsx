import { useState } from "react";
import { useHistory, useLocation } from "react-router";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles(({ palette, spacing }: Theme) => ({
  button: {
    width: 98,
    fontWeight: 500,
    "&.Mui-selected": {
      backgroundColor: palette.background.primary,
    },
    borderRadius: "100px !important",
    border: "none",
    textTransform: "capitalize",
    color: "#fff",
  },
}));

const TabMenu: React.FC = (props) => {
  const history = useHistory();
  const location = useLocation();
  const [activeTab, setActive] = useState(location.pathname.substring(1));

  const classes = useStyles(props);

  const handleActive = (path: string): void => {
    if (!path) {
      history.replace(`/${activeTab}`);
      return;
    }
    setActive(path);
    history.replace(`/${path}`);
  };

  return (
    <ToggleButtonGroup
      value={activeTab}
      exclusive
      onChange={(event: React.MouseEvent<HTMLElement>, value: string | null) => handleActive(value)}
      aria-label="Top Menu"
    >
      <ToggleButton value="swap" aria-label="Swap" className={classes.button}>
        Swap
      </ToggleButton>
      <ToggleButton value="pools" aria-label="Pools" className={classes.button}>
        Pools
      </ToggleButton>
      <ToggleButton value="farms" aria-label="Farms" className={classes.button}>
        Farms
      </ToggleButton>
      <ToggleButton value="rewards" aria-label="Rewards" className={classes.button}>
        Rewards
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default TabMenu;
