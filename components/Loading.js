import React from "react";
import styled from "styled-components";

const LoadingStyled = styled.div`
    text-align: center;
    padding: 20px 0;
    font-family: Sans-serif;
    color: #cccccc;
`;

export const Loading = () => {
    return <LoadingStyled>{"Loading..."}</LoadingStyled>;
};
