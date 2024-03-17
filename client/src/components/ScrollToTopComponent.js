import React, { useState, useEffect } from "react";
import { IconButton, useScrollTrigger, Zoom } from "@mui/material";
import { styled } from "@mui/system";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ScrollToTopButton = styled(IconButton)(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  border: "1px solid lightgrey",
}));

const ScrollToTop = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const trigger = useScrollTrigger({
    threshold: 100, // Set the scroll distance threshold in pixels
  });

  useEffect(() => {
    // Show/hide the "Scroll to Top" button based on the scroll position
    setIsVisible(trigger);
  }, [trigger]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Zoom in={isVisible}>
      <ScrollToTopButton
        color="primary"
        aria-label="Scroll to Top"
        size="small"
        onClick={scrollToTop}
      >
        <KeyboardArrowUpIcon />
      </ScrollToTopButton>
    </Zoom>
  );
};

export default ScrollToTop;
