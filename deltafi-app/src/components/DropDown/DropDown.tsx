import { ReactNode, useState, useMemo } from "react";
import {
  Avatar,
  Button,
  ClickAwayListener,
  makeStyles,
  Box,
  Theme,
  Typography,
  InputBase,
} from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import styled from "styled-components";
import { DropDownProps } from "./types";
import { ArrowDown } from "components";
import { useDarkMode } from "providers/theme";
import { getTokenConfigBySymbol, TokenConfig } from "constants/deployConfig";

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    borderRadius: 28,
    backgroundColor: theme.palette.background.tertiary,
    padding: `${theme.spacing(0.75)}px ${theme.spacing(2)}px`,
    fontFamily: "Inter",
    fontSize: 12,
    textTransform: "capitalize",
    [theme.breakpoints.up("sm")]: {
      fontSize: 16,
      padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
    },
    minWidth: 100,
    "&:disabled": {
      color: theme.palette.primary.main,
    },
  },
  icon: {
    width: theme.spacing(2.5),
    height: theme.spacing(2.5),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
  },
  dropdownContainer: {
    minWidth: 320,
    position: "absolute",
    zIndex: theme.zIndex.modal,
    marginTop: theme.spacing(1),
    backgroundColor: theme.palette.background.tertiary,
    border: "1px solid #3e3e3e",
    borderRadius: theme.spacing(2),
    padding: `${theme.spacing(3)}px ${theme.spacing(2)}px`,
  },
  inputContainer: {
    position: "relative",
    overflow: "hidden",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    color: theme.palette.text.primary,
    zIndex: 0,
    padding: ".5rem 1rem",
    textTransform: "inherit",
    borderRadius: 100,
    backgroundColor: "transparent",
    boxShadow: "2px 1000px 1px transparent inset",
    "&:hover": {
      backgroundColor: "transparent",
    },
    "& i": {
      content: "''",
      position: "absolute",
      zIndex: -1,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      padding: "1px",
      borderRadius: 100,
      /* the below will do the magic */
      "-webkit-mask":
        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0) padding-box" /* this will cover the content and the padding */,
      /* needed for old browsers until the below is more supported */
      "-webkit-mask-composite": "destination-out",
      /* this will exclude the first layer from the second so only the padding area will be kept visible */
      maskComposite: "destination-out",
      "&::before": {
        content: "''",
        position: "absolute",
        left: "50%",
        top: "50%",
        width: "100%",
        height: "100%",
        background: theme.palette.gradient.btnCta,
        transform: "translate(-50%, -50%) rotate(0deg)",
      },
    },
  },
  searchInput: {
    width: "100%",
    marginLeft: 4,
  },
  optionItem: {
    marginTop: 10,
    textAlign: "left",
  },
  optionItemIcon: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
  },
  symbol: {
    fontFamily: "Inter",
    fontSize: theme.typography.subtitle1.fontSize,
    lineHeight: 1,
    textTransform: "uppercase",
    marginBottom: 2,
  },
  optionLabel: {
    fontFamily: "Inter",
    fontSize: 12,
    textTransform: "capitalize",
    [theme.breakpoints.up("md")]: {
      fontSize: 16,
    },
  },
}));

const Img = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  &.coin-earning {
    margin-left: -1.2px;
  }
  ${({ theme }) => theme.muibreakpoints.up("sm")} {
    width: 32px;
    height: 32px;
    &.coin-earning {
      margin-left: -5px;
    }
  }
`;

const DropDown = <T extends TokenConfig>(props: DropDownProps<T> & { children?: ReactNode }) => {
  const classes = useStyles();
  const { value, options, onChange, inputProps, disableDrop } = props;
  const { isDark } = useDarkMode();
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleClickItem = (value: T) => {
    setOpen((pv) => !pv);
    onChange(value);
  };

  const handleOpen = () => setOpen((prev) => !prev);
  const handleClickAway = () => setOpen(false);

  const optionList = useMemo(
    () =>
      options.filter(
        (option) =>
          option.name.toLowerCase().includes(searchValue) ||
          option.symbol.toLowerCase().includes(searchValue),
      ),
    [options, searchValue],
  );

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box position="relative">
        <Button
          onClick={handleOpen}
          disabled={disableDrop}
          startIcon={
            value?.logoURI ? (
              <Avatar src={value?.logoURI} alt={value?.symbol} className={classes.icon} />
            ) : (
              (() => {
                if (!value?.symbol) {
                  return null;
                }
                const [baseTokenSymbol, quoteTokenSymbol] = value.symbol.split("-");
                if (!baseTokenSymbol || !quoteTokenSymbol) {
                  return null;
                }

                const baseTokenLogoURL = getTokenConfigBySymbol(baseTokenSymbol)?.logoURI;
                const quoteTokenLogoURL = getTokenConfigBySymbol(quoteTokenSymbol)?.logoURI;
                if (!baseTokenLogoURL || !quoteTokenLogoURL) {
                  return null;
                }

                return (
                  <Box display="flex" alignItems="center">
                    <Img src={baseTokenLogoURL} alt={baseTokenSymbol} />
                    <Img src={quoteTokenLogoURL} alt={quoteTokenSymbol} className="coin-earning" />
                  </Box>
                );
              })()
            )
          }
          endIcon={disableDrop ? undefined : <ArrowDown isDark={isDark} width="10" height="6" />}
          className={classes.button}
        >
          {value?.symbol}
        </Button>
        {open ? (
          <Box className={classes.dropdownContainer}>
            <Box className={classes.inputContainer}>
              <i />
              <SearchOutlined />
              <InputBase
                id="input"
                aria-label="search"
                className={classes.searchInput}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                {...inputProps}
              />
            </Box>
            <Box sx={{ mt: 1 }}>
              {optionList.map((option) => (
                <Button
                  key={option.mint}
                  className={classes.optionItem}
                  fullWidth
                  onClick={() => handleClickItem(option)}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Avatar
                      src={option.logoURI}
                      alt={option.symbol}
                      className={classes.optionItemIcon}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        ml: 1,
                      }}
                    >
                      <Box>
                        {classes.symbol && (
                          <Typography className={classes.symbol}>{option.symbol}</Typography>
                        )}
                        <Typography className={classes.optionLabel}>{option.name}</Typography>
                      </Box>
                      {option.symbol && (
                        <Typography className={classes.optionLabel}>
                          {"0.00"} {option.symbol}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Button>
              ))}
            </Box>
          </Box>
        ) : null}
      </Box>
    </ClickAwayListener>
  );
};

DropDown.defaultProps = {
  value: null,
  options: [],
  onChange: () => {},
};

export default DropDown;
