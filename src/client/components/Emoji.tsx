import React from 'react';

const Emoji = (props: EmojiProps)  => (
    <span
        className="emoji"
        role="img"
        aria-label={props.label ? props.label : ""}
        aria-hidden={props.label ? "false" : "true"}
    >
        {props.symbol}&nbsp;&nbsp;
    </span>
);

interface EmojiProps {
    label: string;
    symbol: string;
}

export default Emoji;