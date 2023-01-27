import React from "react";
import styled from "styled-components";
import { BLOG_LINK, TWITTER_LINK, GITHUB_LINK, DISCORD_LINK } from "constants/index";

interface Props {
  isDark: boolean;
}

export const StyledLink = styled.a`
  text-decoration: none;
  font-size: 18px;
  color: ${(props) => props.color};
  padding: 0 10px;
`;

const StyledDiv = styled.div`
  display: none;
  ${({ theme }) => theme.muibreakpoints.down("lg")} {
    display: flex;
  }
`;

const LinkList: React.FC<Props> = ({ isDark }) => {
  const textColor = isDark ? "#AEA7A7" : "#6F6F6F";
  return (
    <StyledDiv>
      <StyledLink
        color={textColor}
        href={BLOG_LINK}
        data-amp-analytics-on="click"
        data-amp-analytics-name="blog"
        data-amp-analytics-attrs="page: 'Footer', action: 'Link'"
        target="_blank"
        rel="noreferrer noopener"
      >
        Blog
      </StyledLink>
      <StyledLink color={textColor} href={TWITTER_LINK} target="_blank" rel="noreferrer noopener">
        Twitter
      </StyledLink>
      <StyledLink color={textColor} href={DISCORD_LINK} target="_blank" rel="noreferrer noopener">
        Discord
      </StyledLink>
      <StyledLink color={textColor} href={GITHUB_LINK} target="_blank" rel="noreferrer noopener">
        Github
      </StyledLink>
    </StyledDiv>
  );
};

export default React.memo(LinkList, (prev, next) => prev.isDark === next.isDark);
